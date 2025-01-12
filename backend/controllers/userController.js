const db = require("../models/db");
const jwt = require("jsonwebtoken");

const SECRET_KEY =
  "5c4d400e342f3adde0420bb6a3b116bb4ab4c21da8cd77e632d41dfb9c8f0208f27ce231c0bcab60c0a3113608b46cd2756268bf142b7f80567200b0d45226b487a2d3a2706ca084ccb225fc23a17a880f124b491c2137373af2b273287079dc501292c3cdf07e3b3e507573120fb6166fa25bdcc7fa96b652ed430cca049dbba51ad9db1991e49a4223ed7e147d97b5d7e3758e20a7e4755d496f850d3a2f6e64ee42adfe9259206eab277f44ae59e1285b9381c391378891283c66db3df77dc567f87d44d0fb8883f7a98d7a6d4c7df9783c9dc899980bfed909dbff3bd0e881fb47cd91017470eab83dbfa90764b22d0cdfe07cb9ab12ff99d7593a059c64";

// Get all users
const getUsers = (req, res) => {
  const userId = req.params.id;
  const sql = "SELECT * FROM webapp_user_profile WHERE user = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(result[0]);
  });
};

// Create a user
const createUser = (req, res) => {
  const { name, email, phone } = req.body;
  const query =
    "INSERT INTO webapp_users (name, email, phone) VALUES (?, ?, ?) ";

  db.query(query, [name, email, phone], (err, results) => {
    if (err) throw err;
    createUserProfile(results.insertId);
    res.json({ id: results.insertId, name, email, phone });
  });
};

const createUserProfile = (id) => {
  const query =
    "INSERT INTO webapp_user_profile (profile_image,salutation,first_name,last_name,email_address,mobile_number,home_address,country,postal_code,nationality,date_of_birth,gender,marital_status,hobbies_and_interests,favourite_sports,preferred_music_genres,preferred_movies_shows,spouse_salutation,spouse_first_name,spouse_last_name,user) VALUES ('', '','','','','','','','','','1000-01-01','','','','','','','','','',?)";
  db.query(query, [id], (err, results) => {
    if (err) throw err;
    console.log(results);
    // res.json({ name, email, phone });
  });
};

// Update a user
const updateUser = (req, res) => {
  const userId = req.params.id;
  const date_of_birth = req.body.date_of_birth;

  const profile_image = req.file ? req.file.filename : req.body.profile_image;

  const {
    salutation,
    first_name,
    last_name,
    email_address,
    mobile_number,
    home_address,
    country,
    postal_code,
    nationality,
    gender,
    marital_status,
    hobbies_and_interests,
    favourite_sports,
    preferred_music_genres,
    preferred_movies_shows,
    spouse_salutation,
    spouse_first_name,
    spouse_last_name,
  } = req.body;

  const query =
    "UPDATE webapp_user_profile SET profile_image = ?, salutation = ?, first_name = ? , last_name = ?, email_address = ?, mobile_number = ?, home_address = ? , country = ? , postal_code = ? , nationality = ?, date_of_birth = ? , gender = ? , marital_status = ? ,hobbies_and_interests = ? , favourite_sports = ?, preferred_music_genres = ? , preferred_movies_shows = ? ,spouse_salutation=? , spouse_first_name=? , spouse_last_name=? WHERE user = ?";
  db.query(
    query,
    [
      profile_image,
      salutation,
      first_name,
      last_name,
      email_address,
      mobile_number,
      home_address,
      country,
      postal_code,
      nationality,
      date_of_birth,
      gender,
      marital_status,
      hobbies_and_interests,
      favourite_sports,
      preferred_music_genres,
      preferred_movies_shows,
      spouse_salutation,
      spouse_first_name,
      spouse_last_name,
      userId,
    ],
    (err, results) => {
      if (err) throw err;
      res.json({ message: "User updated successfully" });
    }
  );
};

const registerUser = (req, res) => {
  const { user_id, password } = req.body;
  const check_reg_sql = "SELECT * FROM webapp_user WHERE user_id = ?";
  const sql_query = "INSERT INTO webapp_user (user_id, password) VALUES (?, ?)";

  db.query(check_reg_sql, [user_id], (err, result) => {
    if (err) {
      res
        .status(500)
        .json({ message: "An error occurred while processing your request." });
    } else {
      if (result.length > 0) {
        res.status(409).json({ message: "User already registered." });
      } else {
        db.query(sql_query, [user_id, password], (err, data) => {
          if (err) {
            res.status(500).json({
              message: "An error occurred while processing your request.",
            });
          }
          console.log(data);
          createUserProfile(data.insertId);
          res
            .status(200)
            .json({ message: "Register successful. Please login to continue" });

          // Generate JWT token
          const token = jwt.sign({ id: result.user_id }, SECRET_KEY, {
            expiresIn: "1h",
          });
        });
      }
    }
  });
};

const loginUser = (req, res) => {
  const { user_id, password } = req.body;

  const sql = "SELECT * FROM webapp_user WHERE user_id = ? AND password = ?";
  db.query(sql, [user_id, password], (err, result) => {
    if (err) {
      res
        .status(500)
        .json({ message: "An error occurred while processing your request." });
    } else {
      if (result.length > 0) {
        // Generate JWT token
        const token = jwt.sign({ id: result.user_id }, SECRET_KEY, {
          expiresIn: "1h",
        });

        res.status(200).json({
          token: token,
          message: "Login successful",
          user_id: result[0].id,
        });
      } else {
        res
          .status(401)
          .json({ message: "Your user ID and/or password does not match." });
      }
    }
  });
};

module.exports = { getUsers, createUser, updateUser, registerUser, loginUser };
