import { Skeleton } from "@mui/material";

const ArticleSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      width={335}
      height={104}
      sx={{ borderRadius: "8px", margin: "8px 0" }}
    />
  );
};

export default ArticleSkeleton;
