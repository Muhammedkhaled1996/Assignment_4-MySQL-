import { Router } from "express";
import { addSaleForTwoProducts, createSale, getAllSales, getSaleOfProduct, salesReport, totalSalesForEachProduct } from "./sales.services.js";
import { successResponce } from '../../common/index.js';

const router = Router();


// create sale
router.post("/", async (req, res, next) => {
    const data = await createSale(req.body);
    return successResponce({ res, data, status: 201 })
})

// get sale of specific product
router.get("/", async (req, res, next) => {
    const data = await getSaleOfProduct(req.query)
    return successResponce({ res, data });
})

// get all sales`
router.get("/", async (req, res, next) => {
    const data = await getAllSales()
    return successResponce({ res, data });
})

// add sale for 2 products
router.post("/add-constant-sale", async (req, res, next) => {
    const data = await addSaleForTwoProducts()
    return successResponce({ res, data, status: 201 });
})

// add sale for 2 products
router.get("/total-sale-quantity", async (req, res, next) => {
    const data = await totalSalesForEachProduct()
    return successResponce({ res, data });
})

// all sales including productName , quantitySold , saleDate
router.get("/salesReport", async (req, res, next) => {
    const data = await salesReport()
    return successResponce({ res, data });
})



export default router;