import { useState } from 'react';
import { Button } from './Button/Button';
import { FaTrashCan } from 'react-icons/fa6';
import Loader from './Loader/Loader';
import ErrorHandler from '../../utils/errorManagment';
import { useProfesor } from '../../hooks/useProfesor';
import { Profesor } from '../../models/Profesor/Profesor';
import { updateToken } from '../../utils/axiosUtils';
import toast from 'react-hot-toast';
export default function AnuncioCard({ title, date, content, type, _id }: { _id: string; type: 'teacher' | 'general'; title: string; date: string; content: string }) {
  const [loading, setLoading] = useState(false);
  const { profesor, setAnuncios } = useProfesor((state) => state);
  return (
    <>
      {loading && <Loader />}
      <div className="w-[100%] flex flex-col items-center gap-[1rem]  rounded-xl min-h-[70px] bg-white odd:border-[#d1795e] even:border-[#faac7e] border-t-2 nth">
        <div className="flex flex-col justify-start @[420px]:flex-row @[420px]:justify-between w-[95%]">
          <p className="text-[16px] font-semibold">{title}</p>
          <div className="flex gap-4">
            <p className="text-[12px] font-light text-[#8b8b8b] @[420px]:text-[14px]">{date}</p>
            {type === 'teacher' && (
              <Button $width="max-content" $tiny $danger disabled={loading} onClick={deleteAnuncio}>
                <FaTrashCan />
              </Button>
            )}
          </div>
        </div>
        <div className="w-[95%]">
          <p>{content}</p>
        </div>
      </div>
    </>
  );
  async function deleteAnuncio() {
    try {
      if (!confirm(`seguro que deseas eliminar el anuncio ${title}?`)) setLoading(true);
      const response = await Profesor.deleteAnuncio({ anuncioId: _id, profesorId: profesor!._id });
      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);
      toast.success('anuncio eliminado');
      const anuncios = profesor!.anuncios;
      setAnuncios(anuncios.filter((anuncio) => anuncio._id !== _id));
    } catch (err) {
      ErrorHandler(err);
    } finally {
      setLoading(false);
    }
  }
}
