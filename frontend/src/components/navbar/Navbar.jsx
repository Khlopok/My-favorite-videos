import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'

const Navbar = ({ load, onlyProgress }) => {
    const history = useHistory();

    const [progress, setProgress] = useState(1);

    const logout = _=> {
        localStorage.clear();
        history.push('/session');
    };

    const loader = _=> {
        if (progress < 100) {
            setTimeout(_=> {setProgress(progress + 1)}, 10);
        } else {
            setProgress(0);
        }
    }

    useEffect(_=> {
        if (progress !== 0) loader();
        if (load === true) setProgress(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progress, load])
   
    return (
        <header>
            <progress max="100" value={progress} />
            {!onlyProgress?
                <nav>
                    <h1>
                        <Link to="/">My favorite videos</Link>
                    </h1>
                    <div>
                        <Link to="/new_video" className="btn">Create new video</Link>
                        <span className="btn" onClick={_=> logout()}>Logout</span>
                    </div>
                </nav>
                :
                <nav>
                    <h1>
                        <Link to="/">My favorite videos</Link>
                    </h1>
                </nav>}
        </header>
    )
}

export default Navbar;