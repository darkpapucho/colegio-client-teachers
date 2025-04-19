import { GrAnnounce } from 'react-icons/gr';
import { Announcement, ProfesorAnnouncement } from '../../../types/announcements';
import AnuncioCard from '../../../components/Shared/AnuncioCard';
import { TbMoodEmpty } from 'react-icons/tb';
import { TfiAnnouncement } from 'react-icons/tfi';
import { Button } from '../../../components/Shared/Button/Button';
import { useState } from 'react';
import AddAnuncionModal from '../../AddAnuncioModal/AddAnuncioModal';
import { IoMdAdd } from 'react-icons/io';
import { Icon } from '../../../components/Shared/Icon/Icon';
type ProfesorAnnouncementDisplayerProps = {
  title: string;
  type: 'teacher';
  announcements: ProfesorAnnouncement[];
};
type GeneralAnnouncementDisplayerProps = {
  title: string;
  type: 'general';
  announcements: Announcement[];
};
export default function AnnouncementsDisplayer({ title, announcements, type }: ProfesorAnnouncementDisplayerProps | GeneralAnnouncementDisplayerProps) {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  return (
    <div className="@container w-full flex flex-col items-center gap-[2rem]">
      {mousePosition && <AddAnuncionModal onCloseModal={onCloseModal} posY={mousePosition.y < 300 ? mousePosition.y : mousePosition.y - 300} />}
      <div className="w-full flex items-center gap-4 h-[30px] justify-start">
        <p className="flex items-center text-[20px] font-bold justify-start gap-2 ">
          {type === 'general' ? <GrAnnounce /> : <TfiAnnouncement />}
          {title}
        </p>

        {type === 'teacher' && (
          <Button $primary $width="max-content" $tiny onClick={displayAddAnuncioModal}>
            <Icon $fontSize="14px">
              <IoMdAdd />
            </Icon>
          </Button>
        )}
      </div>
      {announcements.length > 0 ? (
        <div className="w-full flex flex-col gap-[1rem]">
          {announcements.map((record, index) => {
            if (type === 'general') {
              return <AnuncioCard key={index} type={type} anuncio={record as Announcement} />;
            }
            return <AnuncioCard key={index} type={type} anuncio={record as ProfesorAnnouncement} />;
          })}
        </div>
      ) : (
        <div className="flex w-[95%] items-center gap-2 text-[16px] italic">
          <TbMoodEmpty />
          <p>Aquí aún no hay anuncios.</p>
        </div>
      )}
    </div>
  );
  function displayAddAnuncioModal(event: React.MouseEvent<HTMLButtonElement>) {
    setMousePosition({ x: event.clientX, y: event.clientY });
  }
  function onCloseModal() {
    setMousePosition(null);
  }
}
