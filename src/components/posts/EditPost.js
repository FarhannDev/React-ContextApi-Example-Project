import React, { useRef, useContext, useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Box from "../box/Box";
import BoxTitle from "../box/BoxTitle";
import Loading from "../shared/Loading";
import DataContext from "../../context/PostContext";

export default function EditPost() {
  const { id } = useParams();
  const { isLoading, fetchError, posts, setPosts } = useContext(DataContext);

  const [limitKarakterTitle, setLimitKarakterTitle] = useState(50);
  const [limitKarakterBody, setLimitKarakterBody] = useState(0);
  const [postEditTitle, setPostEditTitle] = useState("");
  const [postEditBody, setPostEditBody] = useState("");

  // const post = posts.filter((filtered) => filtered.id === id)[0];
  const post = posts.find((post) => post.id === id);
  const inputRef = useRef();
  const history = useHistory();

  useEffect(() => {
    post && setPostEditTitle(post.title);
    setPostEditBody(post.body);
  }, [post, setPostEditBody, setPostEditTitle]);

  const onPostTitleChangeEventHandler = (event) => {
    setLimitKarakterTitle(50);
    setPostEditTitle(event.target.value.slice(0, limitKarakterTitle));
  };

  const onPostBodyChangeEventHandler = (event) => {
    setLimitKarakterBody(1000);
    setPostEditBody(event.target.value.slice(0, limitKarakterBody));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const currentDate = new Date().toISOString();
      const updatePost = {
        id,
        title: postEditTitle,
        body: postEditBody,
        createdAt: post.createdAt,
        updatedAt: currentDate,
      };

      const response = await axios.put(
        `http://localhost:5000/posts/${id}`,
        updatePost
      );

      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );

      history.push(`/post/${id}`);

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Postingan diperbarui",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {fetchError && <Loading title={fetchError} />}
      {isLoading && !fetchError && <Loading title="Sedang memuat..." />}
      {!isLoading && !fetchError && (
        <>
          {!post && <Loading title="Halaman tidak ditemukan!" />}
          {post && (
            <Box>
              <div className="row justify-content-center">
                <div className="col-lg-7 col-sm-12 col-md-10">
                  <div className="pt-5">
                    <BoxTitle title="Perbarui postingan" />
                    <Form
                      onSubmit={onSubmitHandler}
                      className="py-3"
                      autoComplete="off"
                    >
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <div className="text-end">
                          <div className="ms-3"></div>Jumlah karakter tersisa:{" "}
                          {postEditTitle.length
                            ? limitKarakterTitle - postEditTitle.length
                            : 50}
                        </div>
                        <Form.Label>Judul postingan</Form.Label>
                        <Form.Control
                          ref={inputRef}
                          value={postEditTitle}
                          onChange={onPostTitleChangeEventHandler}
                          type="text"
                          placeholder="Judul postingan"
                          isInvalid={postEditTitle.length >= 50}
                          isValid={
                            postEditTitle.length && postEditTitle.length >= 10
                          }
                        />

                        <Form.Control.Feedback
                          className="font-weight-bold"
                          type="invalid"
                          role="alert"
                        >
                          Batas karakter sudah maksimal
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Deskripsi</Form.Label>
                        <Form.Control
                          ref={inputRef}
                          value={postEditBody}
                          onChange={onPostBodyChangeEventHandler}
                          as="textarea"
                          rows={8}
                          placeholder="Tuliskan isi postingan..."
                          isInvalid={
                            postEditBody && postEditBody.length >= 1000
                          }
                          isValid={postEditBody && postEditBody.length >= 30}
                        />
                        <Form.Control.Feedback
                          className="font-weight-bold"
                          type="invalid"
                          role="alert"
                        >
                          Batas karakter sudah maksimal
                        </Form.Control.Feedback>
                      </Form.Group>

                      <div className="text-end">
                        <Link to="/" className="btn btn-dark btn-lg">
                          Batalkan
                        </Link>
                        <Button
                          disabled={
                            postEditTitle.length >= 50 ||
                            postEditTitle.length >= 1000 ||
                            !postEditTitle.length ||
                            !postEditBody.length
                          }
                          className="ms-2"
                          variant="dark"
                          size="lg"
                          type="submit"
                        >
                          Perbarui
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </Box>
          )}
        </>
      )}
    </>
  );
}
