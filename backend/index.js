import express from 'express';
import { config as configDotenv } from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoute.js';
import postRouter from './routes/postRouts.js';
import cors from 'cors'
import { v2 as cloudinary } from "cloudinary";
// import bodyParser from 'body-parser';

configDotenv();
const app = express();
const corsOptions = {
  origin: ['http://localhost:5173', 'https://threads-clone-five-sage.vercel.app/auth'], // Frontend URL
  credentials: true, // Allow credentials (cookies) to be included
};

app.use(cors(corsOptions));
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use((req, res, next) => {
  console.log(req.body);
  next()
})


cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((error) => {
    console.error("DB connection error:", error);
  });

app.use("/v1/user", userRouter)
app.use("/api/post", postRouter)


app.listen(process.env.PORT, () => {
  console.log(`Server is up and running on port ${process.env.PORT}`);
});
