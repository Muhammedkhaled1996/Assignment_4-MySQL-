import { db } from "../../DB/connections.js";


// create logic
export const createProduct = async (inputs) => {
    const { productName, price, stockQuantity, supplierId } = inputs

    const insertQuery = `INSERT INTO products(productName, price, stockQuantity, supplierId) values(?,?,?,?)`
    const [data] = await db.execute(insertQuery, [productName, price, stockQuantity, supplierId])

    if (!data?.affectedRows) {
        throw new Error("Fail to create product", { cause: { status: 400 } })
    }
    return data
}

// get all products
export const getAllProducts = async () => {

    const query = `select * from products `
    const [data] = await db.execute(query, [])

    if (!data.length) {
        throw new Error("no products found", { cause: { status: 404 } })
    }
    return data
}

// // get product by id
export const getProductById = async (params) => {
    const { productId } = params

    const query = `select * from products where productID=?`
    const [data] = await db.execute(query, [productId])

    if (!data.length) {
        throw new Error("no product match this id", { cause: { status: 404 } })
    }
    return data
}

// update product data
export const updateProduct = async (params, body) => {
    const { productId } = params;
    const { productName, price, stockQuantity, supplierId } = body;

    const query = `UPDATE products SET productName = ?, price = ?,stockQuantity = ?,supplierId = ? WHERE productID = ?`;
    const [data] = await db.execute(query, [productName, price, stockQuantity, supplierId, productId]);

    if (!data.affectedRows) {
        throw new Error("Invalid blog id", { cause: { status: 404 } })
    }

    const blogQuery = `SELECT * FROM products WHERE productID = ?`;
    const [rows] = await db.execute(blogQuery, [productId]);
    return rows
}

// add category column to product
export const addCategoryToProduct = async () => {
    const query = `ALTER TABLE products ADD COLUMN category VARCHAR(255)`;
    const [data] = await db.execute(query, []);
    return data
}


// remove category column to product
export const removeCategoryToProduct = async () => {
    const query = `ALTER TABLE products DROP COLUMN category`;
    const [data] = await db.execute(query, []);
    return data
}

// add not null constraint to productName column
export const addNotNullConstraintToProductName = async () => {
    const query = `ALTER TABLE products MODIFY productName VARCHAR(255) NOT NULL`;
    const [data] = await db.execute(query, []);
    return data
}

// add products linked to one supplier
export const addProductsLinkedToOneSupplier = async () => {
    const productsInfo = [
        { productName: "Milk", price: 15, stockQuantity: 50 },
        { productName: "Bread", price: 10, stockQuantity: 30 },
        { productName: "Eggs", price: 20, stockQuantity: 40 },
    ];

    const supplierIdQuery = `SELECT supplierId FROM suppliers WHERE supplierName = ?`;
    const [supplierRows] = await db.execute(supplierIdQuery, ['FreshFoods']);

    if (!supplierRows.length) {
        throw new Error("Supplier 'FreshFoods' not found", { cause: { status: 404 } });
    }

    const supplierId = supplierRows[0].supplierId;

    for (const product of productsInfo) {
        const { productName, price, stockQuantity } = product;
        const insertQuery = `INSERT INTO products(productName, price, stockQuantity, supplierId) VALUES (?, ?, ?, ?)`;
        const [result] = await db.execute(insertQuery, [productName, price, stockQuantity, supplierId]);

        if (!result?.affectedRows) {
            throw new Error(`Fail to create product ${productName}`, { cause: { status: 400 } });
        }

    }

}

// update product price by product name
export const updateProductPriceByName = async () => {

    const productName = "Bread";
    const newPrice = 25;

    const query = `UPDATE products SET price = ? WHERE productName = ?`;
    const [data] = await db.execute(query, [newPrice, productName]);


    if (!data.affectedRows) {
        throw new Error("Invalid productName", { cause: { status: 404 } })
    }

    const productQuery = `SELECT * FROM products WHERE productName = ?`;
    const [rows] = await db.execute(productQuery, [productName]);
    return rows
}

// delete product price by product name
export const deleteProductPriceByName = async () => {

    const productName = "Eggs";

    const query = `DELETE FROM products  WHERE productName = ?`;
    const [data] = await db.execute(query, [productName]);


    if (!data.affectedRows) {
        throw new Error("Invalid productName", { cause: { status: 404 } })
    }

}

// product with highest stock quantity
export const highestStockProductQuantity = async () => {
    const query = `select productName , max(stockQuantity) from products `
    const [data] = await db.execute(query, [])
    if (!data.length) {
        throw new Error("no data found", { cause: { status: 404 } })
    }
    return data
}

// all products that never sold
export const productNeverSold = async () => {
    const query = `select * from products left join sales on products.productID = sales.productID where sales.salesID is null`
    const [data] = await db.execute(query, [])
    if (!data.length) {
        throw new Error("no data found", { cause: { status: 404 } })
    }
    return data
}


