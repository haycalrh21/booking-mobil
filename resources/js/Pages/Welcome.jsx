import React from 'react';
import { Link, Head } from '@inertiajs/react';
import { Navbar } from '@/Pages/User/Navbar';
import { Calendar } from 'grommet';
import { Button } from 'primereact/button';
import { ScrollTop } from 'primereact/scrolltop';

export default function Welcome({}) {
    return (
        <div>
            <div className='head'>
                <Navbar />
            </div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Hello Semuanya</h1>
                        <p className="py-6">Boleh kali liat liat dulu mobilnya :)</p>
                        <button className="btn btn-primary">Get Started</button>

                        <Calendar
                            size="small"
                            date={(new Date()).toISOString()}
                            onSelect={(date) => {}}
                        />
                    </div>
                </div>

            </div>
            <button className="btn btn-primary">test

<ScrollTop target="child" threshold={100} className="w-2rem h-2rem border-round bg-primary" icon="pi pi-arrow-up text-base" />
</button>
        </div>
    )
}
