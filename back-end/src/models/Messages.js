"use strict";
const db = require("../db");

var Messages = {
  getMsgByRoom: function (data, callback) {
    let sql =
      "SELECT m.*,u.avatar FROM MESSAGES as m INNER JOIN users as u ON m.user_name = u.user_name AND  m.room_id = ? ORDER BY m.message_id ASC";
    return db.query(sql, [data.room_id], callback);
  },
  getMsgListByUser: function (data, callback) {
    let sql = `SELECT messages.room_id as roomid, messages.body as lastest_msg, messages.user_name as lastest_user_name,
    (SELECT customers.fullname FROM customers INNER JOIN detail_room ON customers.user_name = detail_room.participant AND customers.user_name != ? AND detail_room.room_id = roomid ) as partner_fullname,
    (SELECT users.avatar FROM users INNER JOIN detail_room ON users.user_name = detail_room.participant AND users.user_name != ? AND detail_room.room_id = roomid ) as partner_avatar
    FROM messages
    INNER JOIN (
        SELECT MAX(create_date) AS max_date, room_id
        FROM messages
        GROUP BY room_id
    ) latest_msg
    ON messages.create_date = latest_msg.max_date AND messages.room_id = latest_msg.room_id
    INNER JOIN detail_room
    ON messages.room_id = detail_room.room_id
    WHERE detail_room.participant = ? 
    ORDER BY messages.message_id DESC;
    `;

    return db.query(
      sql,
      [data.user_name, data.user_name, data.user_name],
      callback
    );
  },
  getMsgList: function (callback) {
    let sql = `SELECT messages.room_id as roomid, messages.body as lastest_msg, messages.user_name as lastest_user_name,
    (SELECT customers.fullname FROM customers INNER JOIN detail_room ON customers.user_name = detail_room.participant AND customers.user_name != 'admin' AND detail_room.room_id = roomid ) as partner_fullname,
    (SELECT users.avatar FROM users INNER JOIN detail_room ON users.user_name = detail_room.participant AND users.user_name != 'admin' AND detail_room.room_id = roomid ) as partner_avatar
    FROM messages
    INNER JOIN (
        SELECT MAX(create_date) AS max_date, room_id
        FROM messages
        GROUP BY room_id
    ) latest_msg
    ON messages.create_date = latest_msg.max_date AND messages.room_id = latest_msg.room_id
    INNER JOIN detail_room
    ON messages.room_id = detail_room.room_id
    WHERE detail_room.participant = 'admin'
    ORDER BY messages.message_id DESC;
  `;

    return db.query(sql, callback);
  },
  getContactUser: (data, callback) => {
    let sql =
      "SELECT c.fullname,u.avatar FROM detail_room as dt INNER JOIN users as u ON dt.participant = u.user_name AND  dt.participant != ? AND dt.room_id = ? INNER JOIN customers as c ON dt.participant = c.user_name";
    return db.query(sql, [data.user_name, data.room_id], callback);
  },
  insertMessage: (data, callback) => {
    console.log(data);
    let sql = "INSERT INTO messages SET ?";
    return db.query(sql, [data], callback);
  },
  insertRoom: (data, callback) => {
    let sql = "INSERT INTO rooms SET ?";
    return db.query(sql, [data], callback);
  },
  insertDetailRoom: (data, callback) => {
    let sql = "INSERT INTO detail_room SET ?";
    return db.query(sql, [data], callback);
  },
  dropRoom: (data, callback) => {
    let sql = "DELETE FROM rooms WHERE room_id = ?";
    return db.query(sql, [data.room_id], callback);
  },
};

module.exports = Messages;