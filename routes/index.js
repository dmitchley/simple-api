const express = require("express");
// router for the api
const router = express.Router();
const fs = require("fs");

// reading the json file and converting it to an array
const content = JSON.parse(fs.readFileSync("./db.json"));

// generating an id for the new item
const generateId = () => {
  return Math.floor(Math.random() * 100);
};

// get all info from the json file
router.get("/", (req, res) => {
  res.json(content);
});

/* 
    adding a new item to the json file through the post method http://localhost:8080/api/additem
    Each new item will have an id generated by the generateId function but the title, description and imageUrl will be taken from the request body.
*/
router.post("/additem", (req, res) => {
  const id = generateId();
  const title = "Google";
  const description = "Google is a search engine.";
  const URL = "www.google.com";
  const newItem = Object.assign({ id, title, description, URL }, req.body);
  content.push(newItem);
  return res.json({
    message: "Item added successfully",
    content,
  });
});

/* 
    Updating a new item to the json file through the put method http://localhost:8080/api/update/:id
    The json file is looped through and the id of the item is checked if it matches the id of the item that is being updated. If it matches, the item is updated.
*/

router.put("/update/:id", (req, res) => {
  const id = Number(req.params.id);
  const title = "Firefox";
  const description = "Firefox is also a search engine.";
  const URL = "www.firefox.com";

  const newItem = Object.assign({ id, title, description, URL }, req.body);

  for (let i = 0; i < content.length; i++) {
    if (content[i].id === id) {
      content[i] = newItem;
    }
  }

  return res.json({
    message: "Item Updated",
    content,
  });
});

/* 
    Deleting a new item to the json file through the delete method http://localhost:8080/api/delete/:id
    The json file is looped through and the id of the item is checked if it matches the id of the item that is being deleted. If it matches, the item is deleted.
*/

router.delete("/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  for (let i = 0; i < content.length; i++) {
    if (content[i].id === id) {
      content.splice(i, 1);
    }
  }
  return res.json({
    message: "Item deleted",
    content,
  });
});

module.exports = router;
