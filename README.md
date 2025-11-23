Beleza, Henricão.
Vou te mandar um **README enxuto, estiloso e útil**, no **nível adulto** — explicando o fluxo do BFF, a validação do token, e como isso roda **serverless na Vercel**.
Nada de frescura corporativa. Só o necessário pra qualquer dev olhar e falar:

> “Aí sim, desgraça, agora entendi.”

---

# 📘 **README — Mechanic BFF WebGear**

## 🚀 Sobre o projeto

O **Mechanic BFF WebGear** é um **Back-end For Front-end** projetado para atender especificamente o cliente **Web** da aplicação Mechanic.
Ele roda **serverless na Vercel**, entrega baixa latência, valida tokens JWT e expõe endpointBeleza, Henricão.
Vou te mandar um **README enxuto, estiloso e útil**, no **nível adulto** — explicando o fluxo do BFF, a validação do token, e como isso roda **serverless na Vercel**.
Nada de frescura corporativa. Só o necessário pra qualquer dev olhar e falar:

> “Aí sim, desgraça, agora entendi.”

---

# 📘 **README — Mechanic BFF WebGear**

## 🚀 Sobre o projeto

O **Mechanic BFF WebGear** é um **Back-end For Front-end** projetado para atender especificamente o cliente **Web** da aplicação Mechanic.
Ele roda **serverless na Vercel**, entrega baixa latência, valida tokens JWT e expõe endpoints diretos para consumir o core de serviços internos.

Aqui não tem gambiarra: o BFF existe pra **facilitar a vida do front**, agregando dados, validando acesso e formatando tudo bonitinho.

---

## 🧠 Arquitetura (visão rápida)

Fluxo típico:

```
Front Web → BFF → Microserviços / Banco → BFF → Front
```

O BFF faz:

* Autenticação via **JWT (Bearer)**
* Decodificação do token
* Consulta de usuário via banco
* Montagem do payload final pro front
* Respostas rápidas no formato JSON
* Deploy automatizado pela Vercel

Não faz:

* Regra de domínio
* Fluxos críticos de negócio
* Processos complexos de cálculo
* Nada que os microserviços deveriam fazer

---

## 🏗 Estrutura do projeto (MVC clássico)

```
src/
  controllers/
    me.controller.ts
  services/
    user.service.ts
  routes/
    me.routes.ts
  middlewares/
    auth.ts
  utils/
    jwt.ts
```

---

## 🔐 Autenticação (JWT)

### Request de exemplo:

```bash
curl -i "https://mechanic-bff-webgear.vercel.app/me" \
  -H "Authorization: Bearer <token>"
```

### Como funciona

1. O cliente envia um **JWT** no header.
2. O BFF usa o middleware `auth` pra:

   * validar o token
   * decodificar
   * extrair o `id`
3. Com o `id`, o serviço consulta o banco via Prisma.
4. O BFF devolve os dados do usuário autenticado.

### Exemplo de resposta real:

```json
{
  "id": 1,
  "name": "Usuário Teste",
  "email": "teste@abc.com",
  "role": "COLLABORATOR",
  "user_type": ["Pending"],
  "features": ["Encarregado"],
  "access": "default",
  "status": true
}
```

---

## ☁️ Deploy Serverless na Vercel

Cada rota é automaticamente empacotada como **serverless function**.

Benefícios:

* Escala automática
* Zero manutenção de servidor
* Resposta rápida com cache inteligente
* Logs da Vercel pra debug
* Rollbacks instantâneos

### Deploy automático via push:

Sempre que você fizer:

```bash
git push origin main
```

A Vercel constrói e deploya sozinho.

---

## 📦 Rodando localmente

### Instalar deps

```bash
npm install
```

### Rodar dev

```bash
npm run dev
```

A API vai subir em:

```
http://localhost:3000
```

---

## 📡 Endpoint atual

### `GET /me`

Retorna os dados do usuário autenticado.

Headers obrigatórios:

```
Authorization: Bearer <token>
```

---

## 🧪 Testando via curl

```bash
curl -i "http://localhost:3000/me" \
  -H "Authorization: Bearer <seu_token_aqui>"
```

---

## 🔥 Filosofia do projeto

Manter o BFF:

* simples
* rápido
* desacoplado
* limpo
* servindo SOMENTE o front web

Sem frescura.
Sem regra de domínio.
Sem rebolar no tronco.

---

## 👨‍🔧 Autor

Feito por **Henrique Reimão** — com ódio na barriga e carinho no código.

---

Se quiser, Henrique, eu gero a **versão em inglês**, ou crio um **README mais técnico com diagramas**. Quer?
s diretos para consumir o core de serviços internos.

Aqui não tem gambiarra: o BFF existe pra **facilitar a vida do front**, agregando dados, validando acesso e formatando tudo bonitinho.

---

## 🧠 Arquitetura (visão rápida)

Fluxo típico:

```
Front Web → BFF → Microserviços / Banco → BFF → Front
```

O BFF faz:

* Autenticação via **JWT (Bearer)**
* Decodificação do token
* Consulta de usuário via banco
* Montagem do payload final pro front
* Respostas rápidas no formato JSON
* Deploy automatizado pela Vercel

Não faz:

* Regra de domínio
* Fluxos críticos de negócio
* Processos complexos de cálculo
* Nada que os microserviços deveriam fazer

---

## 🏗 Estrutura do projeto (MVC clássico) quase isso ne 

```
src/
  controllers/
    me.controller.ts
  services/
    user.service.ts
  routes/
    me.routes.ts
  middlewares/
    auth.ts
  utils/
    jwt.ts
```

---

## 🔐 Autenticação (JWT)

### Request de exemplo:

```bash
curl -i "https://mechanic-bff-webgear.vercel.app/me" \
  -H "Authorization: Bearer <token>"
```

### Como funciona

1. O cliente envia um **JWT** no header.
2. O BFF usa o middleware `auth` pra:

   * validar o token
   * decodificar
   * extrair o `id`
3. Com o `id`, o serviço consulta o banco via Prisma.
4. O BFF devolve os dados do usuário autenticado.

### Exemplo de resposta real:

```json
{
  "id": 1,
  "name": "Usuário Teste",
  "email": "teste@abc.com",
  "role": "COLLABORATOR",
  "user_type": ["Pending"],
  "features": ["Encarregado"],
  "access": "default",
  "status": true
}
```

---

## ☁️ Deploy Serverless na Vercel

Cada rota é automaticamente empacotada como **serverless function**.

Benefícios:

* Escala automática
* Zero manutenção de servidor
* Resposta rápida com cache inteligente
* Logs da Vercel pra debug
* Rollbacks instantâneos

### Deploy automático via push:

Sempre que você fizer:

```bash
git push origin main
```

A Vercel constrói e deploya sozinho.

---

## 📦 Rodando localmente

### Instalar deps

```bash
npm install
```

### Rodar dev

```bash
npm run dev
```

A API vai subir em:

```
http://localhost:3000
```

---

## 📡 Endpoint atual

### `GET /me`

Retorna os dados do usuário autenticado.

Headers obrigatórios:

```
Authorization: Bearer <token>
```

---

## 🧪 Testando via curl

```bash
curl -i "http://localhost:3000/me" \
  -H "Authorization: Bearer <seu_token_aqui>"
```

---

## 🔥 Filosofia do projeto

Manter o BFF:

* simples
* rápido
* desacoplado
* limpo
* servindo SOMENTE o front web

Sem frescura.
Sem regra de domínio.
Sem rebolar no tronco.

---

## 👨‍🔧 Autor

Feito por **Chat-gpt e vervisado por Henrique Reimão** — 

---

