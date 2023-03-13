import { createContext, useState, useEffect } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";

const PostContext = createContext({});
export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [searchPosts, setSearchPosts] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { data, fetchError, isLoading } = useAxiosFetch("http://example.com");

  useEffect(() => {
    setPosts(data);
  }, [data]);

  return (
    <PostContext.Provider
      value={{
        fetchError,
        isLoading,
        posts,
        setPosts,
        searchPosts,
        setSearchPosts,
        searchResults,
        setSearchResults,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
