import styled from 'styled-components';
import { Container } from '../../../../components/Shared/Container/Container';
import React, { useState, useRef, useContext } from 'react';
import { RegistroPrimariaContext } from './RegistroTablePrimaria';
import { Periodo } from '../../../../types/gradoSalon';

const NotaContainer = styled(Container)`
  border: 1px solid #cacaca;
  border-right: none;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type='number'] {
    -moz-appearance: textfield; /* Firefox */
    width: 100%;
    outline: none;
    text-align: center;
  }
`;
export default function NotaCell({
  initValue,
  type,
  field,
  periodo,
  alumnoId,
  width,
}: {
  width: string;
  alumnoId: string;
  periodo: Periodo;
  initValue: number;
  type: 'curso' | 'conducta';
  field: string;
}) {
  const { dispatch } = useContext(RegistroPrimariaContext)!;
  const [value, setValue] = useState<number>(initValue);

  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <NotaContainer $width={width} $justifyContent="center" $bgColor="white" $height="30px">
      <input ref={inputRef} type="number" inputMode="numeric" min={0} max={20} onChange={handleChange} value={value} onFocus={onFocus}></input>
    </NotaContainer>
  );
  function onFocus() {
    inputRef!.current?.select();
  }
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const rawValue = event.currentTarget.value;
    let value = +rawValue;

    if (value > 20) {
      value = 20;
    }
    if (value < 0) {
      value = 0;
    }
    setValue(Math.floor(value));
    if (type === 'conducta') {
      if (field === 'PPFF') {
        dispatch({ type: 'update-conducta-ppff', payload: { value, periodo, alumnoId } });
      } else if (field === 'alumno') {
        dispatch({ type: 'update-conducta-alumno', payload: { value, periodo, alumnoId } });
      }
    } else if (type === 'curso') {
      dispatch({ type: 'update-nota-curso', payload: { value, periodo, alumnoId, cursoKey: field } });
    }
  }
}
