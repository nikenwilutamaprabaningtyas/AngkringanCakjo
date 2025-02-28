import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";

const EditPelanggan = () => {
    const { id } = useParams();
    const [namaPelanggan, setNamaPelanggan] = useState('');
    const [alamatPelanggan, setAlamatPelanggan] = useState('');
    const [noTlpPelanggan, setNoTlpPelanggan] = useState('');
    const [password, setPassword] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        getPelanggan();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'nama_pelanggan') setNamaPelanggan(value);
        if (name === 'alamat_pelanggan') setAlamatPelanggan(value);
        if (name === 'no_tlpn_pelanggan') setNoTlpPelanggan(value);
        if (name === 'password') setPassword(value);
    }

    const getPelanggan = async () => {
        const response = await fetch(`http://localhost:3000/api/pelanggan/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await response.json();
        setNamaPelanggan(data.nama_pelanggan);
        setAlamatPelanggan(data.alamat_pelanggan);
        setNoTlpPelanggan(data.no_tlpn_pelanggan);
        setPassword(data.password);
    }

    const handleUpdate = async (event) => {
        event.preventDefault();
        const fData = {
            nama_pelanggan: namaPelanggan,
            alamat_pelanggan: alamatPelanggan,
            no_tlpn_pelanggan: noTlpPelanggan,
            password: password
        };

        const response = await fetch(`http://localhost:3000/api/pelanggan/${id}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(fData),
        });

        if (!response.ok) {
            console.error("Error while updating pelanggan");
        } else {
            event.target.reset();
            Swal.fire({
                icon: "success",
                text: "Update pelanggan berhasil",
                timer: 1000
            }).then(() => {
                window.location.href = '/admin/pelanggan';
            })
        }
    }

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-12">
                        <div className="col">
                            <h1 className="m-0">Edit Pelanggan</h1>
                        </div>
                        <div className="col">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Edit Pelanggan</li>
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
                                    <Link to="/admin/pelanggan" className="btn btn-primary float-start">Lihat Data</Link>
                                    <h2 className="text-center">Edit Pelanggan</h2>
                                </div>
                                <form onSubmit={handleUpdate}>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="nama_pelanggan">Nama Pelanggan</label>
                                            <input
                                                type="text"
                                                value={namaPelanggan}
                                                onChange={handleChange}
                                                name="nama_pelanggan"
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="alamat_pelanggan">Alamat Pelanggan</label>
                                            <textarea
                                                value={alamatPelanggan}
                                                onChange={handleChange}
                                                name="alamat_pelanggan"
                                                className="form-control"
                                                required
                                            ></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="no_tlpn_pelanggan">Nomor Telepon</label>
                                            <input
                                                type="text"
                                                value={noTlpPelanggan}
                                                onChange={handleChange}
                                                name="no_tlpn_pelanggan"
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={handleChange}
                                                name="password"
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
}

export default EditPelanggan;
