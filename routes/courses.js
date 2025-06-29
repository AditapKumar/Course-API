const { Course, validate } = require("../models/coursesModel");
const { Category } = require("../models/categoriesModel");
const express = require("express");
const router = require("router");
const mongoose = require("mongoose");

// Fetching Course From DB
router.get("/", (req, res) => {
  const courses = Course.find();
  res.send(courses);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).find(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid ID");

  let course = new Course({
    title: req.body.title,
    category: {
      _id: category._id,
      name: category.name,
    },
    creator: req.body.creator,
    rating: req.body.rating,
  });
  course = await course.save();
  res.send(course);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid ID");

  const course = await Course.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      category: {
        _id: category.id,
        name: category.name,
      },
      creator: req.body.creator,
      rating: req.body.rating,
    },
    { new: true }
  );

  if (!course)
    return res.status(404).send("The movie with the given ID was not found.");
  res.send(course);
});
