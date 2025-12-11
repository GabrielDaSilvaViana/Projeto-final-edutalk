// Gerencia usuários, grupos e respostas automáticas
class UserManager {
  constructor() {
    // Array com 3 usuários individuais e 2 grupos
    this.users = [
      {
        id: 1,
        name: 'Maria Silva',
        avatar: 'https://i.pravatar.cc/40?u=active1',
        status: 'online', // Online = disponível
        isGroup: false,
        group: '#Chat'
      },
      {
        id: 2,
        name: 'Pedro Souza',
        avatar: 'https://i.pravatar.cc/40?u=active2',
        status: 'away', // Away = ausente
        isGroup: false,
        group: '#Chat'
      },
      {
        id: 3,
        name: 'Ana Costa',
        avatar: 'https://i.pravatar.cc/40?u=active3',
        status: 'online',
        isGroup: false,
        group: '#Chat'
      },
      {
        id: 4,
        name: 'Group 1',
        avatar: 'https://i.pravatar.cc/40?u=group1',
        status: 'online',
        isGroup: true, // É um grupo
        group: '#Group',
        members: ['Maria Silva', 'Pedro Souza'] // Membros do grupo
      },
      {
        id: 5,
        name: 'Group 2',
        avatar: 'https://i.pravatar.cc/40?u=group2',
        status: 'online',
        isGroup: true,
        group: '#Group',
        members: ['Ana Costa']
      }
    ];

    // Respostas automáticas para usuários individuais (varia por status)
    this.autoResponses = {
      'online': [
        'Olá! Tudo bem? Como posso ajudar?',
        'Oi! Que legal receber sua mensagem!',
        'Opa! Estou aqui! 👋',
        'E aí? Tudo certo?',
        'Olá! Pode falar, estou te ouvindo!'
      ],
      'away': [
        'Estou ausente no momento, mas voltarei em breve!',
        'Saí do momento, deixa uma mensagem que respondo depois!',
        'Não estou disponível agora, volto logo!'
      ],
      'offline': [
        'Estou offline no momento, tente mais tarde!'
      ]
    };

    // Respostas automáticas específicas para cada grupo
    this.groupAutoResponses = {
      'Group 1': [
        'Olá! Somos a equipe de Grupo 1, como podemos ajudar?',
        'Oi! Recebemos sua mensagem e estamos aqui para ajudar!',
        'Grupo 1 ativo! O que você precisa?',
        'Estamos aqui para suportar você! 👋',
        'Opa! Recebemos, vamos analisar e retornar!'
      ],
      'Group 2': [
        'Olá! Aqui é o Grupo 2, tudo bem?',
        'Oi! Recebemos sua mensagem!',
        'Grupo 2 disponível para ajudar!',
        'Vamos ajudar você com isso!',
        'Aqui estamos, prontos para colaborar! 👋'
      ]
    };
  }

  // Retorna todos os usuários
  getUsers() {
    return this.users;
  }

  // Filtra usuários de um grupo específico
  getUsersForGroup(groupName) {
    return this.users.filter(u => u.group === groupName);
  }

  // Retorna apenas usuários individuais (sem grupos)
  getActiveUsers() {
    return this.users.filter(u => !u.isGroup);
  }

  // Retorna apenas os grupos
  getGroups() {
    return this.users.filter(u => u.isGroup);
  }

  // Retorna resposta aleatória baseada no status do usuário
  getAutoResponse(status) {
    const responses = this.autoResponses[status] || this.autoResponses['online'];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Retorna resposta aleatória específica do grupo
  getGroupAutoResponse(groupName) {
    const responses = this.groupAutoResponses[groupName];
    if (responses) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
    // Se grupo não existir, retorna resposta genérica
    return 'Olá! Como posso ajudar?';
  }

  // Altera o status de um usuário (online, away, offline)
  updateUserStatus(userId, newStatus) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.status = newStatus;
    }
  }
}

// Instância global para usar em toda a aplicação
const userManager = new UserManager();
