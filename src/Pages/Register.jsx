import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Title from '../Components/Title'


function Register() {
    return (
        <div>
            
            <Title />
            <div  className="bg-secondary d-flex justify-content-center align-items-center vh-100">
                <div id="box1" className="p-3 rounded bg-white">
                    <h2 > Register </h2>

                    <form>
                        <div className="form-group mb-3">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" id="username" placeholder="Enter username"/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter email"/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter password"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Register;