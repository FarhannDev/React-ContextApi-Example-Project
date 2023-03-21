import React from "react";
import { Route, Routes } from "react-router-dom";

// Components:include
import PageNotFound from "./components/PageNotFound";
import PostHome from "./components/posts/PostHome";
import AddNewPost from "./components/posts/AddNewPost";
import EditPost from "./components/posts/EditPost";
import PostSingle from "./components/posts/PostSingle";
import Layout from "./components/shared/Layout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostHome />} />
        <Route path="post">
          <Route index element={<AddNewPost />} />
          <Route path=":id" element={<PostSingle />} />
          <Route path=":id/edit" element={<EditPost />} />
        </Route>
        <Route path="*" element={PageNotFound} />
      </Route>
    </Routes>
  );
}
