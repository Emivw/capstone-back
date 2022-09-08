const mysql = require('mysql2');
require('dotenv').config();



const pool = mysql.createPool({
    connectionLimit: process.env.CONNECTION_LIMIT,    // the number of connections node.js will hold open to our database
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    database: process.env.MYSQL_DB,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT

});
let db = {};
db.getProdById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM Products1 WHERE prodID = ?', [id], (error, product) => {
            if (error) {
                return reject(error);
            }
            return resolve(product[0]);
        });
    });
};
//cb object
// ***Requests to the User table ***
db.allUser = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM Users ', (error, users) => {
            if (error) {
                return reject(error);
            }
            return resolve(users);
        });
    });
};


db.getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM Users WHERE email = ?', [email], (error, users) => {
            if (error) {
                return reject(error);
            }
            return resolve(users[0]);
        });
    });
};
db.getUserById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM Users WHERE id = ?', [id], (error, users) => {
            if (error) {
                return reject(error);
            }
            return resolve(users[0]);
        });
    });
};



db.insertUser = (role_id, email, password, fullname, phone) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO Users (role_id, email, password, fullname, phone, createdAt, updatedAt) VALUES (?,  ?, ?, ?, ?, now(), now())', [role_id, email, password, fullname, phone], (error, result) => {
            if (error) {
                return reject(error);
            }

            return resolve(result.insertId);
        });
    });
};


db.updateUser = (fullname, role_id, email, password, id) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE User SET fullname = ?, role_id= ?, email= ?, password=?, phone=? WHERE id = ?', [fullname, role_id, email, password, phone, id], (error) => {
            if (error) {
                return reject(error);
            }

            return resolve(console.log("User updated"));
        });
    });
};



db.deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM User WHERE id = ?', [id], (error) => {
            if (error) {
                return reject(error);
            }
            return resolve(console.log("User deleted"));
        });
    });
};

// get products 
db.allProd = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM Products1', (error, products) => {
            if (error) {
                return reject(error);
            }
            return resolve(products);
        });
    });
};






db.insertProd = (prodTitle, prodCat, prodStock, prodDesc, prodColor, prodPrice, prodImg1, prodImgs) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO Products1 (prodTitle, prodCat, prodStock, prodDesc, prodColor, prodPrice, prodImg1, prodImgs) VALUES (?,  ?, ?, ?, ?, ?, ?, ?)', [prodTitle, prodCat, prodStock, prodDesc, prodColor, prodPrice, prodImg1, prodImgs], (error, result) => {
            if (error) {
                return reject(error);
            }

            return resolve(result.insertId);
        });
    });
};


db.updateProd = (prodTitle, prodCat, prodStock, prodDesc, prodColor, prodPrice, id) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE Product1 SET prodTitle = ?, prodCat= ?, prodStock= ?, prodDesc=?, prodColor=?, prodPrice=?, WHERE prodID = ?', [prodTitle, prodCat, prodStock, prodDesc, prodColor, prodPrice, id], (error) => {
            if (error) {
                return reject(error);
            }

            return resolve();
        });
    });
};



db.deleteProd = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM Products1 WHERE prodID = ?', [id], (error) => {
            if (error) {
                return reject(error);
            }
            return resolve(console.log("product deleted"));
        });
    });
};

module.exports = { db, pool };