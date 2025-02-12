import { Component } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import { Alert, Image, Spinner } from "react-bootstrap";

class CommentArea extends Component {
  state = {
    reviews: [],
    fetched: true,
  };

  fetchComments = async () => {
    const resp = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + this.props.asin, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2E0ZGUxYmNhMDcwNDAwMTU4YmY5NzkiLCJpYXQiOjE3Mzg4NTgwMTEsImV4cCI6MTc0MDA2NzYxMX0.KY1i3aAaFytdpVHLectYt_unBT7ZsLQJtlf6z-iXCXg",
      },
    });

    if (resp.ok) {
      const reviews = await resp.json();
      console.log(reviews);

      //   this.setState({reviews: reviews})
      this.setState({ reviews, fetched: true });
    }
  };

  componentDidMount() {
    console.log("componentDidMount()");
    this.fetchComments();
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps.asin);
    console.log(this.props.asin);
    if (prevProps.asin !== this.props.asin) {
      this.fetchComments();
    }
  }

  render() {
    console.log("RENDER COMMENT AREA", this.state.reviews);
    return (
      <div className="commentArea sticky-top">
        <Image fluid src={this.props.imgSrc} className="d-block mx-auto mb-5 w-75 p-5" />
        <h5>CommentArea</h5>
        <h6>Recensioni per {this.props.title} </h6>

        {this.state.fetched ? (
          this.state.reviews.length > 0 ? (
            <CommentList reviews={this.state.reviews} fetchComments={this.fetchComments} />
          ) : (
            <Alert variant="warning" className="mt-4">
              Non ci sono recensioni !
            </Alert>
          )
        ) : (
          <Spinner animation="border" variant="info" />
        )}

        <AddComment asin={this.props.asin} fetchComments={this.fetchComments} />
      </div>
    );
  }
}

export default CommentArea;
