import { useEffect } from 'react';
import { Overlay } from '../Overlay/Overlay';
import { Spinner } from '../Spinner/Spinner';

export default function Loader() {
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);
  return (
    <>
      <Overlay />
      <Spinner />
    </>
  );
}
