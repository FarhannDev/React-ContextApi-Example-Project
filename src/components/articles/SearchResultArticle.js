import React from "react";
import { Card } from "react-bootstrap";
import styles from "../../styles/articles.module.css";
import Message from "../shared/Message";

export default function SearchResultArticle({ results }) {
  return (
    <>
      {!results.length && <Message message="Artikel tidak ditemukan." />}
      <div className="row justify-content-arround">
        {results.map((result, index) => (
          <div key={index} className="col-xl-6 col-md-6 col-sm-12">
            <Card className={styles.cardArticle}>
              <Card.Body>
                <Card.Title className={styles.cardArticleTitle}>
                  {result.title}
                </Card.Title>
                <Card.Text className={styles.cardArticleBody}>
                  {result.contentSnipet}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
