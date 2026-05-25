import moment from 'moment-timezone';
import { CalendarProps, momentLocalizer, Calendar, Formats, Components, HeaderProps, Event } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Container } from '../../components/Shared/Container/Container';
const localizer = momentLocalizer(moment);
interface CustomEvent extends Event {
  data: {
    type: 'uno' | 'dos';
  };
}
const events: CustomEvent[] = [
  {
    start: moment('2026-05-24T12:00:00').toDate(),
    end: moment('2026-05-24T13:00:00').toDate(),
    title: 'hello world',
    data: {
      type: 'uno',
    },
  },
  {
    start: moment('2026-05-24T12:00:00').toDate(),
    end: moment('2026-05-24T13:00:00').toDate(),
    title: 'hello world',
    data: {
      type: 'dos',
    },
  },
];

const formats: Formats = {
  dayHeaderFormat: (date) =>
    new Date(date).toLocaleDateString('es-ES', { weekday: 'long', day: '2-digit', month: 'long' }),
  weekdayFormat: (date) => new Date(date).toLocaleDateString('es-ES', { day: '2-digit' }),
};

const components: Components = {
  event: (eventProps: any) => {
    const type = eventProps.event.data.type;
    switch (type) {
      case 'uno':
        return <div>UNO!</div>;
      case 'dos':
        return <div>DOS!</div>;
    }
  },
  week: {
    header: (headerProps: HeaderProps) => <div>{headerProps.label}</div>,
  },
};
export default function AgendaPsicologia(props: Omit<CalendarProps, 'localizer'>) {
  return (
    <Container $direction="column" $height="100%" $width="100%">
      <Calendar
        {...props}
        defaultView="week"
        localizer={localizer}
        events={events}
        toolbar={true}
        min={moment('2026-05-18T08:00:00').toDate()}
        max={moment('2026-12-24T18:00:00').toDate()}
        formats={formats}
        components={components}
      />
    </Container>
  );
}
