import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";

const EditDetailTransaksi = () => {
  const { id } = useParams();
  const [idPelanggan, setIdPelanggan] = useState('');
  const [idMenu, setIdMenu] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [hargaSatuan, setHargaSatuan] = useState('');

  // Fetch data when component loads to fill the form with current values
  useEffect(() => {
    getDetailTransaksi();
  }, []);

  // Fetch the current transaction details from the server
  const getDetailTransaksi = async () => {
    const response = await fetch(`http://localhost:3000/api/detailtransaksi/${id}`);
    const data = await response.json();
    setIdPelanggan(data.id_pelanggan);
    setIdMenu(data.id_menu);
    setJumlah(data.jumlah);
    setHargaSatuan(data.harga_satuan);
  };

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'idPelanggan') setIdPelanggan(value);
    if (name === 'idMenu') setIdMenu(value);
    if (name === 'jumlah') setJumlah(value);
    if (name === 'hargaSatuan') setHargaSatuan(value);
  };

  // Handle the form submission for updating the transaction
  const handleUpdate = async (event) => {
    event.preventDefault();

    // Prepare the data to send in the PUT request
    const fData = {
      id_pelanggan: idPelanggan,
      id_menu: idMenu,
      jumlah: jumlah,
      harga_satuan: hargaSatuan,
    };

    // Send the PUT request to update the detail_transaksi
    const response = await fetch(`http://localhost:3000/api/detailtransaksi/${id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fData),
    });

    if (!response.ok) {
      Swal.fire({
        icon: 'error',
        text: 'There was an error updating the transaction details.',
      });
    } else {
      Swal.fire({
        icon: "success",
        text: "Transaction details updated successfully",
        timer: 1000, // Shows the message for 1 second
      }).then(() => {
        // Redirect after success
        window.location.href = '/admin/detailtransaksi'; // Update with your correct path
      });
    }
  };

  return (
    <>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-12">
            <div className="col">
              <h1 className="m-0">Edit Detail Transaksi</h1>
            </div>
            <div className="col">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Edit Detail Transaksi</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <Link to="/admin/detailtransaksi" className="btn btn-primary float-start">View Details</Link>
                  <h2 className="text-center">Edit Detail Transaksi</h2>
                </div>
                <form onSubmit={handleUpdate}>
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="idPelanggan">ID Pelanggan</label>
                      <input
                        type="number"
                        value={idPelanggan}
                        onChange={handleChange}
                        name="idPelanggan"
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="idMenu">ID Menu</label>
                      <input
                        type="number"
                        value={idMenu}
                        onChange={handleChange}
                        name="idMenu"
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="jumlah">Quantity</label>
                      <input
                        type="number"
                        value={jumlah}
                        onChange={handleChange}
                        name="jumlah"
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="hargaSatuan">Price per Unit</label>
                      <input
                        type="number"
                        value={hargaSatuan}
                        onChange={handleChange}
                        name="hargaSatuan"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>

                  <div className="card-footer">
                    <button type="submit" className="btn btn-primary">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditDetailTransaksi;
