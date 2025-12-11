// Sistema de internacionalização (PT/EN) - Gerencia traduções entre idiomas
class I18n {
  constructor() {
    // Chave para salvar idioma no localStorage
    this.langKey = 'edutalk_language';
    // Carrega idioma salvo ou usa Português como padrão
    this.currentLang = localStorage.getItem(this.langKey) || 'pt';
    // Objeto com todas as traduções PT e EN
    this.translations = {
      pt: {
        // Textos de Login / Página Inicial
        'login_title': 'Faça seu Login',
        'email': 'Email',
        'password': 'Senha',
        'forgot_password': 'Esqueceu sua senha?',
        'continue': 'Continuar',
        'continue_google': 'Continuar com o Google',
        'register': 'Ou cadastre-se',
        'participate': 'PARTICIPE AGORA<br>DESSA EXPERIÊNCIA',
        'direct_contact': 'Contato direto com auxiliadores, organização de provas e tarefas, agilidade e muito mais!',

        // Textos de Seleção de Papel
        'what_role': 'QUAL A SUA COLOCAÇÃO?',
        'student': 'ALUNO',
        'professor': 'PROFESSOR',
        'director': 'DIRETOR',
        'coordinator': 'COORDENADOR',
        'connecting': 'Conectando<br>ideias, construindo<br>futuros.',
        'transform_journey': 'Aqui você pode transformar sua jornada',

        // Textos de Registro
        'register_title': 'REGISTRE-SE',
        'username': 'Nome de usuário',
        'ra': 'RA',
        'nif': 'NIF',
        'confirm_password': 'Confirmar senha',
        'join_community': 'FAÇA PARTE<br>DA NOSSA<br>COMUNIDADE',

        // Textos do Dashboard
        'home': 'Início',
        'active': 'Ativos',
        'new_meeting': 'Nova Reunião',
        'calendar': 'Calendário',
        'notes': 'Anotações',
        'more': 'Mais',
        'search_people': 'Procurar Pessoas',
        'group': '#Grupo',
        'chat': '#Chat',
        'profile': 'Perfil',
        'edit_profile': 'Editar Perfil',
        'settings': 'Configurações',
        'edit_name': 'Nome:',
        'edit_avatar': 'URL do Avatar:',
        'save_changes': 'Salvar Alterações',
        'theme': 'Tema:',
        'light': 'Claro',
        'dark': 'Escuro',
        'language': 'Idioma:',
        'portuguese': 'Português',
        'english': 'Inglês',
        'save_settings': 'Salvar Configurações',
        'active_users': 'Usuários Ativos',
        'online': 'Online',
        'away': 'Ausente',
        'notes_title': 'Anotações',
        'type_notes': 'Digite suas anotações aqui...',
        'save': 'Salvar',
        'logout': 'Sair',
        'type_message': 'Digite uma mensagem...',
        'you': '(Você)',
        'yesterday': 'Ontem',
        'today': 'Hoje',
        'monday': 'Segunda',
        'tuesday': 'Terça',
        'wednesday': 'Quarta',
        'thursday': 'Quinta',
        'friday': 'Sexta',
        'saturday': 'Sábado',
        'sunday': 'Domingo',
        'back_to_home': 'Voltar para Inicial',

        // Textos de Recuperação de Senha
        'recover_password': 'Recuperar Senha',
        'type_email': 'Digite seu email',
        'send': 'Enviar',
        'back_login': 'Voltar ao login',
        'forgot_title': 'ESQUECEU SUA SENHA?',
        'forgot_desc': 'Digite seu email e enviaremos instruções<br>para redefinir sua senha.'
      },
      en: {
        // English Login / Index texts
        'login_title': 'Sign In',
        'email': 'Email',
        'password': 'Password',
        'forgot_password': 'Forgot your password?',
        'continue': 'Continue',
        'continue_google': 'Continue with Google',
        'register': 'Or register',
        'participate': 'JOIN THIS<br>EXPERIENCE NOW',
        'direct_contact': 'Direct contact with helpers, organization of tests and tasks, agility and much more!',

        // English role selection texts
        'what_role': 'WHAT IS YOUR ROLE?',
        'student': 'STUDENT',
        'professor': 'PROFESSOR',
        'director': 'DIRECTOR',
        'coordinator': 'COORDINATOR',
        'connecting': 'Connecting<br>ideas, building<br>futures.',
        'transform_journey': 'Here you can transform your journey',

        // English register texts
        'register_title': 'REGISTER',
        'username': 'Username',
        'ra': 'RA',
        'nif': 'NIF',
        'confirm_password': 'Confirm password',
        'join_community': 'JOIN OUR<br>COMMUNITY',

        // English dashboard texts
        'home': 'Home',
        'active': 'Active',
        'new_meeting': 'New Meeting',
        'calendar': 'Calendar',
        'notes': 'Notes',
        'more': 'More',
        'search_people': 'Search People',
        'group': '#Group',
        'chat': '#Chat',
        'profile': 'Profile',
        'edit_profile': 'Edit Profile',
        'settings': 'Settings',
        'edit_name': 'Name:',
        'edit_avatar': 'Avatar URL:',
        'save_changes': 'Save Changes',
        'theme': 'Theme:',
        'light': 'Light',
        'dark': 'Dark',
        'language': 'Language:',
        'portuguese': 'Portuguese',
        'english': 'English',
        'save_settings': 'Save Settings',
        'active_users': 'Active Users',
        'online': 'Online',
        'away': 'Away',
        'notes_title': 'Notes',
        'type_notes': 'Type your notes here...',
        'save': 'Save',
        'logout': 'Logout',
        'type_message': 'Type a message...',
        'you': '(You)',
        'yesterday': 'Yesterday',
        'today': 'Today',
        'monday': 'Monday',
        'tuesday': 'Tuesday',
        'wednesday': 'Wednesday',
        'thursday': 'Thursday',
        'friday': 'Friday',
        'saturday': 'Saturday',
        'sunday': 'Sunday',
        'back_to_home': 'Back to Home',

        // English password recovery texts
        'recover_password': 'Recover Password',
        'type_email': 'Type your email',
        'send': 'Send',
        'back_login': 'Back to login',
        'forgot_title': 'FORGOT YOUR PASSWORD?',
        'forgot_desc': 'Type your email and we will send<br>instructions to reset your password.'
      }
    };
  }

  // Retorna tradução pela chave - se não encontrar, volta pro PT
  t(key) {
    return this.translations[this.currentLang][key] || this.translations.pt[key] || key;
  }

  // Altera idioma atual e salva no localStorage
  setLanguage(lang) {
    if (this.translations[lang]) {
      this.currentLang = lang;
      localStorage.setItem(this.langKey, lang);
      return true;
    }
    return false;
  }

  // Retorna o idioma atual
  getLanguage() {
    return this.currentLang;
  }
}

// Cria instância global do i18n
const i18n = new I18n();

// Atualiza todos os textos da página com base no idioma selecionado
function updatePageLanguage() {
  // Percorre todos elementos com atributo data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n'); // Pega a chave de tradução
    const translation = i18n.t(key); // Busca a tradução
    
    // Aplica tradução baseada no tipo de elemento
    if (el.tagName === 'INPUT') {
      if (el.type === 'text' || el.type === 'email' || el.type === 'password') {
        el.placeholder = translation; // Inputs: coloca no placeholder
      } else {
        el.value = translation; // Botões de input: coloca no value
      }
    } else if (el.tagName === 'TEXTAREA') {
      el.placeholder = translation; // Textarea: coloca no placeholder
    } else if (el.tagName === 'BUTTON') {
      el.textContent = translation; // Botões: coloca no texto
    } else if (el.tagName === 'OPTION') {
      el.textContent = translation; // Options: coloca no texto
    } else if (el.tagName === 'LABEL') {
      el.textContent = translation; // Labels: coloca no texto
    } else {
      el.innerHTML = translation; // Outros: coloca no HTML
    }
  });
}
