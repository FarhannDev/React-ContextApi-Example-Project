import { useContext } from "react";
import { Link } from "react-router-dom";
import Box from "../../components/box/Box";
import BoxTitle from "../../components/box/BoxTitle";
import BoxSubheading from "../../components/box/BoxSubheading";
import Loading from "../../components/shared/Loading";
import Message from "../../components/shared/Message";
import PostFeed from "./PostFeed";
import SearchPost from "./SearchPost";
import SearchResultPost from "./SearchResult";
// Context API
import DataContext from "../../context/PostContext";

export default function PostHome() {
  const { posts, searchPosts, searchResults, isLoading, fetchError } =
    useContext(DataContext);

  return (
    <>
      {fetchError && <Loading title={fetchError} />}
      {isLoading && !fetchError && <Loading title="Sedang memuat..." />}
      {!isLoading && !fetchError && (
        <Box>
          <div>
            <BoxTitle title="Postingan saya" />
            {posts.length >= 1 && (
              <BoxSubheading title={`${posts.length} Postingan ditulis `} />
            )}
          </div>

          <div>
            <SearchPost title="Cari semua postingan..." posts={posts} />
          </div>

          <Link to="/post" className="button-action btn btn-lg btn-danger">
            <i className="fas fa-plus ms-1"></i> Tambah Postingan Baru
          </Link>

          <div>
            {!searchPosts && <PostFeed posts={posts} />}
            {!searchPosts && !posts.length && (
              <Message message="Belum menambahkan postingan." />
            )}
            {searchPosts && <SearchResultPost result={searchResults} />}
          </div>
        </Box>
      )}
    </>
  );
}
