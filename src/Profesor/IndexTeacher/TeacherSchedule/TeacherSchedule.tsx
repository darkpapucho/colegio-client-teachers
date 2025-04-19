import { momentLocalizer, Calendar, View, SlotInfo, Event, EventProps } from 'react-big-calendar';
import './style.css';
import { useState } from 'react';
import AgregarCeldaHorario from './AgregarCeldaHorario';
import { StaticDate } from '../../../var/DateForCalendarBigReact';
import { useProfesor } from '../../../hooks/useProfesor';
import { HorarioCell } from '../../../types/horario';
import { BiEdit, BiSave } from 'react-icons/bi';
import { Button } from '../../../components/Shared/Button/Button';
import Loader from '../../../components/Shared/Loader/Loader';
import ErrorHandler from '../../../utils/errorManagment';
import { Profesor } from '../../../models/Profesor/Profesor';
import { convertNumberToDayName, parseSalonToDisplayCalendarSalon, praseCursoToDisplayCalendarCurso } from './scheduleData';
import { updateToken } from '../../../utils/axiosUtils';
import toast from 'react-hot-toast';
import moment from 'moment-timezone';

moment.locale('es');
moment.tz.setDefault('America/Lima');
const localizer = momentLocalizer(moment);

const views: View[] = ['work_week', 'day'];
const minHour = new Date(StaticDate[0], StaticDate[1], StaticDate[2], 8, 0, 0);
const maxHour = new Date(StaticDate[0], StaticDate[1], StaticDate[2], 18, 30, 0);
interface MyEvent extends Event {
  curso?: string;
  salon?: string;
  day?: number;
  horaInicio?: string; //8:10
  horaFin?: string; //10:30
}

const CustomEvent = ({ event }: EventProps<MyEvent>) => {
  return (
    <div className="rbc-event-content">
      <div className="flex flex-col w-full justify-center items-center @ gap-[4px]">
        <div className="text-[10px]">{parseSalonToDisplayCalendarSalon(event.salon!)}</div>
        <div className="text-[10px]">{praseCursoToDisplayCalendarCurso(event.curso!)}</div>
      </div>
    </div>
  );
};

export default function TeacherSchedule() {
  const profesor = useProfesor((state) => state.profesor)!;
  const setHorario = useProfesor((state) => state.setHorario);
  // const setHorario = useProfesor((state) => state.setHorario);
  const horario = profesor.horario.map((record: HorarioCell) => {
    return {
      startTime: Date,
      start: new Date(record.startTime),
      end: new Date(record.endTime),
      title: record.curso,
      allDay: false,
      salon: record.salon,
      curso: record.curso,
    };
  });

  const defaultDate = new Date(StaticDate[0], StaticDate[1], StaticDate[2]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<View>('work_week');
  const [selectedEmptySlot, setSelectedEmptySlot] = useState<Date | null>(null);
  const [editMode, setEditMode] = useState(false);
  return (
    <div className="w-full h-max p-4">
      {loading && <Loader />}
      {selectedEmptySlot && <AgregarCeldaHorario onCloseModal={onCloseModal} startTime={selectedEmptySlot} />}
      <div className="flex flex-row items-center justify-between h-[10%] bg-white">
        <p className="text-[22px] font-semibold m-px">Horario</p>
        {editMode ? (
          <Button $width="max-content" $color="#449ff5" onClick={() => setEditMode(false)}>
            <BiSave />
          </Button>
        ) : (
          <Button $width="max-content" $primary onClick={() => setEditMode(true)}>
            <BiEdit />
          </Button>
        )}
      </div>
      <div className="w-full h-[90%] bg-white">
        <Calendar<MyEvent>
          components={{ event: CustomEvent }}
          onNavigate={() => {}}
          onSelectSlot={handleClickSlot}
          onSelectEvent={handleSelectEvent}
          date={defaultDate}
          localizer={localizer}
          events={horario}
          startAccessor="start"
          endAccessor="end"
          views={views}
          onView={setView}
          view={view}
          step={22.5}
          min={minHour}
          max={maxHour}
          selectable={true}
        />
      </div>
    </div>
  );
  function handleClickSlot(slotInfo: SlotInfo) {
    if (!editMode) return;

    const slotsLength = slotInfo.slots.length;
    const startTime = slotsLength > 1 ? new Date(slotInfo.slots[0].getTime() - 22 * 1000 * 60) : slotInfo.slots[0];
    setSelectedEmptySlot(startTime);
  }
  async function handleSelectEvent(event: MyEvent) {
    const curso = event.curso!;
    const salon = event.salon!;
    if (!editMode) return;
    try {
      setLoading(true);
      if (
        !confirm(
          `Eliminar ${convertNumberToDayName(event.start!.getDate())} ${event.start!.getHours().toString().padStart(2, '0')}-${event
            .start!.getMinutes()
            .toString()
            .padStart(2, '0')}`
        )
      )
        return;
      const response = await Profesor.eliminarHorarioCell({ startTime: event.start!, endTime: event.end!, curso, salon, profesorId: profesor._id });
      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);
      const updatedHorario = profesor.horario.filter((record) => {
        return new Date(record.startTime).toString() != event.start!.toString() && new Date(record.endTime).toString() != event.end!.toString();
      });

      setHorario(updatedHorario);
      toast.success('eliminado');
    } catch (err) {
      ErrorHandler(err);
    } finally {
      setLoading(false);
    }
  }
  function onCloseModal() {
    setSelectedEmptySlot(null);
  }
}
