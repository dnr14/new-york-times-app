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
  position: fixed;
  top: 400px;
  left: 50%;
  transform: translate(-40%, -50%);
`;

export default Progress;
