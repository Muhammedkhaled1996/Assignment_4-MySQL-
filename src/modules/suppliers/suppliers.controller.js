import { Router } from "express";
import { successResponce } from '../../common/index.js'
import { addSupplier, changeContactNumberType, createSupplier, deleteSupplier, findSupplierStartedWithF, getAllSuppliers, getSupplierById, updateSupplier } from "./suppliers.services.js";
const router = Router();

// create product
router.post("/", async (req, res, next) => {
    const data = await createSupplier(req.body);
    return successResponce({ res, data, status: 201 })
})

// get all suppliers`
router.get("/", async (req, res, next) => {
    const data = await getAllSuppliers()
    return successResponce({ res, data });
})



//  update supplier by id
router.patch("/:supplierId", async (req, res, next) => {
    const data = await updateSupplier(req.params, req.body);
    return successResponce({ res, data });
});

//  delete supplier by id
router.delete("/:supplierId", async (req, res, next) => {
    const data = await deleteSupplier(req.params);
    return successResponce({ res, data });
});

// change data type of contactNumber column to varchar(15)
router.post("/change-contactNumber-type", async (req, res, next) => {
    const data = await changeContactNumberType();
    return successResponce({ res, data, status: 201 })
})

// add constant value to supplerName and contactNumber column
router.post("/add-values", async (req, res, next) => {
    const data = await addSupplier();
    return successResponce({ res, data, status: 201 })
})

// supplier whose name start with F
router.get("/find-suppliers-f", async (req, res, next) => {
    const data = await findSupplierStartedWithF();
    return successResponce({ res, data })
})

// get supplier by id
router.get("/:supplierId", async (req, res, next) => {
    const data = await getSupplierById(req.params)
    return successResponce({ res, data });
})

export default router;