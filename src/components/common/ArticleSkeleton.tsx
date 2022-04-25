import { Skeleton } from "@mui/material";
const ArticleSkeleton = () => {
  return (
    <div>
      <Skeleton
        variant="rectangular"
        width={335}
        height={104}
        sx={{ borderRadius: "8px" }}
      />
    </div>
  );
};

export default ArticleSkeleton;
