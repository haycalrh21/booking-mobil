import React from 'react';
import { Navbar } from '@/Pages/User/Navbar';
import { Footer } from '@/Pages/User/Footer';
import '@/welcome.css';
import { Calendar } from 'grommet';
import { InertiaLink } from '@inertiajs/inertia-react';
import {GoogleMap} from '@/Pages/User/maps'



export default function Welcome({}) {
    return (
        <div>
           <div>
                <Navbar style={{ backgroundColor: '#0e5776'}}/>
            </div>
<div>

            <div className="hero" style={{ backgroundColor: '#0e5776' }}>

                <img src="/images/hero_section.jpg" style={{ width:'100%'}} alt="" />

                <div className="hero-content text-center" style={{maxWidth:1080}}>

                    <div className="text-left" style={{ marginRight:'29px' ,paddingRight:'470px', paddingBottom:'240px' }}>

                        <h1 className="text-5xl font-bold" style={{color:'#ffffff', fontWeight:'900', fontSize:'59px'}} >Membantu Temukan Mobil Impian.</h1>
                        <p className="mb-11 py-1" style={{color:'#ffffff' , fontSize:'19px',fontWeight:'bold'}}>Bin Mahmoed Motor <span style={{color:'#BAD0DB' ,fontSize:'19px' ,fontWeight:'regular'}}>hadir untuk temukan mobil terbaik untukmu, untuk di jual ataupun di pakai dengan sumber terpercaya.</span></p>

                        <InertiaLink href={route('datamobillengkap')} className="btn rounded-md w-48 btn-hover " style={{  borderColor:'#ffffff',fontStyle:'normal',background:'#ffffff' , color:'#228FBE' , fontSize:'18' ,fontFamily:'sans-serif' , fontWeight:'600'}} >
                            Temukan Mobil
                         </InertiaLink>

                    </div>


                </div>
                <Calendar size="small" date={(new Date()).toISOString()}
  onSelect={(date) => {}} style={{paddingBottom:'500px' , marginLeft:'1000px'}} />
            </div>


            {/* <GoogleMap/> */}

</div>
<Footer/>
        </div>
    )
}
