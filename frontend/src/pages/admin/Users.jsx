import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const User = () => {
  const [dataUsers, setUsers] = useState([]);
  const token = localStorage.getItem('token');

  // Menampilkan data pengguna
  const tampilData = async () => {
    if (!token) {
      console.error("Token tidak ditemukan");
      Swal.fire({
        icon: 'error',
        title: 'Token tidak ditemukan!',
        text: 'Silakan login terlebih dahulu.',
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/Users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal mengambil data',
        text: 'Terjadi kesalahan saat memuat data pengguna!',
      });
    }
  };

  // Efek samping saat komponen dimuat
  useEffect(() => {
    tampilData();
  }, []);

  // Menghapus pengguna
  const handleDelete = (id_user) => {
    Swal.fire({
      icon: "warning",
      title: "Yakin menghapus pengguna?",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/api/Users/${id_user}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
          })
          .then(() => {
            setUsers(prevData => prevData.filter(item => item.id_user !== id_user));
            Swal.fire({
              icon: 'success',
              title: 'Pengguna berhasil dihapus',
            });
          })
          .catch(error => {
            console.error('Error deleting data:', error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Terjadi kesalahan saat menghapus pengguna!',
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
              <h1 className="m-0">Data Pengguna</h1>
            </div>
            <div className="col">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Pengguna</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <Link to="/admin/addUsers" className="btn btn-primary">Tambah Pengguna</Link>
              <table className="table table-striped table-bordered mt-2">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Edit</th>
                    <th>Hapus</th>
                  </tr>
                </thead>
                <tbody>
                  {dataUsers.length > 0 ? (
                    dataUsers.map((item, index) => (
                      <tr key={item.id_user}> {/* Ganti key menggunakan id_user untuk stabilitas */}
                        <td>{index + 1}</td>
                        <td>{item.nama}</td>
                        <td>{item.email}</td>
                        <td>
                          <Link to={`/admin/EditUsers/${item.id_user}`} className="btn btn-warning">Edit</Link>
                        </td>
                        <td>
                          <button onClick={() => handleDelete(item.id_user)} className="btn btn-danger">Hapus</button>
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

export default User;
