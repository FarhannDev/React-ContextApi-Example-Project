import React, { useContext } from "react";
import Box from "../../components/box/Box";
import BoxTitle from "../../components/box/BoxTitle";
import BoxSubheading from "../../components/box/BoxSubheading";
import PostFeed from "./PostFeed";
import SearchPost from "./SearchPost";
import SearchResultPost from "./SearchResult";
import Loading from "../../components/shared/Loading";
import Message from "../../components/shared/Message";
import Button from "../../components/shared/Button";

// Context API
import DataContext from "../../context/PostContext";

export default function PostHome() {
  const { posts, searchPosts, searchResults, isLoading, fetchError } =
    useContext(DataContext);

  console.log({ isPost: { ...posts } });
  console.log({ isResults: { ...searchResults } });

  return (
    <>
      {fetchError && <Loading title={fetchError} />}
      {isLoading && !fetchError && <Loading title="Sedang memuat..." />}
      {!isLoading && !fetchError && (
        <Box>
          <div className="mx-md-2 mb-3">
            <BoxTitle title="Postingan saya" />
            {posts.length >= 1 && (
              <BoxSubheading title={`${posts.length} Postingan ditulis `} />
            )}
            <SearchPost title="Cari semua postingan..." posts={posts} />
          </div>

          <Button
            urlRedirect="/post"
            icon="fas fa-plus"
            name="Buat postingan baru"
          />

          {!searchPosts && <PostFeed posts={posts} />}
          {!searchPosts && !posts.length && (
            <Message message="Belum menambahkan postingan." />
          )}
          {searchPosts && <SearchResultPost result={searchResults} />}
        </Box>
      )}
    </>
  );
}
