import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./style.css";

interface IAboutBook { }

const AboutBook: React.FC<IAboutBook> = (props) => {
  const [id, setId] = useState<string>();
  const [book, setBook] = useState<any>();
  const [isRate, setIsRate] = useState<boolean>(false);
  const [ratingDone, setRatingDone] = useState<boolean>(false);
  const [rate, setRate] = useState<number>(0);
  const [starArr, setStarArr] = useState<any>([]);

  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split("/").pop(); // Get the book ID from the URL
  const ratingArray = [1, 2, 3, 4, 5];


  const getBook = (bookId: string) => {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
      .then((response) => {
        const bookData = response.data;
        setBook(bookData);
        setId(bookId);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };




  const readTheBook = () => {
    var win = window.open(
      book?.volumeInfo?.previewLink || "",
      "_blank"
    );
    win?.focus();
  };



  const handleRating = (e: any, rate: number) => {
    setRate(rate);
  };

  const rateTheBook = () => {
    if (!isRate) {
      setIsRate(true);
    } else {
      // Simulate rating logic by updating the book rating in the local state
      axios
        .get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
        .then((response) => {
          const updatedBook = { ...book, rating: rate };
          setBook(updatedBook);
          setRatingDone(true);
        })
        .catch((err) => {
          console.log("Error fetching book details", err);
        });
    }
  };


  const backToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    if (bookId) {
      getBook(bookId);
    }
  }, [bookId]);

  useEffect(() => {
    let arr = [];
    for (var i = 0; i < rate; i++) arr.push({ isThere: true });
    for (var j = i; j < 5; j++) arr.push({ isThere: false });
    setStarArr(arr);
  }, [rate]);

  return (
    <>
      <br />
      <Container>
        <Row>
          <Col xs={4}>
            <span className="back-to-home" onClick={backToHome}>
              <i className="fa fa-angle-left" aria-hidden="true"></i>&nbsp;
              &nbsp;<span>Back to home</span>
            </span>
          </Col>
        </Row>
        {ratingDone && (
          <>
            <br />
            <Alert variant="success">
              Rating Done!! And the rating is {book?.rating}
            </Alert>
          </>
        )}
      </Container>
      <br />
      <Container>
        <Row>
          <Col xs={4}>
            <div>
              {book?.volumeInfo?.imageLinks?.thumbnail && (
                <img
                  src={book?.volumeInfo?.imageLinks?.thumbnail}
                  className="book-detail-thumbnail"
                  alt="thumbnail"
                />
              )}
            </div>
          </Col>
          <Col xs={8}>
            <div className="about-book">
              <span className="book-title">{book?.name}</span>
              <span className="author">{book?.author}</span>
              <span className="read-time">
                Book Read Time: <em>{book?.read_time} mins</em>
              </span>
              <span className="book-detail">{book?.details}</span>
            </div>
            <br />
            <div className="summary">Summary</div>
            <div className="rate">
              <div className="rate-left">
                <div className="rating-bar">
                  <div className="rate-bar">
                    <span>5</span>&nbsp;&nbsp;<span className="bar"></span>
                  </div>
                  <div className="rate-bar">
                    <span>4</span>&nbsp;&nbsp;<span className="bar"></span>
                  </div>
                  <div className="rate-bar">
                    <span>3</span>&nbsp;&nbsp;<span className="bar"></span>
                  </div>
                  <div className="rate-bar">
                    <span>2</span>&nbsp;&nbsp;<span className="bar"></span>
                  </div>
                  <div className="rate-bar">
                    <span>1</span>&nbsp;&nbsp;<span className="bar"></span>
                  </div>
                </div>
                <div className="abt">
                  <div className="rate-area">
                    <h2 className="rate-val">
                      {book?.rating}
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </h2>
                    <span>273 reviews</span>
                  </div>
                  <div className="rate-area">
                    <h2 className="rate-val">88%</h2>
                    <span>Recommnded</span>
                  </div>
                </div>
              </div>
              <div className="rate-right">
                {!isRate ? (
                  <span>
                    You have not read this book yet.Click on the button to start
                    rating
                  </span>
                ) : (
                  <div className="star-rating">
                    {rate === 0
                      ? ratingArray.map((rate: number, index: number) => (
                        <div>
                          <i
                            className="fa fa-star star fa-star-null"
                            aria-hidden="true"
                            onClick={(e) => handleRating(e, index + 1)}
                          ></i>
                        </div>
                      ))
                      : starArr?.map((star: any, index: number) => {
                        if (star?.isThere) {
                          return (
                            <div>
                              <i
                                className="fa fa-star star"
                                aria-hidden="true"
                                onClick={(e) => handleRating(e, index + 1)}
                              ></i>
                            </div>
                          );
                        } else {
                          return (
                            <div>
                              <i
                                className="fa fa-star star fa-star-null"
                                aria-hidden="true"
                                onClick={(e) => handleRating(e, index + 1)}
                              ></i>
                            </div>
                          );
                        }
                      })}
                  </div>
                )}
                <br />
                <br />
                <br />
                <span className="rate-button" onClick={rateTheBook}>
                  Rate this book
                </span>
              </div>
            </div>
            <button className="read-button" onClick={readTheBook}>
              Read this book
            </button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AboutBook;



