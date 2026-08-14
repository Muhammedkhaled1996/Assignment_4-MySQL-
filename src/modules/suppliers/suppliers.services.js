import { db } from "../../DB/connections.js"


// create logic
export const createSupplier = async (inputs) => {
    const { supplierName, contactNumber } = inputs

    const insertQuery = `INSERT INTO suppliers (supplierName, contactNumber ) values(?,?)`
    const [data] = await db.execute(insertQuery, [supplierName, contactNumber])

    if (!data?.affectedRows) {
        throw new Error("Fail to create product", { cause: { status: 400 } })
    }
    return data
}

// get all suppliers
export const getAllSuppliers = async () => {

    const query = `select * from suppliers `
    const [data] = await db.execute(query, [])

    if (!data.length) {
        throw new Error("no suppliers found", { cause: { status: 404 } })
    }
    return data
}

// get supplier by id
export const getSupplierById = async (params) => {
    const { supplierId } = params

    const query = `select * from suppliers where supplierId=?`
    const [data] = await db.execute(query, [supplierId])

    if (!data.length) {
        throw new Error("Invald product id", { cause: { status: 404 } })

    }
    return data
}

// update supplier data
export const updateSupplier = async (params, body) => {
    const { supplierId } = params;
    const { supplierName, contactNumber } = body;

    const query = `UPDATE suppliers SET supplierName = ?, contactNumber = ? WHERE supplierId = ?`;
    const [data] = await db.execute(query, [supplierName, contactNumber, supplierId]);

    if (!data.affectedRows) {
        throw new Error("Invalid blog id", { cause: { status: 404 } })
    }

    const supplierQuery = `SELECT * FROM suppliers WHERE supplierId = ?`;
    const [rows] = await db.execute(supplierQuery, [supplierId]);
    return rows
}

// update supplier data
export const deleteSupplier = async (params, body) => {
    const { supplierId } = params;

    const query = `DELETE FROM suppliers WHERE supplierId = ?`;
    const [data] = await db.execute(query, [supplierId]);
    if (!data.affectedRows) {
        throw new Error("Invalid blog id", { cause: { status: 404 } })
    }
    return data
}

// change data type of contactNumber column to varchar(15)
export const changeContactNumberType = async () => {
    const query = `ALTER TABLE suppliers MODIFY COLUMN contactNumber VARCHAR(15)`;
    const [data] = await db.execute(query);
    return data;
};

// add supplier and content number to suppliers table
export const addSupplier = async () => {
    const query = `INSERT INTO suppliers (supplierName,contactNumber) VALUES ("FershFoods", 01001234567)`;
    const [data] = await db.execute(query, []);
    return data;
}

// supplier whose name start with F
export const findSupplierStartedWithF = async () => {
    const query = `select * from suppliers where supplierName like ?`
    const [data] = await db.execute(query, [`%f%`])
    if (!data.length) {
        throw new Error("no data found", { cause: { status: 404 } })
    }
    return data
}
