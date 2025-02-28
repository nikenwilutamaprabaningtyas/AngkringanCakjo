const express = require("express");
const routes = express.Router();
const userController = require('../controllers/userController');
const pelangganController = require('../controllers/pelangganController');
const penjualanController = require("../controllers/penjualanController");
const menuController = require("../controllers/menuController");
const kategoriController = require("../controllers/kategoriController");
const DetailTransaksiController = require("../controllers/DetailTransaksiController");
const authJWT = require("../middleware/authJWT");


routes.get("/users", authJWT, userController.indexUser);
routes.post("/users",authJWT, userController.storeUser);
routes.get("/users/:id_user", userController.showUser);
routes.put("/users/:id_user", userController.updateUser);
routes.delete("/users/:id_user", userController.destroyUser);
routes.post("/login", userController.Login);
routes.delete("/longout", userController.Logout);

routes.get("/pelanggan", pelangganController.index);
routes.post("/pelanggan", pelangganController.storePelanggan);
routes.get("/pelanggan/:id_pelanggan", pelangganController.showPelanggan);
routes.put("/pelanggan/:id_pelanggan", pelangganController.updatePelanggan);
routes.delete("/pelanggan/:id_pelanggan", pelangganController.destroyPelanggan);

routes.get("/penjualan", penjualanController.index);
routes.post("/penjualan", penjualanController.storePenjualan);
routes.get("/penjualan:id", penjualanController.showPenjualan);
routes.put("/penjualan/:id", penjualanController.updatePenjualan);
routes.delete("/penjualan/:id", penjualanController.destroyPenjualan);

routes.get("/menu", menuController.index);
routes.post("/menu", menuController.storeMenu);
routes.get("/menu/:id", menuController.showMenu);
routes.put("/menu/:id", menuController.updateMenu);
routes.delete("/menu/:id", menuController.destroyMenu);

routes.get("/kategori", kategoriController.index);
routes.post("/kategori", kategoriController.storeKategori);
routes.get("/kategori/:id_kategori", kategoriController.showKategori);
routes.put("/kategori/:id_kategori", kategoriController.updateKategori);
routes.delete("/kategori/:id", kategoriController.destroyKategori);

routes.get("/detail_transaksi", DetailTransaksiController.index);
routes.post("/detail_transaksi", DetailTransaksiController.storeDetailTransaksi);
routes.get("/detail_transaksi/:id_detail_transaksi", DetailTransaksiController.showDetailTransaksi);
routes.put("/detail_transaksi/:id", DetailTransaksiController.updateDetailTransaksi);
routes.delete("/detail_transaksi/:id",DetailTransaksiController.destroyDetailTransaksi);

module.exports = routes;