import { useContext, useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";

const RecentBlog = () => {
    const [recentBlogs, setRecentBlogs] = useState([]);
    // const [wishlistBlogs, setWishlistBlogs] = useState([]);
    const { user } = useContext(AuthContext);
    useEffect(() => {
        fetch(`https://textpresso-server.vercel.app/addBlog`)
            .then(res => res.json())
            .then(data => {

                if (data) {
                    const recentData = data.slice(-6);
                    recentData.sort((a, b) => {
                        const timeA = new Date(a.createdAt).getTime() % (24 * 60 * 60 * 1000);
                        const timeB = new Date(b.createdAt).getTime() % (24 * 60 * 60 * 1000);
                        return timeB - timeA;
                    })
                    setRecentBlogs(recentData);

                }
            })
    }, [])




    const handleWishlist = (_id) => {
        if (!user) {
            toast.warning("Please login to add blog to wishlist.");
            return;
        }

        // Fetch blog details based on _id
        fetch(`https://textpresso-server.vercel.app/wishlist/${_id}`)
            .then(res => res.json())
            .then(blogData => {
                const newWishlistItem = {
                    email: user.email,
                    blogId: blogData._id,
                    title: blogData.title,
                    photo: blogData.photo,
                    category: blogData.category,
                    shortDescription: blogData.shortDescription,
                    longDescription: blogData.longDescription
                };

                // Add the blog to the user's wishlist
                fetch('https://textpresso-server.vercel.app/addWishlist', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newWishlistItem)
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        if (data?.insertedId) {
                            toast.success("Added to wishlist!");
                        }
                    })
                    .catch(error => {
                        console.error('Error adding item to wishlist:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching blog details:', error);
            });
    }



    return (
        <div className="my-20 bg-transparent">
            <motion.div
                variants={fadeIn("left", 0.2)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.7 }}
                className="my-10 text-center"><h1 className="md:text-4xl text-2xl font-sedan font-semibold">Stay updated with our latest insights: Dive into our freshest blogs!</h1></motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 container mx-auto">
                {
                    recentBlogs?.map(blog => <div

                        key={blog._id}>
                        <div className="max-w-xs h-96 overflow-hidden bg-purple-200 rounded-lg shadow-lg dark:bg-gray-800">
                            <div className="px-4 py-2">
                                <h1 className="text-xl font-bold text-purple-800 uppercase dark:text-white">{blog?.title}</h1>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{blog?.shortDescription} </p>
                            </div>

                            <img className="object-cover w-full h-48 mt-2" src={blog?.photo} alt="NIKE AIR" />

                            <div className="flex items-center justify-between px-4 py-2 bg-purple-400">
                                <h1 className="text-lg font-bold text-white">{blog?.category}</h1>
                                <Link to={`/blogDetails/${blog._id}`}><button className="px-2 py-1 md:text-xs text-sm font-semibold text-purple-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">View Details</button></Link>
                                <button onClick={() => handleWishlist(blog._id)} className="px-2 py-1 md:text-xs text-sm font-semibold text-purple-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">Wishlist</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
            <ToastContainer />
        </div>
    );
};

export default RecentBlog;