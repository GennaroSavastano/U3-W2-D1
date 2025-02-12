import { Component } from "react";
import { Alert, Col, Container, Form, Row } from "react-bootstrap";

import SingleBook from "./SingleBook";
import CommentArea from "./CommentArea";

class BookList extends Component {
  state = {
    searchQuery: "",
    selectedBookAsin: "",
  };

  changeAsin = (asin) => this.setState({ selectedBookAsin: asin });

  render() {
    return (
      <Container>
        <Form.Control
          className="mt-4"
          type="text"
          placeholder="Cerca un titolo"
          value={this.state.searchQuery}
          onChange={(e) => this.setState({ searchQuery: e.target.value })}
        />
        <Row className="mt-4">
          <Col xs={1} sm={10} md={8}>
            <Row xs={1} sm={2} lg={4}>
              {this.props.books
                .filter((book) => book.title.toLowerCase().includes(this.state.searchQuery.toLowerCase()))
                .map((book) => (
                  <SingleBook
                    key={book.asin}
                    book={book}
                    changeAsin={this.changeAsin}
                    selectedBookAsin={this.state.selectedBookAsin}
                  />
                ))}
            </Row>
          </Col>
          <Col xs={1} sm={2} md={4}>
            {this.state.selectedBookAsin ? (
              <CommentArea asin={this.state.selectedBookAsin} />
            ) : (
              <Alert variant="warning">Seleziona un libro per visualizzare le recensioni !</Alert>
            )}
          </Col>
        </Row>

        {this.props.books.length === 0 && (
          <Alert variant="warning" className="mt-4">
            Premi un bottone per visualizzare dei libri👆
          </Alert>
        )}
      </Container>
    );
  }
}

export default BookList;
