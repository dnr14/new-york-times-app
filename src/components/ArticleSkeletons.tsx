import ArticleSkeleton from "./common/ArticleSkeleton";

const ArticleSkeletons = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, idx) => (
        <ArticleSkeleton key={idx} width={335} height={104} />
      ))}
    </>
  );
};

export default ArticleSkeletons;
