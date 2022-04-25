import styled from "styled-components";

const Modal = () => {
  return (
    <>
      <ModalBackdrop></ModalBackdrop>
      <ModalWrapper>모달입니다.</ModalWrapper>
    </>
  );
};

const ModalBackdrop = styled.div`
  position: absolute;
  width: 375px;
  height: 812px;
  left: 0px;
  top: 0px;

  background: #000000;
  opacity: 0.5;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;

  position: absolute;
  width: 335px;
  height: 480px;
  left: 20px;
  top: 166px;

  background: #ffffff;
  border-radius: 16px;
`;

export default Modal;
