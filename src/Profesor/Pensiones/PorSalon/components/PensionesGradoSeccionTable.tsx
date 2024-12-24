import { useState } from 'react';

import { Fragment } from 'react/jsx-runtime';
import { Container } from '../../../../components/Shared/Container/Container';
import Table from '../../../../components/Shared/Table/Table';
import { AMatriculado } from '../../../../types/alumno';
import PensionInfoCard from './PensionInfoCard';

export default function PensionesGradoSeccionTable({ data }: { data: { alumnoId: string; numPensionesPagadas: number; pensiones: Pension[]; estudiante: AMatriculado }[] }) {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  // const [selectedData, setSelectedData] = useState<{ pension: Pension; estudiante: AMatriculado } | null>(null);
  // const [showPensionData, setShowPensionData] = useState(false);
  // console.log({ selectedData, showPensionData });
  return (
    <Container $direction="column" $width="max-content" $gap=".5rem">
      <Table $gridTempCols="37rem 8rem repeat(10, 4rem)">
        <Table.Header>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid black">
              ALUMNO
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid black">
              DNI
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid black">
              MAR
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid black">
              ABR
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid black">
              MAY
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid black">
              JUN
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid black">
              JUL
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid black">
              AGO
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid black">
              SEP
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid black">
              OCT
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid black">
              NOV
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid black">
              DIC
            </Container>
          </Table.Header.Item>
        </Table.Header>
        <Table.Body>
          {data.map((record, index) => {
            return (
              <Fragment key={record.alumnoId}>
                <Table.Body.Item>
                  {/* $key={index === selectedRow ? 2 : 1} */}
                  <Container $padding=".5rem" $width="100%" onClick={() => handleClickAlumnoName(index)} $pointer $bgColor={index === selectedRow ? 'white' : undefined}>
                    {`[${index + 1}] ` + record.estudiante.nombreCompleto}
                  </Container>
                </Table.Body.Item>
                <Table.Body.Item>
                  <Container $width="100%" $justifyContent="center" $alignItems="center" $padding=".5rem" $bgColor={index === selectedRow ? 'white' : undefined}>
                    {record.estudiante.dni ? record.estudiante.dni : 'NULL'}
                  </Container>
                </Table.Body.Item>
                <Table.Body.Item>
                  <PensionInfoCard
                    $index={index === selectedRow}
                    // onClick={() =>
                    //   handleClick(
                    //     record.pensiones.find((ele) => ele.mes == 2),
                    //     record.estudiante
                    //   )
                    // }
                    pension={record.pensiones.find((ele) => ele.mes == 2)}
                  />
                </Table.Body.Item>
                <Table.Body.Item>
                  <PensionInfoCard
                    $index={index === selectedRow}
                    // onClick={() =>
                    //   handleClick(
                    //     record.pensiones.find((ele) => ele.mes == 3),
                    //     record.estudiante
                    //   )
                    // }
                    pension={record.pensiones.find((ele) => ele.mes == 3)}
                  />
                </Table.Body.Item>
                <Table.Body.Item>
                  <PensionInfoCard
                    $index={index === selectedRow}
                    // onClick={() =>
                    //   handleClick(
                    //     record.pensiones.find((ele) => ele.mes == 4),
                    //     record.estudiante
                    //   )
                    // }
                    pension={record.pensiones.find((ele) => ele.mes == 4)}
                  />
                </Table.Body.Item>
                <Table.Body.Item>
                  <PensionInfoCard
                    $index={index === selectedRow}
                    // onClick={() =>
                    //   handleClick(
                    //     record.pensiones.find((ele) => ele.mes == 5),
                    //     record.estudiante
                    //   )
                    // }
                    pension={record.pensiones.find((ele) => ele.mes == 5)}
                  />
                </Table.Body.Item>
                <Table.Body.Item>
                  <PensionInfoCard
                    $index={index === selectedRow}
                    // onClick={() =>
                    //   handleClick(
                    //     record.pensiones.find((ele) => ele.mes == 6),
                    //     record.estudiante
                    //   )
                    // }
                    pension={record.pensiones.find((ele) => ele.mes == 6)}
                  />
                </Table.Body.Item>
                <Table.Body.Item>
                  <PensionInfoCard
                    $index={index === selectedRow}
                    // onClick={() =>
                    //   handleClick(
                    //     record.pensiones.find((ele) => ele.mes == 7),
                    //     record.estudiante
                    //   )
                    // }
                    pension={record.pensiones.find((ele) => ele.mes == 7)}
                  />
                </Table.Body.Item>
                <Table.Body.Item>
                  <PensionInfoCard
                    $index={index === selectedRow}
                    // onClick={() =>
                    //   handleClick(
                    //     record.pensiones.find((ele) => ele.mes == 8),
                    //     record.estudiante
                    //   )
                    // }
                    pension={record.pensiones.find((ele) => ele.mes == 8)}
                  />
                </Table.Body.Item>
                <Table.Body.Item>
                  <PensionInfoCard
                    $index={index === selectedRow}
                    // onClick={() =>
                    //   handleClick(
                    //     record.pensiones.find((ele) => ele.mes == 9),
                    //     record.estudiante
                    //   )
                    // }
                    pension={record.pensiones.find((ele) => ele.mes == 9)}
                  />
                </Table.Body.Item>
                <Table.Body.Item>
                  <PensionInfoCard
                    $index={index === selectedRow}
                    // onClick={() =>
                    //   handleClick(
                    //     record.pensiones.find((ele) => ele.mes == 10),
                    //     record.estudiante
                    //   )
                    // }
                    pension={record.pensiones.find((ele) => ele.mes == 10)}
                  />
                </Table.Body.Item>
                <Table.Body.Item>
                  <PensionInfoCard
                    $index={index === selectedRow}
                    // onClick={() =>
                    //   handleClick(
                    //     record.pensiones.find((ele) => ele.mes == 11),
                    //     record.estudiante
                    //   )
                    // }
                    pension={record.pensiones.find((ele) => ele.mes == 11)}
                  />
                </Table.Body.Item>
              </Fragment>
            );
          })}
        </Table.Body>
      </Table>
    </Container>
  );

  // function handleClick(pension: Pension | undefined, estudiante: AMatriculado) {
  //   if (!pension) return;
  //   setSelectedData({ pension, estudiante });
  //   setShowPensionData(true);
  // }
  function handleClickAlumnoName(rowIndex: number) {
    if (rowIndex === selectedRow) {
      setSelectedRow(null);
    } else {
      setSelectedRow(rowIndex);
    }
  }
}
