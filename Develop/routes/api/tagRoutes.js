const router = require("express").Router();
const { Category, Product, Tag, ProductTag } = require("../../models");

// GET all tags
router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      ///include any models tags belongs to
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }

  // working code! .then asynchronous promise verison //
  // Tag.findAll({
  //   include: [
  //     {
  //       model: Product,
  //       through: ProductTag,
  //     },
  //   ],
  // })
  //   .then((tags) => res.status(200).json(tags))
  //   .catch((err) => res.status(500).json(err));
});

// GET a single tag
router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    });

    if (!tagData) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a tag
router.post("/", async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a tag
router.delete("/:id", async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE a tag
router.put("/:id", async (req, res) => {
  // Calls the update method on the Tag model
  try {
    const tagData = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!tagData) {
      res.status(404).json({ message: "No tag found with this id!" });
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
