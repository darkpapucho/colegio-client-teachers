import { CalendarioList } from '../../types/calendar';
import { AsistenciaRecord, AsistenciaValue } from './types';
export const alumnoNameWidthCell = 36;
export const dayCellWidth = 2;
export const VALID_MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'] as const;
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
  const minLength = 8;
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
      return '#9a9c9c';
    case 'A':
      return '#059212';
    case 'T':
      return '#E8751A';
    case 'F':
      if (justificado === true) return '#FFAAAA';
      return '#C21010';
    default:
      return '#535353';
  }
}

export function getCurrentMonthName(): MONTH_NAME {
  let currentMonth = new Date().toLocaleDateString('es-PE', { timeZone: 'America/Lima', month: 'long' }).toLowerCase();

  if (currentMonth === 'enero' || currentMonth === 'febrero') {
    return 'marzo';
  }
  if (currentMonth == 'setiembre') {
    currentMonth = 'septiembre';
  }
  return currentMonth as MONTH_NAME;
}

export function getClosestDay(months: { [key: string]: Omit<CalendarioList, 'month'>[] }, selectedMonth: MONTH_NAME) {
  console.log({ months, selectedMonth });
  const currentMonthNumber = mapMonthNameToNumber(new Date().toLocaleDateString('es-ES', { timeZone: 'America/Lima', month: 'long' }));
  const selectedMonthNumber = mapMonthNameToNumber(selectedMonth);
  const currentDay = +new Date().toLocaleDateString('es-PE', { timeZone: 'America/Lima', day: 'numeric' });

  console.log({ currentMonthNumber, selectedMonthNumber, currentDay });
  if (months[selectedMonth].length > 0) {
    const sortedDays = months[selectedMonth].sort((prev, curr) => (prev.day > curr.day ? 1 : -1));
    console.log({ sortedDays });
    //si el mes seleccionado es el mes actual, buscar el dia actual en la lista de dias del mes
    if (selectedMonthNumber === currentMonthNumber) {
      return (
        sortedDays.find((row) => row.day === currentDay) || sortedDays.reduce((prev, curr) => (Math.abs(curr.day - currentDay) < Math.abs(prev.day - currentDay) ? curr : prev))
      );
    } else {
      return sortedDays[0];
    }
  }
  return undefined;
  // if (currentMonthNumber == selectedMonthNumber) {
  //   if (months[selectedMonth].length == 0) return undefined;
  //   const foundDay = months[selectedMonth].find((element) => {
  //     return element.day === currentDay;
  //   });
  //   if (foundDay) {
  //     return foundDay;
  //   } else {
  //     //sort days

  //     const closestDay = sortedDays.reduce((prev, curr) => (Math.abs(curr.day - currentDay) < Math.abs(prev.day - currentDay) ? curr : prev));
  //     return closestDay;
  //   }
  // } else {
  //   if (currentMonthNumber < selectedMonthNumber) {
  //     const result = sortedDays[0];
  //     console.log({ result });
  //     return result;
  //   } else {
  //     const result = sortedDays[sortedDays.length - 1];
  //     console.log({ result });
  //     return result;
  //   }
  // }
}

function mapMonthNameToNumber(monthName: string) {
  switch (monthName) {
    case 'enero':
      return 1;
    case 'febrero':
      return 2;
    case 'marzo':
      return 3;
    case 'abril':
      return 4;
    case 'mayo':
      return 5;
    case 'junio':
      return 6;
    case 'julio':
      return 7;
    case 'agosto':
      return 8;
    case 'septiembre':
    case 'setiembre':
      return 9;
    case 'octubre':
      return 10;
    case 'noviembre':
      return 11;
    case 'diciembre':
      return 12;
    default:
      return 1;
  }
}
