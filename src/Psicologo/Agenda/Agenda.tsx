// src/components/CalendarComponent.jsx
import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Configurar el localizador de fechas con moment.js [citation:8][citation:10]
const localizer = momentLocalizer(moment);

// Configuración del idioma a español
moment.locale('es');

export type AgendaPsicologicaEvent = { id: string; title: string; start: Date; end: Date; description: string };
const AgendaPsicologia = () => {
  const [events, _setEvents] = useState<AgendaPsicologicaEvent[]>([
    { id: '1', title: 'visitar primer grado A', start: new Date(), end: new Date(), description: 'tengo que ir temprano' },
  ]);
  const [loading, _setLoading] = useState(false);

  // Cargar eventos desde la API al montar el componente
  //   useEffect(() => {
  //     loadEvents();
  //   }, []);

  // const loadEvents = async () => {
  //   try {
  //     setLoading(true);
  //     const data: AgendaPsicologicaEvent[] = [{ id: '1', title: 'visitar primer grado A', start: new Date(), end: new Date(), description: 'tengo que ir temprano' }];
  //     // Transformar datos si es necesario para que coincidan con el formato esperado [citation:8]
  //     const formattedEvents = data.map((event) => ({
  //       id: event.id,
  //       title: event.title,
  //       start: new Date(event.start),
  //       end: new Date(event.end),
  //       // Puedes agregar más propiedades personalizadas
  //       description: event.description,
  //     }));
  //     setEvents(formattedEvents);
  //   } catch (error) {
  //     console.error('Error loading events:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Manejar selección de un slot (crear nuevo evento)
  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const title = window.prompt('Nuevo evento:', 'Título del evento');
    if (title) {
      const newEvent = {
        title,
        start,
        end,
        description: '',
      };
      console.log({ newEvent });
      // Guardar en la API
      //   createEvent(newEvent)
      //     .then((savedEvent) => {
      //       setEvents([
      //         ...events,
      //         {
      //           id: savedEvent.id,
      //           ...savedEvent,
      //         },
      //       ]);
      //     })
      //     .catch((error) => console.error('Error saving event:', error));
    }
  };

  // Manejar selección de un evento existente (editar/eliminar) [citation:1]
  //   const handleSelectEvent = (event) => {
  //     const action = window.confirm(`Evento: ${event.title}\n¿Deseas editar este evento?`);

  //     if (action) {
  //       const newTitle = window.prompt('Editar título:', event.title);
  //       if (newTitle && newTitle !== event.title) {
  //         const updatedEvent = { ...event, title: newTitle };

  //         updateEvent(event.id, updatedEvent)
  //           .then(() => {
  //             setEvents(events.map((ev) => (ev.id === event.id ? updatedEvent : ev)));
  //           })
  //           .catch((error) => console.error('Error updating event:', error));
  //       }

  //       const deleteConfirm = window.confirm('¿Eliminar este evento?');
  //       if (deleteConfirm) {
  //         deleteEvent(event.id)
  //           .then(() => {
  //             setEvents(events.filter((ev) => ev.id !== event.id));
  //           })
  //           .catch((error) => console.error('Error deleting event:', error));
  //       }
  //     }
  //   };

  if (loading) {
    return <div>Cargando calendario...</div>;
  }

  return (
    <div style={{ height: '600px', padding: '20px', width: '100%' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={() => console.log('Selected Event')}
        views={['month', 'week', 'day', 'agenda']}
        defaultView="month"
        messages={{
          next: 'Siguiente',
          previous: 'Anterior',
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
          agenda: 'Agenda',
          date: 'Fecha',
          time: 'Hora',
          event: 'Evento',
          noEventsInRange: 'No hay eventos en este rango.',
        }}
        culture="es"
      />
    </div>
  );
};

export default AgendaPsicologia;
