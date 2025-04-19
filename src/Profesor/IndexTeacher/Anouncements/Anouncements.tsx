import Loader from '../../../components/Shared/Loader/Loader';
import useFetchAnnouncements from '../../../hooks/useFetchAnnouncements';
import { useProfesor } from '../../../hooks/useProfesor';

import AnnouncementsDisplayer from './AnouncementDisplayer';

export default function Anouncements() {
  const { data, isFetching } = useFetchAnnouncements();
  const myAnnouncements = useProfesor((state) => state.profesor!.anuncios);

  return (
    <div className="flex flex-col gap-[4rem] w-full">
      {isFetching && <Loader />}
      {data && <AnnouncementsDisplayer announcements={data} title="Anuncios generales" type="general" />}
      <AnnouncementsDisplayer announcements={myAnnouncements ?? []} title="Tus anuncios" type="teacher" />
    </div>
  );
}
