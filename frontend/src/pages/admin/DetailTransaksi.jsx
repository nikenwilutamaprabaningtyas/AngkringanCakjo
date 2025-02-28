import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const DetailTransaksi = () => {
  const [dataTransaksi, setDataTransaksi] = useState([]);

  // Function to fetch transaction details
  const tampilData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/Detailtransaksi', {
        method: 'GET', // Fetch data (GET request)
      });

      if (!response.ok) {
        // Check if response status is not OK (400, 500, etc.)
        const errorDetails = await response.text();
        Swal.fire({
          icon: 'error',
          title: 'Gagal mengambil data',
          text: errorDetails,
        });
        return;
      }

      const data = await response.json();
      console.log('Data received:', data);  // Log data to check it
      setDataTransaksi(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Terjadi kesalahan saat mengambil data!',
      });
    }
  };

  useEffect(() => {
    tampilData();
  }, []);

  // Function to handle deletion of transaction detail
  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Yakin menghapus transaksi?",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/api/DetailTransaksi/${id}`, {
          method: 'DELETE',
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Gagal menghapus data");
          }
          return response.json();
        })
        .then(() => {
          setDataTransaksi(prevData => prevData.filter(item => item.id !== id)); // Remove deleted item
          Swal.fire({
            icon: 'success',
            title: 'Transaksi berhasil dihapus',
            text: 'Transaksi telah berhasil dihapus.',
          });
        })
        .catch((error) => {
          console.error('Error deleting data:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Terjadi kesalahan saat menghapus transaksi.',
          });
        });
      }
    });
  };

  return (
    <>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col">
              <h1 className="m-0">Data Detail Transaksi</h1>
            </div>
            <div className="col">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Detail Transaksi</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <Link to="/admin/addDetailTransaksi" className="btn btn-primary">Tambah Detail Transaksi</Link>
              <table className="table table-striped table-bordered mt-2">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>id pelanggan</th>
                    <th>id menu</th>
                    <th>jumlah</th>
                    <th>harga satuan</th>
                    <th>subtotal</th>
                    <th>Edit</th>
                    <th>Hapus</th>
                  </tr>
                </thead>
                <tbody>
                  {dataTransaksi.length > 0 ? (
                    dataTransaksi.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{id_pelanggan}</td>
                        <td>{id_menu}</td>
                        <td>{jumlah}</td>
                        <td>{harga_satuan}</td>
                        <td>{subtotal}</td>
                        <td>
                          <Link to={`/admin/editDetailTransaksi/${item.id}`} className="btn btn-warning">Edit</Link>
                        </td>
                        <td>
                          <button onClick={() => handleDelete(item.id)} className="btn btn-danger">Hapus</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8">Data kosong</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailTransaksi;
