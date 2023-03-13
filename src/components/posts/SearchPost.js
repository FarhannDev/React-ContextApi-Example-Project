import React, { useEffect, useRef, useContext } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import DataContext from "../../context/PostContext";

export default function SearchPost({ title, posts }) {
  const inputRef = useRef();
  const { searchPosts, setSearchPosts, setSearchResults } =
    useContext(DataContext);

  useEffect(() => {
    const filteredResult = posts.filter((article) =>
      article.title.toLowerCase().includes(searchPosts.toLowerCase())
    );

    setSearchResults(filteredResult);
  }, [posts, searchPosts, setSearchResults]);

  const onSearchChangeEventHandler = (e) => setSearchPosts(e.target.value);

  return (
    <div className="py-3">
      <div className="row justify-content-end">
        <div className="col-lg-5 col-md-6 col-sm-12">
          <Form onSubmit={(e) => e.preventDefault()} autoComplete="off">
            <InputGroup className="mb-3">
              <Form.Control
                ref={inputRef}
                value={searchPosts}
                onChange={onSearchChangeEventHandler}
                placeholder={title}
                aria-label={title}
              />
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
}
