import { db } from "../../DB/connections.js";



// create logic
export const createSale = async (inputs) => {
    const { productID, quantitySold } = inputs

    const insertQuery = `INSERT INTO sales(productID, quantitySold ) values(?,?)`
    const [data] = await db.execute(insertQuery, [productID, quantitySold])

    if (!data?.affectedRows) {
        throw new Error("Fail to create product", { cause: { status: 400 } })
    }
    return data
}


// get all sales
export const getAllSales = async () => {

    const query = `select * from sales `
    const [data] = await db.execute(query, [])

    if (!data.length) {
        throw new Error("no sales found", { cause: { status: 404 } })
    }
    return data
}


// get sales for specific product
export const getSaleOfProduct = async (inputs) => {
    const { productID } = inputs

    const productQuery = `select * from products where productID =?`
    const [product] = await db.execute(productQuery, [productID])
    if (product.length == 0) {
        throw new Error("no product match this id", { cause: { status: 404 } })
    }


    const query = `select * from sales where productID =?`
    const [data] = await db.execute(query, [productID])

    if (!data.length) {
        throw new Error("no sales found", { cause: { status: 404 } })
    }
    return data
}

// add sale for 2 products
export const addSaleForTwoProducts = async () => {

    const MilkIdQuery = `select productID from products where productName = 'Milk'`
    const [MilkId] = await db.execute(MilkIdQuery, [])

    const insertQuery = `INSERT INTO sales(productID, quantitySold , saleDate ) values(?,?,?)`
    const [data] = await db.execute(insertQuery, [MilkId[0].productID, 2, "2025-05-20"])

    if (!data?.affectedRows) {
        throw new Error("Fail to create product", { cause: { status: 400 } })
    }
    return data
}

// total sales for each product
export const totalSalesForEachProduct = async () => {
    const query = `select s.productID, p.productName , sum(s.quantitySold) as totalSales from sales as s inner join products as p on s.productID = p.productID group by s.productID ,p.productName `
    const [data] = await db.execute(query, [])
    if (!data.length) {
        throw new Error("no data found", { cause: { status: 404 } })
    }
    return data
}

// all sales including productName , quantitySold , saleDate
export const salesReport = async () => {
    const query = `select p.productName , s.quantitySold , s.saleDate  from sales as s inner join products as p  on p.productID = s.ProductID`
    const [data] = await db.execute(query, [])
    if (!data.length) {
        throw new Error("no data found", { cause: { status: 404 } })
    }
    return data
}