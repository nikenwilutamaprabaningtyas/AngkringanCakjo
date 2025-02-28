import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Pelanggan = () => {
  const [dataPelanggan, setPelanggan] = useState([]);
  const token = localStorage.getItem('token');

  const tampilData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/Pelanggan', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
  
      console.log('Response Status:', response.status);  // Cek status respons
      const data = await response.json();
      console.log('Data Pelanggan:', data);  // Periksa data yang diterima
  
      setPelanggan(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  useEffect(() => {
    tampilData();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Yakin menghapus pelanggan?",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/api/Pelanggan/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Error: ${response.statusText}`);  // Menangani jika ada kesalahan dari server
            }
            return response.json();  // Parsing response jika status OK
          })
          .then(() => {
            // Memperbarui state dengan menghapus data pelanggan yang sudah dihapus
            setPelanggan(prevData => prevData.filter(item => item.id_pelanggan !== id));
            Swal.fire({
              icon: 'success',
              title: 'Pelanggan berhasil dihapus',
              timer: 1500
            });
          })
          .catch(error => {
            console.error('Error deleting data:', error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.message || 'Terjadi kesalahan saat menghapus!',
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
              <h1 className="m-0">Data Pelanggan</h1>
            </div>
            <div className="col">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Pelanggan</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <Link to="/admin/addpelanggan" className="btn btn-primary">Tambah Pelanggan</Link>
              <table className="table table-striped table-bordered mt-2">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Alamat</th>
                    <th>No Telepon</th>
                    <th>Edit</th>
                    <th>Hapus</th>
                  </tr>
                </thead>
                <tbody>
                  {dataPelanggan.length > 0 ? (
                    dataPelanggan.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.nama_pelanggan}</td>
                        <td>{item.alamat_pelanggan}</td>
                        <td>{item.no_tlpn_pelanggan}</td>
                        <td>
                          <Link to={`/admin/editpelanggan/${item.id_pelanggan}`} className="btn btn-warning">Edit</Link>
                        </td>
                        <td>
                          <button onClick={() => handleDelete(item.id_pelanggan)} className="btn btn-danger">Hapus</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">Data kosong</td>
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

export default Pelanggan;
