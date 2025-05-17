import { Container } from '../../../../components/Shared/Container/Container';
import { theme } from '../../../../config/styled/styled';

export default function SpecialBlock({ field }: { field: string }) {
  return (
    <Container $width="100%" $direction="column" $gap="1px" $bgColor="white" $padding="0">
      <Container $width="100%" $justifyContent="center" $bgColor={theme.colors.secondary.normal}>
        {field}
      </Container>
      <Container $width="100%" $direction="row" $bgColor="white" $gap="1px">
        <Container $width="50%" $bgColor={theme.colors.secondary.normal} $justifyContent="center">
          <div style={{ textAlign: 'center' }}>Just.</div>
        </Container>
        <Container $width="50%" $bgColor={theme.colors.secondary.normal} $justifyContent="center">
          <div style={{ textAlign: 'center' }}>Inj.</div>
        </Container>
      </Container>
    </Container>
  );
}
