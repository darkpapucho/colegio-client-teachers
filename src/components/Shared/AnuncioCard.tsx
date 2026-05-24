import { useState } from 'react';
import { Button } from './Button/Button';
import { FaTrashCan } from 'react-icons/fa6';
import Loader from './Loader/Loader';
import ErrorHandler from '../../utils/errorManagment';
import { Profesor } from '../../models/Profesor/Profesor';
import { updateToken } from '../../utils/axiosUtils';
import toast from 'react-hot-toast';
import { Announcement, ProfesorAnnouncement } from '../../types/announcements';
import useAuth from '../../config/zustand/user';
import { Teacher } from '../../types/users/profesor';
interface AnuncioCardProfesorProps {
  type: 'teacher';
  anuncio: ProfesorAnnouncement;
}
interface AnuncioCardGeneralProps {
  type: 'general';
  anuncio: Announcement;
}

export default function AnuncioCard({ type, anuncio }: AnuncioCardProfesorProps | AnuncioCardGeneralProps) {
  const [loading, setLoading] = useState(false);
  const profesor = useAuth().user as unknown as Teacher;
  const updateUser = useAuth().updateUser;
  return (
    <>
      {loading && <Loader />}
      <div className="w-[100%] flex flex-col items-center gap-[1rem]  min-h-[110px] bg-white border-[#cecece] border-t-2 border-b-2 nth">
        <div className="flex flex-col justify-start @[420px]:flex-row @[420px]:justify-between w-[95%]">
          <div className="flex gap-4">
            {type == 'teacher' && (
              <Button $width="max-content" $tiny $danger disabled={loading} onClick={deleteAnuncio}>
                <FaTrashCan />
              </Button>
            )}
            <p className="text-[16px] font-bold">{anuncio.title}</p>
          </div>
          <p className="text-[12px] font-light text-[#8b8b8b] @[420px]:text-[14px]">{anuncio.date}</p>
        </div>
        {type === 'teacher' && (
          <div className="w-full flex gap-2 h-[30px]">
            {anuncio.salones.map((salon, i) => (
              <p className="bg-green-400 flex items-center font-semibold" key={i}>
                {salon}
              </p>
            ))}
          </div>
        )}
        <div className="w-[95%] text-[14px] line-clamp-5">
          <p>{anuncio.content}</p>
        </div>
      </div>
    </>
  );
  async function deleteAnuncio() {
    if (type === 'general') return;
    try {
      if (!confirm(`seguro que deseas eliminar el anuncio ${anuncio.title}?`)) setLoading(true);
      const response = await Profesor.deleteAnuncio({ anuncioId: anuncio._id, profesorId: profesor!._id });
      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);
      toast.success('anuncio eliminado');
      const anuncios = profesor!.anuncios;
      updateUser({ anuncios: anuncios.filter((anuncio) => anuncio._id !== anuncio._id) });
    } catch (err) {
      ErrorHandler(err);
    } finally {
      setLoading(false);
    }
  }
}
