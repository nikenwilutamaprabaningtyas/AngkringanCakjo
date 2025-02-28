import React from 'react';
import Swal from 'sweetalert2';

const Login = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const fData = {};
        for (let elm of event.target.elements) {
            if (elm.type === 'text' || elm.type === 'password') {
                fData[elm.name] = elm.value;
            }
        }

        fetch("http://localhost:3000/api/login", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(fData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.token != null) {
                    localStorage.setItem('token', data.token);
                    event.target.reset();
                    window.location.href = '/admin/dashboard';
                } else {
                    event.target.reset();
                    Swal.fire({
                        icon: "error",
                        text: "User tidak ditemukan",
                        timer: 1000,
                    });
                }
            })
            .catch((error) => console.error('Error:', error));
    };

    return (
        <>
            <div className="login-box" style={{
                width: "360px",
                margin: "auto",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#bde0fe"
            }}>

                <div className="login-logo">
                    <a href="../../index2.html" style={{ color: "#2D336B" }}><b>Login</b></a>
                </div>
                <div className="card">
                    <div className="card-body login-card-body">
                        <img src="https://i.pinimg.com/736x/73/5a/70/735a70b1abc4bfed1c0f86539fc3fa9c.jpg" alt="Logo"
                            style={{
                                width: "150px",
                                height: "150px",
                                display: "block",
                                margin: "0 auto 10px",
                                borderRadius: "50%"
                            }}/>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <input type="text" name="email" className="form-control" placeholder="email" autoComplete="off" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user-check" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" name="password" className="form-control" placeholder="Password" autoComplete="new-password" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock-open" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <div className="icheck-primary">
                                        <input type="checkbox" id="remember" />
                                        <label htmlFor="remember">
                                            Remember Me
                                        </label>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;