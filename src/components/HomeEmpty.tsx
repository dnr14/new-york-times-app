import { memo } from "react";
import Empty from "./common/Empty";

const HomeEmpty = () => <Empty text="검색된 기사가 없습니다. 😞" top="35%" />;

export default memo(HomeEmpty);
