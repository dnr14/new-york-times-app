import { useEffect } from "react";

const Scrap = () => {
  useEffect(() => {
    console.log("여기도 2번?");
  }, []);

  return <div>스크랩</div>;
};

export default Scrap;
