import React, { useEffect, useState } from 'react';
import './Style.css';
import logoImage from '../../public/assets/logoIAS.png';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function Home({ username }) {
    const [user, setUser] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    useEffect(() => {
        if (user) {
            console.log('User data from home:', user);
        }
    }, [user]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleMenuItemClick = (item) => {
        console.log(`Selected menu item: ${item}`);
    };

    // Xử lý sự kiện khi mục "Account" được chọn
    const handleAccountClick = () => {
        setShowPopup(true);
    };

    const handleLogout = () => {
        // Xóa thông tin người dùng khỏi localStorage
        localStorage.removeItem('user');
        // Chuyển hướng về trang đăng nhập
        history.push('/');
    };

    return (
        <div className="home-container">
            <div className="header">
                <div className="dropdown">
                    <div className="hamburger-menu" onClick={toggleDropdown}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                    {isDropdownOpen && (
                        <div className="dropdown-content-vertical">
                            <Link to="/picklist" onClick={() => { handleMenuItemClick("Item 1"); setIsDropdownOpen(false); }}>Pick list</Link>
                            <Link to="#" onClick={() => { handleAccountClick(); setIsDropdownOpen(false); }}>Account</Link>
                        </div>
                    )}
                </div>
                {/* <div className="circle-container">
                    <div className="circle">
                        {initials}
                    </div>
                </div> */}
            </div>

            <div className="logo-container"></div>

            <div className="mobile-logo">
                <img src={logoImage} alt="Mobile Logo" className="mobile-logo-img" />
            </div>

            {/* Pop-up */}
            {showPopup && (
                <div className="popup">
                    {/* Hiển thị thông tin user */}
                    <h2>User Information</h2>
                    <p>Username: {user.UserName}</p>
                    <p>Role: {user?.isLeader ? 'Staff' : 'Leader'}</p>
                    <button onClick={() => setShowPopup(false)}>Close</button>
                    <button onClick={handleLogout}>Log out</button>
                </div>
            )}
        </div>
    );
}

export default Home;