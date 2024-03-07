const express = require("express");
const jwt = require("jsonwebtoken");
const session = require("express-session");

// Array to store users
let users = [];

// Function to check if the user exists
const doesExist = (username) => {
  const usersWithSameName = users.filter((user) => user.username === username);
  return usersWithSameName.length > 0;
};

// Function to check if the user is authenticated
const authenticatedUser = (username, password) => {
  const validUsers = users.filter(
    (user) => user.username === username && user.password === password
  );
  return validUsers.length > 0;
};

const app = express();

app.use(express.json());

app.use(
  session({
    secret: "fingerpint",
  })
);

// Middleware to check if the user is authenticated
app.use("/auth", function auth(req, res, next) {
  if (req.session.authorization) {
    // Get the authorization object stored in the session
    const token = req.session.authorization["accessToken"]; // Retrieve the token from the authorization object
    jwt.verify(token, "access", (err, user) => {
      // Use JWT to verify the token
      if (!err) {
        req.user = user;
        next();
      } else {
        return res.status(403).json({ message: "User not authenticated" });
      }
    });
  } else {
    return res.status(403).json({ message: "User not logged in" });
  }
});

// Route to get a message if the user is authenticated
app.get("/auth/get_message", (req, res) => {
  return res.status(200).json({
    message: "Hello, You are an authenticated user. Congratulations!",
  });
});

// Route to login a user
app.post("/login", (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }

  if (authenticatedUser(username, password)) {
    const accessToken = jwt.sign(
      {
        data: password,
      },
      "access",
      { expiresIn: 60 * 60 }
    );

    req.session.authorization = {
      accessToken,
      username,
    };
    return res.status(200).send("User successfully logged in");
  } else {
    return res
      .status(208)
      .json({ message: "Invalid Login. Check username and password" });
  }
});

// Route to register a user
app.post("/register", (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  if (username && password) {
    if (!doesExist(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registred. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

const PORT = 5000;

app.listen(PORT, () => console.log("Server is running"));
