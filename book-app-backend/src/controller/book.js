const Book = require('../models/Book');


// Get all book by user
const getBookByUser = async (req, res) => {
    try {
        const books = await Book.find({ userId: req.user.id });
        
        if(!books){
            return res.status(404).json({ message: "No books found" });
        }

        res.json(books);
        
    } catch (error) {
        throw new Error("", error);
    }
};

// Add a book
const addBook =  async (req, res) => {
    try {
        const user = req.user.id 
        const {author, title} = req.body;
        
        const book = new Book(
            {
                author, 
                title,
                userId: user
            });

       
        await book.save();
        res.status(201).json(book);
        
    } catch (error) {
        throw new Error("", error);
        
    }
};

//get books by book id 
const getBook = async(req, res)=> {
    try {
        const bookId = req.params.id
        const books = await Book.find({ _id: bookId });
        
        if(!books){
            return res.status(404).json({ message: "No books found" });
        }

        res.json(books);
    } catch(error){
        throw new error('', error)
    }
}

//get books
const getBooks =  async(req, res) => {
    try {
        const books = await Book.find()
        if(!books){
            return res.status(404).json({message:"No Book found"})
        }

        res.json(books);
    } catch (error) {
        throw new Error("", error);
    }
}

export { getBook, getBookByUser, addBook, getBooks };
