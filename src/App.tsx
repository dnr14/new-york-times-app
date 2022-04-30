import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Scrap from "./pages/Scrap";
import styled from "styled-components";
import Footer from "./components/Footer";
import Top from "./components/Top";
import Modal from "./components/Modal";
import useThrottling from "./hooks/useThrottling";
import useDebounce from "./hooks/useDebounce";
import { useAppDispatch, useTypedSelector } from "./modules/store";
import { useCallback, useEffect, useRef, useState } from "react";
import { SCROLL_TOP, setYOffset } from "./modules/slices/scrollSlice";
import ScrapEmty from "./components/ScrapEmty";
import Popup from "./components/common/Popup";
import { themeBackgroundGrayOne } from "./assets/styles/theme";

const popupInit: PopupState = {
  className: "green",
  isOpen: false,
  text: "",
};

function App() {
  const [popupState, setPopupState] = useState<PopupState>(popupInit);
  const { isOpen } = useTypedSelector(({ modal }) => modal);
  const { screenY } = useTypedSelector(({ scroll }) => scroll);
  const { scrapStatus, status, error } = useTypedSelector(({ home }) => home);
  const mainRef = useRef<HTMLElement | null>();

  const throttling = useThrottling();
  const dispatch = useAppDispatch();
  const debounce = useDebounce();

  const handleClose = useCallback(() => {
    setPopupState(popupInit);
  }, []);

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

  /** 스크랩 버튼을 연속으로 눌렀을 때 팝업창이 여러번 뜨는걸 방지하기 위해 디바운스를 사용합니다.
   * 첫클릭시 했던 행동을 팝업으로 알려줍니다.
   * 예를 들면 스크랩 여러개를 제거, 추가 행동을하여도 처음에 했던 행위만 팝업을 알려줍니다.
   */
  useEffect(() => {
    debounce(() => {
      if (scrapStatus !== "idle") {
        const SCRAP_ADD_TEXT = "스크랩을 추가 하였습니다.";
        const SCRAP_REMOVE_TEXT = "스크랩을 제거 하였습니다.";
        const isAdd = scrapStatus === "add";
        setPopupState({
          className: isAdd ? "green" : "red",
          isOpen: true,
          text: isAdd ? SCRAP_ADD_TEXT : SCRAP_REMOVE_TEXT,
        });
      }
    }, 500);
  }, [scrapStatus, debounce]);

  /* API 통신에 문제가 생겼을 때 팝업으로 알려줍니다. */
  useEffect(() => {
    if (status === "failed" && error.isError) {
      setPopupState({
        className: "red",
        isOpen: true,
        text: error.message ?? "서버에서 문제가 발생했습니다.",
      });
    }
  }, [status, error]);

  return (
    <Container>
      <Top />
      <Main ref={(node) => (mainRef.current = node)}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scrap" element={<Scrap />} />
          <Route
            path="*"
            element={<ScrapEmty text="없는 페이지 입니다. 😅" />}
          />
        </Routes>
      </Main>
      <Footer />
      {isOpen && <Modal />}
      {popupState.isOpen && (
        <Popup
          setIsOpen={handleClose}
          openDelay={300}
          closeDelay={1400}
          isOpen={true}
          autoClose={true}
          className={popupState.className}
        >
          {popupState.text}
        </Popup>
      )}
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
  background: ${themeBackgroundGrayOne};
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;

export default App;
