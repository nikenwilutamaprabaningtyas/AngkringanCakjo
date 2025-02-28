import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";

const EditDetailTransaksi = () => {
    const { id } = useParams();
    const [id_Pelanggan, setIdPelanggan] = useState('');
    const [id_Menu, setIdMenu] = useState('');
    const [jumlah, setJumlah] = useState('');
    const [hargaSatuan, setHargaSatuan] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        getDetailTransaksi();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'id_pelanggan') setIdPelanggan(value);
        if (name === 'id_menu') setIdMenu(value);
        if (name === 'jumlah') setJumlah(value);
        if (name === 'harga_satuan') setHargaSatuan(value);
    };

    const getDetailTransaksi = async () => {
        const response = await fetch(`http://localhost:3000/api/DetailTransaksi/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await response.json();
        console.log(data); 
        setIdPelanggan(data.id_pelanggan);
        setIdMenu(data.id_menu);
        setJumlah(data.jumlah);
        setHargaSatuan(data.harga_satuan);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        const fData = {
            id_Pelanggan: id_Pelanggan,
            id_Menu: id_Menu,
            jumlah,
            harga_satuan: hargaSatuan,
        };
    
        const response = await fetch(`http://localhost:3000/api/DetailTransaksi/${id}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(fData),
        });
    
        const data = await response.json();  // Menambahkan ini untuk menangkap error atau respons server
    
        if (!response.ok) {
            console.error("Error while updating transaction detail:", data);
            Swal.fire({
                icon: 'error',
                text: `Terjadi kesalahan: ${data.message || 'Silakan coba lagi'}`,
            });
        } else {
            event.target.reset();
            Swal.fire({
                icon: "success",
                text: "Detail Transaksi Berhasil Diperbarui",
                timer: 1000
            }).then(() => {
                window.location.href = '/admin/DetailTransaksi'; 
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
                                    <Link to="/admin/detail-transaksi" className="btn btn-primary float-start">Lihat Data</Link>
                                    <h2 className="text-center">Edit Detail Transaksi</h2>
                                </div>
                                <form onSubmit={handleUpdate}>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="id_pelanggan">ID Pelanggan</label>
                                            <input
                                                type="number"
                                                name="id_pelanggan"
                                                value={id_Pelanggan}
                                                onChange={handleChange}
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="id_menu">ID Menu</label>
                                            <input
                                                type="number"
                                                name="id_menu"
                                                value={id_Menu}
                                                onChange={handleChange}
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="jumlah">Jumlah</label>
                                            <input
                                                type="number"
                                                name="jumlah"
                                                value={jumlah}
                                                onChange={handleChange}
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="harga_satuan">Harga Satuan</label>
                                            <input
                                                type="number"
                                                name="harga_satuan"
                                                value={hargaSatuan}
                                                onChange={handleChange}
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-primary">Simpan</button>
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
