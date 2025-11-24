import { Request, Response, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { getUserById, updateUserProfile } from './user.service';

interface TokenPayload {
  id: number;
  iat: number;
  exp: number;
}

const GCS_TOKEN_URL =
  process.env['GCS_TOKEN_URL'] ??
  'https://gcs-token-service.vercel.app/api/generate-token';

const GCS_BUCKET_NAME =
  process.env['GCS_BUCKET_NAME'] ?? 'saas_ofcina';

const GCS_PROFILE_FOLDER =
  process.env['GCS_PROFILE_FOLDER'] ?? 'profile';

const DEFAULT_MIME_TYPE = 'image/jpeg';

export const getProfile = async (req: Request, res: Response) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({ message: "Token não enviado" });
    }

    // Pega só o token
    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env['JWT_REFRESH_SECRET'] as string
    ) as TokenPayload;

    const user = await getUserById(String(decoded.id));

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.json(user);
  } catch (error: any) {
    return res.status(401).json({
      message: "Token inválido",
      error: error.message
    });
  }
};

export const updateProfile: RequestHandler = async (req, res) => {
  try {
    const request = req as Request & { file?: Express.Multer.File };
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({ message: "Token não enviado" });
    }

    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env['JWT_REFRESH_SECRET'] as string
    ) as TokenPayload;

    const file = request.file;
    const { name } = req.body as { name?: string };

    if (!file) {
      return res.status(400).json({ message: "Arquivo de imagem não enviado" });
    }

    if (!file.buffer.length) {
      return res.status(400).json({ message: "Imagem vazia" });
    }

    const gcsTokenResponse = await fetch(GCS_TOKEN_URL, { method: 'POST' });

    if (!gcsTokenResponse.ok) {
      return res.status(502).json({
        message: "Falha ao gerar token de upload",
      });
    }

    const tokenPayload = await gcsTokenResponse.json() as { access_token?: string };
    const gcsAccessToken = tokenPayload.access_token;

    if (!gcsAccessToken) {
      return res.status(502).json({
        message: "Token de upload não recebido",
      });
    }

    const resolvedMimeType = file.mimetype || DEFAULT_MIME_TYPE;
    const extension = resolvedMimeType.split('/')[1] ?? 'jpeg';
    const objectPath = `${GCS_PROFILE_FOLDER}/${decoded.id}.${extension}`;

    const uploadUrl = new URL(
      `/upload/storage/v1/b/${GCS_BUCKET_NAME}/o`,
      'https://storage.googleapis.com'
    );
    uploadUrl.searchParams.set('uploadType', 'media');
    uploadUrl.searchParams.set('name', objectPath);

    const uploadResponse = await fetch(uploadUrl.toString(), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${gcsAccessToken}`,
        'Content-Type': resolvedMimeType,
      },
      body: file.buffer,
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      return res.status(502).json({
        message: "Falha ao enviar imagem para o bucket",
        detail: errorText,
      });
    }

    const userId = Number(decoded.id);
    if (Number.isNaN(userId)) {
      return res.status(400).json({ message: "ID do usuário inválido" });
    }

    const normalizedName = typeof name === 'string' ? name.trim() : undefined;

    const updateData: { picture: string; name?: string } = {
      picture: objectPath,
    };

    if (normalizedName) {
      updateData.name = normalizedName;
    }

    const updatedUser = await updateUserProfile(userId, updateData);
    const publicUrl = `https://storage.googleapis.com/${GCS_BUCKET_NAME}/${objectPath}`;

    return res.json({
      message: "Perfil atualizado com sucesso",
      storagePath: objectPath,
      bucket: GCS_BUCKET_NAME,
      publicUrl,
      user: updatedUser,
    });
  } catch (error: any) {
    return res.status(401).json({
      message: "Token inválido",
      error: error.message
    });
  }
};