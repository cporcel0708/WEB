const {createPool} = require('mysql');
//npmjs.com/packege/mysql - $ npm install mysql
//creo la conxion con pool 
const pool = createPool({ 
    host: "localhost",
    port: "3307",
    user: "root",
    password: "1234",
    database: "dbTareas",
    connectionLimit: 10,
    connectTimeout: 100000,
    multipleStatements: true
    
    });
    module.exports= pool;