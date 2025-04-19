import { useState } from 'react';
import Modal from '../../../components/Shared/Modal/Modal';
import Select from '../../../components/Shared/Select/Select';
import useCustomEvent from '../../../hooks/useCustomEvent';
import { Profesor } from '../../../models/Profesor/Profesor';
import { useProfesor } from '../../../hooks/useProfesor';
import { updateToken } from '../../../utils/axiosUtils';
import { Button } from '../../../components/Shared/Button/Button';
import toast from 'react-hot-toast';
import ErrorHandler from '../../../utils/errorManagment';
import { convertNumberToDayName } from './scheduleData';

export default function AgregarCeldaHorario({ onCloseModal, startTime }: { onCloseModal: () => void; startTime: Date }) {
  const profesor = useProfesor((state) => state.profesor)!;
  const setHorario = useProfesor((state) => state.setHorario);
  const salonCursosData = profesor.salones.map((record) => {
    return { salon: record.label, cursos: record.cursos };
  });
  console.log({ salones: profesor.salones });
  const [loading, setLoading] = useState(false);
  const salones = salonCursosData.map((row) => ({ label: row.salon, value: row.salon }));
  const [cursos, setCursos] = useState<{ label: string; value: string }[]>([]);
  const [salon, setSalon] = useState<string | null>(null);
  const [curso, setCurso] = useState<string | null>(null);
  const day = startTime.getDate();
  //start time and date time are dates
  const endTime = new Date(startTime.getTime() + 45 * 60 * 1000); // add 45 minutes

  useCustomEvent('customSelect', customSelectListener);
  return (
    <Modal onCloseModal={onCloseModal} title="Agregar celda horario" width="480px">
      <div className="flex flex-col gap-2 w-full bg-blue-200">
        <div className="flex gap-4 w-full p-4 bg-yellow-200 items-center justify-center">
          {/* <Select options={diasSelectOpts} name="dia" label="Día" width="80px" /> */}
          <p className="text-[20px] font-bold">{convertNumberToDayName(day)}</p>
          <p className="text-[20px] font-bold">{startTime.getHours().toString().padStart(2, '0') + ':' + startTime.getMinutes().toString().padStart(2, '0') + ' - '}</p>
          <p className="text-[20px] font-bold">{endTime.getHours().toString().padStart(2, '0') + ':' + endTime.getMinutes().toString().padStart(2, '0')} </p>
        </div>
        {
          <div className="flex gap-2 items-center justify-between">
            <Select options={salones} name="salon" label="Salón" width="140px" />
            <Select options={cursos} name="curso" label="Curso" width="210px" />
            <Button disabled={loading} $primary $width="max-content" $small onClick={agregarCeldaHorario}>
              Agregar
            </Button>
          </div>
        }
      </div>
    </Modal>
  );
  function customSelectListener(event: CustomEvent) {
    const { name, value } = event.detail;

    if (name === 'salon') {
      const salon = salonCursosData.find((record) => record.salon === value)!;
      setSalon(salon.salon);
      const cursos = salon.cursos.map((curso) => ({ label: curso.label, value: curso.label }));
      setCursos(cursos);
      return;
    }
    if (name === 'curso') {
      setCurso(value);
      return;
    }
  }
  async function agregarCeldaHorario() {
    try {
      setLoading(true);
      if (!salon || !curso) throw new Error('faltan llenar datos');

      const response = await Profesor.agregarHorarioCell({
        startTime,
        endTime,
        curso,
        salon,
        profesorId: profesor._id,
      });

      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);
      setHorario(response.data.payload);
      toast.success('agregado!');
    } catch (err) {
      ErrorHandler(err);
    } finally {
      setLoading(false);
      onCloseModal();
    }
  }
}
