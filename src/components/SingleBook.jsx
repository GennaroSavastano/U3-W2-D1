import { Component } from "react";
import { Badge, Card, Col } from "react-bootstrap";
// import CommentArea from "./CommentArea"; disattivo visualizzazione di CommentArea

class SingleBook extends Component {
  // state = {
  //   selected: false,
  // };
  render() {
    console.log(this.props);
    return (
      <Col>
        <Card className={this.props.book.asin === this.props.selectedBookAsin ? "border-danger" : ""}>
          <Card.Img
            variant="top"
            src={this.props.book.img}
            onClick={() => {
              this.props.changeBookSelected(this.props.book);
              // this.setState({ selected: !this.state.selected });
            }}
          />
          <Card.Body>
            <Card.Title>{this.props.book.title}</Card.Title>
            <Card.Text>{this.props.book.category}</Card.Text>
            <Card.Text>
              <Badge bg="info">€{this.props.book.price}</Badge>
            </Card.Text>

            {/* disattivo visualizzazione di CommentArea in SingleBook {this.state.selected && <CommentArea asin={this.props.book.asin} />} */}
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default SingleBook;
