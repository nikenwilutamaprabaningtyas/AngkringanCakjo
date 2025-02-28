import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Menu = () => {
  const [dataMenu, setMenu] = useState([]);
  const token = localStorage.getItem('token');

  const tampilData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/menu', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const data = await response.json();
      setMenu(data);
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
      title: "Yakin menghapus menu?",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/api/menu/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        .then(response => response.json())
        .then(() => {
          // Update the state by filtering out the deleted item
          setMenu(prevData => prevData.filter(item => item.id_menu !== id));
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
              <h1 className="m-0">Data Menu</h1>
            </div>
            <div className="col">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Menu</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <Link to="/admin/addmenu" className="btn btn-primary">Tambah Menu</Link>
              <table className="table table-striped table-bordered mt-2">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Makanan</th>
                    <th>Deskripsi</th>
                    <th>Harga</th>
                    <th>Kategori</th>
                    <th>Edit</th>
                    <th>Hapus</th>
                  </tr>
                </thead>
                <tbody>
                  {dataMenu.length > 0 ? (
                    dataMenu.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.nama_makanan}</td>
                        <td>{item.deskripsi}</td>
                        <td>{item.harga}</td>
                        <td>{item.id_kategori}</td>
                        <td>
                          <Link to={`/admin/editmenu/${item.id_menu}`} className="btn btn-warning">Edit</Link>
                        </td>
                        <td>
                          <button onClick={() => handleDelete(item.id_menu)} className="btn btn-danger">Hapus</button>
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

export default Menu;
