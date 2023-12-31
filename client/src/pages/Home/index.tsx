
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./style.css";

interface IBook {
  id: string;
  title: string;
  authors: string[];
  imageLinks: {
    thumbnail: string;
  };
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<IBook[]>([]);

  

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=Money&key=AIzaSyCS4ROvsyMQFPbHWyf2w4iRLivX36cohSQ"
      );

      const bookItems = response.data.items;
      const formattedBooks = bookItems.map((item: any) => {
        const volumeInfo = item.volumeInfo;
        return {
          id: item.id,
          title: volumeInfo.title,
          authors: volumeInfo.authors || [],
          imageLinks: volumeInfo.imageLinks || { thumbnail: "" },
        };
      });

      setBooks(formattedBooks);
    } catch (error) {
      console.log(error);
    }
  };

 


  useEffect(() => {
    fetchBooks();
  }, []);

  const goToBookDetail = (id: string) => {
    navigate(`/get_book/${id}`);
  };

  const goToAddBook = () => {
    navigate("/add_book");
  };
  


  return (
    <>
      <div>
        <div className="home-header">
          <i className="fa fa-book"></i> &nbsp;
          <span>My Books</span>
        </div>
        <Container>
          <Row>
            {books.map((book: IBook) => (
              <Col xs={2} className="col" key={book.id}>
                <div
                  className="book-thumbnail"
                  onClick={() => goToBookDetail(book.id)}
                >
                  <img
                    src={book.imageLinks.thumbnail}
                    alt="thumbnail"
                    className="thumbnail_image"
                  />
                  <span className="book-thumbnail-name">{book.title}</span>
                  <span className="book-thumbnail-author">
                    {book.authors.join(", ")}
                  </span>
                </div>
              </Col>
            ))}
            



            <Col xs={2} className="col">
              <div className="add-book-thumbnail" onClick={goToAddBook}>
                <span>+</span>
                <em>Add a book</em>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Home;
