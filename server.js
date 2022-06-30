const express = require("express");

const morgan = require("morgan");
// importing the routes
const routes = require("./routes/index");

// initializing express
const app = express();

app.use(express.json());
// HTTP request middleware logger
app.use(morgan("dev"));

// accessing the routes from the routes folder with /api
app.use("/api", routes);

// defining the port
const port = 8080;

// listening to the port
app.listen(port, () => console.log(`Server is listening on port ${port}`));
