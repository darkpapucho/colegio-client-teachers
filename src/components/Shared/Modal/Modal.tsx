import styled from 'styled-components';
import { motion, useDragControls } from 'framer-motion';
import { ReactNode, useEffect, useRef } from 'react';

import { Button } from '../Button/Button';
import { Container } from '../Container/Container';
import { Overlay } from '../Overlay/Overlay';
import { createPortal } from 'react-dom';

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
const StyledModal = styled.div<{ $width: string; $marginTop?: string }>`
  position: absolute;
  top: ${({ $marginTop }) => $marginTop || '35%'};
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
  width: ${({ $width }) => $width};
  padding: 0;
  .modal-container {
    z-index: 102;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 4px black;
  }
`;
const ModalHeader = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary.dark};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 1rem;
  border-bottom: 2px solid black;
  font-size: ${({ theme }) => theme.fontSizes.text.small};
  font-weight: 500;
  color: white;
  user-select: none;
`;

export default function Modal({
  children,
  width,
  title,
  onCloseModal,
  marginTop,
}: {
  marginTop?: string;
  children: ReactNode;
  width: string;
  title: string;
  onCloseModal: () => void;
}) {
  const controls = useDragControls();
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    document.getElementById('root')!.style.userSelect = 'none';
    return () => {
      document.getElementById('root')!.style.userSelect = 'auto';
    };
  }, []);
  return createPortal(
    <ModalContainer ref={ref}>
      <StyledModal $width={width} $marginTop={marginTop}>
        <motion.div
          className="modal-container"
          drag
          dragListener={false}
          dragControls={controls}
          dragElastic={0}
          dragMomentum={false}
          dragConstraints={ref}>
          <ModalHeader onPointerDown={(e) => controls.start(e)}>
            {title}
            <Button $danger onClick={() => onCloseModal()} $width="max-content">
              X
            </Button>
          </ModalHeader>
          <Container $direction="row" $width="100%" $bgColor="white" $padding="2rem">
            {children}
          </Container>
        </motion.div>
      </StyledModal>
      <Overlay />
    </ModalContainer>,
    document.querySelector('#portal')!
  );
  // function onDrag(event:React.PointerEvent<HTMLDivElement>){
  //   const target = event.target;
  // }
}
