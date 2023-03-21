import React, { useRef, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Box from "../box/Box";
import BoxTitle from "../box/BoxTitle";
import Loading from "../shared/Loading";
import DataContext from "../../context/PostContext";

export default function AddNewPost() {
  const { isLoading, fetchError, posts, setPosts } = useContext(DataContext);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [limitKarakterTitle, setLimitKarakterTitle] = useState(50);
  const [limitKarakterBody, setLimitKarakterBody] = useState(0);

  const inputRef = useRef();
  const navigate = useNavigate();

  const onPostTitleChangeEventHandler = (event) => {
    setLimitKarakterTitle(50);
    setPostTitle(event.target.value.slice(0, limitKarakterTitle));
  };

  const onPostBodyChangeEventHandler = (event) => {
    setLimitKarakterBody(1000);
    setPostBody(event.target.value.slice(0, limitKarakterBody));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const uniqueId =
        Date.now().toString(36) +
        Math.floor(
          Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
        ).toString(36);
      const currentDate = new Date().toISOString();
      const newPosts = {
        id: uniqueId,
        title: postTitle,
        body: postBody,
        createdAt: currentDate,
        updatedAt: currentDate,
      };

      const response = await axios.post(
        "http://localhost:5000/posts",
        newPosts
      );

      setPosts([...posts, response.data]);
      navigate.push("/");
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Postingan baru ditambahkan",
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
        <Box>
          <div className="row justify-content-center">
            <div className="col-lg-7 col-sm-12 col-md-10">
              <div className="pt-5">
                <BoxTitle title="Tambah postingan baru" />
                <Form
                  onSubmit={onSubmitHandler}
                  className="py-3"
                  autoComplete="off"
                >
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <div className="text-end">
                      <div className="ms-3"></div>Jumlah karakter tersisa:{" "}
                      {postTitle.length
                        ? limitKarakterTitle - postTitle.length
                        : 50}
                    </div>
                    <Form.Label>Judul postingan</Form.Label>
                    <Form.Control
                      ref={inputRef}
                      value={postTitle}
                      onChange={onPostTitleChangeEventHandler}
                      type="text"
                      placeholder="Judul postingan"
                      isInvalid={postTitle.length >= 50}
                      isValid={postTitle.length && postTitle.length >= 10}
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
                      value={postBody}
                      onChange={onPostBodyChangeEventHandler}
                      as="textarea"
                      rows={8}
                      placeholder="Tuliskan isi postingan..."
                      isInvalid={postBody && postBody.length >= 1000}
                      isValid={postBody && postBody.length >= 30}
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
                        postTitle.length >= 50 ||
                        postTitle.length >= 1000 ||
                        !postTitle.length ||
                        !postBody.length
                      }
                      className="ms-2"
                      variant="dark"
                      size="lg"
                      type="submit"
                    >
                      Simpan
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Box>
      )}
    </>
  );
}
