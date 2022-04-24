import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Scrap from "./pages/Scrap";
import styled from "styled-components";
import Footer from "./components/Footer";
import Top from "./components/Top";

function App() {
  return (
    <Container>
      <Top />
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scrap" element={<Scrap />} />
        </Routes>
      </Main>
      <Footer />
    </Container>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  position: absolute;
  width: 335px;
  height: 664px;
  left: 20px;
  top: 124px;
  overflow: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }
`;

const Container = styled.div`
  position: absolute;
  width: 375px;
  height: 812px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background: rgba(240, 241, 244, 1);
  border-radius: 30px;
  overflow: hidden;

  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;

export default App;
