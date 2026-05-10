import Table from '../../../../components/Shared/Table/Table';
import { CURSO_SALON, RecordNotas } from '../../../../types/notas';
import { FaCheck } from 'react-icons/fa';
import { RiCloseCircleFill } from 'react-icons/ri';
import { Fragment } from 'react/jsx-runtime';
import { Container } from '../../../../components/Shared/Container/Container';
import DisplayHoverMessage from '../../../../components/Shared/DisplayHoverMessage/DisplayHoverMessage';
import { theme } from '../../../../config/styled/styled';
import { useContext, useState } from 'react';
import SpecialBlock from './SpecialBlock';
import { ConvertPeriodoToIndex } from '../utils';
import { Periodo } from '../../../../types/gradoSalon';
import NotaTab from './NotaTab';
import { RegistroPrimariaContext } from './RegistroTablePrimaria';
import ConductaTab from './ConductaTab';
import EditConClusionesDescriptivasModal from '../EditConclusionesDescriptivasModal';
import { Profesor, useProfesor } from '../../../../hooks/useProfesor';

import Loader from '../../../../components/Shared/Loader/Loader';
import useGradoSeccionSearchParams from '../../../../hooks/useGradoSeccionSearchParams';

export default function RegistroTable({ cursosProfesor, registro, periodo }: { cursosProfesor: CURSO_SALON[]; registro: RecordNotas[]; periodo: Periodo }) {
  const profesor = useProfesor((state) => state.profesor) as Profesor;
  const [showCDModal, setShowCDModal] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<RecordNotas | undefined>(undefined);
  const { dispatch } = useContext(RegistroPrimariaContext)!;
  const { grado, seccion } = useGradoSeccionSearchParams();
  const isTutor = profesor.salones.some((salon) => salon.label === `${grado} ${seccion}` && salon.tutor);

  const gridTemplateCols = `32rem repeat(${cursosProfesor.length}, 42px) ${isTutor ? '8rem 8rem 32px 32px 4rem' : ''}`;

  if (!cursosProfesor || cursosProfesor.length == 0) return <Loader />;
  return (
    <>
      {showCDModal && selectedRecord && (
        <EditConClusionesDescriptivasModal
          onCloseModal={() => setShowCDModal(false)}
          data={{
            alumnoId: selectedRecord.alumnoId,
            nombres: selectedRecord.alumno.split(', ')[1],
            apellidos: selectedRecord.alumno.split(', ')[0],
            periodo,
            data: selectedRecord.conclusionesDescriptivas[ConvertPeriodoToIndex(periodo)],
          }}
          saveHandler={saveConclusionesDescriptivas}
        />
      )}

      <Table $gridTempCols={gridTemplateCols}>
        <Table.Header>
          <Table.Header.Item>Alumno</Table.Header.Item>

          {cursosProfesor.map((curso) => (
            <Table.Header.Item key={curso.key}>
              <DisplayHoverMessage label={curso.code} message={curso.label} />
            </Table.Header.Item>
          ))}
          {isTutor && (
            <>
              <Table.Header.Item>
                <SpecialBlock field="Tardan." />
              </Table.Header.Item>
              <Table.Header.Item>
                <SpecialBlock field="Inasis." />
              </Table.Header.Item>
              <Table.Header.Item>
                <DisplayHoverMessage label={'CA'} message="conducta alumno" />
              </Table.Header.Item>
              <Table.Header.Item>
                <DisplayHoverMessage label={'CP'} message="conducta PPFF" />
              </Table.Header.Item>
              <Table.Header.Item>
                <DisplayHoverMessage label={'CD'} message="conclusiones descriptivas" />
              </Table.Header.Item>
            </>
          )}
        </Table.Header>
        <Table.Body>
          {registro.map((row, index) => {
            return (
              <Fragment key={row.alumnoId}>
                <Table.Body.Item>
                  <Container $width="100%" $alignItems="center" $justifyContent="flex-start" $height="30px">
                    {`[${index + 1}]` + row.alumno}
                  </Container>
                </Table.Body.Item>

                {cursosProfesor.map((curso) => {
                  const nota = row.cursos[curso.key]?.[ConvertPeriodoToIndex(periodo)] ?? 0;
                  return (
                    <Table.Body.Item key={curso.key}>
                      <NotaTab periodo={periodo} alumnoId={row.alumnoId} cursoKey={curso.key} initValue={nota} />
                    </Table.Body.Item>
                  );
                })}
                {isTutor && (
                  <>
                    <Table.Body.Item>
                      <Container $width="100%" $direction="row" $bgColor="white" $gap="1px" $padding="0">
                        <Container $width="50%" $bgColor={theme.colors.tertiary.light} $height="30px" $alignItems="center" $justifyContent="center">
                          {row.tardanzas.justificadas[ConvertPeriodoToIndex(periodo)]}
                        </Container>
                        <Container $width="50%" $bgColor={theme.colors.tertiary.light} $height="30px" $alignItems="center" $justifyContent="center">
                          {row.tardanzas.injustificadas[ConvertPeriodoToIndex(periodo)]}
                        </Container>
                      </Container>
                    </Table.Body.Item>
                    <Table.Body.Item>
                      <Container $width="100%" $direction="row" $bgColor="white" $gap="1px" $padding="0">
                        <Container $width="50%" $bgColor={theme.colors.tertiary.light} $height="30px" $alignItems="center" $justifyContent="center">
                          {row.inasistencias.justificadas[ConvertPeriodoToIndex(periodo)]}
                        </Container>
                        <Container $width="50%" $bgColor={theme.colors.tertiary.light} $height="30px" $alignItems="center" $justifyContent="center">
                          {row.inasistencias.injustificadas[ConvertPeriodoToIndex(periodo)]}
                        </Container>
                      </Container>
                    </Table.Body.Item>
                    <Table.Body.Item>
                      <ConductaTab initValue={row.conducta[ConvertPeriodoToIndex(periodo)]} alumnoId={row.alumnoId} periodo={periodo} field="alumno" />
                    </Table.Body.Item>
                    <Table.Body.Item>
                      <ConductaTab initValue={row.conductaPPFF[ConvertPeriodoToIndex(periodo)]} alumnoId={row.alumnoId} periodo={periodo} field="PPFF" />
                    </Table.Body.Item>
                    <Table.Body.Item>
                      <Container
                        $pointer
                        $height="30px"
                        $width="100%"
                        $alignItems="center"
                        $justifyContent="center"
                        onClick={() => {
                          setSelectedRecord(row);
                          setShowCDModal(true);
                        }}>
                        {row.conclusionesDescriptivas[ConvertPeriodoToIndex(periodo)].length > 20 ? (
                          <FaCheck color="#1fce56" size={20} />
                        ) : (
                          <RiCloseCircleFill color="#d34030" size={20} />
                        )}
                      </Container>
                    </Table.Body.Item>
                  </>
                )}
              </Fragment>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
  // function customSelectListener(event: CustomEvent) {
  //   const { name, value } = event.detail;
  //   if (name === EVENT_NAME) {
  //     dispatch({ type: 'updateNotaCurso', payload: value });
  //   } else if (name === 'editCompetencia') {
  //     const { cursoKey, index, nota, periodo } = value;
  //     // dispatchSelectedRegistro({ type: 'updateNotasSelectedRegistroAction', payload: { nota, cursoKey, periodo } });
  //   }
  // }
  function saveConclusionesDescriptivas(value: string) {
    const payload = {
      alumnoId: selectedRecord!.alumnoId,
      periodo,
      value,
    };

    dispatch({
      type: 'update-conclusiones-descriptivas',
      payload: payload,
    });
    setShowCDModal(false);
  }
}
