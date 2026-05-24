import Loader from '../../../components/Shared/Loader/Loader';
import useAuth from '../../../config/zustand/user';
import useFetchAnnouncements from '../../../hooks/useFetchAnnouncements';
import { Teacher } from '../../../types/users/profesor';

import AnnouncementsDisplayer from './AnouncementDisplayer';

export default function Anouncements() {
  const { data, isFetching } = useFetchAnnouncements();
  const myAnnouncements = (useAuth().user as unknown as Teacher).anuncios;

  return (
    <div className="flex flex-col gap-[4rem] w-full">
      {isFetching && <Loader />}
      {data && <AnnouncementsDisplayer announcements={data} title="Anuncios generales" type="general" />}
      <AnnouncementsDisplayer announcements={myAnnouncements ?? []} title="Tus anuncios" type="teacher" />
    </div>
  );
}
