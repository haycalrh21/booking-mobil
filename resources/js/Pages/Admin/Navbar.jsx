import { Link, usePage } from "@inertiajs/react";




export const Navbar =()=>{
    const {auth}= usePage().props;
    return(
        <div className="navbar" style={{padding:'unset'}}>
    <img src="/images/bgputih.jpg" style={{ minWidth:'100%',maxHeight:'22%',position:'absolute', zIndex:'-1'}} alt="" />
  <div className="flex-1">
    <Link href={route('admin.dashboard')} className="btn btn-info glass normal-case text-xl bg-gradient-to-r from-sky-200 via-30% to-emerald-200 to-90% hover:from-emerald-300 hover:to-sky-200 hover:via-orange-100">Dashboard</Link>
  </div>
  <div className="flex-none gap-2">
    <div className="dropdown dropdown-end" >
      <label  tabIndex={0} className="btn btn-ghost btn-circle mr-2" style={{width:'55%',color:'#00000a'}}>
        <div className="w-10 rounded-full">
          <img  src="/images/user.png" />
        </div>
        <div>
        {auth.user.role}
        </div>
      </label>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52" style={{backgroundColor:'#ffffff'}}>
      <li><Link href={route('logout')} method="post" as="button" className="text-black"> Logout</Link></li>
      <li><a href="/" method="post" as="button" className="text-black"> Mode User</a></li>
      </ul>
    </div>
  </div>
</div>
)
}
