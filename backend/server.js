const express = require("express");
const path = require("path");

const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", userRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Handle requests by serving index.html for all routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
