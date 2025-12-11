document.addEventListener('DOMContentLoaded', () => {
  // ============================================
  // 1. VERIFICAÇÃO DE AUTENTICAÇÃO
  // ============================================
  // Se não está logado, redireciona para login
  if (!authManager.isLoggedIn()) {
    window.location.href = 'index.html';
    return;
  }

  // Pega dados do usuário logado
  const user = authManager.getCurrentUser();
  const userProfileName = document.querySelector('.user-profile strong');
  if (userProfileName) {
    userProfileName.textContent = user.username || 'User';
  }
  
  // Carrega nome e avatar salvos do perfil do localStorage
  const savedProfileName = localStorage.getItem('user_profile_name');
  const savedProfileAvatar = localStorage.getItem('user_profile_avatar');
  
  // Atualiza nome do perfil se foi editado antes
  if (savedProfileName) {
    userProfileName.textContent = savedProfileName;
  }
  
  // Atualiza avatar do perfil se foi editado antes
  if (savedProfileAvatar) {
    const userProfileImg = document.querySelector('.user-profile img');
    if (userProfileImg) {
      userProfileImg.src = savedProfileAvatar;
    }
  }

  // Atualiza idioma da página ao carregar
  updatePageLanguage();

  // ============================================
  // 2. SELEÇÃO DE ELEMENTOS
  // ============================================
  // Elementos da navegação
  const navItems = document.querySelectorAll('.nav-item');
  // Elementos de contatos/conversas
  const contactItems = document.querySelectorAll('.contact-item');
  // Elementos do chat
  const chatName = document.getElementById('chat-name');
  const chatAvatar = document.getElementById('chat-avatar');
  const messageArea = document.querySelector('.message-area');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');

  // Elementos do Calendário
  const calendarioBtn = document.getElementById('calendario-btn');
  const calendarioPopup = document.getElementById('calendario-popup');
  const monthYearEl = document.getElementById('month-year');
  const prevMonthBtn = document.getElementById('prev-month-btn');
  const nextMonthBtn = document.getElementById('next-month-btn');
  const calendarioDaysGrid = document.getElementById('calendario-days-grid');
  const eventCreationSection = document.getElementById('event-creation-section');
  const eventsListSection = document.getElementById('events-list-section');
  const selectedDateDisplay = document.getElementById('selected-date-display');
  const eventTime = document.getElementById('event-time');
  const eventDescription = document.getElementById('event-description');
  const addEventBtn = document.getElementById('add-event-btn');
  const cancelEventBtn = document.getElementById('cancel-event-btn');
  const eventsList = document.getElementById('events-list');

  // Elementos do Pop-up Active
  const activeBtn = document.getElementById('active-btn');
  const activePopup = document.getElementById('active-popup');
  const closeActiveBtn = document.getElementById('close-active-btn');
  const activeListContainer = document.getElementById('active-list-container');

  // Elementos de Anotações
  const notesPanel = document.getElementById('notes-panel');
  const closeNotesBtn = document.getElementById('close-notes-btn');
  const notesTextarea = document.getElementById('notes-textarea');
  const saveNotesBtn = document.getElementById('save-notes-btn');

  // Elementos de Perfil
  const profilePopup = document.getElementById('profile-popup');
  const editProfilePopup = document.getElementById('edit-profile-popup');
  const closeProfileBtn = document.getElementById('close-profile-btn');
  const closeEditProfileBtn = document.getElementById('close-edit-profile-btn');
  const editProfileBtn = document.getElementById('edit-profile-btn');
  const saveEditProfileBtn = document.getElementById('save-edit-profile-btn');

  // Elementos do More (Configurações)
  const moreBtn = document.getElementById('more-btn');
  const morePopup = document.getElementById('more-popup');
  const closeMoreBtn = document.getElementById('close-more-btn');
  const saveMoreSettingsBtn = document.getElementById('save-more-settings-btn');
  const logoutBtnMore = document.getElementById('logout-btn-more');

  // Elementos de Upload (Fotos, vídeos, arquivos)
  const attachBtn = document.getElementById('attach-btn');
  const photoBtn = document.getElementById('photo-btn');
  const videoBtn = document.getElementById('video-btn');
  const photoInput = document.getElementById('photo-input');
  const videoInput = document.getElementById('video-input');
  const fileInput = document.getElementById('file-input');

  // Armazena qual usuário está em conversa
  let currentChatUser = null;

  // ============================================
  // 3. FUNCIONALIDADE DE SELEÇÃO DE CONTATOS (HOME)
  // ============================================
  // Adiciona listener de clique em cada contato
  const addContactClickListeners = () => {
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
      item.addEventListener('click', () => {
        // Remove active de todos os items
        contactItems.forEach(c => c.classList.remove('active'));
        // Marca este item como ativo
        item.classList.add('active');
        
        // Pega nome e avatar do contato
        const name = item.getAttribute('data-name');
        const avatar = item.getAttribute('data-avatar');
        
        // Atualiza header do chat com dados do contato
        chatName.textContent = name;
        chatAvatar.src = avatar;
        
        // Encontra o usuário na lista global
        const allUsers = userManager.getUsers();
        currentChatUser = allUsers.find(u => u.name === name);
        
        // Se não encontrou nos usuários registrados, cria um temporário
        if (!currentChatUser) {
          currentChatUser = {
            id: Date.now(),
            name: name,
            avatar: avatar,
            status: 'online',
            isGroup: name.includes('Group')
          };
        }
        
        // Limpa chat anterior e mostra mensagem de boas-vindas
        messageArea.innerHTML = `
          <div class="message-date-divider"><span>${new Date().toLocaleDateString('pt-BR')}</span></div>
          <div class="message received">
            <div class="message-bubble">Olá! Como posso ajudar você?</div>
            <div class="message-time">${new Date().toLocaleTimeString()}</div>
          </div>
        `;
        messageArea.scrollTop = messageArea.scrollHeight;
      });
    });
  };

  // Inicializa listeners de contatos
  addContactClickListeners();

  // ============================================
  // 4. FUNÇÕES AUXILIARES
  // ============================================
  
  // Mostra popup passado como parâmetro
  function showPopup(popup) {
    if (popup) popup.style.display = 'block';
  }

  // Esconde popup passado como parâmetro
  function hidePopup(popup) {
    if (popup) popup.style.display = 'none';
  }

  // Fecha todos os popups abertos
  function closeAllPopups() {
    hidePopup(profilePopup);
    hidePopup(editProfilePopup);
    hidePopup(morePopup);
    if (calendarioPopup) calendarioPopup.classList.remove('show');
    if (activePopup) activePopup.classList.remove('show');
    hidePopup(notesPanel);
  }

  // Mostra mensagem temporária no topo da tela
  const showTemporaryMessage = (message) => {
    const tempDiv = document.createElement('div');
    tempDiv.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #333;
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
      z-index: 2000;
      opacity: 0.9;
      font-size: 0.9rem;
      transition: opacity 0.5s ease-in-out;
    `;
    tempDiv.textContent = message;
    document.body.appendChild(tempDiv);

    // Remove após 2 segundos com animação de fade
    setTimeout(() => {
      tempDiv.style.opacity = '0';
      setTimeout(() => tempDiv.remove(), 500);
    }, 2000);
  };

  // ============================================
  // 4. LÓGICA DE CALENDÁRIO COM EVENTOS
  // ============================================
  // Data atual sendo exibida no calendário
  let currentDate = new Date();
  // Data selecionada pelo usuário
  let selectedDate = null;

  // Renderiza o calendário para o mês/ano atual
  const renderCalendario = () => {
    const month = currentDate.getMonth(); // Pega mês (0-11)
    const year = currentDate.getFullYear(); // Pega ano

    // Mostra mês e ano no header
    monthYearEl.textContent = new Intl.DateTimeFormat('pt-BR', { 
      month: 'long', 
      year: 'numeric' 
    }).format(currentDate);
    
    // Limpa dias anteriores
    calendarioDaysGrid.innerHTML = '';

    // Calcula primeiro dia do mês e total de dias
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    const lastDateOfPrevMonth = new Date(year, month, 0).getDate();

    // Mostra dias do mês anterior em cinza
    for (let i = firstDayOfMonth; i > 0; i--) {
      const dayEl = document.createElement('div');
      dayEl.classList.add('day', 'other-month');
      dayEl.textContent = lastDateOfPrevMonth - i + 1;
      calendarioDaysGrid.appendChild(dayEl);
    }

    // Mostra dias do mês atual
    for (let i = 1; i <= lastDateOfMonth; i++) {
      const dayEl = document.createElement('div');
      dayEl.classList.add('day');
      dayEl.textContent = i;

      // Marca hoje em destaque
      const today = new Date();
      if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
        dayEl.classList.add('current-day');
      }

      // Marca dias com eventos
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      if (calendarEvents.getEventsForDate(dateStr).length > 0) {
        dayEl.classList.add('has-events');
      }

      // Clique seleciona o dia
      dayEl.addEventListener('click', () => {
        selectedDate = dateStr;
        selectDay(dayEl, dateStr);
      });

      calendarioDaysGrid.appendChild(dayEl);
    }
  };

  // Marca um dia como selecionado
  const selectDay = (dayEl, dateStr) => {
    const selected = document.querySelector('.selected-day');
    if (selected) selected.classList.remove('selected-day'); // Remove seleção anterior
    dayEl.classList.add('selected-day'); // Marca novo dia
    
    showEventsOrCreateForm(dateStr); // Mostra eventos ou form para criar
  };

  // Mostra lista de eventos ou formulário para criar novo
  const showEventsOrCreateForm = (dateStr) => {
    const eventsForDay = calendarEvents.getEventsForDate(dateStr);
    
    if (eventsForDay.length > 0) {
      // Se tem eventos, mostra lista
      eventCreationSection.style.display = 'none';
      eventsListSection.style.display = 'block';
      selectedDateDisplay.textContent = `Eventos de ${formatDate(dateStr)}`;
      renderEventsList(eventsForDay, dateStr);
    } else {
      // Se não tem eventos, mostra formulário de criar
      eventsListSection.style.display = 'none';
      eventCreationSection.style.display = 'block';
      selectedDateDisplay.textContent = `Adicionar evento em ${formatDate(dateStr)}`;
      eventTime.value = '';
      eventDescription.value = '';
      eventTime.focus();
    }
  };

  // Formata data de string (YYYY-MM-DD) para legível em português
  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    const date = new Date(year, month - 1, day);
    return new Intl.DateTimeFormat('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  // Renderiza lista de eventos de um dia
  const renderEventsList = (events, dateStr) => {
    eventsList.innerHTML = '';
    // Mostra cada evento com opção de deletar
    events.forEach(event => {
      const eventEl = document.createElement('div');
      eventEl.className = 'event-item';
      eventEl.innerHTML = `
        <div class="event-time">${event.time}</div>
        <div class="event-desc">${event.description}</div>
        <button class="event-delete-btn" data-id="${event.id}">✕</button>
      `;
      eventsList.appendChild(eventEl);

      // Listener para deletar evento
      eventEl.querySelector('.event-delete-btn').addEventListener('click', () => {
        calendarEvents.removeEvent(dateStr, event.id); // Remove do calendario
        updateNotesWithEvents(); // Atualiza notas
        renderCalendario(); // Recarrega calendario
        showEventsOrCreateForm(dateStr); // Atualiza view
        showTemporaryMessage('Evento removido');
      });
    });

    // Botão para adicionar mais um evento
    const addMoreBtn = document.createElement('button');
    addMoreBtn.className = 'event-add-more-btn';
    addMoreBtn.textContent = '+ Adicionar Evento';
    addMoreBtn.addEventListener('click', () => {
      eventsListSection.style.display = 'none';
      eventCreationSection.style.display = 'block';
      eventTime.value = '';
      eventDescription.value = '';
      eventTime.focus();
    });
    eventsList.appendChild(addMoreBtn);
  };

  // Botão para ir ao mês anterior
  if (prevMonthBtn) {
    prevMonthBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendario();
    });
  }

  // Botão para ir ao próximo mês
  if (nextMonthBtn) {
    nextMonthBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendario();
    });
  }

  // Botão para adicionar evento
  if (addEventBtn) {
    addEventBtn.addEventListener('click', () => {
      if (!selectedDate) return;
      const time = eventTime.value;
      const description = eventDescription.value.trim();

      // Valida preenchimento
      if (!time || !description) {
        showTemporaryMessage('Preencha horário e descrição');
        return;
      }

      // Adiciona evento e atualiza tudo
      calendarEvents.addEvent(selectedDate, time, description);
      updateNotesWithEvents();
      renderCalendario();
      showEventsOrCreateForm(selectedDate);
      showTemporaryMessage('Evento adicionado com sucesso!');
    });
  }

  // Botão para cancelar criação de evento
  if (cancelEventBtn) {
    cancelEventBtn.addEventListener('click', () => {
      eventCreationSection.style.display = 'none';
      showEventsOrCreateForm(selectedDate);
    });
  }

  // Renderiza calendário ao carregar
  renderCalendario();

  // ============================================
  // 6. ATUALIZAR ANOTAÇÕES COM EVENTOS
  // ============================================
  // Sincroniza eventos do calendário com o painel de notas
  const updateNotesWithEvents = () => {
    const allEvents = calendarEvents.getAllEvents(); // Pega todos os eventos
    let eventsText = '=== EVENTOS AGENDADOS ===\n\n';
    
    if (allEvents.length === 0) {
      eventsText += 'Nenhum evento agendado';
    } else {
      // Formata cada evento
      allEvents.forEach(event => {
        eventsText += `📅 ${formatDate(event.date)}\n⏰ ${event.time}\n📝 ${event.description}\n\n`;
      });
    }

    // Pega anotações do usuário
    const currentNotes = localStorage.getItem('edutalk_notes') || '';
    const combined = currentNotes + '\n\n' + eventsText;
    localStorage.setItem('edutalk_notes_display', combined);
    
    // Se painel de notas está aberto, atualiza ele
    if (notesPanel.style.display === 'block') {
      loadNotesWithEvents();
    }
  };

  // ============================================
  // 7. LÓGICA DE ANOTAÇÕES
  // ============================================
  
  // Encontra o botão de notas na nav
  let notesNavBtn = null;
  navItems.forEach(item => {
    const icon = item.querySelector('.material-icons');
    if (icon && icon.textContent.trim() === 'edit_note') {
      notesNavBtn = item;
    }
  });

  // Clique no X fecha o painel de notas
  if (closeNotesBtn) {
    closeNotesBtn.addEventListener('click', () => {
      notesPanel.style.display = 'none';
    });
  }

  // Clique em salvar persiste as anotações no localStorage
  if (saveNotesBtn) {
    saveNotesBtn.addEventListener('click', () => {
      const notesContent = notesTextarea.value;
      localStorage.setItem('edutalk_notes', notesContent);
      showTemporaryMessage('Anotações salvas com sucesso!');
    });
  }

  // Carrega anotações do usuário + eventos do calendário
  const loadNotesWithEvents = () => {
    const userNotes = localStorage.getItem('edutalk_notes') || '';
    const allEvents = calendarEvents.getAllEvents();
    
    let fullContent = userNotes;
    
    // Adiciona eventos ao final das notas
    if (allEvents.length > 0) {
      fullContent += '\n\n=== EVENTOS AGENDADOS ===\n\n';
      allEvents.forEach(event => {
        fullContent += `📅 ${formatDate(event.date)}\n⏰ ${event.time}\n📝 ${event.description}\n\n`;
      });
    }

    notesTextarea.value = fullContent; // Mostra no textarea
  };

  // Carrega anotações salvas ao iniciar
  const savedNotes = localStorage.getItem('edutalk_notes');
  if (savedNotes && notesTextarea) {
    notesTextarea.value = savedNotes;
  }

  // ============================================
  // 8. LÓGICA DE PERFIL
  // ============================================

  // Clique na foto do perfil abre popup de perfil
  const userProfileDiv = document.querySelector('.user-profile');
  if (userProfileDiv) {
    userProfileDiv.addEventListener('click', () => {
      showPopup(profilePopup);
    });
  }

  // X no popup de perfil fecha
  if (closeProfileBtn) {
    closeProfileBtn.addEventListener('click', () => hidePopup(profilePopup));
  }

  // Clique em "Editar Perfil" abre form de edição
  if (editProfileBtn) {
    editProfileBtn.addEventListener('click', () => {
      hidePopup(profilePopup);
      showPopup(editProfilePopup);
    });
  }

  // X no popup de edição fecha
  if (closeEditProfileBtn) {
    closeEditProfileBtn.addEventListener('click', () => hidePopup(editProfilePopup));
  }

  // Clique em salvar edição de perfil
  if (saveEditProfileBtn) {
    saveEditProfileBtn.addEventListener('click', () => {
      const newName = document.getElementById('edit-profile-name').value.trim();
      const newAvatar = document.getElementById('edit-profile-avatar').value.trim();
      
      if (!newName) {
        showTemporaryMessage('Por favor, digite um nome!');
        return;
      }
      
      // Salva no localStorage para persistir entre recarregos
      localStorage.setItem('user_profile_name', newName);
      if (newAvatar) {
        localStorage.setItem('user_profile_avatar', newAvatar);
      }
      
      // Atualiza nome no header do perfil
      userProfileName.textContent = newName;
      const userProfileImg = document.querySelector('.user-profile img');
      if (userProfileImg && newAvatar) {
        userProfileImg.src = newAvatar;
      }
      
      // Atualiza nome no popup de perfil
      document.querySelector('.profile-info h3').textContent = newName;
      const profileImg = document.querySelector('.profile-avatar img');
      if (profileImg && newAvatar) {
        profileImg.src = newAvatar;
      }
      
      showTemporaryMessage('Perfil atualizado com sucesso!');
      hidePopup(editProfilePopup);
      showPopup(profilePopup);
    });
  }

  // Carrega valores atuais quando abre form de edição
  if (editProfileBtn) {
    const originalClick = editProfileBtn.onclick;
    editProfileBtn.addEventListener('click', () => {
      setTimeout(() => {
        const currentName = userProfileName.textContent;
        const currentAvatar = document.querySelector('.user-profile img').src;
        
        // Pré-preenche inputs com valores atuais
        document.getElementById('edit-profile-name').value = currentName;
        document.getElementById('edit-profile-avatar').value = currentAvatar;
      }, 100);
    });
  }

  // ============================================
  // 9. LÓGICA DO MORE (CONFIGURAÇÕES)
  // ============================================

  // Clique em "More" abre popup de configurações
  if (moreBtn) {
    moreBtn.addEventListener('click', () => {
      showPopup(morePopup);
      const langSelect = document.getElementById('language-select');
      if (langSelect) {
        langSelect.value = i18n.getLanguage(); // Mostra idioma atual
      }
    });
  }

  // X no popup de settings fecha
  if (closeMoreBtn) {
    closeMoreBtn.addEventListener('click', () => hidePopup(morePopup));
  }

  // Botão para salvar configurações
  if (saveMoreSettingsBtn) {
    saveMoreSettingsBtn.addEventListener('click', () => {
      const langSelect = document.getElementById('language-select');
      if (langSelect) {
        const selectedLang = langSelect.value;
        i18n.setLanguage(selectedLang); // Altera idioma global
        updatePageLanguage(); // Atualiza textos da página
        showTemporaryMessage(i18n.t('save_settings'));
      }
    });
  }

  // Botão de logout
  if (logoutBtnMore) {
    logoutBtnMore.addEventListener('click', () => {
      authManager.logout(); // Remove usuário logado
      window.location.href = 'index.html'; // Vai para login
    });
  }

  // ============================================
  // 9. LÓGICA DE USUÁRIOS ATIVOS
  // ============================================

  // Renderiza lista de grupos e usuários no popup Active
  const renderActiveUsers = () => {
    activeListContainer.innerHTML = '';
    
    // Seção de GRUPOS
    const groups = userManager.getGroups();
    if (groups.length > 0) {
      const groupsSection = document.createElement('div');
      groupsSection.className = 'active-section';
      const groupsTitle = document.createElement('h4');
      groupsTitle.className = 'active-section-title';
      groupsTitle.textContent = 'GRUPOS';
      groupsSection.appendChild(groupsTitle);

      // Cria elemento para cada grupo
      groups.forEach(group => {
        const groupEl = document.createElement('div');
        groupEl.className = 'active-item group-item';
        groupEl.innerHTML = `
          <img src="${group.avatar}" alt="${group.name}" class="avatar">
          <div class="active-info">
            <strong>${group.name}</strong>
            <span class="group-members">${group.members.length} membros</span>
          </div>
          <span class="material-icons">group</span>
        `;
        // Clique abre conversa do grupo no Home
        groupEl.addEventListener('click', () => {
          activePopup.classList.remove('show'); // Fecha popup Active
          navItems.forEach(nav => nav.classList.remove('active')); // Remove active nav
          homeBtn.classList.add('active'); // Ativa Home
          // Encontra o contact-item do grupo e clica nele
          const contactItem = document.querySelector(`[data-name="${group.name}"]`);
          if (contactItem) {
            contactItem.click();
          }
        });
        groupsSection.appendChild(groupEl);
      });
      activeListContainer.appendChild(groupsSection);
    }

    // Seção de USUÁRIOS
    const users = userManager.getActiveUsers();
    if (users.length > 0) {
      const usersSection = document.createElement('div');
      usersSection.className = 'active-section';
      const usersTitle = document.createElement('h4');
      usersTitle.className = 'active-section-title';
      usersTitle.textContent = 'USUÁRIOS';
      usersSection.appendChild(usersTitle);

      // Cria elemento para cada usuário
      users.forEach(user => {
        const userEl = document.createElement('div');
        userEl.className = `active-item user-item status-${user.status}`;
        const statusLabel = user.status === 'online' ? 'Online' : user.status === 'away' ? 'Ausente' : 'Offline';
        userEl.innerHTML = `
          <img src="${user.avatar}" alt="${user.name}" class="avatar">
          <div class="active-info">
            <strong>${user.name}</strong>
            <span class="status-badge">${statusLabel}</span>
          </div>
          <span class="status-indicator status-${user.status}"></span>
        `;
        // Clique abre conversa do usuário no Home
        userEl.addEventListener('click', () => {
          activePopup.classList.remove('show');
          navItems.forEach(nav => nav.classList.remove('active'));
          homeBtn.classList.add('active');
          // Encontra o contact-item do usuário e clica nele
          const contactItem = document.querySelector(`[data-name="${user.name}"]`);
          if (contactItem) {
            contactItem.click();
          }
        });
        usersSection.appendChild(userEl);
      });
      activeListContainer.appendChild(usersSection);
    }
  };

  // Clique em botão Active abre/fecha popup
  if (activeBtn) {
    activeBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      
      // Fecha outros popups abertos
      if (calendarioPopup) calendarioPopup.classList.remove('show');
      if (notesPanel) notesPanel.style.display = 'none';
      
      // Toggle popup Active
      if (activePopup) activePopup.classList.toggle('show');
      
      // Atualiza nav active state
      navItems.forEach(nav => nav.classList.remove('active'));
      if (activePopup.classList.contains('show')) {
        activeBtn.classList.add('active');
        renderActiveUsers();
      }
    });
  }

  // Botão X fecha popup Active
  if (closeActiveBtn) {
    closeActiveBtn.addEventListener('click', () => {
      activePopup.classList.remove('show');
    });
  }

  // Botão HOME (primeiro nav-item)
  const homeBtn = navItems[0];
  if (homeBtn) {
    homeBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      
      // Fecha todos os popups
      if (calendarioPopup) calendarioPopup.classList.remove('show');
      if (activePopup) activePopup.classList.remove('show');
      if (notesPanel) notesPanel.style.display = 'none';
      
      // Atualiza nav: remove de todos, adiciona ao Home
      navItems.forEach(nav => nav.classList.remove('active'));
      homeBtn.classList.add('active');
    });
  }

  // Botão NOTAS
  if (notesNavBtn) {
    notesNavBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      
      // Fecha outros popups
      if (calendarioPopup) calendarioPopup.classList.remove('show');
      if (activePopup) activePopup.classList.remove('show');
      
      // Toggle painel de notas
      const isNotesVisible = notesPanel.style.display === 'block';
      if (isNotesVisible) {
        notesPanel.style.display = 'none';
      } else {
        notesPanel.style.display = 'block';
        loadNotesWithEvents();
      }
      
      // Atualiza nav active state
      navItems.forEach(nav => nav.classList.remove('active'));
      if (!isNotesVisible) {
        notesNavBtn.classList.add('active');
      }
    });
  }

  // Botão NOVA REUNIÃO (videocam icon)
  let meetingNavBtn = null;
  navItems.forEach(item => {
    const icon = item.querySelector('.material-icons');
    if (icon && icon.textContent.trim() === 'videocam') {
      meetingNavBtn = item;
    }
  });

  if (meetingNavBtn) {
    meetingNavBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      
      // Fecha todos os popups
      if (calendarioPopup) calendarioPopup.classList.remove('show');
      if (activePopup) activePopup.classList.remove('show');
      if (notesPanel) notesPanel.style.display = 'none';
      
      // Atualiza nav active state
      navItems.forEach(nav => nav.classList.remove('active'));
      meetingNavBtn.classList.add('active');
      
      showTemporaryMessage('Recurso de reunião em desenvolvimento...');
    });
  }

  // ============================================
  // 11. LÓGICA DE CALENDÁRIO
  // ============================================

  // Clique em botão Calendário abre/fecha popup
  if (calendarioBtn) {
    calendarioBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      
      // Fecha outros popups
      if (activePopup) activePopup.classList.remove('show');
      if (notesPanel) notesPanel.style.display = 'none';

      // Toggle calendário
      if (calendarioPopup) calendarioPopup.classList.toggle('show');

      // Atualiza nav active state
      navItems.forEach(nav => nav.classList.remove('active'));
      if (calendarioPopup.classList.contains('show')) {
        calendarioBtn.classList.add('active');
      }
    });
  }

  // ============================================
  // 11. LÓGICA DE MENSAGENS E RESPOSTAS AUTOMÁTICAS
  // ============================================

  // Envia mensagem e recebe resposta automática
  const sendMessage = () => {
    const msg = messageInput.value.trim();
    if (msg) {
      // Cria elemento da mensagem enviada
      const newMsg = document.createElement('div');
      newMsg.className = 'message sent';
      newMsg.innerHTML = `<div class="message-bubble">${msg}</div><div class="message-time">${new Date().toLocaleTimeString()}</div>`;
      messageArea.appendChild(newMsg);
      messageInput.value = '';

      // Scroll para última mensagem
      setTimeout(() => {
        messageArea.scrollTop = messageArea.scrollHeight;
      }, 0);

      // Resposta automática após 1 segundo
      setTimeout(() => {
        if (currentChatUser) {
          // Usa resposta de grupo se for grupo, senão de usuário
          let response;
          if (currentChatUser.isGroup) {
            response = userManager.getGroupAutoResponse(currentChatUser.name);
          } else {
            response = userManager.getAutoResponse(currentChatUser.status || 'online');
          }
          // Cria elemento de mensagem recebida
          const responseMsg = document.createElement('div');
          responseMsg.className = 'message received';
          responseMsg.innerHTML = `<div class="message-bubble">${response}</div><div class="message-time">${new Date().toLocaleTimeString()}</div>`;
          messageArea.appendChild(responseMsg);
          
          setTimeout(() => {
            messageArea.scrollTop = messageArea.scrollHeight;
          }, 0);
        }
      }, 1000);
    }
  };

  // Clique no botão send
  if (sendButton) {
    sendButton.addEventListener('click', sendMessage);
  }

  // Tecla Enter envia mensagem
  if (messageInput) {
    messageInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
      }
    });
  }

  // ============================================
  // 13. LÓGICA DE UPLOAD DE ARQUIVO
  // ============================================

  // Clique em attach abre file input
  if (attachBtn) {
    attachBtn.addEventListener('click', () => {
      fileInput.click();
    });
  }

  // Clique em photo abre photo input
  if (photoBtn) {
    photoBtn.addEventListener('click', () => {
      photoInput.click();
    });
  }

  // Clique em video abre video input
  if (videoBtn) {
    videoBtn.addEventListener('click', () => {
      videoInput.click();
    });
  }

  // Upload de foto
  photoInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const newMsg = document.createElement('div');
      newMsg.className = 'message sent';
      newMsg.innerHTML = `<div class="message-bubble">📷 Foto enviada: ${file.name}</div><div class="message-time">${new Date().toLocaleTimeString()}</div>`;
      messageArea.appendChild(newMsg);
      
      setTimeout(() => {
        messageArea.scrollTop = messageArea.scrollHeight;
      }, 0);
      
      showTemporaryMessage('Foto enviada com sucesso!');
      photoInput.value = '';
    }
  });

  // Upload de vídeo
  videoInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const newMsg = document.createElement('div');
      newMsg.className = 'message sent';
      newMsg.innerHTML = `<div class="message-bubble">🎥 Vídeo enviado: ${file.name}</div><div class="message-time">${new Date().toLocaleTimeString()}</div>`;
      messageArea.appendChild(newMsg);
      
      setTimeout(() => {
        messageArea.scrollTop = messageArea.scrollHeight;
      }, 0);
      
      showTemporaryMessage('Vídeo enviado com sucesso!');
      videoInput.value = '';
    }
  });

  // Upload de arquivo
  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const newMsg = document.createElement('div');
      newMsg.className = 'message sent';
      newMsg.innerHTML = `<div class="message-bubble">📎 Arquivo enviado: ${file.name}</div><div class="message-time">${new Date().toLocaleTimeString()}</div>`;
      messageArea.appendChild(newMsg);
      
      setTimeout(() => {
        messageArea.scrollTop = messageArea.scrollHeight;
      }, 0);
      
      showTemporaryMessage('Arquivo enviado com sucesso!');
      fileInput.value = '';
    }
  });

  // ============================================
  // 13. FECHAR POPUPS AO CLICAR FORA
  // ============================================

  // Clique fora dos popups fecha eles
  document.addEventListener('click', (event) => {
    const isClickedOutsideCalendario = !(
      (calendarioPopup && calendarioPopup.contains(event.target)) ||
      (calendarioBtn && calendarioBtn.contains(event.target))
    );
    const isClickedOutsideActive = !(
      (activePopup && activePopup.contains(event.target)) ||
      (activeBtn && activeBtn.contains(event.target))
    );

    if (isClickedOutsideCalendario && calendarioPopup && calendarioPopup.classList.contains('show')) {
      calendarioPopup.classList.remove('show');
    }
    if (isClickedOutsideActive && activePopup && activePopup.classList.contains('show')) {
      activePopup.classList.remove('show');
    }
  });

  // Tecla Escape fecha todos os popups
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  });

  // Renderiza usuários ativos ao iniciar
  renderActiveUsers();
});
