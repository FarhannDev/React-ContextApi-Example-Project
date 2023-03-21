import InputGroup from "react-bootstrap/InputGroup";
import DataContext from "../../context/PostContext";
import { useEffect, useRef, useContext } from "react";
import { Row, Col, Form } from "react-bootstrap";

export default function SearchPost({ posts }) {
  const inputRef = useRef();
  const { searchPosts, setSearchPosts, setSearchResults } =
    useContext(DataContext);

  useEffect(() => {
    const filteredResult = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchPosts.toLowerCase()) ||
        post.body.toLowerCase().includes(searchPosts.toLowerCase())
    );

    setSearchResults(filteredResult);
  }, [posts, searchPosts, setSearchResults]);

  const onSearchChangeEventHandler = (e) => setSearchPosts(e.target.value);

  return (
    <div className="search-post-container py-3">
      <Row className="justify-content-end">
        <Col lg={5} md={6} sm={12}>
          <Form onSubmit={(e) => e.preventDefault()} autoComplete="off">
            <InputGroup className="mb-3">
              <Form.Control
                type="search"
                ref={inputRef}
                value={searchPosts}
                onChange={onSearchChangeEventHandler}
                placeholder="Cari semua postingan..."
                aria-label="Cari semua postingan..."
              />
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
