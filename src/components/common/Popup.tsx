import { FC, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

/**
 *
 * @param isOpen 팝업을 랜더링할 지 결정하는 Props입니다.
 * @param closeDelay 팝업이 자동으로 닫히는 시간을 결정하는 Props입니다.
 * @param openDelay 팝업이 열리는 시간을 결정하는 Props입니다.
 * @param autoClose 자동으로 닫히는 기능을 사용할 지 결정하는 Props입니다.
 * @param className 팝업의 css를 결정하는 Props입니다.
 * @param setIsOpen 팝업의 닫힌 상태를 반환하는 콜백함수 입니다.
 * autoClose가 true여야 closeDelay로 넘긴 시간으로 작동하여 자동으로 닫힌힙니다.
 * false면 클릭해서 수동으로 닫아야 됩니다.
 * closeDelay는 openDelay보다 항상 큰 값이여야 제대로 작동합니다.
 */
const Popup: FC<PopUpProps> = ({
  isOpen,
  closeDelay,
  openDelay,
  children,
  autoClose,
  className,
  setIsOpen,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const isClosed = useRef<boolean>(false);

  const popUpClose = () => {
    setVisible(false);
    isClosed.current = true;
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!visible && isOpen && !isClosed.current) {
      timer = setTimeout(() => setVisible(true), openDelay);
    }

    if (isClosed.current) {
      timer = setTimeout(() => setIsOpen(false), openDelay);
      isClosed.current = false;
    }

    return () => {
      clearTimeout(timer);
    };
  }, [visible, isOpen, openDelay, setIsOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (autoClose) timer = setTimeout(() => popUpClose(), closeDelay);

    const cleanUp = () => {
      if (autoClose) clearTimeout(timer);
    };
    return cleanUp;
  }, [closeDelay, autoClose]);

  return (
    <PopupContainer
      onClick={popUpClose}
      visible={visible}
      className={className}
    >
      {children}
    </PopupContainer>
  );
};

Popup.defaultProps = {
  autoClose: false,
  openDelay: 500,
  closeDelay: 2000,
  className: "red",
};

const PopupContainerOpenCss = css`
  z-index: 20;
  transform: rotateX(0deg);
`;

const PopupContainerCloseCss = css`
  transition: transform 0.5s, z-index 1s ease-in;
`;

const PopupContainer = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 5%;
  right: 5%;
  color: white;
  cursor: pointer;
  z-index: 0;
  transition: transform 1s, z-index 0.25s ease-in;
  transform: rotateX(90deg);
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
  padding: 1rem;
  ${({ visible }) => visible && PopupContainerOpenCss}
  ${({ visible }) => !visible && PopupContainerCloseCss} 

  &.green {
    background: rgb(18, 184, 134);
  }
  &.red {
    background: #e74c3c;
  }
`;

export default Popup;
