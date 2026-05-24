import { Outlet } from 'react-router-dom';
import { LayoutContainer, MainContainer } from '../../components/Shared/Layout/Layout';
import Header from '../../pages/Layout/Header';
import TeacherSideBar from '../SideBar/TeacherSideBar';

export default function TeacherLayout() {
  return (
    <LayoutContainer>
      <Header></Header>
      <TeacherSideBar />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </LayoutContainer>
  );
}
