import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [totalMenu, setTotalMenu] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [totalPelanggan, setTotalPelanggan] = useState(0); // State for total customers
  const token = localStorage.getItem('token');

  // Fetch data menu
  const fetchMenuData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/menu', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTotalMenu(data.length); // Store the number of menus
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  };

  // Fetch data user
  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/Users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTotalUser(data.length); // Store the number of users
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Fetch data pelanggan
  const fetchPelangganData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/Pelanggan', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTotalPelanggan(data.length); // Store the number of customers (pelanggan)
    } catch (error) {
      console.error('Error fetching pelanggan data:', error);
    }
  };

  useEffect(() => {
    fetchMenuData();
    fetchUserData();
    fetchPelangganData(); // Fetch pelanggan data when the component mounts
  }, []);

  return (
    <div>
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Angkringan Cakjo</h1>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Angkringan Cakjo</li>
              </ol>
            </div>{/* /.col */}
          </div>{/* /.row */}
        </div>{/* /.container-fluid */}
      </div>
      {/* /.content-header */}

      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          {/* Small boxes (Stat box) */}
          <div className="row">
            {/* Total Menu */}
            <div className="col-lg-4 col-6">
              {/* small box */}
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>{totalMenu}</h3> {/* Displaying the total menu count */}
                  <p>Total Menu</p>
                </div>
                <div className="icon">
                  <i className="ion ion-pizza" />
                </div>
                <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
              </div>
            </div>
            {/* ./col */}

            {/* Total Users */}
            <div className="col-lg-4 col-6">
              {/* small box */}
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>{totalUser}</h3> {/* Displaying the total user count */}
                  <p>Total Users</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
                <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
              </div>
            </div>
            {/* ./col */}

            {/* Total Pelanggan */}
            <div className="col-lg-4 col-6">
              {/* small box */}
              <div className="small-box bg-primary">
                <div className="inner">
                  <h3>{totalPelanggan}</h3> {/* Displaying the total pelanggan count */}
                  <p>Total Pelanggan</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person" />
                </div>
                <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
              </div>
            </div>
            {/* ./col */}
          </div>
          {/* /.row */}
        </div>{/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  );
};

export default Dashboard;
