const koneksi = require("./db");

const  selectDetailTransaksi = (callback) => {
    const q = "SELECT * FROM DetailTransaksi";
    koneksi.query(q, callback);
};

const insertDetailTransaksi = (id_pelanggan, id_menu, jumlah, harga_satuan, subtotal, callback) => {
    if (id_pelanggan && id_menu && jumlah && harga_satuan && subtotal) {
        const subtotal = jumlah * harga_satuan;
         const q = "INSERT INTO DetailTransaksi(id_pelanggan, id_menu, jumlah, harga_satuan, subtotal) VALUES(?,?,?,?,?)";
         koneksi.query(q, [id_pelanggan, id_menu, jumlah, harga_satuan, subtotal], callback);
     } else {
        console.error("semua kolom harus diisi");
     }
   };
    const  selectDetailTransaksiById = (id, callback) => {
        const q = "SELECT * FROM DetailTransaksi WHERE id = ?";
        koneksi.query(q, [id], callback)
    };

    const updateDetailTransaksi  = (id, id_pelanggan, id_menu, jumlah, harga_satuan, callback) => {
        if (id_pelanggan && id_menu && jumlah && harga_satuan) {
            let subtotal = jumlah * harga_satuan;
            const q = "UPDATE detail_transaksi SET id_pelanggan = ?, id_menu = ?, jumlah = ?, harga_satuan = ?, subtotal = ? WHERE id  = ?";
            koneksi.query(q, [id_pelanggan, id_menu, jumlah, harga_satuan, subtotal, id], callback );
        } else {
            console.error("All fields must be filled");
        }
    };

    const deleteDetailTransaksi = (id, callback) => {
        const q = "DELETE FROM DetailTransaksi WHERE id = ?";
        koneksi.query(q, [id], callback);
    };

    module.exports = { selectDetailTransaksi, insertDetailTransaksi, selectDetailTransaksiById, updateDetailTransaksi, deleteDetailTransaksi };