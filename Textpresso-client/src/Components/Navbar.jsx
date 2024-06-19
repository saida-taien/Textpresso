import { Link } from "react-router-dom";
import logo from '../assets/logo.png'
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
            .then()
            .catch()
    }
    const navLinks = <>
        <Link to='/'><li className="text-lg font-semibold"><a>Home</a></li></Link>
        <Link to='/addBlog'><li className="text-lg font-semibold"><a>Add Blog</a></li></Link>
        <Link to='/allBlogs'><li className="text-lg font-semibold"><a>All Blogs</a></li></Link>
        <Link to='/featuredBlogs'><li className="text-lg font-semibold"><a>Featured Blogs</a></li></Link>
        <Link to='/wishlist'><li className="text-lg font-semibold"><a>Wishlist</a></li></Link>
    </>
    return (
        <div className="navbar bg-purple-200 sticky text-purple-950 ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <a><img className="h-20" src={logo} alt="" /></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">


                {
                    user ?
                        <div className="user-info flex justify-center items-center gap-4">
                            <div className="lg:tooltip" data-tip={user.displayName}>
                                <div className="avatar">
                                    <div className="md:w-10 w-5 rounded-full">
                                        <img src={user.photoURL} />
                                    </div>
                                </div>
                            </div>

                            <a onClick={handleLogOut} className="btn hover:text-purple-950 mr-3 bg-purple-950 border-0  text-white">Logout</a>
                        </div> :
                        <div>
                            <Link to='/signIn'><a className="btn hover:text-purple-950 mr-3 bg-purple-950 border-0  text-white">Signin</a>
                            </Link>
                            <Link to='/signUp'><button className="btn hover:text-purple-950 mr-3 bg-purple-950 border-0  text-white">Signup</button></Link>
                        </div>




                }









                {/* <Link to='/signUp'><button className="btn hover:text-purple-950 mr-3 bg-purple-950 border-0  text-white">Sign Up</button></Link>
                <Link to='/signIn'><button className="btn hover:text-purple-950 mr-3 bg-purple-950 border-0 text-white">Sign In</button></Link> */}
            </div>
        </div>
    );
};

export default Navbar;