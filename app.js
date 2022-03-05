const express = require("express");
const mongoose = require("mongoose");

//MIDDILWARES
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//ROUTES
app.use("/api/v1/blog", require("./routes/blog"));
app.use("/api/v1/para", require("./routes/para"));

//Catching 404 Error
app.use((req, res, next) => {
  const error = new Error("INVALID ROUTE");
  error.status = 404;
  next(error);
});

//Error handler function
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const PORT = 4000;

mongoose
  .connect("mongodb://127.0.0.1:27017/blog-assignment", {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  })
  .then(() => {
    console.log("server Started");
    app.listen(PORT);
  })
  .catch((err) => {
    console.log("Error in connecting to DataBase", err.message);
  });
