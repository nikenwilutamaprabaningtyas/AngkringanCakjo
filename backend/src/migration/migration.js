const mysql = require("mysql2");
const koneksi = require("../models/db");
const koneksiMysql =mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"angkringan_cakjo"
});

const createUserTable = (koneksi) => {
    const q = `create TABLE IF NOT EXISTS users(
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    nama varchar(100),
    email varchar (100) UNIQUE,
    password varchar (100)
    )`;
    koneksi.query(q, (err, result) => {
        if (err) {
            console.error("error buat table user", err.stack);
            return;
        }
        console.log("table user berhasil di buat");
    });
};

const createKategoriTable = (koneksi) => {
    const q = `create TABLE IF NOT EXISTS kategori(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    deskripsi TEXT
    )`;
    koneksi.query(q, (err, result) => {
        if (err) {
            console.error("error buat table kategori", err.stack);
            return;
        }
        console.log("table kategori berhasil dibuat");
    });
};

const createMenuTable = (koneksi) => {
    const q = ` create TABLE IF NOT EXISTS menu(
    id_menu INT AUTO_INCREMENT PRIMARY KEY,
    id_kategori INT NOT NULL,
    nama_makanan VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    harga DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_kategori) REFERENCES kategori(id)
    )`;
    koneksi.query(q, (err, result) => {
        if (err) {
            console.error("error buat table menu", err.stack);
                return;
        }
        console.log("table menu berhasil dibuat");
    });
};

const createPenjualanTable = (koneksi) => {
    const q = `create TABLE IF NOT EXISTS penjualan(
    id_penjualan INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    quantity INT NOT NULL,
    Total_harga DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_user)
    )`;
    koneksi.query(q, (err, result) => {
        if (err) {
            console.error("error buat tabel penjualan", err.stack);
            return;
        }
        console.log("table penjualan berhasil dibuat");
    });
};

const createPelangganTable = (koneksi) => {
    const q = `create TABLE IF NOT EXISTS pelanggan(
    id_pelanggan INT AUTO_INCREMENT PRIMARY KEY,
    nama_pelanggan VARCHAR(100) NOT NULL,
    alamat_pelanggan TEXT,
    no_tlpn_pelanggan VARCHAR(50),
    password VARCHAR(100) UNIQUE
    )`;
    koneksi.query(q, (err, result) => {
        if (err) {
            console.error("error buat table pelanggan", err.stack);
            return;
        }
        console.log("table pelanggan berhasil dibuat");
    });
};

const createdetailtransaksiTable = (koneksi) => {
    const q = `create TABLE IF NOT EXISTS detail_transaksi(
   id INT AUTO_INCREMENT PRIMARY KEY,
   id_pelanggan INT NOT NULL,
   id_menu INT NOT NULL,
   jumlah INT NOT NULL,
   harga_satuan DECIMAL(10, 2) NOT NULL,
   subtotal DECIMAL(10, 2) AS (jumlah * harga_satuan) STORED,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (id_pelanggan) REFERENCES pelanggan(id_pelanggan),
   FOREIGN KEY (id_menu) REFERENCES menu(id_menu)
   )`;
   koneksi.query(q, (err, result) => {
    if (err) {
        console.error("error buat table detail_transaksi", err.stack);
        return
    }
    console.log("table detail_transaksi berhasil dibuat");
   });
};

const migration = () => {
    koneksiMysql.connect((err) => {
        if (err) {
            console.error("Error koneksi ke database",err.stack);
            return;
        }
        console.log("berhasil koneksi mysql");
        koneksiMysql.query(
           "CREATE DATABASE IF NOT EXISTS angkringan_cakjo",
           (err, result) => {
            if (err) {
                console.error("Error membuat database", err.stack);
                return;
            }
            console.log("Database berhasil dibuat atau sudah ada.");

            const koneksi = require("../models/db");
            createUserTable(koneksi);
            createKategoriTable(koneksi);
            createMenuTable(koneksi);
            createPenjualanTable(koneksi);
            createPelangganTable(koneksi);
            createdetailtransaksiTable(koneksi);
            
            koneksiMysql.end();
           }
        );
    });
};

module.exports = migration;