import React from 'react';
import { Link, useHistory } from 'react-router-dom'

const Navbar = _=> {
    const history = useHistory();

    const logout = _=> {
        localStorage.clear();
        history.push('/session');
    };
   
    return (
        <header>
            <nav>
                <h1>
                    <Link to="/">My favorite videos</Link>
                </h1>
                <div>
                    <Link to="/new_video" className="btn">Create new video</Link>
                    <span className="btn" onClick={_=> logout()}>Logout</span>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;