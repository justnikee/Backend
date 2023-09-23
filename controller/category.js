const { default: slugify } = require("slugify");
const model = require("../model/category");
const Category = model.Category;

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        message: "Name Is missing!",
      });
    }
    const exist = await Category.findOne({ name });
    if (exist) {
      return res.status(200).send({
        success: true,
        message: "category already exist!",
      });
    }

    const category = await new Category({ name, slug: slugify(name) }).save();
    res.status(201).send({
      success: true,
      message: "New category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Category!",
    });
  }
};

const getCategory = async () => {
  return helllo;
};

module.exports = {
  createCategory,
  getCategory,
};
