import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Scrap from "./pages/Scrap";
import styled from "styled-components";
import Footer from "./components/Footer";
import Top from "./components/Top";
import Modal from "./components/Modal";
import useThrottling from "./hooks/useThrottling";
import { useAppDispatch, useTypedSelector } from "./modules/store";
import { useEffect, useRef } from "react";
import { SCROLL_TOP, setYOffset } from "./modules/slices/scrollSlice";

function App() {
  const { isOpen } = useTypedSelector(({ modal }) => modal);
  const { screenY } = useTypedSelector(({ scroll }) => scroll);
  const mainRef = useRef<HTMLElement | null>();

  const throttling = useThrottling();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleScroll = ({ target }: Event) => {
      throttling(() => {
        const { scrollTop } = target as HTMLElement;
        dispatch(setYOffset(scrollTop));
      });
    };
    mainRef.current?.addEventListener("scroll", handleScroll);
    return () => mainRef.current?.removeEventListener("scroll", handleScroll);
  }, [dispatch, throttling]);

  /**
   * -1은 스크롤 위치 초기화입니다. -1이 들어오면 스크롤이 최상단(top)으로 이동합니다.
   */
  useEffect(() => {
    if (screenY !== 0) mainRef.current?.scrollTo({ top: screenY });
    if (screenY === SCROLL_TOP) mainRef.current?.scrollTo({ top: 0 });
  }, [screenY]);

  return (
    <Container>
      <Top />
      <Main ref={(node) => (mainRef.current = node)}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scrap" element={<Scrap />} />
        </Routes>
      </Main>
      <Footer />
      {isOpen && <Modal />}
    </Container>
  );
}

const Main = styled.main`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 335px;
  height: 664px;
  left: 20px;
  top: 124px;
  gap: 8px;
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
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;

export default App;
