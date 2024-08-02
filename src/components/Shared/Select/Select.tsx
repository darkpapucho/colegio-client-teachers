import { useState } from 'react';
import styled, { css } from 'styled-components';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { Icon } from '../Icon/Icon';
import { theme } from '../../../config/styled/styled';
import { publishEvent } from '../../../utils/customEvent';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { Container } from '../Container/Container';
import useClickOutside from '../../../hooks/useClickOutside';

const StyledSelect = styled.div<{
  $width: string;
  $small?: boolean;
  $heigth?: string;
  $rect?: boolean;
}>`
  background-color: ${({ theme }) => theme.colors.secondary.normal};
  border-radius: 6px;
  color: white;
  position: relative;
  width: ${({ $width }) => $width};
  font-size: ${(props) => {
    if (props.$small) {
      return props.theme.fontSizes.text.small;
    } else {
      return props.theme.fontSizes.text.normal;
    }
  }};
  ${({ $heigth }) =>
    $heigth &&
    css`
      height: ${$heigth};
    `}
  ${({ $rect }) =>
    $rect &&
    css`
      border-radius: 0;
    `}
`;

//container for StyledOpt
const StyledSelectOpts = styled.div<{ $isOpen: boolean }>`
  z-index: 10;
  width: 100%;
  position: absolute;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${({ $isOpen }) =>
    !$isOpen &&
    css`
      display: none;
    `}
`;
const StyledOpt = styled.div<{
  $small?: boolean;
  $primary?: boolean;
}>`
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.secondary.dark};
  width: 100%;
  ${({ $small, theme }) => {
    if ($small) {
      return css`
        padding: ${theme.paddings.small};
        font-size: ${theme.fontSizes.text.small};
      `;
    } else {
      return css`
        padding: ${theme.paddings.normal};
        font-size: ${theme.fontSizes.text.normal};
      `;
    }
  }}
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary.normal};
  }
  &:last-child {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;
const StyledSelectedOpt = styled.div<{ $small?: boolean; $bgColor?: string }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-align: right;
  justify-content: space-between;
  height: 100%;
  ${(props) => {
    if (props.$small) {
      return css`
        padding: ${props.theme.paddings.small};
      `;
    } else {
      return css`
        padding: ${props.theme.paddings.normal};
      `;
    }
  }}
  ${({ $bgColor }) =>
    $bgColor &&
    css`
      background-color: ${$bgColor};
    `}
`;

//#MAIN FUNCTIONAL COMPONENT

interface SelectProps<T> {
  width: string;
  options: { label: string; value: T }[];
  small?: boolean;
  name: string;
  defaultValue?: { label: string; value: T | null };
  label: string;
  rect?: boolean;
  heigth?: string;
  bgColor?: string;
}

export default function Select<T>({ options, width, small, defaultValue, name, label, heigth, rect, bgColor }: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<{
    label: string;
    value: T | null;
  }>(defaultValue ? defaultValue : { label: label, value: null });
  const { ref } = useClickOutside<HTMLDivElement>(() => setIsOpen(false));
  function toggle() {
    setIsOpen((old) => !old);
  }
  return (
    <StyledSelect $width={width} $small={small} $heigth={heigth} $rect={rect} ref={ref}>
      <StyledSelectedOpt onClick={() => toggle()} $small={small} $bgColor={bgColor}>
        <Container $width={`calc( 100% - 15px)`} $justifyContent="flex-end">
          {selectedOption.label}
        </Container>
        {isOpen ? (
          <Icon $fontSize={theme.fontSizes.text.normal} $primary $width="15px">
            {small ? <MdKeyboardArrowUp /> : <BsChevronUp />}
          </Icon>
        ) : (
          <Icon $fontSize={theme.fontSizes.text.normal} $primary $width="15px">
            {small ? <MdKeyboardArrowDown /> : <BsChevronDown />}
          </Icon>
        )}
      </StyledSelectedOpt>
      <StyledSelectOpts $isOpen={isOpen}>
        {options.map((option) => {
          return (
            <StyledOpt key={option.label} onClick={() => handleClick(option)} $small={small}>
              {option.label}
            </StyledOpt>
          );
        })}
      </StyledSelectOpts>
    </StyledSelect>
  );

  function handleClick(option: { label: string; value: T }) {
    setSelectedOption(option);
    publishEvent<T>('customSelect', { name, value: option.value });
    setIsOpen(false);
  }
}
