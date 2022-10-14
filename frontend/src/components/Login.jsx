import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import "../styles/Login.scss"
import "animate.css"


const Login = () => {

    const [user, setUser] = React.useState({
        email: "",
        password: ""
    })
    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setUser(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }
    const navigate = useNavigate();
    const loginUser = async (event) => {
        event.preventDefault();
        const { email, password } = user;

        const res = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (res.status === 400 || !data)
            window.alert("Invalid Credentials")
        else {
            window.alert("Logged In successfull")
            navigate("/home")
        }
    }
    return (
        <section className='Login'>
            <div className='container'>
                <div className='login-container'>
                    <div className='login-heading'>
                        <h2>Login Form</h2>
                    </div>

                    <div className='line'></div>
                    <form method="POST" className='login-form'>
                        <div className='input-group'>
                            <div className='email-container'>
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    placeholder="Enter Your email"
                                />
                            </div>
                            <div className='password-container'>
                                <input
                                    type="password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    placeholder="Enter Your password"
                                    autoComplete='off'
                                />
                            </div>
                        </div>
                        <button onClick={loginUser}>Log In</button>
                        <div className='trouble'>
                            <p>Having issues logging in?</p>
                            <p><a href="https://www.google.com/search?q=clear+cookies" target="__blank">Clearing your cookies will resolve it</a></p>
                        </div>
                    </form>

                    <div className='already-user-container'>
                        <p>New here? <span><Link to="/register"> Sign Up</Link></span></p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login