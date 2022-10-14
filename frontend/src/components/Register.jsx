import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";


import "../styles/Login.scss"
import "../styles/Register.scss"


const Register = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        cPassword: ""
    })
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
        console.log(name, value);
    }

    const navigate = useNavigate();
    const postData = async (event) => {
        event.preventDefault()

        const { name, email, password, cPassword } = user;

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, password, cPassword
            })
        });

        const data = await res.json();

        if (res.status === 422 || !data)
            window.alert("Invalid registration !")

        else {
            window.alert("Registration successfull !!");
            navigate("/login")
        }
    }
    return (
        <section className='Login'>
            <div className='container'>
                <div className='login-container'>
                    <div className='login-heading'>
                        <h2>SignUp Form</h2>
                    </div>

                    <div className='line'></div>
                    <form action="POST" className='login-form'>
                        <div className='input-group'>
                            <div className='email-container'>
                                <input
                                    type="text"
                                    name="name"
                                    value={user.name}
                                    onChange={handleChange}
                                    placeholder="Name"
                                    autoComplete='off'
                                />

                            </div>
                            <div className='email-container'>
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                />
                            </div>
                            <div className='password-container'>
                                <input
                                    type="password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    autoComplete='off'
                                />
                            </div>
                            <div className='password-container'>
                                <input
                                    type="password"
                                    name="cPassword"
                                    value={user.cPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm-Password"
                                    autoComplete='off'
                                />
                            </div>

                        </div>
                        <button onClick={postData}>Sign Up</button>
                        <div className='trouble'>
                            <p>Having issues logging in?</p>
                            <p><a href="https://www.google.com/search?q=clear+cookies" target="__blank">Clearing your cookies will resolve it</a></p>
                        </div>
                    </form>

                    <div className='already-user-container'>
                        <p>Already a user? <span><Link to="/login"> LogIn here</Link></span></p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register;