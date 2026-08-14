import { DB_DATABASE, DB_HOST, STORE_MANAGER_PASSWORD } from ".././../config.js";
import { db } from "../../DB/connections.js";


// createStoreManagerUser
export const createStoreManagerUser = async () => {
    const username = 'store_manager';
    const host = DB_HOST || 'localhost';
    const password = STORE_MANAGER_PASSWORD || '123456';
    const databaseName = DB_DATABASE || 'retail_store_db';

    try {
        // 1. إنشاء المستخدم
        await db.execute(
            `CREATE USER IF NOT EXISTS '${username}'@'${host}' IDENTIFIED BY '${password}'`
        );

        // 2. منح الصلاحيات
        await db.execute(
            `GRANT SELECT, INSERT, UPDATE ON \`${databaseName}\`.* TO '${username}'@'${host}'`
        );

        // 3. تطبيق الصلاحيات
        await db.execute(`FLUSH PRIVILEGES`);

        return {
            message: `User '${username}' created and granted SELECT, INSERT, UPDATE permissions.`
        };
    } catch (error) {
        throw new Error(`Failed to create database user: ${error.message}`, { cause: error });
    }
};

// revokeStoreManagerUpdate
export const revokeStoreManagerUpdate = async () => {
  const username = 'store_manager';
  const host = DB_HOST || 'localhost';
  const databaseName = DB_DATABASE || 'retail_store_db';

  try {
    await db.execute(
      `REVOKE UPDATE ON \`${databaseName}\`.* FROM '${username}'@'${host}'`
    );

    await db.execute(`FLUSH PRIVILEGES`);

    return {
      message: `UPDATE permission successfully revoked from '${username}'.`
    };
  } catch (error) {
    throw new Error(`Failed to revoke permission: ${error.message}`, { cause: error });
  }
};

// grantDeleteOnSales
export const grantDeleteOnSales = async () => {
  const username = 'store_manager';
  const host = DB_HOST || 'localhost';
  const databaseName = DB_DATABASE || 'retail_store_db';
  const tableName = 'sales';

  try {
    await db.execute(
      `GRANT DELETE ON \`${databaseName}\`.\`${tableName}\` TO '${username}'@'${host}'`
    );

    await db.execute(`FLUSH PRIVILEGES`);

    return {
      message: `DELETE permission on table '${tableName}' granted successfully to '${username}'.`
    };
  } catch (error) {
    throw new Error(`Failed to grant permission: ${error.message}`, { cause: error });
  }
};