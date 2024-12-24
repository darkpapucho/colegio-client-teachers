import DisplayHoverMessage from '../../../../components/Shared/DisplayHoverMessage/DisplayHoverMessage';

export const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

const verde = '#00FF9C';
const red = '#FF6868';
const blue = '#40A2E3';
const gray = '#A6AEBF';
const orange = '#FF8000';
export function getDisplayPensionCardContent(pension: Pension | undefined, mesActual: number) {
  if (pension == undefined) return <DisplayHoverMessage width="100%" padding="0" label="NOI" message="no info" />;
  if (pension.pagado) {
    return <DisplayHoverMessage width="100%" padding="0" label="CAN" message={`cancelado-${MONTHS[pension.mes]}`} />;
  } else {
    if (pension.monto_pagado > 0 && pension.monto_pagado < pension.monto_pagar) {
      return <DisplayHoverMessage width="100%" padding="0" label="PAR" message={`parcialmente cancelado-${MONTHS[pension.mes]}`} />;
    }
    // if (pension.monto_pagado) {
    //   return <DisplayHoverMessage width="100%" padding="0" label="DIS" message={`disponible-${MONTHS[pension.mes]}`}/>;
    // }
    if (mesActual == pension.mes) {
      return <DisplayHoverMessage width="100%" padding="0" label="DIS" message={`disponible-${MONTHS[pension.mes]}`} />;
    }
    if (mesActual > pension.mes) {
      return <DisplayHoverMessage width="100%" padding="0" label="ATR" message={`atrasado-${MONTHS[pension.mes]}`} />;
    }
    return <DisplayHoverMessage width="100%" padding="0" label="PEN" message={`pendiente-${MONTHS[pension.mes]}`} />;
  }
}
export function getDisplayPensionCardBgColor(pension: Pension | undefined, mesActual: number): string {
  if (!pension) return '#fff';
  if (pension.pagado) {
    return verde;
  } else {
    if (pension.monto_pagado > 0 && pension.monto_pagado < pension.monto_pagar) {
      return orange;
    }
    if (mesActual == pension.mes) {
      return blue;
    }
    if (mesActual > pension.mes) {
      return red;
    }
    return gray;
  }
}
