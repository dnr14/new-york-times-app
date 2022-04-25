import CircularProgress from "@mui/material/CircularProgress";
import { FC } from "react";
import styled from "styled-components";

type ProgressProps = {
  isLoading: boolean;
};

const Progress: FC<ProgressProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <Wrapper>
      <CircularProgress size={60} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

export default Progress;