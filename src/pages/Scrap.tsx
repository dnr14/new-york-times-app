import { useEffect } from "react";
import { add } from "../modules/slices/screenSlice";
import { useAppDispatch } from "../modules/store";

const Scrap = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("여기도 2번?");

    dispatch(add([5, 6, 7, 8, 9, 10]));
  }, []);

  return <div>스크랩</div>;
};

export default Scrap;
