const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const FoodModel = require("./models/Recipes.js");
const InstitutionModel = require("./models/Institution.js");

app.use(express.json());
app.use(cors());
mongoose.connect(
  "mongodb+srv://jyoo3607:James%40990729@cluster0.poxm5sh.mongodb.net/institution?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/insert", async (req, res) => {
  const foodName = req.body.foodName;
  const days = req.body.days;
  // if (!foodName || !days) {
  //   return res.status(400).send("Food name is required");
  // }
  if (!foodName || !days) {
    return res.status(400).send("Food name and days are required");
  }
  const food = new FoodModel({ foodName: foodName, daysSinceIAte: days });

  try {
    await food.save();
    res.send("inserted data");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error inserting data");
  }
});

app.get("/read", async (req, res) => {
  const country = String(req.body.countryValue);
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 21;
  const skip = (page - 1) * limit;

  InstitutionModel.find()
    .skip(skip)
    .limit(limit)
    .collation({ locale: "en_US", numericOrdering: true })
    .sort({ institution_id: "asc" })
    .then(function (result) {
      res.send(result);
    })
    .catch(function (err) {
      res.send(err);
    });
});

app.put("/update/:id", async (req, res) => {
  const newFoodName = req.body.newFoodName;
  // const id = req.body.id;
  const id = req.params.id;

  try {
    await FoodModel.findByIdAndUpdate(
      id,
      { foodName: newFoodName },
      { new: true }
    );
    res.send("updated");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating data");
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await FoodModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});

// GET details for a specific institution by ID
app.get("/details/:id", async (req, res) => {
  const paramsid = String(req.params.id);
  InstitutionModel.find({ institution_id: paramsid })
    .then(function (result) {
      res.send(result);
    })
    .catch(function (err) {
      res.send(err);
    });
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
