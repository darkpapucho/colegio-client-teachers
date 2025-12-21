import { useSearchParams } from 'react-router-dom';
import useCustomEvent from './useCustomEvent';
import { Grado, Seccion } from '../types/gradoSalon';

export default function useGradoSeccionSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const grado = searchParams.get('grado') as Grado | null;
  const seccion = searchParams.get('seccion') as Seccion | null;

  useCustomEvent('customSelect', listener);

  function listener(event: CustomEvent) {
    const { name, value } = event.detail;
    setSearchParams((old) => {
      old.set(name, value);
      return old;
    });
  }

  return { grado, seccion, searchParams, setSearchParams };
}
