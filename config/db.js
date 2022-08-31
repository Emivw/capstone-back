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



db.insertUser = (fullname, email, password) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO Users (fullname, email, password) VALUES (?,  ?, ?)', [fullname, email, password], (error, result) => {
            if (error) {
                return reject(error);
            }

            return resolve(result.insertId);
        });
    });
};


db.updateUser = (fullname, role_id, email, password, id) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE User SET fullname = ?, role_id= ?, email= ?, password=? WHERE id = ?', [fullname, role_id, email, password, id], (error) => {
            if (error) {
                return reject(error);
            }

            return resolve();
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
        pool.query('SELECT * FROM Products ', (error, prod) => {
            if (error) {
                return reject(error);
            }
            return resolve(prod);
        });
    });
};


db.getProdById = (prodID) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM Products WHERE prodID = ?', [prodID], (error, prod) => {
            if (error) {
                return reject(error);
            }
            return resolve(prod[0]);
        });
    });
};



db.insertProd = (fullname, email, password) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO Products (fullname, email, password) VALUES (?,  ?, ?)', [fullname, email, password], (error, result) => {
            if (error) {
                return reject(error);
            }

            return resolve(result.insertId);
        });
    });
};


db.updateProd = (fullname, role_id, email, password, id) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE Products SET fullname = ?, role_id= ?, email= ?, password=? WHERE id = ?', [fullname, role_id, email, password, id], (error) => {
            if (error) {
                return reject(error);
            }

            return resolve();
        });
    });
};



db.deleteProd = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM Products WHERE id = ?', [id], (error) => {
            if (error) {
                return reject(error);
            }
            return resolve(console.log("product deleted"));
        });
    });
};

module.exports = { db, pool };