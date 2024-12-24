// import { useRef, useState, useContext } from 'react';
// import { errorHandler } from '../../../../../../utils/errorHandler';
// import { updateToken } from '../../../../../../utils/utils';
// import { Button } from '../../../../../shared/Button';
// import { Container } from '../../../../../shared/Container';
// import Modal from '../../../../../shared/Modal';
// import { StyledInput } from '../../../../../shared/StyledInput';
// import { Text } from '../../../../../shared/Text';
// import { MONTHS } from '../../../Calendario/EnableDays/utils';
// import { Pensiones } from '../../../../../../models/Pensiones';
// import { PensionesByGradoSeccionContext } from '../PensionesByGradoSeccion';
// import { getDisplayPensionCardBgColor } from './utils';
// import { AMatriculado } from '../../../../../../types/alumno';
// import toaster from 'react-hot-toast';
// import Loader from '../../../../Loader/Loader';

// export default function PagarPensionCard({ onCloseModal, selectedData }: { selectedData: { estudiante: AMatriculado; pension: PensionNoPagada }; onCloseModal: () => void }) {
//   const [loading, setLoading] = useState(false);
//   const montoAbonadoRef = useRef<HTMLInputElement | null>(null);
//   const [fechaPagoActual, setFechaPagoActual] = useState(new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().slice(0, 16));
//   const { setData } = useContext(PensionesByGradoSeccionContext)!;
//   return (
//     <>
//       {loading && <Loader />}
//       <Modal width="36rem" title={selectedData.estudiante.nombreCompleto.toUpperCase()} onCloseModal={onCloseModal}>
//         <Container $direction="column" $gap="2rem" $width="100%">
//           <Text $width="100%" $textAlign="center" $bold $fontSize="small">
//             PAGAR PENSIÓN
//           </Text>
//           <Container $direction="row" $width="max-content" $gap="1rem" $border="1px solid black">
//             <Container $direction="column" $width="max-content" $bgColor="#0f0f0f" $padding="1rem" $gap="1rem" $height="8rem" $alignItems="center" $justifyContent="center">
//               <Text $bold $fontSize="small" $color={getDisplayPensionCardBgColor(selectedData.pension, new Date().getMonth())}>
//                 {convertIndexToMonth(selectedData.pension.mes).toUpperCase()}
//               </Text>
//               <Text $bold $fontSize="small" $color={getDisplayPensionCardBgColor(selectedData.pension, new Date().getMonth())}>
//                 S/. {selectedData.pension.monto_pagar}
//               </Text>
//             </Container>
//             <Container $direction="column" $padding="1rem" $gap="1rem" $justifyContent="center">
//               <StyledInput type="datetime-local" name="fecha" defaultValue={fechaPagoActual} onChange={(eve) => setFechaPagoActual(eve.currentTarget.value)} />
//               <Text $bold $fontSize="small" $color={getDisplayPensionCardBgColor(selectedData.pension, new Date().getMonth())}>
//                 {'Abonado: S/. ' + selectedData.pension.monto_pagado}
//               </Text>
//             </Container>
//           </Container>
//           <Container $direction="row" $gap=".1rem" $alignItems="center">
//             <Text $bold>S/.</Text>
//             <StyledInput
//               defaultValue={selectedData.pension.monto_pagar - selectedData.pension.monto_pagado}
//               name="monto_abonado"
//               min={0}
//               type="number"
//               ref={montoAbonadoRef}
//               step={10}
//               max={selectedData.pension.monto_pagar}
//             />
//           </Container>
//           <Container $gap="1rem" $direction="row">
//             <Button $width="max-content" $primary onClick={() => pagarPension(selectedData.pension.monto_pagar)} disabled={loading}>
//               {' '}
//               Pagar Pension
//             </Button>
//             <Button $width="max-content" $danger onClick={onCloseModal} disabled={loading}>
//               {' '}
//               Cancelar
//             </Button>
//           </Container>
//         </Container>
//       </Modal>
//     </>
//   );
//   function convertIndexToMonth(index: number) {
//     return MONTHS[index];
//   }
//   async function pagarPension(monto_pagar: number) {
//     try {
//       setLoading(true);
//       const monto_abonado = Number(montoAbonadoRef.current?.value);
//       const saldoPagar = Number(selectedData.pension.monto_pagar) - Number(selectedData.pension.monto_pagado);
//       if (!fechaPagoActual) throw new Error('fecha inválida');
//       if ((monto_abonado === 0 && monto_pagar > 0) || Number(monto_abonado) > saldoPagar) {
//         //|| Number(monto_abonado) <= saldoPagar / 2
//         throw new Error('monto inválido');
//       }
//       const response = await Pensiones.pagarPensionAlumnoIdMes({
//         monto_pagado: selectedData.pension.monto_pagado,
//         monto_abonado,
//         monto_pagar: selectedData.pension.monto_pagar,
//         fecha: fechaPagoActual,
//         mes: selectedData.pension.mes,
//         alumnoId: selectedData.estudiante._id,
//       });

//       updateToken(response);
//       if (!response.data.ok) {
//         throw new Error(response.data.message);
//       }
//       const reciboId = response.data.payload.reciboId;
//       //update table
//       setData((oldData) => {
//         const newData = oldData.map((record) => {
//           if (record.alumnoId === selectedData.estudiante._id) {
//             const newPensiones = record.pensiones.map((pension) => {
//               if (pension.mes === selectedData.pension.mes) {
//                 pension.fecha = fechaPagoActual;
//                 pension.monto_pagado = Number(monto_abonado) + selectedData.pension.monto_pagado;
//                 pension.pagado = saldoPagar - Number(monto_abonado) != 0 ? false : true;
//               }
//               return { ...pension, reciboId };
//             });
//             record.pensiones = newPensiones;
//           }
//           return record;
//         });
//         return newData;
//       });

//       toaster.success('pension pagada con exito');
//     } catch (err) {
//       errorHandler(err);
//     } finally {
//       setLoading(false);
//       onCloseModal();
//     }
//   }
// }
