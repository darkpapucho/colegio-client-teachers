import styled from 'styled-components';
import { Container } from '../../../../components/Shared/Container/Container';
import DisplayHoverMessage from '../../../../components/Shared/DisplayHoverMessage/DisplayHoverMessage';
import { CursoInfo } from '../../../../models/Profesor/types';

const StyledCursoHeader = styled(Container)`
  width: 100%;
  :last-child {
    border-right: none;
  }
`;
export default function CursoHeader({ curso }: { curso: CursoInfo }) {
  return (
    <Container $width="100%" $direction="column">
      <Container className="border-bottom">
        <DisplayHoverMessage width="100%" label={curso.code} message={curso.label} />
      </Container>

      <StyledCursoHeader $direction="row">
        {curso.competencias.map((competencia, index) => (
          <DisplayHoverMessage key={index} classN="border-right" width={`${100 / curso.numCompetencias}%`} label={index + 1} message={competencia} />
        ))}
      </StyledCursoHeader>
    </Container>
  );
}
