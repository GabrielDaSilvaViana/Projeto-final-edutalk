// Gerencia autenticação de usuários com persistência em localStorage
class AuthManager {
  constructor() {
    this.storageKey = 'edutalk_users'; // Chave para armazenar usuários
    this.currentUserKey = 'edutalk_current_user'; // Chave para usuário logado
    this.initializeStorage(); // Cria usuários padrão se não existirem
  }

  // Inicializa localStorage com um usuário padrão (admin)
  initializeStorage() {
    if (!localStorage.getItem(this.storageKey)) {
      // Usuários padrão para demonstração
      const defaultUsers = [
        { username: 'admin', email: 'admin@edutalk.com', senha: 'admin123', role: 'admin' }
      ];
      localStorage.setItem(this.storageKey, JSON.stringify(defaultUsers));
    }
  }

  // Registra um novo usuário com validações
  register(username, email, senha, confirmSenha, role = 'student') {
    // Valida se senhas conferem
    if (senha !== confirmSenha) {
      return { success: false, message: 'As senhas não conferem.' };
    }
    // Valida tamanho mínimo da senha
    if (senha.length < 6) {
      return { success: false, message: 'A senha deve ter pelo menos 6 caracteres.' };
    }

    // Carrega usuários existentes
    const users = JSON.parse(localStorage.getItem(this.storageKey)) || [];
    
    // Verifica se email ou username já existem
    if (users.some(u => u.email === email || u.username === username)) {
      return { success: false, message: 'Email ou usuário já existente.' };
    }

    // Cria novo usuário com timestamp
    const newUser = { username, email, senha, role, createdAt: new Date().toISOString() };
    users.push(newUser); // Adiciona à lista
    localStorage.setItem(this.storageKey, JSON.stringify(users)); // Salva no localStorage
    return { success: true, message: 'Registro concluído com sucesso!', user: newUser };
  }

  // Valida login e armazena usuário logado
  login(email, senha) {
    const users = JSON.parse(localStorage.getItem(this.storageKey)) || [];
    // Busca usuário por email ou username com senha correta
    const user = users.find(u => (u.email === email || u.username === email) && u.senha === senha);
    
    if (user) {
      // Se encontrou, salva o usuário logado no localStorage
      localStorage.setItem(this.currentUserKey, JSON.stringify({ username: user.username, email: user.email, role: user.role }));
      return { success: true, user };
    }
    return { success: false, message: 'Email/usuário ou senha inválidos.' };
  }

  // Remove dados do usuário logado (faz logout)
  logout() {
    localStorage.removeItem(this.currentUserKey);
  }

  // Retorna dados do usuário atualmente logado
  getCurrentUser() {
    const data = localStorage.getItem(this.currentUserKey);
    return data ? JSON.parse(data) : null;
  }

  // Verifica se há usuário logado
  isLoggedIn() {
    return this.getCurrentUser() !== null;
  }
}

// Instância global para usar em toda a aplicação
const authManager = new AuthManager();
