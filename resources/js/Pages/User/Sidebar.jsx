import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';

export function Kodesamping() {
    const [visible, setVisible] = useState(false);

    const sidebarStyle = {
        backgroundColor: '#3abff8', // Ganti dengan warna latar belakang yang Anda inginkan
    };
    const textStyle = {
        color: '#2b3440', // Ganti dengan warna teks yang Anda inginkan
    };

    const toggleSidebar = () => {
        setVisible(!visible);
    };

    return (
        <div className="card flex justify-content-center">
            <img
                src="/images/rightarrow.png"
                alt="Right Arrow"
                onClick={toggleSidebar}
                width={25}
                height={25}
            />
            <Sidebar visible={visible} onHide={() => setVisible(false)} style={sidebarStyle}>
                <p style={textStyle}>
                    Apa sih yang lu cari
                </p>
            </Sidebar>
        </div>
    );
}
