import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/articles.module.css";

export default function PostFeed({ posts }) {
  return (
    <div className="row justify-content-arround">
      {posts
        ?.sort()
        .reverse()
        .map((post, index) => (
          <div className="col-xl-6 col-md-6 col-sm-12" key={index}>
            <Link
              to={`/post/${post.id}`}
              className="text-decoration-none"
              aria-label="Selengkapnya"
            >
              <Card className={styles.cardArticle}>
                <Card.Body>
                  <Card.Title className={styles.cardArticleTitle}>
                    {post.title.length <= 50
                      ? post.title
                      : `${post.title.slice(0, 50)}...`}
                  </Card.Title>
                  <Card.Text className={styles.cardArticleBody}>
                    {`${post.body.slice(0, 120)}...`}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </div>
        ))}
    </div>
  );
}
