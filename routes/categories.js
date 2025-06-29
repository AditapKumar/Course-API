const express = require("express");
const {Category , validate} = require('../models/categoriesModel');
const router = express.Router();



// const categories = [
//   { id: 1, name: "ThreeJS Tutorials" },
//   { id: 2, name: "MERN Full Stack" },
//   { id: 3, name: "Flutter-Firebase" },
//   { id: 4, name: "Django Full Stack" },
//   { id: 5, name: "DSA (Basic to Advanced)" },
// ];

router.get("/", async (req, res) => {
  // Simulating a database call
  let categories = await Category.find();
  res.send(categories);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //   const category = {
  //     id: categories.length + 1,
  //     name: req.body.name,
  //   };
  const category = new Category({
    name: req.body.name,
  });
  await category.save();
  //   categories.push(category);
  res.send(category);
});

router.put("/:id", async (req, res) => {
  const { error } = validateData(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  //   const category = categories.find((c) => c.id === parseInt(req.params.id));
  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found.");
  //   category.name = req.body.name;
  res.send(category);
});

router.delete("/:id", async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  //   const category = categories.find((c) => c.id === parseInt(req.params.id));
  if (!category)
    return res.status(404).send("The category with the given ID was not found");
  //   const index = categories.indexOf(category);
  //   categories.splice(index, 1);
  res.send(category);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  //   const category = categories.find((c) => c.id === parseInt(req.params.id));
  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found.");
});

module.exports = router;
