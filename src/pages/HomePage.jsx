import React, { useState } from "react";
import { getBlogs } from "@/services/apiBlog";
import BlogContainer from "@/ui_components/BlogContainer";
import Header from "@/ui_components/Header";
import PagePagination from "@/ui_components/PagePagination";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const numOfBlogsPerPage = 3;
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["blogs", page],
    queryFn: () => getBlogs(page),
    placeholderData: keepPreviousData,
  });

  const blogs = data?.results || [];
  // console.log("Blogs array:", blogs);
  const numOfPages = Math.ceil(data?.count / numOfBlogsPerPage);

  function handleSetPage(val) {
    setPage(val);
  }

  function incrementPageValue() {
    setPage((curr) => curr + 1);
  }

  function decrementPageValue() {
    setPage((curr) => curr - 1);
  }

  return (
    <>
      <Header />
      <BlogContainer isPending={isPending} blogs={blogs} />
      <PagePagination
        page={page}
        numOfPages={numOfPages}
        handleSetPage={handleSetPage}
        incrementPageValue={incrementPageValue}
        decrementPageValue={decrementPageValue}
      />
    </>
  );
};

export default HomePage;
