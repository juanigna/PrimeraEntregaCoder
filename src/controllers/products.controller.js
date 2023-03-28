import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import ProductDao from "../dao/products.dao.js";
const Product = new ProductDao();

// Declaring the path for the data persistence

const path = "./src/files/products.json";

//Function to get the products from fs
export const getProductsFromFile = async () => {
  try {
    if (fs.existsSync(path)) {
      const data = await fs.promises.readFile(path, "utf-8");
      const products = JSON.parse(data);
      return products;
    } else {
      return [];
    }
  } catch (e) {
    return e.message;
  }
};

// Function to get the products
export const getProducts = async (req, res) => {
  try {
    const user = req.user;
    const limit = req.query.limit || 3; // Getting the limit query
    const page = req.query.page || 1;
    const query = req.query.q ? JSON.parse(req.query.q) : {};
    const sort = req.query.sort || {};
    const products = await Product.paginate(req, res, page, limit, query, sort);
    res.render("home.handlebars", { products, user });

    // res.status(200).json({products: products});
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};

// Function to get the product by id
export const getProductById = async (req, res) => {
  try {
    const { pid } = req.params; // Getting the productId from params
    const prodFound = await Product.findById(pid); // Getting the products from fs

    if (prodFound) {
      return res.status(200).json({ product: prodFound });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};

//Function to add a product

export const addProduct = async (req, res) => {
  try {
    const products = await Product.find(); // Getting the products from fs
    const { name, description, code, price, status, stock, category } =
      req.body; // Getting the data from de body

    if (
      !name ||
      !description ||
      !code ||
      !price ||
      !stock ||
      !category ||
      !status
    ) {
      return res.status(400).json({ msg: "Completa todos los campos!" });
    }

    const prodWithSameCode = products.find((product) => product.code === code); // Searching if there a product whith the same id

    if (prodWithSameCode) {
      return res
        .status(404)
        .json({ message: "The code is used on other product!" });
    }
    const paths = [];

    if (req.files) {
      req.files.forEach((file) => {
        paths.push(file.path);
      });
    }

    // Creating the product object

    const product = {
      id: uuidv4(),
      name,
      description,
      code,
      price,
      thumbnails: paths,
      status: !status ? true : Boolean(status),
      stock,
      category,
    };

    await Product.create(product);
    await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));

    const productsUpdated = await Product.find();
    global.io.emit("newProductAdded", productsUpdated);

    res.status(200).json({
      message: "Product added successfully",
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

//Function to update a product

export const updateProduct = async (req, res) => {
  const { pid } = req.params; // Getting the product id from params
  const { ...changes } = req.body; // Getting the changes to update
  console.log(pid);
  try {
    const prodFound = await Product.findById(pid);

    if (prodFound) {
      Product.updateProduct(pid, changes);
      res.status(200).json({ message: "Product updated successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Function to delete a product

export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params; // Getting the product id from the params
    const prodFound = Product.findById(pid); //Seraching the product by id
    if (prodFound) {
      await Product.deleteProduct(pid);
      return res.status(200).json({ message: "Product deleted successfully" });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};
