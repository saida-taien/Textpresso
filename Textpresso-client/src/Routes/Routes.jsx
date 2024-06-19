import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home";
import AddBlog from "../Pages/AddBlog";
import AllBlogs from "../Pages/AllBlogs";
import FeaturedBlogs from "../Pages/FeaturedBlogs";
import Wishlist from "../Pages/Wishlist";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import PrivateRoute from "./PrivateRoute";
import BlogDetails from "../Pages/BlogDetails";
import UpdateBlog from "../Pages/UpdateBlog";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children : [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/addBlog',
                element: <PrivateRoute><AddBlog></AddBlog></PrivateRoute>
            },
            {
                path: '/allBlogs',
                element: <AllBlogs></AllBlogs>
            },
            {
                path : '/featuredBlogs',
                element : <FeaturedBlogs></FeaturedBlogs>
            },
            {
                path: '/wishlist',
                element :<PrivateRoute> <Wishlist></Wishlist></PrivateRoute>
            },
            {
                path : '/signIn',
                element : <SignIn></SignIn>
            },
            {
                path : '/signUp',
                element : <SignUp></SignUp>
            },
            {
                path : '/blogDetails/:_id',
                element : <PrivateRoute><BlogDetails></BlogDetails></PrivateRoute>
            },
            {
                path : '/wishlistBlogs',
                element : <PrivateRoute><Wishlist></Wishlist></PrivateRoute>
            },
            {
                path : '/updateBlog/:id',
                element : <PrivateRoute><UpdateBlog></UpdateBlog></PrivateRoute>
            }
        ]
    },
]);

export default router;