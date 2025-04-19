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

export default function AddAnuncionModal({ posY, onCloseModal }: { posY: number; onCloseModal: () => void }) {
  const { setAnuncios, profesor } = useProfesor((state) => state);

  const [loading, setLoading] = useState(false);
  const tituloRef = useRef<HTMLInputElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  return (
    <Modal marginTop={`${posY}px`} onCloseModal={onCloseModal} width="400px" title="Agregar un anuncio">
      {loading && <Loader />}
      <div className="flex flex-col gap-[2rem] w-[100%]">
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

      if (!title || !content) throw new Error('debe haber un título y un contenido');

      const response = await Profesor.agregarAnuncio({ title, content, date, profesorId: profesor!._id });
      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);
      toast.success('anuncio agregado');
      const nuevosAnuncios = profesor!.anuncios;
      console.log(response.data.payload);
      nuevosAnuncios!.push({ content, title, date, _id: response.data.payload });
      setAnuncios(nuevosAnuncios);
    } catch (err) {
      ErrorHandler(err);
    } finally {
      setLoading(false);
      onCloseModal();
    }
  }
}
