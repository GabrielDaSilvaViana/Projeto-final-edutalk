# Projeto-Edu_Talk

# 🎓 EduTalk - Platform de Comunicação Educacional

Uma plataforma web moderna para comunicação e colaboração entre educadores, alunos e administradores, com suporte a chat em tempo real, calendário de eventos, notas compartilhadas e gerenciamento de usuários.

---

## 📋 Sumário

1. [Visão Geral](#visão-geral)
2. [Arquitetura do Projeto](#arquitetura-do-projeto)
3. [Funcionalidades Principais](#funcionalidades-principais)
4. [Paleta de Cores](#paleta-de-cores)
5. [Páginas e Rotas](#páginas-e-rotas)
6. [Estrutura de Arquivos](#estrutura-de-arquivos)
7. [Sistema de Autenticação](#sistema-de-autenticação)
8. [Guia de Funcionalidades](#guia-de-funcionalidades)
9. [Tecnologias Utilizadas](#tecnologias-utilizadas)
10. [Como Usar](#como-usar)

---

## 👁️ Visão Geral

**EduTalk** é uma aplicação web responsiva desenvolvida em **HTML5, CSS3 e JavaScript vanilla** que oferece uma experiência integrada de comunicação educacional. A plataforma permite:

- ✅ Autenticação de usuários (alunos, professores e administradores)
- 💬 Chat em tempo real com suporte a múltiplos usuários e grupos
- 📅 Calendário com sistema de eventos
- 📝 Notas compartilhadas entre usuários
- 👥 Gerenciamento de contatos e grupos
- 🌐 Suporte a múltiplos idiomas (Português e Inglês)
- 🎨 Interface moderna com design responsivo

---

## 🏗️ Arquitetura do Projeto

### Arquitetura em Camadas

```
┌─────────────────────────────────┐
│      INTERFACE (HTML + CSS)     │ ← Camada de Apresentação
├─────────────────────────────────┤
│   LÓGICA (JavaScript / Classes) │ ← Camada de Negócio
├─────────────────────────────────┤
│    PERSISTÊNCIA (localStorage)  │ ← Camada de Dados
└─────────────────────────────────┘
```

### Layout Principal (Dashboard)

```
┌───────┬───────────────┬──────────────────┐
│       │               │                  │
│ SIDE  │  CONVERSA     │      CHAT        │
│ BAR   │  (Contatos)   │   (Mensagens)    │
│       │               │                  │
├───────┼───────────────┼──────────────────┤
│       │  CALENDÁRIO / NOTAS / ACTIVE      │
└───────┴───────────────┴──────────────────┘
```

---

## 🎯 Funcionalidades Principais

### 1. 🔐 Autenticação
- **Login**: Email e senha
- **Registro**: Três tipos de usuários (Aluno, Professor, Admin)
- **Recuperação de Senha**: Fluxo de redefinição de senha
- **Persistência**: Dados salvos em localStorage

**Tipos de Usuários:**
- 👨‍🎓 **Aluno** - Acesso limitado aos recursos
- 👨‍🏫 **Professor** - Acesso completo com gestão
- ⚙️ **Admin** - Controle total da plataforma

### 2. 💬 Sistema de Chat
- Chat um-para-um com contatos individuais
- Chat em grupo com múltiplos usuários
- Histórico de mensagens persistente
- Suporte a respostas automáticas por status
- Indicador de usuários online/offline
- Barra de pesquisa de contatos
- Contador de mensagens não lidas

**Status de Usuários:**
- 🟢 Online (ativo)
- 🟡 Away (ausente)
- 🔴 Offline (desconectado)

### 3. 📅 Calendário de Eventos
- Visualização mensal de eventos
- Criação e edição de eventos
- Persistência de eventos em localStorage
- Seleção de datas
- Exibição de eventos do dia
- Sistema de IDs únicos para cada evento

### 4. 📝 Painel de Notas
- Criação de notas rápidas
- Edição e exclusão de notas
- Tags para categorização
- Visualização em grid/lista
- Persistência de dados

### 5. 👤 Gerenciamento de Perfil
- Visualização e edição de dados pessoais
- Avatar do usuário
- Seleção de idioma (PT-BR / EN)
- Informações de contato
- Logout

### 6. 🌐 Painel Active
- Visualização de usuários ativos
- Filtro por status
- Busca de usuários
- Indicadores visuais de disponibilidade

### 7. 🌍 Internacionalização (i18n)
- Suporte a português brasileiro (PT-BR)
- Suporte a inglês (EN)
- Alternância de idioma em tempo real
- Armazenamento de preferência do usuário

---

## 🎨 Paleta de Cores

### Cores Principais

| Cor | Código HEX | Uso | Simbologia |
|-----|-----------|-----|-----------|
| **Azul Principal** | `#6B89FF` | Sidebar, mensagens recebidas | Confiança, Tecnologia, Estabilidade |
| **Azul Claro** | `#E4E9FF` | Fundo geral | Limpeza, Leveza |
| **Amarelo Ouro** | `#FFD465` | Painel de conversas, header | Otimismo, Atenção, Destaque |
| **Amarelo Escuro** | `#FBC848` | Item ativo no painel | Ação ativa, Seleção |
| **Branco** | `#FFFFFF` | Mensagens enviadas, texto claro | Pureza, Claridade |
| **Preto** | `#333333` | Botão enviar, texto principal | Elegância, Autoridade |
| **Cinza Secundário** | `#828282` | Texto secundário, metadados | Neutralidade |
| **Gradiente Login** | `#6db6f0` → `#a3d0ff` | Fundo da página de login | Fluxo, Movimento |

### Significado da Simbologia

- 🔵 **Azul**: Representa confiança e segurança. Usado no sidebar para criar estabilidade e profissionalismo.
- 🟡 **Amarelo/Ouro**: Chama atenção para a seção de conversas. Representa otimismo e comunicação ativa.
- ⚫ **Preto**: Usado em botões de ação para criar contraste e evidenciar chamadas à ação.
- ⚪ **Branco**: Mensagens do usuário se destacam do fundo azul das mensagens recebidas.

---

## 📄 Páginas e Rotas

### Página de Autenticação

| Página | Arquivo | Função |
|--------|---------|--------|
| **Login** | `index.html` | Página inicial - autenticação com email/senha |
| **Seleção de Tipo** | `selecao.html` | Escolha do tipo de usuário (Aluno/Prof/Admin) |
| **Registro** | `register.html` | Formulário de registro geral |
| **Registro Aluno** | `registerprof.html` | Dados específicos de aluno |
| **Registro Professor** | `registerprof.html` | Dados específicos de professor |
| **Registro Admin** | `registeradm.html` | Dados específicos de administrador |
| **Recuperar Senha** | `recuperarsenha.html` | Reset de senha via email |

### Páginas da Aplicação

| Página | Arquivo | Função |
|--------|---------|--------|
| **Dashboard** | `dashboard.html` | Página principal com chat, calendário e notas |
| **Calendário** | `calendario.html` | Visualização dedicada do calendário |
| **Notas** | `notes.html` | Painel de notas compartilhadas |
| **Contatos** | (integrado) | Gerenciamento de contatos no dashboard |
| **Teste** | `test.html` | Página de teste/desenvolvimento |

---

## 📁 Estrutura de Arquivos

```
edutalk2-main/
│
├── 📄 index.html                    ← Página de Login
├── 📄 selecao.html                  ← Seleção de tipo de usuário
├── 📄 register.html                 ← Registro genérico
├── 📄 registerprof.html             ← Registro de professor
├── 📄 registeradm.html              ← Registro de administrador
├── 📄 recuperarsenha.html           ← Recuperação de senha
├── 📄 dashboard.html                ← Dashboard principal
├── 📄 calendario.html               ← Calendário
├── 📄 notes.html                    ← Notas
├── 📄 test.html                     ← Página de testes
├── 📄 GUIA_TESTES.html              ← Guia de testes
├── 📄 COMENTARIOS_ADICIONADOS.md    ← Documentação de comentários
│
├── 📁 CSS/
│   ├── style.css                    ← Estilos do login
│   ├── dashboard.css                ← Estilos do dashboard (1147 linhas)
│   ├── register.css                 ← Estilos do registro
│   ├── recuperarsenha.css           ← Estilos da recuperação
│   ├── selecao.css                  ← Estilos da seleção
│   └── notes.css                    ← Estilos das notas
│
├── 📁 JS/
│   ├── auth.js                      ← Sistema de autenticação
│   ├── dashboard.js                 ← Lógica principal (909 linhas)
│   ├── user-manager.js              ← Gerenciador de usuários
│   ├── calendar-events.js           ← Sistema de eventos
│   ├── i18n.js                      ← Sistema de internacionalização
│   ├── contatos.js                  ← Gerenciamento de contatos
│   ├── calendario.js                ← Lógica do calendário
│   └── recuperarsenha.js            ← Lógica de recuperação
│
└── 📁 assets/
    └── logo.png                     ← Logo da aplicação
```

---

## 🔐 Sistema de Autenticação

### Fluxo de Autenticação

```
┌─────────────┐
│   LOGIN     │ ← Email + Senha
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│ Validação de Dados  │
└──────┬──────────────┘
       │
       ▼
┌──────────────────────────┐
│ Busca no localStorage    │
│ (edutalk_users)          │
└──────┬───────────────────┘
       │
       ├─ SIM ─► Redireciona para dashboard.html
       │
       └─ NÃO ─► Mensagem de erro
```

### Registro de Novo Usuário

```
┌──────────────────┐
│ SELEÇÃO DE TIPO  │ ← Aluno / Professor / Admin
└────────┬─────────┘
         │
         ▼
┌──────────────────────┐
│ FORMULÁRIO ESPECÍFICO│
└────────┬─────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Validação de Dados           │
│ - Email único                │
│ - Senhas coincidentes        │
│ - Campos obrigatórios        │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Armazenamento em localStorage│
│ (edutalk_users)              │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────┐
│ Redirecionamento     │
│ para Login           │
└──────────────────────┘
```

### Persistência de Dados

| Chave localStorage | Conteúdo | Formato |
|------------------|----------|---------|
| `edutalk_users` | Usuários cadastrados | JSON Array |
| `edutalk_currentUser` | Usuário logado | JSON Object |
| `edutalk_events` | Eventos do calendário | JSON Object |
| `edutalk_language` | Idioma do usuário | String (pt/en) |
| `edutalk_notes` | Notas compartilhadas | JSON Array |

---

## 📚 Guia de Funcionalidades

### 1. Chat (HOME)

**Componentes:**
- **Sidebar**: Menu de navegação (Home, Active, Nova Reunião, Configurações)
- **Painel de Conversas**: Lista de contatos individuais e grupos
- **Área de Chat**: Mensagens com sender/receiver, timestamps
- **Input de Mensagem**: Campo de texto com botão enviar

**Fluxo de Uso:**
1. Clique em um contato na lista
2. A área de chat carrega o histórico
3. Digite sua mensagem
4. Clique em enviar ou pressione Enter
5. Mensagem aparece com background branco
6. Mensagens recebidas aparecem com background azul

**Estados:**
- 🟢 Usuário online (ícone verde)
- 🟡 Usuário away (ícone amarelo)
- 🔴 Usuário offline (ícone vermelho)

### 2. Calendário

**Componentes:**
- Navegação de meses (anterior/próximo)
- Grid de dias
- Destaque do dia atual
- Dia selecionado em amarelo
- Lista de eventos do dia

**Como Usar:**
1. Navegue para o mês desejado
2. Clique em um dia
3. Se houver eventos, eles aparecem listados
4. Clique em "Novo Evento" para criar
5. Preencha data, hora, título e descrição
6. Clique em "Salvar Evento"

**Dados Salvos:**
- Data: YYYY-MM-DD
- Hora: HH:MM
- ID único para cada evento
- Título e descrição

### 3. Painel de Notas

**Componentes:**
- Grid de notas coloridas
- Campo de entrada para notas rápidas
- Tags para categorização
- Botões de editar/deletar

**Como Usar:**
1. Digite o texto da nota
2. Selecione uma cor/tag (opcional)
3. Clique em adicionar
4. Nota aparece no grid
5. Clique nos botões para editar ou deletar

### 4. Active (Usuários Ativos)

**Componentes:**
- Lista de usuários online
- Status visual (ícones coloridos)
- Grupos de usuários
- Campo de busca
- Respostas automáticas por status

**Informações por Usuário:**
- Nome
- Foto/Avatar
- Status atual
- Última atualização

### 5. Perfil

**Componentes:**
- Informações do usuário
- Avatar
- Email
- Tipo de usuário
- Data de cadastro
- Seletor de idioma

**Ações:**
- Editar informações
- Alterar foto de perfil
- Mudar idioma
- Logout

---

## 🛠️ Tecnologias Utilizadas

### Frontend

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| **HTML5** | 5 | Estrutura das páginas |
| **CSS3** | 3 | Estilos e layout responsivo |
| **JavaScript** | ES6+ | Lógica da aplicação |
| **Google Fonts** | - | Tipografia (Roboto, Poppins) |
| **Material Icons** | - | Ícones da interface |

### Armazenamento

| Tecnologia | Uso |
|-----------|-----|
| **localStorage** | Persistência de dados do cliente |
| **sessionStorage** | Dados temporários (se aplicável) |

### Padrões e Estruturas

| Padrão | Uso |
|--------|-----|
| **Classes ES6** | Organização de código (AuthManager, UserManager, etc.) |
| **LocalStorage API** | Persistência de dados |
| **DOM API** | Manipulação do HTML |
| **Event Listeners** | Interatividade |
| **Fetch API** | Comunicação (quando aplicável) |

---

## 💻 Como Usar

### 1. Primeira Execução

#### Passo 1: Abrir a Aplicação
```bash
# Abra o arquivo index.html em um navegador moderno
# Chrome, Firefox, Safari ou Edge (versão recente)
```

#### Passo 2: Criar uma Conta
1. Clique em **"Ou cadastre-se"**
2. Selecione seu tipo de usuário (Aluno/Professor/Admin)
3. Preencha o formulário com seus dados:
   - **Nome de Usuário**: seu_usuario
   - **Email**: seu_email@exemplo.com
   - **RA**: 2024001 (para alunos)
   - **Senha**: mínimo 6 caracteres
4. Clique em **"Continuar"**
5. Você será redirecionado para o login
6. Faça login com suas credenciais

#### Passo 3: Navegar pelo Dashboard
Após login, você verá:
- **Sidebar esquerda** (azul): Menu de navegação
- **Painel central** (amarelo): Contatos
- **Área direita**: Chat, calendário ou notas

### 2. Operações Principais

#### Enviar Mensagem
```
1. Clique em um contato na lista
2. Painel de chat é carregado
3. Digite sua mensagem no campo inferior
4. Pressione Enter ou clique no botão enviar
5. Mensagem aparece imediatamente
```

#### Criar Evento no Calendário
```
1. Navegue até a seção de calendário
2. Clique em um dia
3. Clique em "Novo Evento"
4. Preencha:
   - Data (preenchida automaticamente)
   - Hora
   - Título do evento
   - Descrição
5. Clique em "Salvar Evento"
6. Evento aparece no calendário
```

#### Criar Uma Nota
```
1. Vá para a seção de Notas
2. Digite o conteúdo da nota
3. Selecione uma cor (opcional)
4. Clique em "Adicionar Nota"
5. Nota aparece no grid
```

#### Trocar Idioma
```
1. Clique no menu de perfil (canto superior direito)
2. Selecione "Idioma"
3. Escolha PT-BR ou EN
4. Interface atualiza imediatamente
```

### 3. Guia de Teste

**Usuários de Teste Disponíveis:**

```javascript
// Aluno
Email: aluno@teste.com
Senha: 123456

// Professor
Email: professor@teste.com
Senha: 123456

// Admin
Email: admin@teste.com
Senha: 123456
```

**Contatos de Teste:**
- Maria Silva (online)
- João Santos (away)
- Grupo Turma A (grupo)
- Grupo Professores (grupo)

---

## 🎨 Guia de Estilo

### Tipografia

```css
/* Fonte Principal */
font-family: 'Poppins', sans-serif;

/* Pesos Utilizados */
font-weight: 400; /* Regular */
font-weight: 500; /* Medium */
font-weight: 600; /* Semibold */
font-weight: 700; /* Bold */

/* Tamanhos */
Títulos: 1.2rem - 2rem
Texto corpo: 0.875rem - 1rem
Pequeno: 0.75rem
```

### Espaçamento

```css
/* Espaçamento padrão */
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px

/* Padding e margin */
Componentes: 16px (md)
Seções: 24px (lg)
```

### Efeitos Visuais

```css
/* Sombras */
Suave: 0 2px 4px rgba(0,0,0,0.1)
Média: 0 6px 15px rgba(0,0,0,0.15)
Forte: 0 10px 30px rgba(0,0,0,0.2)

/* Bordas Arredondadas */
Pequenas: 4px - 8px
Médias: 10px - 16px
Grandes: 20px+
```

---

## 📊 Diagrama de Estados

### Estado do Chat
```
┌─────────────┐
│    INICIAL  │ ← Nenhum contato selecionado
└──────┬──────┘
       │
       ▼
┌──────────────────┐
│ SELECIONADO      │ ← Contato selecionado, histórico carregado
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ AGUARDANDO       │ ← Usuário digitando mensagem
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ ENVIANDO         │ ← Mensagem em processamento
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ ENTREGUE        │ ← Mensagem visível para ambos
└──────────────────┘
```

---

## 🐛 Solução de Problemas

### Problema: Dados não persistem após fechar o navegador
**Solução**: Verifique se o localStorage está habilitado nas configurações do navegador.

### Problema: Idioma não muda
**Solução**: Limpe o cache do navegador e localStorage, então recarregue a página.

### Problema: Chat não carrega mensagens
**Solução**: Verifique a disponibilidade do localStorage com pelo menos 5MB de espaço.

### Problema: Evento não aparece no calendário
**Solução**: Certifique-se de que a data está correta e o evento foi salvo.

---

## 📞 Suporte

Para reportar bugs ou solicitar novas funcionalidades, consulte a documentação incluída em:
- `COMENTARIOS_ADICIONADOS.md` - Documentação do código
- `GUIA_TESTES.html` - Guia de testes

---

## 📝 Notas de Desenvolvimento

### Próximas Funcionalidades Sugeridas

- [ ] Integração com backend (Node.js/Express)
- [ ] Autenticação com OAuth (Google, GitHub)
- [ ] Compartilhamento de arquivos
- [ ] Videochamadas (WebRTC)
- [ ] Notificações em tempo real (WebSocket)
- [ ] Backup automático em nuvem
- [ ] Modo escuro

### Melhorias de Performance

- [ ] Implementar service workers para offline-first
- [ ] Minificar CSS e JavaScript
- [ ] Lazy loading de imagens
- [ ] Compressão de dados

---

## 📄 Licença

Este projeto é desenvolvido como proposta educacional. Todos os direitos são reservados.

---

## ✨ Créditos

Desenvolvido como plataforma de comunicação educacional para integração de múltiplos usuários com suporte a chat, calendário e notas compartilhadas.

**Última Atualização**: Dezembro 2025

---

**EduTalk - Conectando educadores e alunos através da comunicação clara e eficiente.**
