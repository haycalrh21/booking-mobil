import React from 'react';
import { Link, Head } from '@inertiajs/react';
import {Navbar} from '@/Pages/User/Navbar';


export default function Welcome({  }) {


   return (
<div >

    <div className='head'>
    <Navbar/>
    </div >
    <div className="hero min-h-screen bg-base-200">
    <div className="hero-content text-center">
        <div className="max-w-md">
        <h1 className="text-5xl font-bold">Hello Semuanya</h1>
        <p className="py-6">Boleh kali liat liat dulu mobilnya :)</p>
        <button className="btn btn-primary">Get Started</button>
        </div>
    </div>
    </div>
</div>
    )
}
