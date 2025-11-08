# SisReservas - Frontend React

Frontend da aplicação SisReservas desenvolvido em React + TypeScript + Vite.

## 🚀 Tecnologias

- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **React Router DOM** - Navegação
- **Axios** - Cliente HTTP para chamadas à API

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Backend SisReservas rodando em `http://localhost:8080`

## 🔧 Instalação

1. Instale as dependências:
```bash
npm install
```

## ⚙️ Executar o Projeto

### Modo Desenvolvimento
```bash
npm run dev
```
O frontend estará disponível em `http://localhost:5173`

### Build para Produção
```bash
npm run build
```

### Preview da Build
```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
sisreservas-frontend/
├── src/
│   ├── components/        # Componentes reutilizáveis
│   │   ├── Navbar.tsx
│   │   └── Navbar.css
│   ├── pages/            # Páginas da aplicação
│   │   ├── Home.tsx
│   │   ├── Home.css
│   │   ├── Clientes.tsx
│   │   ├── Clientes.css
│   │   ├── Reservas.tsx
│   │   └── Reservas.css
│   ├── services/         # Serviços de API
│   │   ├── clienteService.ts
│   │   └── reservaService.ts
│   ├── types/           # Tipos TypeScript
│   │   └── index.ts
│   ├── config/          # Configurações
│   │   └── api.ts
│   ├── App.tsx          # Componente principal
│   ├── App.css
│   ├── main.tsx         # Entry point
│   └── index.css
├── public/              # Arquivos estáticos
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎯 Funcionalidades

### Clientes
- ✅ Listar todos os clientes
- ✅ Criar novo cliente
- ✅ Editar cliente existente
- ✅ Excluir cliente
- ✅ Validação de formulário

### Reservas
- ✅ Listar todas as reservas
- ✅ Criar nova reserva
- ✅ Editar reserva existente
- ✅ Excluir reserva
- ✅ Atualizar status da reserva (Pendente, Confirmada, Cancelada, Concluída)
- ✅ Filtrar reservas por status
- ✅ Seleção de cliente
- ✅ Validação de data e hora

## 🔌 Endpoints da API

O frontend se conecta aos seguintes endpoints do backend:

### Clientes
- `GET /api/clientes` - Listar todos
- `GET /api/clientes/{id}` - Buscar por ID
- `GET /api/clientes/email/{email}` - Buscar por email
- `POST /api/clientes` - Criar
- `PUT /api/clientes/{id}` - Atualizar
- `DELETE /api/clientes/{id}` - Deletar

### Reservas
- `GET /api/reservas` - Listar todas
- `GET /api/reservas/{id}` - Buscar por ID
- `GET /api/reservas/cliente/{clienteId}` - Buscar por cliente
- `GET /api/reservas/data/{data}` - Buscar por data
- `GET /api/reservas/status/{status}` - Buscar por status
- `GET /api/reservas/periodo?dataInicio={}&dataFim={}` - Buscar por período
- `POST /api/reservas` - Criar
- `PUT /api/reservas/{id}` - Atualizar
- `PATCH /api/reservas/{id}/status?status={}` - Atualizar status
- `DELETE /api/reservas/{id}` - Deletar

## 🎨 Estilização

- Design responsivo
- Paleta de cores moderna
- Feedback visual para ações do usuário
- Status de reserva com cores diferenciadas:
  - 🟠 Pendente - Laranja
  - 🔵 Confirmada - Azul
  - 🔴 Cancelada - Vermelho
  - 🟢 Concluída - Verde

## 🛠️ Desenvolvimento

### Configurar URL da API

Edite o arquivo `src/config/api.ts` para alterar a URL base da API:

```typescript
const API_BASE_URL = 'http://localhost:8080/api';
```

### Estrutura de Types

Os tipos TypeScript estão definidos em `src/types/index.ts`:
- `Cliente` - Dados do cliente
- `Reserva` - Dados da reserva
- `ReservaForm` - Formulário de reserva
- `StatusReserva` - Status possíveis da reserva

## 📝 Observações

- Certifique-se de que o backend está rodando antes de iniciar o frontend
- O CORS está configurado no backend para aceitar requisições do frontend
- As datas são formatadas no padrão brasileiro (dd/mm/yyyy)
- Os horários seguem o formato 24h (HH:mm)

## 🐛 Troubleshooting

### Erro de conexão com API
- Verifique se o backend está rodando em `http://localhost:8080`
- Confirme que o CORS está habilitado no backend

### Dependências não instaladas
```bash
npm install
```

### Porta 5173 já em uso
O Vite irá sugerir automaticamente outra porta disponível.

## 📄 Licença

Este projeto faz parte do sistema SisReservas.


```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
