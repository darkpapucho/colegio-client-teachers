type PensionNoPagada = {
  mes: number;
  pagado: false;
  monto_pagar: number;
  monto_pagado: number;
  fecha: '';
};

type PensionPagada = {
  mes: number;
  pagado: true;
  monto_pagar: number;
  monto_pagado: number;
  fecha: string;
  reciboId: string;
};

type Pension = PensionPagada | PensionNoPagada;

type ComentarioPension = {
  fecha: string;
  detalle: string;
};
