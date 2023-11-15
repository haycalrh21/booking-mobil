import React from 'react';

const mapContainerStyle = {
  width: '100%', // Lebar penuh
  height: '450px', // Tinggi peta
  display: 'flex',
  justifyContent: 'center', // Pusat horizontal
  alignItems: 'center', // Pusat vertikal
};

export function GoogleMap() {
  return (
    <div style={{ textAlign:'center', backgroundColor: '#0e5776' }}>
                             <h1 className="text-5xl font-bold">Lokasinya?</h1>

      <div style={mapContainerStyle}>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.2095025240405!2d106.8312973746202!3d-6.366927762282571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ed4cab9af7f3%3A0xcf8371072106976e!2sBin%20Mahmoed%20motor!5e0!3m2!1sid!2sid!4v1699989536697!5m2!1sid!2sid" width="600" height="450"   loading="lazy" ></iframe>
      </div>
    </div>
  );
}

export default GoogleMap;
