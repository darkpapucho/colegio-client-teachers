// import logo from '/logo.png';

import { Container } from '../../components/Shared/Container/Container';
import useAuth from '../../config/zustand/user';
import { Teacher } from '../../config/zustand/types/teacher';
import Anouncements from './Anouncements/Anouncements';

import TeacherSchedule from './TeacherSchedule/TeacherSchedule';

// const testAnouncements = [
//   { date: '12-03-2025', title: 'revisar la sistencia', content: 'no se olviden', _id: '', userId: '' },
//   { date: '12-03-2025', title: 'revisar la sistencia', content: 'no se olviden', _id: '', userId: '' },
//   { date: '12-03-2025', title: 'revisar la sistencia', content: 'no se olviden', _id: '', userId: '' },
// ];

export default function IndexTeacher() {
  const profesor = useAuth().user as unknown as Teacher;

  return (
    <Container $width="100%" $direction="column">
      <Container $direction="row" $width="100%">
        {/* LEFT */}
        <Container $width="70%" $direction="row" $height="100%">
          {profesor && profesor.salones && <TeacherSchedule />}
        </Container>
        {/* RIGHT */}
        <Container $width="30%" $direction="column" $height="100dvh">
          <Anouncements />
        </Container>
      </Container>
    </Container>
  );
}
