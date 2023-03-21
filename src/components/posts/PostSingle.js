import { useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import DataContext from "../../context/PostContext";
import Box from "../../components/box/Box";
import BoxTitle from "../../components/box/BoxTitle";
import Loading from "../../components/shared/Loading";

export default function PostSingle() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, posts, setPosts } = useContext(DataContext);
  const post = posts.filter((filtered) => filtered.id === id)[0];

  const onDeleteHandler = (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: "Hapus postingan",
        text: "Apakah kamu yakin menghapus postingan ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus",
        cancelButtonText: "Batalkan",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://localhost:5000/posts/${id}`);
          setPosts(posts.filter((post) => post.id !== id));
          navigate.push("/");
          Swal.fire("Dihapus", "Artikel dihapus.", "success");
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loading title="Sedang memuat..." />}
      {!isLoading && (
        <>
          {!post && <Loading title="Halaman tidak ditemukan..." />}
          {post && (
            <Box>
              <div className="d-flex justify-content-start flex-column col-lg-8">
                <Link to="/" className=" text-decoration-none text-white mb-3">
                  <i className="fas fa-arrow-left"></i> Kembali
                </Link>

                <BoxTitle title={`${post.title}`} />
                <div className="pt-3">
                  <p className="text-justify">Dibuat {post.createdAt}</p>
                  <p className="text-justify">{post.body}</p>
                </div>
              </div>
            </Box>
          )}
          <button
            onClick={onDeleteHandler}
            className="btn btn-danger btn-lg rounded"
          >
            Hapus
          </button>
          <Link
            to={`/post/${id}/edit`}
            className="btn btn-danger btn-lg rounded ms-2"
          >
            Edit
          </Link>
        </>
      )}
    </>
  );
}
