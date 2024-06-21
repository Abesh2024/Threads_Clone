import express from "express";
// import { createPost } from "../controller/postcontroller.js";
import postControllers from "../controller/postcontroller.js";
import protectRoute from "../middleware/protectedRoute.js";

const postRouter = express.Router();


postRouter.post("/create-post", protectRoute, postControllers.createPost)
postRouter.get("/:id", postControllers.getPost);
postRouter.delete("/:id", protectRoute, postControllers.deletePost);
postRouter.put("/like/:id", protectRoute, postControllers.likeUnlikePost);
postRouter.put("/reply/:id", protectRoute, postControllers.replyToPost);
postRouter.get("/feed", protectRoute, postControllers.getFeedPosts);
postRouter.get("/user/:username", postControllers.getUserPosts);


export default postRouter;
