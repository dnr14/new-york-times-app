import { Skeleton } from "@mui/material";
import { FC } from "react";

const ArticleSkeleton: FC<ArticleSkeletonProps> = ({ height, width }) => {
  return (
    <div>
      <Skeleton
        variant="rectangular"
        width={width}
        height={height}
        sx={{ borderRadius: "8px" }}
      />
    </div>
  );
};

export default ArticleSkeleton;
