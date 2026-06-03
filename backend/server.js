const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv");
const userRouter = require('./routes/users/usersRouter');
const categoryRouter = require('./routes/categories/categoriesRouter');
const postsRouter = require('./routes/posts/postsRouter');
const connectdb = require('./config/database');
const { notFound, globalErrorHnadler } = require("./middlewares/globalErrorHandler");
const commentsRouter = require("./routes/comments/commentsRouter");
const sendEmail = require('./utils/sendEmail');

//!Connecting to the database mongodb
connectdb();
//!handling sentEmail
// sendEmail("user@gmail.com", "resettoken123");
//!Creating an express application
const app = express();
//!Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());
//!loading environment variables from .env file
dotenv.config();


//?Mounting the user router
app.use("/api/v1/users",userRouter);
//?Mounting the categories router
app.use("/api/v1/categories", categoryRouter);
//?Mounting the posts router
app.use("/api/v1/posts", postsRouter);
//?Mounting the comments router
app.use("/api/v1/comments", commentsRouter);

//?Default route for the API
app.use(notFound);
//?Global error handling middleware
app.use(globalErrorHnadler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

