import { Request, Response } from "express";
import pool from "../config/db";
import axios from 'axios';

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const all_books = await pool.query("SELECT * FROM books");
    res.status(200).json({ all_books: all_books.rows });
  } catch (err) {
    console.log(err);
  }
};

// export const getAllBooks = async (req: Request, res: Response) => {
//   try {
//     // Fetch books from the Google Books API
//     const googleBooksResponse = await axios.get(
//       "https://www.googleapis.com/books/v1/volumes?q=Money&key=AIzaSyCS4ROvsyMQFPbHWyf2w4iRLivX36cohSQ"
//     );

//     const googleBookItems = googleBooksResponse.data.items;
//     const formattedGoogleBooks = googleBookItems.map((item: any) => {
//       const volumeInfo = item.volumeInfo;
//       return {
//         id: item.id,
//         name: volumeInfo.title,
//         author: volumeInfo.authors ? volumeInfo.authors.join(", ") : "",
//         read_time: 0, // Set appropriate value
//         details: "", // Set appropriate value
//         thumbnail_name: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : "",
//         pdf_name: "", // Set appropriate value
//         rating: 0, // Set appropriate value
//       };
//     });

//     // Fetch user-added books from your database
//     const userAddedBooks = await pool.query("SELECT * FROM books");

//     const allBooks = [...formattedGoogleBooks, ...userAddedBooks.rows];

//     res.status(200).json({ all_books: allBooks });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };




export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
    res.status(200).json({ book: book.rows });
  } catch (err) {
    console.log(err);
  }
};

export const addBook = async (req: Request, res: Response) => {
  const { name, author, read_time, details, thumbnail_name, pdf_name } =
    req.body;

  try {
    const added_book = await pool.query(
      "INSERT INTO books(name, author, read_time, details, thumbnail_name, pdf_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, author, read_time, details, thumbnail_name, pdf_name]
    );

    res.status(201).json({ added_book: added_book.rows[0] });
  } catch (err) {
    res.status(400).json({err_msg : "Error in inserting data"})
  }
};

export const addRatingById = async (req: Request, res : Response) => {
    const {id, rate} = req.params;

    try {
        const added_rating = await pool.query(
          "UPDATE books SET rating = $1 WHERE id = $2 RETURNING *", [rate, id]
        )
        res.status(201).json({ added_rating: added_rating.rows[0] });
    }
    catch(err) {
      console.log(err);
    }
}

export const handleFileUpload = (req: Request, res: Response) => {
  console.log(`Ping 123!!`);
  res.status(201).json({ msg: "Succesfully Uploaded!" });
};
