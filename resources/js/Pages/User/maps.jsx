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
        <iframe
          width="600"
          height="450"
          src="https://www.openstreetmap.org/export/embed.html?bbox=106.83347%2C-6.36666%2C106.83347%2C-6.36666&layer=mapnik"
        ></iframe>
      </div>
    </div>
  );
}

export default GoogleMap;
