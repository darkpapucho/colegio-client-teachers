import { useRef, useState } from 'react';
import { Button } from '../../components/Shared/Button/Button';
import Input from '../../components/Shared/Input/Input';
import Modal from '../../components/Shared/Modal/Modal';
import Loader from '../../components/Shared/Loader/Loader';
import { Profesor } from '../../models/Profesor/Profesor';
import { updateToken } from '../../utils/axiosUtils';
import toast from 'react-hot-toast';
import ErrorHandler from '../../utils/errorManagment';
import { useProfesor } from '../../hooks/useProfesor';
import Select from '../../components/Shared/Select/Select';
import useCustomEvent from '../../hooks/useCustomEvent';
import SalonCard from '../../components/Shared/SalonCard/SalonCard';

export default function AddAnuncionModal({ posY, onCloseModal }: { posY: number; onCloseModal: () => void }) {
  const { setAnuncios, profesor } = useProfesor((state) => state);
  const [loading, setLoading] = useState(false);
  const tituloRef = useRef<HTMLInputElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [salonesOptions, setSalonesOptions] = useState<{ label: string; value: string }[]>(profesor!.salones.map((salon) => ({ label: salon.label, value: salon.label })));
  const [selectedSalones, setSelectedSalones] = useState<string[]>([]);
  useCustomEvent('customSelect', selectListener);
  return (
    <Modal marginTop={`${posY}px`} onCloseModal={onCloseModal} width="400px" title="Agregar un anuncio">
      {loading && <Loader />}
      <div className="flex flex-col gap-[2rem] w-[100%]">
        <Select options={salonesOptions} name="salones" width="100%" label="salones" />
        <div className="flex gap-4 min-h-[30px] w-100%">
          {selectedSalones.length > 0 && (
            <>
              {selectedSalones.map((salon, index) => (
                <SalonCard salon={salon} key={index} removeSalonHandler={removeSalonFromSelectedSalones} />
              ))}
            </>
          )}
        </div>
        <Input type="text" placeholder="Título" width="100%" name="titulo" label="Título" vertical labelColor="black" ref={tituloRef} maxLength={60} />
        <p className="text-[16px]">Contenido (200 caracteres máximo)</p>
        <textarea
          maxLength={300}
          rows={4}
          className="w-auto min-w-[100px] max-w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          ref={textAreaRef}
        />
        <Button $primary $width="max-content" disabled={loading} onClick={agregarAnuncioProfesor}>
          Agregar
        </Button>
      </div>
    </Modal>
  );
  async function agregarAnuncioProfesor() {
    try {
      setLoading(true);
      const title = tituloRef.current!.value.trim().slice(0, 60);
      const content = textAreaRef.current!.value.trim().slice(0, 300);
      const date = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

      if (!title || !content || !selectedSalones.length) throw new Error('debe haber un título y un contenido y seleccionar al menos 1 salón');

      const response = await Profesor.agregarAnuncio({ title, content, date, profesorId: profesor!._id, salones: selectedSalones });
      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);
      toast.success('anuncio agregado');
      const nuevosAnuncios = profesor!.anuncios;
      console.log(response.data.payload);
      nuevosAnuncios!.push({ content, title, date, _id: response.data.payload, salones: selectedSalones });
      setAnuncios(nuevosAnuncios);
      onCloseModal();
    } catch (err) {
      ErrorHandler(err);
    } finally {
      setLoading(false);
    }
  }
  function selectListener(event: CustomEvent) {
    const { name, value } = event.detail;
    if (name === 'salones') {
      const newSalonesOptions = salonesOptions.filter((salon) => salon.label != value);
      setSalonesOptions(newSalonesOptions);
      setSelectedSalones((old) => [...old, value]);
    }
  }
  function removeSalonFromSelectedSalones(salon: string) {
    setSalonesOptions((old) => [...old, { label: salon, value: salon }]);
    setSelectedSalones((old) => {
      return old.filter((elem) => elem != salon);
    });
  }
}
