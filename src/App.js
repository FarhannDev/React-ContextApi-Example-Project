import React from "react";
import { Route, Switch } from "react-router-dom";
import { DataProvider } from "./context/PostContext";
import Layout from "./components/shared/Layout";
import Container from "./components/shared/Container";
import PageNotFound from "./components/PageNotFound";
import PostHome from "./components/posts/PostHome";
import AddNewPost from "./components/posts/AddNewPost";
import EditPost from "./components/posts/EditPost";
import PostSingle from "./components/posts/PostSingle";

export default function App() {
  return (
    <Layout>
      <Container>
        <DataProvider>
          <Switch>
            <Route exact path="/" component={PostHome} />
            <Route exact path="/post" component={AddNewPost} />
            <Route exact path="/post/:id" component={PostSingle} />
            <Route path="/post/:id/edit" component={EditPost} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </DataProvider>
      </Container>
    </Layout>
  );
}
