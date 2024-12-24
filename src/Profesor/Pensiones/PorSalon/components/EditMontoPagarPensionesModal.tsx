// import { ChangeEvent, useContext, useState } from 'react';
// import { AMatriculado } from '../../../../../../types/alumno';
// import Modal from '../../../../../shared/Modal';
// import { Container } from '../../../../../shared/Container';
// import styled from 'styled-components';
// import { MONTHS } from '../../../Calendario/EnableDays/utils';
// import { getDisplayPensionCardBgColor } from './utils';
// import { Button } from '../../../../../shared/Button';
// import { PensionesByGradoSeccionContext } from '../PensionesByGradoSeccion';
// import { Pensiones } from '../../../../../../models/Pensiones';
// import { errorHandler } from '../../../../../../utils/errorHandler';
// import Loader from '../../../../Loader/Loader';
// import { updateToken } from '../../../../../../utils/utils';
// import toaster from 'react-hot-toast';
// import { Text } from '../../../../../shared/Text';

// const DivContainer = styled.div`
//   width: 100%;
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(8rem, max-content));
//   justify-content: center;
//   align-items: center;

//   padding: 1.6rem 0;
//   margin: 0;
//   gap: 0.5rem;
// `;

// export default function EditMontoPagarPensionesModal({
//   selectedData,
//   onCloseModal,
// }: {
//   onCloseModal: () => void;
//   selectedData: { estudiante: AMatriculado; pensiones: Pension[] };
// }) {
//   const { setData } = useContext(PensionesByGradoSeccionContext)!;
//   const [pensiones, setPensiones] = useState<Pension[]>(selectedData.pensiones);
//   const [loading, setLoading] = useState(false);
//   return (
//     <>
//       {loading && <Loader $zIndex={200} />}
//       <Modal title={selectedData.estudiante.nombreCompleto} width="40rem" onCloseModal={onCloseModal}>
//         <Container $direction="column" $width="100%" $gap="2rem">
//           <Text $width="100%" $textAlign="center" $bold $fontSize="small">
//             EDITAR MONTOS DE PENSIONES
//           </Text>
//           <DivContainer>
//             {selectedData.pensiones.map((pension) => {
//               return (
//                 <Container
//                   key={pension.mes}
//                   $width="100%"
//                   $border="1px solid red"
//                   $justifyContent="center"
//                   $padding=".5rem"
//                   $direction="column"
//                   $bgColor={getDisplayPensionCardBgColor(pension, new Date().getMonth())}>
//                   <p>{MONTHS[pension.mes].toUpperCase()}</p>
//                   <p>PENSION: S/.{pension.monto_pagar}</p>
//                   {!pension.pagado && (
//                     <input onChange={(event) => handleChange(event)} name={pension.mes + ''} type="number" min={0} max={200} defaultValue={pension.monto_pagar} step={10}></input>
//                   )}
//                 </Container>
//               );
//             })}
//           </DivContainer>
//           <Button $primary $width="max-content" onClick={saveChanges} disabled={loading}>
//             Guardar Cambios
//           </Button>
//         </Container>
//       </Modal>
//     </>
//   );
//   function handleChange(event: ChangeEvent<HTMLInputElement>) {
//     const { name, value } = event.target;
//     setPensiones((old) => {
//       const newPensiones = old.map((pension) => {
//         if (pension.mes === Number(name)) {
//           pension.monto_pagar = Number(value);
//         }
//         return pension;
//       });
//       return newPensiones;
//     });
//   }

//   async function saveChanges() {
//     try {
//       setLoading(true);
//       const response = await Pensiones.updateMontoPagarPensiones({ pensiones, alumnoId: selectedData.estudiante._id });
//       updateToken(response);
//       if (!response.data.ok) throw new Error(response.data.message);
//       setData((old) => {
//         const newData = old.map((record) => {
//           if (record.alumnoId === selectedData.estudiante._id) {
//             record.pensiones = pensiones;
//           }
//           return record;
//         });
//         return newData;
//       });
//       toaster.success('Se actualizaron las pensiones exitosamente');
//     } catch (err) {
//       errorHandler(err);
//     } finally {
//       setLoading(false);
//       onCloseModal();
//     }
//   }
// }
