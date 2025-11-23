import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

async function main() {
  console.log("🌱 Iniciando o seed...");

  // Cria as empresas (oficinas)
  const companies = await prisma.company.createMany({
    data: [
      { name: "Oficina Turbo", createdBy: 1 },
      { name: "AutoMec Reimão", createdBy: 1 },
      { name: "PitStop Express", createdBy: 2 },
    ],
  });
  console.log(`🏢 Criadas ${companies.count} empresas`);

  // Cria os usuários principais (donos)
  const owner1 = await prisma.user.create({
    data: {
      name: "Henrique Reimão",
      email: "henrique@oficinaturbo.com",
      password: "123456", // só dev, não faz isso em prod kkk
      role: "OWNER",
      function: "Gerente Técnico",
      features: ["Gestão", "Análise de Diagnóstico"],
      companyId: 1,
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
      companyId: 2,
    },
  });

  console.log(`👑 Criados donos: ${owner1.name}, ${owner2.name}`);

  // Cria colaboradores vinculados
  const collaborators = await prisma.user.createMany({
    data: [
      {
        name: "Zé do Óleo",
        email: "ze@oficinaturbo.com",
        password: "123456",
        role: "COLLABORATOR",
        function: "Troca de óleo",
        companyId: 1,
      },
      {
        name: "Nina Torque",
        email: "nina@oficinaturbo.com",
        password: "123456",
        role: "COLLABORATOR",
        function: "Diagnóstico elétrico",
        companyId: 1,
      },
      {
        name: "Beto Chave",
        email: "beto@automereimao.com",
        password: "123456",
        role: "COLLABORATOR",
        function: "Funilaria e pintura",
        companyId: 2,
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
