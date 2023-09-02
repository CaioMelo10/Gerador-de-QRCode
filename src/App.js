import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [qrCodeSrc, setQrCodeSrc] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQRCode = () => {
    if (!inputValue) return;

    setIsGenerating(true);

    // Generate QR code and set it as the image source
    const encodedValue = encodeURIComponent(inputValue);
    setQrCodeSrc(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodedValue}`);

    // Add 'active' class to the wrapper after the image is loaded
    const imgQrCode = document.querySelector('#imgQrCode');
    imgQrCode.addEventListener('load', () => {
      setIsGenerating(false);
      const wrapper = document.querySelector('.wrapper');
      wrapper.classList.add('active');
    });
  };

  return (
    <div className="wrapper">
      <div className="header-form">
        <div className="header">
          <h1>Gerador de QRCode</h1>
          <p>Cole a URL desejada:</p>
        </div>
        <div className="form">
          <input
            type="text"
            placeholder="Insira a URL"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={generateQRCode} disabled={isGenerating}>
            {isGenerating ? 'Gerando QR Code...' : 'Gerar QRCode'}
          </button>
        </div>
      </div>
      <div className="qr-code">
        <img src={qrCodeSrc} id="imgQrCode" alt="" />
      </div>
    </div>
  );
}

export default App;