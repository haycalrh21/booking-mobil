import React from 'react';
import { Link, Head } from '@inertiajs/react';
import { Navbar } from '@/Pages/User/Navbar';
import { Calendar } from 'grommet';
import { Footer } from '@/Pages/User/Footer';

import { ScrollTop } from 'primereact/scrolltop';
import '@/welcome.css';
import { InertiaLink } from '@inertiajs/inertia-react';
import {GoogleMap} from '@/Pages/User/maps'
import { Center } from '@chakra-ui/react';

export default function Welcome({}) {
    return (
        <div >
            <div className='head' >
                <Navbar />
            </div>
<div>
            <div className="hero min-h-screen " style={{ backgroundColor: '#0e5776' }}>
                <img src="/images/hero.png" alt="" style={{ paddingLeft:'900px', marginTop:'200px' }} />

                <div className="hero-content text-center">
                    <div className="" style={{ paddingRight:'800px', }}>
                        <h1 className="text-5xl font-bold">Hello Semuanya</h1>
                        <p className="py-6">Boleh kali liat liat dulu mobilnya :)</p>
                        <InertiaLink href={route('datamobillengkap')} className="btn btn-primary">
                            Mencari Mobil?
                         </InertiaLink>
                    </div>

                    <div style={{ marginBottom:'500px' }}>
                        <Calendar
                            size="small"
                            date={(new Date()).toISOString()}
                            onSelect={(date) => {}}
                        />
                    </div>
                </div>
            </div>


            <GoogleMap/>

            <div >test

            </div >
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
</div>
<Footer/>

        </div>
    )
}
