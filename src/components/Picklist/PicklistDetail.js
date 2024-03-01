import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ImageQR from '../../assets/qrcode.png';
import './PicklistDetailStyle.css';
import jsQR from "jsqr";

function PicklistDetail() {
    const location = useLocation();
    const [itemData, setItemData] = useState(null);

    useEffect(() => {
        const data = location.state && location.state.itemData;
        if (data) {
            console.log('Data from PicklistDetail:', data);
            setItemData(data);
        }
    }, [location]);

    const handleFooterClick = () => {
        const isMobileWidth = window.innerWidth < 600;
        if (isMobileWidth && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
                .then(function (stream) {
                    console.log('Camera opened');
                    alert('Camera opened successfully!');
                    const video = document.createElement('video');
                    document.body.appendChild(video);
                    video.srcObject = stream;
                    video.play();

                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.width = 640;
                    canvas.height = 480;
                    document.body.appendChild(canvas);

                    // Xử lý lấy hình ảnh từ video và quét mã QR tại đây
                    video.addEventListener('play', function () {
                        const timer = setInterval(() => {
                            if (context) {
                                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                                const code = jsQR(imageData.data, imageData.width, imageData.height);
                                if (code) {
                                    console.log('QR code detected:', code.data);
                                    clearInterval(timer);
                                }
                            }
                        }, 100);
                    });
                })
                .catch(function (error) {
                    console.error('Error accessing camera:', error);
                });
        } else {
            console.log('Not a mobile device or getUserMedia is not supported, or the window width is larger than 600px');
        }
    };

    return (
        <div>
            <div className="header">
                <h2 className='title'>Pick List Detail</h2>
            </div>

            {itemData && (
                <div>
                    {itemData.map((item, index) => (
                        <div className="content-container" key={index}>
                            <div className='container-item'>
                                <div className='title-item'>ItemCode:</div>
                                <div className='itemcode'>{item.ItemCode}</div>
                            </div>
                            <div className='container-item'>
                                <div className='title-item'>Item Name:</div>
                                <div className='itemname'>{item.ItemName}</div>
                            </div>
                            <div className='container-item'>
                                <div className='title-item'>Quantity Order:</div>
                                <div className='qtyorder'>{item.QtyOrder}</div>
                            </div>
                            <div className='container-item'>
                                <div className='title-item'>Quantity Pick:</div>
                                <div className='qtypick'>{item.QtyPick}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="footer" onClick={handleFooterClick}>
                <img src={ImageQR} alt="Logo" />
            </div>

        </div>
    );
}

export default PicklistDetail;
