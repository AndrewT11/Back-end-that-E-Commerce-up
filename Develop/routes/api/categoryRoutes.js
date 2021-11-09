const router = require("express").Router();
const { Category, Product, Tag } = require("../../models");

// GET all category
router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single category
router.get("/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a category
router.post("/", async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a category
router.delete("/:id", async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE a category

router.put("/:id", async (req, res) => {
  // Calls the update method on the Category model
  try {
    const categoryData = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!categoryData) {
      res.status(404).json({ message: "No category found with this id!" });
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

///         WORKING CODE!!!!! ///
// router.put("/:id", (req, res) => {
//   // Calls the update method on the Category model
//   //SQL version - UPDATE book SET title = x WHERE id = x
//   Category.update(
//     {
//       // Update field(s)
//       category_name: req.body.category_name,
//     },
//     {
//       // Gets the category based on the isbn given in the request parameters
//       where: {
//         id: req.params.id,
//       },
//     }
//   )
//     .then((updatedCategory) => {
//       // Sends the updated category as a json response
//       res.json(updatedCategory);
//     })
//     .catch((err) => res.json(err));
// });

module.exports = router;
