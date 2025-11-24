import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

async function main() {
  console.log("🌱 Iniciando o seed...");

  // Cria as empresas (oficinas)
  const oficinaTurbo = await prisma.company.create({
    data: { name: "Oficina Turbo" },
  });
  const autoMec = await prisma.company.create({
    data: { name: "AutoMec Reimão" },
  });
  const pitStop = await prisma.company.create({
    data: { name: "PitStop Express" },
  });
  console.log("🏢 Criadas 3 empresas");

  // Cria os usuários principais (donos)
  const owner1 = await prisma.user.create({
    data: {
      name: "Henrique Reimão",
      email: "henrique@oficinaturbo.com",
      password: "123456", // só dev, não faz isso em prod kkk
      role: "OWNER",
      function: "Gerente Técnico",
      features: ["Gestão", "Análise de Diagnóstico"],
      companyId: oficinaTurbo.id,
    },
  });

  const owner2 = await prisma.user.create({
    data: {
      name: "João Pistão",
      email: "joao@automereimao.com",
      password: "123456",
      role: "OWNER",
      function: "Supervisor de Oficina",
      features: ["Gestão de equipe", "Controle de estoque"],
      companyId: autoMec.id,
    },
  });

  console.log(`👑 Criados donos: ${owner1.name}, ${owner2.name}`);

  await prisma.company.update({
    where: { id: oficinaTurbo.id },
    data: { createdBy: owner1.id },
  });
  await prisma.company.update({
    where: { id: autoMec.id },
    data: { createdBy: owner1.id },
  });
  await prisma.company.update({
    where: { id: pitStop.id },
    data: { createdBy: owner2.id },
  });

  // Cria colaboradores vinculados
  const collaborators = await prisma.user.createMany({
    data: [
      {
        name: "Zé do Óleo",
        email: "ze@oficinaturbo.com",
        password: "123456",
        role: "COLLABORATOR",
        function: "Troca de óleo",
        companyId: oficinaTurbo.id,
      },
      {
        name: "Nina Torque",
        email: "nina@oficinaturbo.com",
        password: "123456",
        role: "COLLABORATOR",
        function: "Diagnóstico elétrico",
        companyId: oficinaTurbo.id,
      },
      {
        name: "Beto Chave",
        email: "beto@automereimao.com",
        password: "123456",
        role: "COLLABORATOR",
        function: "Funilaria e pintura",
        companyId: autoMec.id,
      },
    ],
  });

  console.log(`👷‍♂️ Criados ${collaborators.count} colaboradores`);
  console.log("✅ Seed finalizado com sucesso!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Erro no seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
