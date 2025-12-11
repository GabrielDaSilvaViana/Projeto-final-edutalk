// Gerencia eventos do calendário com persistência em localStorage
class CalendarEvents {
  constructor() {
    // Carrega eventos do localStorage ou inicia vazio
    this.events = JSON.parse(localStorage.getItem('edutalk_events')) || {};
  }

  // Adiciona um novo evento em uma data específica
  addEvent(date, time, description) {
    if (!this.events[date]) {
      this.events[date] = []; // Cria array se data não existe
    }
    // Adiciona evento com ID único (timestamp)
    this.events[date].push({ time, description, id: Date.now() });
    this.save(); // Salva no localStorage
  }

  // Retorna todos os eventos de uma data específica
  getEventsForDate(date) {
    return this.events[date] || [];
  }

  // Remove um evento específico de uma data
  removeEvent(date, eventId) {
    if (this.events[date]) {
      // Filtra para remover apenas o evento com esse ID
      this.events[date] = this.events[date].filter(e => e.id !== eventId);
      if (this.events[date].length === 0) {
        delete this.events[date]; // Deleta data se não tem mais eventos
      }
      this.save(); // Salva alterações
    }
  }

  // Retorna TODOS os eventos de todas as datas, ordenados por data
  getAllEvents() {
    let allEvents = [];
    // Percorre cada data e seus eventos
    for (let date in this.events) {
      this.events[date].forEach(event => {
        allEvents.push({ date, ...event }); // Adiciona a data ao evento
      });
    }
    // Ordena por data (mais antigos primeiro)
    return allEvents.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });
  }

  // Salva eventos no localStorage
  save() {
    localStorage.setItem('edutalk_events', JSON.stringify(this.events));
  }
}

// Instância global para usar em toda a aplicação
const calendarEvents = new CalendarEvents();
