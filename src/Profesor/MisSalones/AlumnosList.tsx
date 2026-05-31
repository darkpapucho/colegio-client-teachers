import { Fragment } from 'react/jsx-runtime';
import { Container } from '../../components/Shared/Container/Container';
import Table from '../../components/Shared/Table/Table';
import { Text } from '../../components/Shared/Text/Text';
import { AMatriculado } from '../../types/alumno';
import { formatListIndex, formatNombreCompletoForList } from '../../utils/format';
import { Icon } from '../../components/Shared/Icon/Icon';
import { FaEdit, FaEye } from 'react-icons/fa';
import { useContext, useState } from 'react';
import { MisSalonesContext } from './MisSalones';

export default function AlumnosList({ alumnos }: { alumnos: AMatriculado[] }) {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const { setSelectedAlumno } = useContext(MisSalonesContext)!;
  return (
    <Container $direction="column" $gap="1rem">
      <h1>Lista de Alumnos</h1>
      <Table $gridTempCols="34rem 10rem 30rem 10rem 6rem" $width="content-fit">
        <Table.Header>
          <Table.Header.Item>
            <Container
              $direction="row"
              $justifyContent="center"
              $alignItems="center"
              $bgColor="#2050A9"
              $height="40px"
              $width="100%">
              <Text $fontSize="1.6rem" $fontWeight="bold">
                ALUMNO
              </Text>
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container
              $direction="row"
              $justifyContent="center"
              $alignItems="center"
              $bgColor="#2050A9"
              $height="40px"
              $width="100%">
              <Text $fontSize="1.6rem" $fontWeight="bold">
                DNI
              </Text>
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container
              $direction="row"
              $justifyContent="center"
              $alignItems="center"
              $bgColor="#2050A9"
              $height="40px"
              $width="100%">
              <Text $fontSize="1.6rem" $fontWeight="bold">
                APODERADO
              </Text>
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container
              $direction="row"
              $justifyContent="center"
              $alignItems="center"
              $bgColor="#2050A9"
              $height="40px"
              $width="100%">
              <Text $fontSize="1.6rem" $fontWeight="bold">
                TELÉFONO
              </Text>
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container
              $direction="row"
              $justifyContent="center"
              $alignItems="center"
              $bgColor="#2050A9"
              $height="40px"
              $width="100%">
              <Text $fontSize="1.6rem" $fontWeight="bold">
                VER
              </Text>
            </Container>
          </Table.Header.Item>
        </Table.Header>
        <Table.Body>
          {alumnos.map((alumno, index) => {
            const apoderado = alumno.apoderados ? alumno.apoderados[0].nombreCompleto : '';
            const telefono = alumno.apoderados ? alumno.apoderados[0].telefono : '';
            return (
              <Fragment key={index}>
                <Table.Body.Item>
                  <Container
                    onClick={() => handleRowClick(index)}
                    $bgColor={selectedRow === index ? '#90C0F0' : 'transparent'}
                    $direction="row"
                    $justifyContent="left"
                    $alignItems="center"
                    $padding="0 0 0 5px"
                    $height="30px"
                    $width="100%">
                    <Text>{`[${formatListIndex(index)}] ${formatNombreCompletoForList(alumno.nombreCompleto)}`}</Text>
                  </Container>
                </Table.Body.Item>
                <Table.Body.Item>
                  <Container
                    $bgColor={selectedRow === index ? '#90C0F0' : 'transparent'}
                    $direction="row"
                    $justifyContent="center"
                    $alignItems="center"
                    $padding="0 0 0 5px"
                    $height="30px"
                    $width="100%">
                    <Text>{alumno.dni}</Text>
                  </Container>
                </Table.Body.Item>
                <Table.Body.Item>
                  <Container
                    $bgColor={selectedRow === index ? '#90C0F0' : 'transparent'}
                    $direction="row"
                    $justifyContent="left"
                    $alignItems="center"
                    $padding="0 0 0 5px"
                    $height="30px"
                    $width="100%">
                    <Text $width="90%">{`${apoderado.toUpperCase()}`}</Text>
                    <Container
                      onClick={() => setSelectedAlumno(alumno)}
                      $bgColor={selectedRow === index ? '#90C0F0' : 'transparent'}
                      $direction="row"
                      $justifyContent="center"
                      $alignItems="center"
                      $padding="0 0 0 5px"
                      $height="30px"
                      $width="10%">
                      <Icon $color="#2050A9" $pointer $fontSize="16px">
                        <FaEdit />
                      </Icon>
                    </Container>
                  </Container>
                </Table.Body.Item>
                <Table.Body.Item>
                  <Container
                    $bgColor={selectedRow === index ? '#90C0F0' : 'transparent'}
                    $direction="row"
                    $justifyContent="center"
                    $alignItems="center"
                    $padding="0 0 0 5px"
                    $height="30px"
                    $width="100%">
                    <Text>{`${telefono}`}</Text>
                  </Container>
                </Table.Body.Item>
                <Table.Body.Item>
                  <Container
                    $bgColor={selectedRow === index ? '#90C0F0' : 'transparent'}
                    $direction="row"
                    $justifyContent="center"
                    $alignItems="center"
                    $padding="0 0 0 5px"
                    $height="30px"
                    $width="100%">
                    <Icon $color="#2050A9" $pointer $fontSize="16px">
                      <FaEye />
                    </Icon>
                  </Container>
                </Table.Body.Item>
              </Fragment>
            );
          })}
        </Table.Body>
      </Table>
    </Container>
  );
  function handleRowClick(rowIndex: number) {
    if (selectedRow === rowIndex) {
      setSelectedRow(null); // Deseleccionar si se hace clic en la misma fila
    } else {
      setSelectedRow(rowIndex);
    }
  }
}
