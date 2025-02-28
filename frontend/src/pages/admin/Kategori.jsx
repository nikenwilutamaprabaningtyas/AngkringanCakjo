import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Kategori = () => {
  const [dataKategori, setKategori] = useState([]);
  const token = localStorage.getItem('token');

  const tampilData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/kategori', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const data = await response.json();
      setKategori(data);
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
      title: "Yakin menghapus kategori?",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/api/kategori/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        .then(response => response.json())
        .then(() => {
          // Update the state by filtering out the deleted item
          setKategori(prevData => prevData.filter(item => item.id !== id));
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
              <h1 className="m-0">Data Kategori</h1>
            </div>
            <div className="col">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Kategori</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <Link to="/admin/addkategori" className="btn btn-primary">Tambah Kategori</Link>
              <table className="table table-striped table-bordered mt-2">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Deskripsi</th>
                    <th>Edit</th>
                    <th>Hapus</th>
                  </tr>
                </thead>
                <tbody>
                  {dataKategori.length > 0 ? (
                    dataKategori.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.nama}</td>
                        <td>{item.deskripsi}</td>
                        <td>
                          <Link to={`/admin/editkategori/${item.id}`} className="btn btn-warning">Edit</Link>
                        </td>
                        <td>
                          <button onClick={() => handleDelete(item.id)} className="btn btn-danger">Hapus</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">Data kosong</td>
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

export default Kategori;
