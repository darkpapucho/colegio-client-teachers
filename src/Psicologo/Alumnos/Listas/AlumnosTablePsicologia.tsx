import { Fragment } from 'react/jsx-runtime';
import { Container } from '../../../components/Shared/Container/Container';
import Table from '../../../components/Shared/Table/Table';
import { AMatriculado } from '../../../types/alumno';
import { FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function AlumnosTablePsicologia({ data }: { data: AMatriculado[] }) {
  const navigate = useNavigate();
  if (data.length == 0) {
    return <>LISTA VACÍA</>;
  }
  return (
    <Table $gridTempCols="36rem 10rem 6rem" $width="content-fit">
      <Table.Header>
        <Table.Header.Item>
          <Container $justifyContent="center" $alignItems="center" $width="100%" $height="3rem">
            ALUMNO
          </Container>
        </Table.Header.Item>
        <Table.Header.Item>
          <Container $justifyContent="center" $alignItems="center" $width="100%" $height="3rem">
            DNI
          </Container>
        </Table.Header.Item>
        <Table.Header.Item>
          <Container $justifyContent="center" $alignItems="center" $width="100%" $height="3rem">
            A
          </Container>
        </Table.Header.Item>
      </Table.Header>
      <Table.Body>
        {data.map((row, index) => {
          return (
            <Fragment key={index}>
              <Table.Body.Item>
                <Container
                  $direction="row"
                  $justifyContent="left"
                  $alignItems="center"
                  $width="100%"
                  $height="2.5rem"
                  $padding="0 0 0 4px">
                  {`[${index + 1 < 10 ? '0' + (index + 1) : index + 1 + ''}]` + row.nombreCompleto}
                </Container>
              </Table.Body.Item>
              <Table.Body.Item>
                <Container
                  $direction="row"
                  $justifyContent="center"
                  $alignItems="center"
                  $width="100%"
                  $height="2.5rem">
                  {row.dni ?? ''}
                </Container>
              </Table.Body.Item>
              <Table.Body.Item>
                <Container
                  $pointer
                  $direction="row"
                  $justifyContent="center"
                  $alignItems="center"
                  $width="100%"
                  $height="2.5rem"
                  onClick={() => onEyeClick(row._id)}>
                  <FaEye />
                </Container>
              </Table.Body.Item>
            </Fragment>
          );
        })}
      </Table.Body>
    </Table>
  );
  function onEyeClick(alumnoId: string) {
    const url = `/menu/psicologia/alumno-info?id=${alumnoId}`;
    navigate(url);
  }
}
