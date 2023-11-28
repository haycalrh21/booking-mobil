import { Link, usePage } from "@inertiajs/react";




export const Navbar =()=>{
    const {auth}= usePage().props;
    return(
        <div className="navbar bg-base-100">
  <div className="flex-1">
    <Link href={route('admin.dashboard')} className="btn btn-ghost normal-case text-xl">Dashboard</Link>

  </div>

  <div className="flex-none gap-2">


    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">

          <img src="/images/user.png" />
        </div>
        {auth.user.role}
      </label>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">

      <li><Link href={route('logout')} method="post" as="button"> Logout</Link></li>
      <li><a href="/" method="post" as="button"> Mode User</a></li>




      </ul>
    </div>
  </div>
</div>
    )
}
