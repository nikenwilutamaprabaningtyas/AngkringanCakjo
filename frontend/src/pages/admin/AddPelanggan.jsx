import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AddPelanggan = () => {
    const token = localStorage.getItem('token');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const fData = {};
        const frmel = event.target;
        for (let el of frmel.elements) {
            fData[el.name] = el.value;
        }

        const response = await fetch("http://localhost:3000/api/pelanggan", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(fData),
        });

        if (!response.ok) {
            console.log("Error while saving pelanggan.");
        } else {
            event.target.reset();
            Swal.fire({
                icon: "success",
                text: "Pelanggan Berhasil Disimpan",
                timer: 1000,
            }).then(() => {
                window.location.href = '/admin/pelanggan';
            });
        }
    }

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col">
                            <h1 className="m-0">Input Pelanggan</h1>
                        </div>
                        <div className="col">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Input Pelanggan</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <div className="card-header">
                                    <Link to="/admin/pelanggan" className="btn btn-primary float-start">Lihat data</Link>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="nama_pelanggan">Nama Pelanggan</label>
                                            <input type="text" name="nama_pelanggan" className="form-control" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="alamat_pelanggan">Alamat Pelanggan</label>
                                            <textarea name="alamat_pelanggan" className="form-control" required></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="no_tlpn_pelanggan">Nomor Telepon</label>
                                            <input type="text" name="no_tlpn_pelanggan" className="form-control" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" name="password" className="form-control" required />
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

export default AddPelanggan;
