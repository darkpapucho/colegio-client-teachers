import styled from 'styled-components';
import { Container } from '../../../components/Shared/Container/Container';
import { AsistenciaRecord } from '../types';
import { dayCellWidth, getAsistenciaValueFromRecords, getBgColorOfCell, MONTH_NAME } from '../utils';
import { DayCell } from './MonthHeader';

const DayCellValue = styled(DayCell)`
  border-top: none;
  color: white;
`;

export default function MonthBody({ monthName, days, records }: { records: AsistenciaRecord[]; monthName: MONTH_NAME; days: number[] }) {
  return (
    <Container $direction="row" $width="100%">
      {days.map((day) => {
        const result = getAsistenciaValueFromRecords({ monthName, day, records });
        if (!result) {
          return (
            <DayCellValue $justifyContent="center" $width={`${dayCellWidth}rem`} $bgColor="black" key={day}>
              X
            </DayCellValue>
          );
        }
        return (
          <DayCellValue
            $justifyContent="center"
            $width={`${dayCellWidth}rem`}
            $bgColor={getBgColorOfCell({ asistenciaValue: result.asistencia.value, justificado: result.asistencia.justificado })}
            key={day}>
            {result.asistencia.value ? result.asistencia.value : '-'}
          </DayCellValue>
        );
      })}
    </Container>
  );
}
