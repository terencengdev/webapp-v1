const express = require("express");

const {
  getUsers,
  updateUser,
  registerUser,
  loginUser,
} = require("../controllers/userController");

const router = express.Router();

// // Multer Storage Configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

const uploadMiddleware = require("../middleware/uploadMiddleware");
const upload = uploadMiddleware("profileimages");

// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 2000000 },
//   fileFilter: (req, file, db) => {
//     if (file.mimetype.startsWith("image/")) cb(null, true);
//     else cb(new Error("Not an image! Please upload image format only."), false);
//   },
// });

router.get("/users/:id", getUsers);
router.put("/users/:id", upload.single("profile_image"), updateUser);
router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
