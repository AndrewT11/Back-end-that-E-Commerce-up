const router = require("express").Router();
const { Category, Product, Tag, ProductTag } = require("../../models");

// GET all products
http: router.get("/", async (req, res) => {
  try {
    const productData = await Product.findAll({
      //include any models product belongs to
      include: [
        { model: Category },
        { model: Tag, through: ProductTag, as: "tags_product" },
      ],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single product
router.get("/:id", async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      //include any models product belongs to
      include: [
        { model: Category },
        { model: Tag, through: ProductTag, as: "tags_product" },
      ],
    });

    if (!productData) {
      res.status(404).json({ message: "No product found with this id!" });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a product
router.post("/", async (req, res) => {
  try {
    const productData = await Product.create(req.body);
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a product
router.delete("/:id", async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!productData) {
      res.status(404).json({ message: "No product found with this id!" });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE a product
router.put("/:id", async (req, res) => {
  try {
    const productData = await Product.update(
      {
        product_name: req.body.product_name,
        price: req.body.price,
        stock: req.body.stock,
        category_id: req.body.category_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!productData) {
      res.status(404).json({ message: "No product found with this id!" });
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
