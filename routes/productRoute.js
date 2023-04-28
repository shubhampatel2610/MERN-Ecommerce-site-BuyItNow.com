import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  getProductController,
  getParticularProductController,
  getProductPhotoController,
  deleteProductController,
  updateProductController,
  getProductFilterController,
  productCountController,
  productListController,
  searchProductController,
  productCategoryController,
  braintreeTokenController,
  braintreePaymentController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// routes

// create new product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// create new product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// get all products
router.get("/get-product", getProductController);

// get particular product
router.get("/get-product/:slug", getParticularProductController);

// get particular photo of product
router.get("/get-product-photo/:pid", getProductPhotoController);

// delete product
router.delete("/delete-product/:pid", deleteProductController);

// filter product
router.post("/product-filter", getProductFilterController);

// product count
router.get("/product-count", productCountController);

// product per page
router.get("/product-list/:page", productListController);

// search product
router.get("/search/:keyword", searchProductController);

// product in particular category
router.get("/product-category/:slug", productCategoryController);

// payment route
// token from braintree
router.get("/braintree/token", braintreeTokenController);
// payment
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

export default router;
