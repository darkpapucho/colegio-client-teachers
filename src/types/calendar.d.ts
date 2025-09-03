export type EnableDayList = {
  day: number; // 1-31
  month: string; // 0 - 11
}[];

export type CalendarioList = {
  _id: string;
  day: number;
  month: string;
  createdAt: Date;
  status: 'enabled' | 'disabled';
};

export type CalendarioMonthsNames = 'marzo' | 'abril' | 'mayo' | 'junio' | 'julio' | 'agosto' | 'septiembre' | 'octubre' | 'noviembre' | 'diciembre';
