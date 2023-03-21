import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import Message from "../shared/Message";
import styles from "../../styles/articles.module.css";

export default function SearchResultPost({ result }) {
  return (
    <>
      {!result.length && <Message message="Postingan tidak ditemukan." />}
      {result && (
        <Row className="justify-content-arround">
          {result.map((result, index) => (
            <Col key={index} xl={6} md={6} sm={12}>
              <Card body className={styles.cardArticle}>
                <Card.Title className={styles.cardArticleTitle}>
                  {result.title}
                </Card.Title>
                <Card.Text className={styles.cardArticleBody}>
                  {`${result.body.substring(0, 120)}... Selengkapnya`}
                </Card.Text>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
