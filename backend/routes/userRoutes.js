const express = require("express");
const multer = require("multer");

const {
  getUsers,
  updateUser,
  registerUser,
  loginUser,
} = require("../controllers/userController");

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get("/users/:id", getUsers);
router.put("/users/:id", upload.single("profile_image"), updateUser);
router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
