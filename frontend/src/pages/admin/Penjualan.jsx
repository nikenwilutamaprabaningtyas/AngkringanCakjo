import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Penjualan = () => {
  const [dataPenjualan, setPenjualan] = useState([]);
  const token = localStorage.getItem('token');

  const tampilData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/penjualan', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const data = await response.json();
      setPenjualan(data);
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
      title: "Yakin menghapus penjualan?",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/api/penjualan/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        .then(response => response.json())
        .then(() => {
          // Update the state by filtering out the deleted item
          setPenjualan(prevData => prevData.filter(item => item.id_penjualan !== id));
        })
        .catch(error => {
          console.error('Error deleting data:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong while deleting!',
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
              <h1 className="m-0">Data Penjualan</h1>
            </div>
            <div className="col">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Penjualan</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <Link to="/admin/addpenjualan" className="btn btn-primary">Tambah Penjualan</Link>
              <table className="table table-striped table-bordered mt-2">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Pengguna</th>
                    <th>Jumlah</th>
                    <th>Total Harga</th>
                    <th>Waktu Penjualan</th>
                    <th>Edit</th>
                    <th>Hapus</th>
                  </tr>
                </thead>
                <tbody>
                  {dataPenjualan.length > 0 ? (
                    dataPenjualan.map((item, index) => (
                      <tr key={item.id_penjualan}>
                        <td>{index + 1}</td>
                        <td>{item.id_user}</td> {/* You might want to replace id_user with the actual user's name if possible */}
                        <td>{item.quantity}</td>
                        <td>{item.Total_harga}</td>
                        <td>{new Date(item.created_at).toLocaleString()}</td>
                        <td>
                          <Link to={`/admin/editpenjualan/${item.id_penjualan}`} className="btn btn-warning">Edit</Link>
                        </td>
                        <td>
                          <button onClick={() => handleDelete(item.id_penjualan)} className="btn btn-danger">Hapus</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">Data kosong</td>
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

export default Penjualan;
