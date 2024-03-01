import React, { useEffect, useState } from 'react';
import './PicklistStyle.css';
import { useHistory } from 'react-router-dom';

function Picklist() {
    const history = useHistory();
    const [picklistData, setPicklistData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Effect hook để gọi API khi component được render hoặc giá trị tìm kiếm thay đổi
    useEffect(() => {
        fetchData();
    }, [searchTerm]); // Gọi lại useEffect khi searchTerm thay đổi

    // Hàm gọi API để lấy dữ liệu
    const fetchData = async () => {
        try {
            const response = await fetch(`http://ftp.solutionias.com:3002/api/picklists?absentry=0&so=${searchTerm}&pickdate=01/01/2000`, {
                headers: {
                    'x-api-key': '8689466dc01e12904d705b4f4ddb3852'
                }
            });

            // Kiểm tra nếu response không thành công
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            // Chuyển đổi dữ liệu response thành JSON
            const data = await response.json();

            // Nếu không có dữ liệu trả về, hiển thị thông báo lỗi
            if (data.length === 0 && searchTerm.length === 4) {
                setErrorMessage(`SO not found: ${searchTerm}`);
            } else {
                // Nếu có dữ liệu, xóa thông báo lỗi và cập nhật state picklistData
                setErrorMessage('');
                setPicklistData(data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Xử lý khi nhấn phím Enter trong ô tìm kiếm
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            fetchData();
        }
    };

    // Xử lý khi thay đổi nội dung trong ô tìm kiếm
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Hàm xử lý khi người dùng nhấn vào một item trong danh sách
    const handleItemClick = async (AbsEntry) => {
        try {
            const response = await fetch(`http://ftp.solutionias.com:3002/api/picklists/getitembyid/${AbsEntry}`, {
                headers: {
                    'x-api-key': '8689466dc01e12904d705b4f4ddb3852'
                }
            });

            // Kiểm tra nếu response không thành công
            if (!response.ok) {
                throw new Error('Failed to fetch item data');
            }

            // Xử lý dữ liệu trả về nếu cần
            const itemData = await response.json();
            console.log('Item data:', itemData);

            // Điều hướng đến trang PicklistDetail và truyền itemData là props
            history.push({
                pathname: '/picklistdetail',
                state: { itemData }
            });

        } catch (error) {
            console.error('Error fetching item data:', error);
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="header">
                <h2 className='title'>Pick List</h2>
            </div>

            <div className='search'>
                {/* Thanh tìm kiếm */}
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress} // Gọi handleKeyPress khi nhấn phím
                    className="search-input"
                />
            </div>

            {/* Hiển thị thông báo lỗi nếu có */}
            {errorMessage && <div className='errorSearch'>{errorMessage}</div>}

            {/* Phần content */}
            <div>
                {/* Hiển thị dữ liệu từ API */}
                {picklistData.map((item, index) => (
                    <div className="content-container" key={index} onClick={() => handleItemClick(item.AbsEntry)}>
                        <div className='container-item'>
                            <div className='title-item'>AbsEntry:</div>
                            <div className='absentry'>{item.AbsEntry}</div>
                        </div>
                        <div className='container-item'>
                            <div className='title-item'>SO:</div>
                            <div className='so'>{item.SO}</div>
                        </div>
                        <div className='container-item'>
                            <div className='title-item'>Pick Date:</div>
                            <div className='pickdate'>{new Date(item.PickDate).toLocaleDateString()}</div>
                        </div>
                        <div className='container-item'>
                            <div className='title-item'>Picker:</div>
                            <div className='picker'>{item.Picker}</div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Picklist;
