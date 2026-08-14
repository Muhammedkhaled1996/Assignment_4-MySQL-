import { Router } from "express";
import { addCategoryToProduct, addNotNullConstraintToProductName, addProductsLinkedToOneSupplier, createProduct, deleteProductPriceByName, getAllProducts, getProductById, highestStockProductQuantity, productNeverSold, removeCategoryToProduct, updateProduct, updateProductPriceByName } from "./products.services.js";
import { successResponce } from "../../common/index.js";

const router = Router();

// create product
router.post("/", async (req, res, next) => {
    const data = await createProduct(req.body);
    return successResponce({ res, data, status: 201 })
})

// get all products`
router.get("/", async (req, res, next) => {
    const data = await getAllProducts()
    return successResponce({ res, data });
})

//  update product by id
router.patch("/:productId", async (req, res, next) => {
    const data = await updateProduct(req.params, req.body);
    return successResponce({ res, data: data[0] });
});

// add category column to product
router.post("/add-category-column", async (req, res, next) => {
    const data = await addCategoryToProduct();
    return successResponce({ res, data, status: 201 })
})

// remove category column to product
router.post("/remove-category-column", async (req, res, next) => {
    const data = await removeCategoryToProduct();
    return successResponce({ res, data, status: 201 })
})

// add not null constraint to productName column
router.post("/edit-constrant-productName", async (req, res, next) => {
    const data = await addNotNullConstraintToProductName();
    return successResponce({ res, data, status: 201 })
})

// add products linked to one supplier
router.post("/add-list-of-products", async (req, res, next) => {
    const data = await addProductsLinkedToOneSupplier();
    return successResponce({ res, data, status: 201 })
})

// update product price by product name
router.post("/update-bread-price", async (req, res, next) => {
    const data = await updateProductPriceByName();
    return successResponce({ res, data, status: 201 })
})

// delete product price by product name
router.delete("/delete-eggs", async (req, res, next) => {
    const data = await deleteProductPriceByName();
    return successResponce({ res, data })
})

// product with highest stock quantity
router.get("/higest-stockQuantity", async (req, res, next) => {
    const data = await highestStockProductQuantity();
    return successResponce({ res, data })
})

// all products that never sold
router.get("/products-never-sold", async (req, res, next) => {
    const data = await productNeverSold();
    return successResponce({ res, data })
})


//  get product by id
router.get("/:productId", async (req, res, next) => {
    const data = await getProductById(req.params)
    return successResponce({ res, data });
})





export default router;