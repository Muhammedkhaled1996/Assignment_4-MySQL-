import { Router } from "express";
import { successResponce } from "../../common/index.js";
import { createStoreManagerUser, grantDeleteOnSales, revokeStoreManagerUpdate } from "./users.services.js";

const router = Router();

// createStoreManagerUser
router.post("/createStoreManagerUser", async (req, res, next) => {
    const data = await createStoreManagerUser();
    return successResponce({ res, data, status: 201 })
})

// revokeStoreManagerUpdate
router.post("/revokeStoreManagerUpdate", async (req, res, next) => {
    const data = await revokeStoreManagerUpdate();
    return successResponce({ res, data, status: 200 })
})

// grantDeleteOnSales
router.post("/grantDeleteOnSales", async (req, res, next) => {
    const data = await grantDeleteOnSales();
    return successResponce({ res, data, status: 200 })
})



export default router;