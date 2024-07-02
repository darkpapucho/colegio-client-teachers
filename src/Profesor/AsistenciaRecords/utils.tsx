import { AsistenciaRecord, AsistenciaValue } from './types';
export const alumnoNameWidthCell = 36;
export const dayCellWidth = 2;
export const VALID_MONTHS = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
] as const;
export type MONTH_NAME = (typeof VALID_MONTHS)[number];
export function sortMonthNames(monthNames: MONTH_NAME[]) {
  return monthNames.sort((prev, curr) => {
    return VALID_MONTHS.indexOf(prev) > VALID_MONTHS.indexOf(curr) ? 1 : -1;
  });
}
export function getMonthsFromAsistenciaRecord(records: { month: MONTH_NAME; day: number }[]) {
  const tmpMonths: MONTH_NAME[] = [];
  const daysByMonth: { [key: string]: number[] } = {};
  records.forEach((record) => {
    if (!tmpMonths.includes(record.month)) {
      tmpMonths.push(record.month);
      daysByMonth[record.month] = [];
    }
    daysByMonth[record.month].push(record.day);
  });
  tmpMonths.forEach((month) => {
    daysByMonth[month] = daysByMonth[month].sort((prev, curr) => {
      return prev > curr ? 1 : -1;
    });
  });
  const gridTemplateCols = getGridTemplateColsForAsistenciaTable({ months: tmpMonths, daysByMonth });

  return { monthNames: tmpMonths, daysByMonth, gridTemplateCols };
}

function getGridTemplateColsForAsistenciaTable({ months, daysByMonth }: { months: MONTH_NAME[]; daysByMonth: { [key: string]: number[] } }) {
  let gridTemplateCols: string = `${alumnoNameWidthCell}rem`;
  const minLength = 12;
  months.forEach((month) => {
    const length = daysByMonth[month].length;
    const lengthToAdd = length * dayCellWidth;
    gridTemplateCols += lengthToAdd < minLength ? ` ${minLength}rem` : ` ${lengthToAdd}rem`;
  });
  return gridTemplateCols;
}

export function getAsistenciaValueFromRecords({
  records,
  day,
  monthName,
}: {
  day: number;
  monthName: MONTH_NAME;
  records: AsistenciaRecord[];
}): { asistencia: { value: AsistenciaValue; justificado: true | undefined }; dayId: string } | undefined {
  const result = records.find((record) => {
    return record.month === monthName && record.day === day;
  });
  if (!result) {
    return undefined;
  }
  const justificado = result.justificado;
  return { asistencia: { value: result.asistencia, justificado }, dayId: result!.dayId };
}
export function getBgColorOfCell({ asistenciaValue, justificado }: { asistenciaValue: AsistenciaValue; justificado: undefined | true }) {
  switch (asistenciaValue) {
    case '':
      return 'gray';
    case 'A':
      return 'green';
    case 'T':
      return 'orange';
    case 'F':
      if (justificado === true) return 'hotpink';
      return '#973131';
    default:
      return 'gray';
  }
}
