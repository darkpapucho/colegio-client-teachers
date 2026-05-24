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
import { Container } from '../../../components/Shared/Container/Container';
import { Text } from '../../../components/Shared/Text/Text';
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
export default function AnnouncementsDisplayer({
  title,
  announcements,
  type,
}: ProfesorAnnouncementDisplayerProps | GeneralAnnouncementDisplayerProps) {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  return (
    <Container $direction="column" $width="100%" $gap="2rem" $padding="1rem">
      {mousePosition && (
        <AddAnuncionModal
          onCloseModal={onCloseModal}
          posY={mousePosition.y < 300 ? mousePosition.y : mousePosition.y - 300}
        />
      )}
      <Container
        $direction="row"
        $width="100%"
        $height="30px"
        $justifyContent="flex-start"
        $alignItems="center"
        $gap="4rem">
        <Container $direction="row" $gap="1rem" $alignItems="center">
          <Text $large $fontWeight="500">
            {type === 'general' ? <GrAnnounce /> : <TfiAnnouncement />}
          </Text>
          <Text $fontWeight="500">{title}</Text>
        </Container>

        {type === 'teacher' && (
          <Button $primary $width="max-content" $tiny onClick={displayAddAnuncioModal}>
            <Icon $fontSize="14px">
              <IoMdAdd />
            </Icon>
          </Button>
        )}
      </Container>
      {announcements.length > 0 ? (
        <Container $direction="column" $width="100%" $gap="1rem">
          {announcements.map((record, index) => {
            if (type === 'general') {
              return <AnuncioCard key={index} type={type} anuncio={record as Announcement} />;
            }
            return <AnuncioCard key={index} type={type} anuncio={record as ProfesorAnnouncement} />;
          })}
        </Container>
      ) : (
        <Container $width="95%" $alignItems="center" $gap="1rem">
          <TbMoodEmpty />
          <Text $fontSize="14px">Aquí aún no hay anuncios.</Text>
        </Container>
      )}
    </Container>
  );
  function displayAddAnuncioModal(event: React.MouseEvent<HTMLButtonElement>) {
    setMousePosition({ x: event.clientX, y: event.clientY });
  }
  function onCloseModal() {
    setMousePosition(null);
  }
}
