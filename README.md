# 🥟 Melinhas — Sistema de Gestão para Pastelaria

> Sistema completo full-stack para gerenciamento de uma pastelaria, com cardápio digital, pedidos pelo WhatsApp, painel administrativo e controle financeiro em tempo real.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?style=flat-square&logo=supabase)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-cyan?style=flat-square&logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)

---

## 📋 Sumário

- [Sobre o Projeto](#-sobre-o-projeto)
- [Demonstração](#-demonstração)
- [Funcionalidades](#-funcionalidades)
- [Stack Tecnológica](#-stack-tecnológica)
- [Arquitetura](#-arquitetura)
- [Banco de Dados](#-banco-de-dados)
- [Segurança](#-segurança)
- [Como Rodar Localmente](#-como-rodar-localmente)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Deploy](#-deploy)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Autor](#-autor)

---

## 📖 Sobre o Projeto

A **Melinhas** é uma pastelaria tradicional fundada em 1986. O projeto nasceu da necessidade de modernizar o atendimento — substituindo anotações manuais por um sistema digital completo que cobre desde o pedido do cliente até a gestão financeira do negócio.

O sistema é dividido em duas partes:

- **Site público** — onde os clientes navegam pelo cardápio, montam o pedido e finalizam pelo WhatsApp
- **Painel administrativo** — onde o dono gerencia pedidos, produtos, estoque e finanças em tempo real

---

## 🎥 Demonstração

| Área | URL |
|---|---|
| Site público | `seudominio.com` |
| Painel admin | `seudominio.com/admin/login` |

---

## ✅ Funcionalidades

### Site Público (Cliente)

- 🗂️ Cardápio digital com filtro por categorias
- 🖼️ Popup de produto com foto, descrição, quantidade e campo de observações
- 🛒 Carrinho de compras com controle de quantidade
- 💬 Finalização de pedido pelo WhatsApp com mensagem automática formatada
- 📱 Interface 100% responsiva para mobile e desktop
- ⚡ Carregamento rápido com Server Side Rendering

### Painel Administrativo (Dono)

- 🔐 Login seguro com email e senha via Supabase Auth
- 📊 Dashboard com métricas do dia — pedidos, receita e estoque baixo
- 🔔 Notificações em tempo real quando chega pedido novo (com som de alerta)
- 📦 Gestão de pedidos com filtros por status, origem e período
- 🔄 Atualização de status de pedidos (pendente → confirmado → pronto → entregue)
- 💰 Controle financeiro com receitas e despesas separadas por categoria
- 📈 Receita por canal — site, iFood e balcão
- 🧾 Lançamento de despesas (ingredientes, aluguel, energia, funcionários)
- 🍽️ CRUD completo de produtos — adicionar, editar, ativar/desativar e deletar
- 🖼️ Imagens hospedadas no Supabase Storage

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 15 (App Router) |
| Linguagem | TypeScript |
| Estilização | TailwindCSS + shadcn/ui |
| Banco de Dados | Supabase (PostgreSQL) |
| Autenticação | Supabase Auth |
| Storage | Supabase Storage |
| Tempo Real | Supabase Realtime |
| Backend | API Routes (serverless) |
| Deploy | Vercel |

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────┐
│                    NEXT.JS (Vercel)                  │
│                                                      │
│  [Site Público]              [Dashboard Admin]       │
│   • Cardápio                  • Pedidos              │
│   • Carrinho                  • Financeiro           │
│   • Popup produto             • Produtos             │
│   • Finaliza WhatsApp         • Dashboard            │
└──────────────┬────────────────────────┬──────────────┘
               │                        │
               ▼                        ▼
┌──────────────────────────────────────────────────────┐
│                      SUPABASE                        │
│                                                      │
│  PostgreSQL   │  Auth   │  Storage  │  Realtime      │
│  (banco)      │ (login) │ (imagens) │ (notificações) │
└──────────────────────────────────────────────────────┘
               │
               ▼
┌──────────────────────┐
│   API ROUTES         │
│   /api/pedidos       │
│   (service role)     │
└──────────────────────┘
```

---

## 🗄️ Banco de Dados

O banco é composto por 6 tabelas principais:

```
produtos
├── id, nome, descricao, preco
├── categoria, imagem_url
├── estoque, estoque_minimo
└── ativo, criado_em

pedidos
├── id, origem (site/ifood/balcao)
├── status (pendente/confirmado/pronto/entregue/cancelado)
├── total, nome_cliente, telefone
├── observacao, ifood_id
└── criado_em

itens_pedido
├── id, pedido_id (FK), produto_id (FK)
├── quantidade, preco_unitario
└── subtotal

movimentacoes_estoque
├── id, produto_id (FK)
├── tipo (entrada/saida), quantidade
├── motivo, pedido_id (FK)
└── observacao, criado_em

transacoes_financeiras
├── id, tipo (receita/despesa)
├── categoria, descricao, valor
├── pedido_id (FK)
└── criado_em

usuarios_admin
├── id (FK → auth.users)
├── nome, email
└── papel (admin/funcionario)
```

---

## 🔐 Segurança

O projeto utiliza **Row Level Security (RLS)** do Supabase para controlar o acesso aos dados:

- **Produtos** — leitura pública (cardápio visível para todos), escrita restrita a admins
- **Pedidos** — inserção pública (qualquer cliente pode criar), leitura restrita a admins
- **Financeiro e estoque** — acesso restrito a admins logados
- **API Route `/api/pedidos`** — usa `service_role key` no servidor para operações que precisam bypassar o RLS com segurança

---

## 💻 Como Rodar Localmente

### Pré-requisitos

- Node.js 18+
- Conta no [Supabase](https://supabase.com)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/melinhas.git
cd melinhas

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# edite o .env.local com suas credenciais do Supabase

# Rode o projeto
npm run dev
```

Acesse `http://localhost:3000`

---

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

> ⚠️ Nunca commite o `.env.local` no GitHub. Ele já está no `.gitignore`.

---

## 🚀 Deploy

O projeto está configurado para deploy automático na **Vercel**.

1. Faça fork ou clone do repositório
2. Importe o projeto na [Vercel](https://vercel.com)
3. Configure as variáveis de ambiente no painel da Vercel
4. Configure a URL do site no Supabase em `Authentication → URL Configuration`
5. Deploy automático a cada `git push` na branch `main`

---

## 📁 Estrutura de Pastas

```
melinhas/
├── app/
│   ├── admin/
│   │   ├── (protected)/        # Rotas protegidas por auth
│   │   │   ├── dashboard/      # Página principal do admin
│   │   │   ├── pedidos/        # Gestão de pedidos
│   │   │   ├── products/       # Gestão de produtos
│   │   │   └── sales/          # Controle financeiro
│   │   ├── login/              # Tela de login
│   │   └── logout/             # Rota de logout
│   ├── api/
│   │   └── pedidos/            # API Route para salvar pedidos
│   └── page.tsx                # Página principal (site público)
├── components/
│   ├── cart.tsx                # Carrinho de compras
│   ├── hero.tsx                # Seção hero
│   ├── services.tsx            # Cardápio e popup de produto
│   ├── about.tsx               # Seção sobre
│   ├── contact.tsx             # Seção contato
│   ├── footer.tsx              # Rodapé
│   └── header.tsx              # Cabeçalho
├── contexts/
│   ├── cart-context.tsx        # Estado global do carrinho
│   └── products-context.tsx    # Estado global dos produtos
├── hooks/
│   ├── use-in-view.ts          # Hook de visibilidade
│   └── use-mobile.ts           # Hook de responsividade
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Cliente browser
│   │   ├── server.ts           # Cliente servidor
│   │   └── middleware.ts       # Cliente middleware
│   ├── products.ts             # Tipos de produtos
│   └── utils.ts                # Utilitários
├── public/
│   └── images/                 # Imagens estáticas
├── middleware.ts               # Middleware de autenticação
└── next.config.mjs             # Configuração do Next.js
```

---

## 👤 Autor

Feito por **Gustavo Nunes**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Gustavo_Nunes-blue?style=flat-square&logo=linkedin)](https://linkedin.com/in/seu-perfil)
[![GitHub](https://img.shields.io/badge/GitHub-gustavonunesx-black?style=flat-square&logo=github)](https://github.com/gustavonunesx)
