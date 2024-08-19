import { Fragment } from 'react/jsx-runtime';
import { Container } from '../../../components/Shared/Container/Container';
import Table from '../../../components/Shared/Table/Table';
import { AsistenciasList } from '../types';
import { alumnoNameWidthCell, getMonthsFromAsistenciaRecord, MONTH_NAME } from '../utils';
import MonthBody from './MonthBody';
import MonthHeader from './MonthHeader';
import { useState } from 'react';

export default function AsistenciaTable({ asistencias, availableDays }: { availableDays: { month: MONTH_NAME; day: number }[]; asistencias: AsistenciasList }) {
  const { monthNames, daysByMonth, gridTemplateCols } = getMonthsFromAsistenciaRecord(availableDays);
  const [selectedRow, setSelectedRow] = useState<string>('');
  return (
    <Table $gridTempCols={gridTemplateCols} $width="max-content" $border="1px solid black">
      <Table.Header>
        <Table.Header.Item>
          <Container $width="100%" $height="100%" $alignItems="center" $justifyContent="center">
            ALUMNO
          </Container>
        </Table.Header.Item>
        {monthNames.map((month) => {
          return (
            <Table.Header.Item key={month}>
              <MonthHeader monthName={month} days={daysByMonth[month]}></MonthHeader>
            </Table.Header.Item>
          );
        })}
      </Table.Header>
      <Table.Body>
        {asistencias.map((element, index) => {
          return (
            <Fragment key={index}>
              <Table.Body.Item>
                <Container
                  $direction="row"
                  $width={`${alumnoNameWidthCell}rem`}
                  onClick={() => handleClick(element.alumnoId)}
                  $bgColor={selectedRow === element.alumnoId ? 'black' : undefined}>
                  <Container $width="2.5rem" $color={selectedRow === element.alumnoId ? 'white' : undefined}>{`[${index + 1}]`}</Container>
                  <Container $width="100%" $color={selectedRow === element.alumnoId ? 'white' : undefined}>
                    {element.nombreCompleto}
                  </Container>
                </Container>
              </Table.Body.Item>
              {monthNames.map((monthName) => {
                return (
                  <Table.Body.Item key={monthName}>
                    <MonthBody selectedRow={selectedRow} alumnoId={element.alumnoId} monthName={monthName} records={element.records} days={daysByMonth[monthName]} />
                  </Table.Body.Item>
                );
              })}
            </Fragment>
          );
        })}
      </Table.Body>
    </Table>
  );
  function handleClick(alumnoId: string) {
    if (alumnoId === selectedRow) {
      setSelectedRow('');
    } else {
      setSelectedRow(alumnoId);
    }
  }
}
