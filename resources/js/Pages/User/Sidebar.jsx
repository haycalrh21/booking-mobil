import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';

export function Kodesamping() {
    const [visible, setVisible] = useState(false);

    const sidebarStyle = {
        backgroundColor: '#3abff8', // Ganti dengan warna latar belakang yang Anda inginkan
    };
    const textStyle = {
        color: '#2b3440', // Ganti dengan warna teks yang Anda inginkan
    };
    return (
        <div className="card flex justify-content-center">
            <Button className="btn btn-primary" icon="pi pi-arrow-right" onClick={() => setVisible(true)} />
            <Sidebar visible={visible} onHide={() => setVisible(false)} style={sidebarStyle}>
                    <p style={textStyle}>
                        Apa sih yang lu cari
                    </p>
            </Sidebar>
            <Button icon="pi pi-arrow-right" onClick={() => setVisible(true)} />
        </div>
    )
}
