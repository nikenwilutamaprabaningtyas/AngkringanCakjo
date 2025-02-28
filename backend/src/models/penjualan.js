const koneksi = require("./db");
const bcrypt = require("bcryptjs");

const selectPenjualan = (callback) => {
    const q = "SELECT * FROM penjualan";
    koneksi.query(q, callback);
};
const insertPenjualan = (id_user, quantity, Total_harga , callback) => {
    const q = " INSERT INTO penjualan(id_user, quantity, Total_harga) VALUES (? ,?, ?)";
    koneksi.query(q, [id_user, quantity, Total_harga], callback);
};
const selectPenjualanById = (id_penjualan,callback) => {
    const q = "SELECT * FROM penjualan WHERE id_penjualan = ?";
    koneksi.query(q, [id_penjualan], callback);
};
const updatePenjualan = (id_penjualan, id_user, quantity, Total_harga, callback) => {
    const q = "UPDATE penjualan SET id_user = ?, quantity = ?, Total_harga = ? WHERE id_penjualan = ?";
    koneksi.query(q, [id_user, quantity, Total_harga, id_penjualan], callback);
};
const deletePenjualan = (id_penjualan, callback) => {
    const q = "DELETE FROM penjualan WHERE id_penjualan = ?";
    koneksi.query(q, [id_penjualan], callback)
};
module.exports = { deletePenjualan, insertPenjualan, selectPenjualanById, selectPenjualan, updatePenjualan, deletePenjualan };