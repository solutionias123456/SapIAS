import React, { useState } from 'react';
import logoImage from '../../public/assets/logoIAS.png';
import { useHistory } from 'react-router-dom';
import './LoginStyle.css'; // Import file CSS mới

function Login() {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showErrorOverlay, setShowErrorOverlay] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {

        if (!username) {
            setError('Username cannot be left blank');
            setShowErrorOverlay(true);
            return;
        }

        if (!password) {
            setError('Password cannot be left blank');
            setShowErrorOverlay(true);
            return;
        }

        try {
            const response = await fetch(`http://ftp.solutionias.com:3002/api/userlogin/${username}?password=${password}`, {
                method: 'GET',
                headers: {
                    'x-api-key': '8689466dc01e12904d705b4f4ddb3852'
                }
            });
            if (response.ok) {
                const responseData = await response.text();
                console.log('Response data:', responseData);
                if (!responseData) {
                    // Thông tin đăng nhập không hợp lệ, hiển thị thông báo lỗi
                    setError('Invalid username or password');
                    setShowErrorOverlay(true);
                } else {
                    localStorage.setItem('user', responseData); // Lưu thông tin người dùng vào localStorage
                    history.push('/home'); // Chuyển hướng đến trang Home
                }
            } else {
                // Xử lý lỗi từ API
                setError('Failed to log in');
                setShowErrorOverlay(true);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <div className={showErrorOverlay ? 'error-overlay active' : 'error-overlay'}>
                <div className="error-overlay-content">
                    <p className="error-message">{error}</p>
                    <button className="error-button" onClick={() => setShowErrorOverlay(false)}>Close</button>
                </div>
            </div>
            <form className="login-form">
                <h2 style={{ textAlign: 'center', marginBottom: '30px', fontFamily: 'Arial', color: '#000077' }}>WELCOME TO IAS - SAP</h2>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={logoImage} alt="Logo" style={{ marginBottom: '30px', width: '120px', height: '90px' }} />
                </div>
                <div style={{ marginBottom: '20px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    {/* Input cho Tên đăng nhập */}
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder='User name'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '16px' }}
                    />
                </div>

                <div style={{ marginBottom: '20px', width: '100%', display: 'flex', justifyContent: 'center', position: 'relative' }}>
                    {/* Input cho Mật khẩu */}
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '16px' }}
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        {showPassword ? '👁️' : '👁️‍🗨️'}

                    </button>
                </div>

                <div style={{ marginBottom: '30px', width: '100%', display: 'flex', alignItems: 'center' }}>
                    {/* Checkbox cho Nhớ mật khẩu */}
                    <input
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        style={{ marginRight: '5px' }}
                    />
                    <label htmlFor="rememberMe">Remember password</label>
                </div>

                {/* Button Đăng nhập */}
                <button
                    type="button"
                    onClick={handleLogin}
                    style={{ marginBottom: '10px', width: '100%', padding: '10px', borderRadius: '10px', backgroundColor: 'dodgerblue', color: 'white', border: 'none', cursor: 'pointer', fontSize: '100%' }}>
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
