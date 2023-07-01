"use strict";
const db = require("./../db");

var Statistic = {
  getRevenueByDuration: (year, callback) => {
    let sql = `SELECT
    SUM(bill_price) AS total_revenue
FROM
    bills
WHERE
(
MONTH(createdAt) >= 1 AND MONTH(createdAt) <= 3 AND YEAR(createdAt) = ? OR 
MONTH(createdAt) >= 4 AND MONTH(createdAt) <= 6 AND YEAR(createdAt) = ? OR
MONTH(createdAt) >= 7 AND MONTH(createdAt) <= 9 AND YEAR(createdAt) = ? OR 
MONTH(createdAt) >= 10 AND MONTH(createdAt) <= 12 AND YEAR(createdAt) = ? 
)
 AND bill_statement = 'success'
   
GROUP BY
    CONCAT(YEAR(createdAt), '-', QUARTER(createdAt))
ORDER BY
    YEAR(createdAt), QUARTER(createdAt)
`;

    return db.query(sql, [year, year, year, year], callback);
  },

  getRevenueByMonth: (year, callback) => {
    let sql = `
    SELECT
    IFNULL(SUM(bills.bill_price), 0) AS total_revenue
FROM
    (SELECT 1 AS month UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION
     SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12) AS months
LEFT JOIN
    bills ON MONTH(bills.createdAt) = months.month AND YEAR(bills.createdAt) = ? AND bills.bill_statement = 'success'
GROUP BY
    months.month
ORDER BY
    months.month

    `;

    return db.query(sql, year, callback);
  },

  getTopProductsByYear: (year, callback) => {
    let sql = `
    SELECT p.name,SUM(db.quantity) as quantity
FROM products p
INNER JOIN detail_products dp
ON p.id = dp.product_id
INNER JOIN detail_bill db
ON db.detail_product_id = dp.id
INNER JOIN bills b
ON db.bill_id = b.id
WHERE YEAR(b.createdAt) = ? AND b.bill_statement = 'success'
GROUP BY p.id
ORDER BY quantity DESC
LIMIT 5;
    `;

    return db.query(sql, year, callback);
  },
};

module.exports = Statistic;
