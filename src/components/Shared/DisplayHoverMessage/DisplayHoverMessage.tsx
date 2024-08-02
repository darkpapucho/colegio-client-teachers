import { ReactNode, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

const StyledHoverable = styled.div<{
  $bgColor?: string;
  $padding?: string;
  $width?: string;
}>`
  width: ${({ $width }) => $width || '100%'};
  text-align: center;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ $padding }) =>
    $padding &&
    css`
      padding: ${$padding};
    `}
  ${({ $bgColor }) =>
    $bgColor &&
    css`
      background-color: ${$bgColor};
    `}
`;
const StyledMessage = styled.div<{ $offset: number }>`
  position: absolute;
  padding: 4px;
  background-color: ${({ theme }) => theme.colors.primary.dark};
  color: white;
  top: -23px;
  left: ${({ $offset }) => $offset + 'px'};
  width: max-content;
  z-index: 100;
`;

export default function DisplayHoverMessage({
  message,
  label,
  bgColor,
  padding,
  width,
  classN,
}: {
  width?: string;
  padding?: string;
  bgColor?: string;
  label: ReactNode;
  message: string;
  classN?: string;
}) {
  const [showMessage, setShowMessage] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState<number>(0);
  useEffect(() => {
    if (!containerRef) return;
    const containerRect = containerRef.current?.getBoundingClientRect();
    const width = containerRect!.width;
    setOffset(width / 2);
  }, []);
  return (
    <StyledHoverable
      $width={width}
      $bgColor={bgColor}
      $padding={padding}
      onMouseEnter={() => setShowMessage(true)}
      onMouseLeave={() => setShowMessage(false)}
      ref={containerRef}
      className={classN}>
      {showMessage && <StyledMessage $offset={offset}>{message}</StyledMessage>}
      {label}
    </StyledHoverable>
  );
}
