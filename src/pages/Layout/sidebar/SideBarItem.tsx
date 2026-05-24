import { useNavigate } from 'react-router-dom';
import { Container } from '../../../components/Shared/Container/Container';
import { Icon } from '../../../components/Shared/Icon/Icon';
import { Text } from '../../../components/Shared/Text/Text';

export type MenuItem = { label: string; url: string; icon: JSX.Element };

export default function SideBarMenuItem({ item }: { item: MenuItem }) {
  const navigate = useNavigate();
  return (
    <Container onClick={() => handleClick(item.url)} $width="100%" className="menu-item" $alignItems="center" $border="1px solid black" $padding=".5rem 0" $pointer>
      <Icon $small $width="35px">
        {item.icon}
      </Icon>
      <Text>{item.label}</Text>
    </Container>
  );
  function handleClick(url: string) {
    const sidebar = document.getElementById('sidebar')!;
    sidebar.style.display = 'none';
    navigate(url);
  }
}
