const DetailTransaksi = require("../models/detailTransaksi");

const index = (req, res) => {
    DetailTransaksi.selectDetailTransaksi((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0 ) {
            return res.status(404).json({
                message: "No transactions found"
            });
        }
        res.status(200).json(result);
    });
};

const storeDetailTransaksi = (req, res) => {
    console.log(req.body);  // Periksa data yang diterima di backend
  
    const { id_pelanggan, id_menu, jumlah, harga_satuan, subtotal } = req.body;
    if (!id_pelanggan || !id_menu || !jumlah || !harga_satuan || !subtotal) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    DetailTransaksi.insertDetailTransaksi(id_pelanggan, id_menu, jumlah, harga_satuan, subtotal, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: "Transaction successfully stored", transactionId: result.insertId });
    });
  };
  

const showDetailTransaksi  = (req, res) => {
    const { id_detail_transaksi } = req.params;
    DetailTransaksi.selectDetailTransaksiById(id_detail_transaksi, (err,result ) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.lengthn === 0) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        res.status(200).json(result[0]);
    });
};

const updateDetailTransaksi  = (req, res) => {
    const { id_DetailTransaksi} = req.params;
    const { id_pelanggan, id_menu, jumlah, harga_satuan } = req.body;
    
    if (!id_pelanggan || !id_menu || !jumlah || !harga_satuan) {
        return res.status(500).json({ error: "All fields are required" });
    }
    DetailTransaksi.updateDetailTransaksi(id_DetailTransaksi, id_pelanggan, id_menu, jumlah, harga_satuan,  (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: "Transaction successfully updated" });
    });
};
const destroyDetailTransaksi = (req, res) => {
    const {id_DetailTransaksi} = req.params;
    DetailTransaksi.deleteDetailTransaksi(id_DetailTransaksi, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message})
        }
        res.status(200).json({ message: "Transaction successfully deleted"});
    });
};

module.exports = { index, storeDetailTransaksi, showDetailTransaksi,updateDetailTransaksi, destroyDetailTransaksi}