import { Router } from "express";
import verifyToken from "../middlewares/verifytoken";
import { body } from "express-validator";
import { uploadImage, validatePostImage } from "../middlewares/uploadImage";
import { createPost } from "../controllers/post";

const router = Router();

router.post(
  "/create-post",
  verifyToken,
  uploadImage.single("postImage"),
  validatePostImage,
  [
    body("title")
      .trim()
      .isString()
      .isLength({ min: 3, max: 15 })
      .withMessage("Title must contain 3 to 15 characters."),
    body("description")
      .trim()
      .isString()
      .isLength({ min: 10, max: 30 })
      .withMessage("Title must contain 10 to 30 characters."),
  ],
  createPost
);

export default router;