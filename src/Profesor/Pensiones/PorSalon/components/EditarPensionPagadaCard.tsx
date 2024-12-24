// import { CiEdit } from 'react-icons/ci';
// import { Button } from '../../../../../shared/Button';
// import { Container } from '../../../../../shared/Container';
// import Modal from '../../../../../shared/Modal';
// import { StyledInput } from '../../../../../shared/StyledInput';
// import { getDisplayPensionCardBgColor } from './utils';
// import { AMatriculado } from '../../../../../../types/alumno';
// import { useState, useContext } from 'react';
// import { Text } from '../../../../../shared/Text';
// import { errorHandler } from '../../../../../../utils/errorHandler';
// import { updateToken } from '../../../../../../utils/utils';
// import { MONTHS } from '../../../Calendario/EnableDays/utils';
// import { Pensiones } from '../../../../../../models/Pensiones';
// import toaster from 'react-hot-toast';
// import { PensionesByGradoSeccionContext } from '../PensionesByGradoSeccion';
// import Loader from '../../../../Loader/Loader';

// export default function EditarPensionPagadaCard({ selectedData, onCloseModal }: { onCloseModal: () => void; selectedData: { estudiante: AMatriculado; pension: PensionPagada } }) {
//   const [loading, setLoading] = useState(false);
//   const [editPensionPagada, setEditPensionPagada] = useState(false);
//   const [montoPagado, setMontoPagado] = useState(selectedData.pension.monto_pagado);
//   const [fechaPago, setFechaPago] = useState(selectedData.pension.fecha);
//   const { setData } = useContext(PensionesByGradoSeccionContext)!;
//   return (
//     <>
//       {loading && <Loader />}
//       <Modal width="36rem" title={selectedData.estudiante.nombreCompleto.toUpperCase()} onCloseModal={onCloseModal}>
//         <Container $direction="column" $width="100%" $bgColor="#0f0f0f" $padding="1rem" $gap=".6rem">
//           {editPensionPagada ? (
//             <Container $direction="row" $gap="1rem">
//               <Button $primary $width="max-conent" onClick={() => editarPensionPagada()} disabled={loading}>
//                 Modificar
//               </Button>
//               <Button $danger $width="max-conent" onClick={() => setEditPensionPagada(false)} disabled={loading}>
//                 Cancelar
//               </Button>
//             </Container>
//           ) : (
//             <Button $green $width="max-content" onClick={() => setEditPensionPagada(true)}>
//               Editar <CiEdit />
//             </Button>
//           )}
//           <Text $bold $fontSize="small" $color={getDisplayPensionCardBgColor(selectedData.pension, new Date().getMonth())}>
//             {convertIndexToMonth(selectedData.pension.mes).toUpperCase()}
//           </Text>
//           <Text $bold $fontSize="small" $color={getDisplayPensionCardBgColor(selectedData.pension, new Date().getMonth())}>
//             {'Recibo:' + selectedData.pension.reciboId ? selectedData.pension.reciboId : 'aqui falta el recibo'}
//           </Text>
//           {editPensionPagada ? (
//             <Container $color="white" $direction="row" $gap=".6rem" $alignItems="center">
//               <Text $width="12rem">FECHA DE PAGO</Text>
//               <StyledInput $width="16rem" type="datetime-local" defaultValue={fechaPago} onChange={(e) => setFechaPago(e.currentTarget.value)} />
//             </Container>
//           ) : (
//             <Text $bold $fontSize="small" $color={getDisplayPensionCardBgColor(selectedData.pension, new Date().getMonth())}>
//               {new Date(selectedData.pension.fecha).toLocaleDateString('es-PE', {
//                 timeZone: 'America/Lima',
//                 day: '2-digit',
//                 month: 'long',
//                 year: 'numeric',
//                 hour: '2-digit',
//                 minute: '2-digit',
//                 second: '2-digit',
//               })}
//             </Text>
//           )}
//           {editPensionPagada ? (
//             <Container $color="white" $direction="row" $gap=".6rem" $alignItems="center">
//               <Text $width="12rem">MONTO PAGADO S/.</Text>
//               <StyledInput $width="16rem" type="number" min={10} step={10} defaultValue={montoPagado} onChange={(ev) => setMontoPagado(+ev.currentTarget.value)} />
//             </Container>
//           ) : (
//             <Text $bold $fontSize="small" $color={getDisplayPensionCardBgColor(selectedData.pension, new Date().getMonth())}>
//               {'S/. ' + selectedData.pension.monto_pagado}
//             </Text>
//           )}
//         </Container>
//       </Modal>
//     </>
//   );
//   function convertIndexToMonth(index: number) {
//     return MONTHS[index];
//   }

//   async function editarPensionPagada() {
//     const pensionPagada = selectedData.pension as PensionPagada;

//     try {
//       setLoading(true);
//       const response = await Pensiones.editarPensionPagada({ montoPagado, fechaPago, reciboId: pensionPagada.reciboId, alumnoId: selectedData.estudiante._id });

//       updateToken(response);
//       if (!response.data.ok) throw new Error(response.data.message);

//       setData((old) => {
//         const newData = old.map((record) => {
//           if (record.alumnoId === selectedData.estudiante._id) {
//             record.pensiones = record.pensiones.map((pension) => {
//               if (pension.mes === selectedData.pension.mes) {
//                 pension.monto_pagar = montoPagado;
//                 pension.monto_pagado = montoPagado;
//                 pension.fecha = fechaPago;
//               }
//               return pension;
//             });
//           }
//           return record;
//         });
//         return newData;
//       });
//       toaster.success('pension editada exitosamente');
//       setEditPensionPagada(false);
//     } catch (err) {
//       errorHandler(err);
//     } finally {
//       setLoading(false);
//     }
//   }
// }
