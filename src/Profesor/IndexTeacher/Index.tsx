// import logo from '/logo.png';

import useAuth from '../../config/zustand/user';
import { Teacher } from '../../types/users/profesor';
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
    <div className="@container w-[100%] bg-white">
      <div className="grid grid-cols-1 @[840px]:grid-cols-3 w-full h-max gap-[2rem]">
        {/* LEFT */}
        <div className="col-span-1 @[840px]:col-span-2  h-max">{profesor && profesor.salones && <TeacherSchedule />}</div>
        {/* RIGHT */}
        <div className="col-span-1 p-4 ">
          <Anouncements />
        </div>
      </div>
    </div>
  );
}
