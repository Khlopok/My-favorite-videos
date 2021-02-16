import React, { useState } from 'react';
import * as sessionService from './sessionService';
import { useParams, useHistory, Link } from 'react-router-dom';

const Form = () => {
    const params = useParams()
    const history = useHistory()

    const [msg, setMsg] = useState('')
    const [userData, setUserData] = useState({name: '', password: ''})
    
    const handleChange = (e) => {
        // Form value
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // If there is a parameter is login, if don't, is register
        if(!params.mode) {
            try {
                const res = await sessionService.signin(userData);
                localStorage.setItem('sessionToken', res.data.token);
                localStorage.setItem('sessionUser', res.data.user);
                if (res.status === 200) history.push('/');
            }
            catch(err) {
                if (err.response.status === 401) {
                    e.target.classList.toggle('repeated');
                    setMsg('Password incorrect!');
                    setTimeout(_=> {
                        e.target.classList.toggle('repeated');
                        setMsg('');
                    }, 5000);
                } else {
                    e.target.classList.toggle('error');
                    setMsg('The user does not exist.');
                    console.log(err)
                    setTimeout(_=> {
                        e.target.classList.toggle('error');
                        setMsg('');
                    }, 5000);
                }
            }
        } else {
            try {
                const res = await sessionService.signup(userData);
                if (res.status === 201) history.push('/session');
                e.target.classList.toggle('success');
                    setMsg('Successfully registered!');
                    setTimeout(_=> {
                        e.target.classList.toggle('success');
                        setMsg('');
                    }, 5000);
            }
            catch (err) {
                if (err.response.status === 401) {
                    e.target.classList.toggle('repeated');
                    setMsg('The user is already taken!');
                    setTimeout(_=> {
                        e.target.classList.toggle('repeated');
                        setMsg('');
                    }, 5000);
                } else {
                    e.target.classList.toggle('error');
                    setMsg('Oops :(. Something went wrong.');
                    console.log(err)
                    setTimeout(_=> {
                        e.target.classList.toggle('error');
                        setMsg('');
                    }, 5000);
                }
            }
        }
    }

    return (
        <main className="form-container">
            <form onSubmit={handleSubmit}>
            {params.mode? <h2>Register</h2>:<h2>Wellcome</h2>}
                <div>
                    <input type="text" name="name" placeholder="Name" autoComplete="nope!" required autoFocus onChange={handleChange}/>
                    <input type="password" name="password" placeholder="Password" autoComplete="off" required onChange={handleChange}/>
                    {
                    params.mode?
                    <input type="submit" value="Register" className="create-btn"/>:
                    <input type="submit" value="Login" className="update-btn"/>
                    }
                    {
                    params.mode?
                    <p>Back to <Link to="/session" className="link">Login!</Link></p>:
                    <p>Not resgister yet? you can register <Link to="/session/register" className="link">Here!</Link></p>
                    }
                </div>
                <div>
                    <span className="msg">{msg}</span>
                </div>
            </form>
        </main>
    )
}

export default Form;