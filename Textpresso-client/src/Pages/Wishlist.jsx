import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Wishlist = () => {
    const { user } = useContext(AuthContext);
    const [wishlistBlogs, setWishlistBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        if (!user) {
            setLoading(false);
            return;
        }
        fetch(`https://textpresso-server.vercel.app/allWishlist/${user.email}`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setWishlistBlogs(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching wishlist:', error);
                setLoading(false);
            });
    }, [user]);

    const handleRemove = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://textpresso-server.vercel.app/delete/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        if (data?.deletedCount > 0) {

                            const updatedList = wishlistBlogs.filter(blog => blog._id !== id);
                            setWishlistBlogs(updatedList);


                            Swal.fire({
                                title: "Deleted!",
                                text: "Your item has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting item:', error);

                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete item.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    if (loading) {
        return <div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-96 container mx-auto">
            <div className="h-48 rounded-t bg-gray-300"></div>
            <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-50">
                <div className="w-full h-6 rounded bg-gray-300"></div>
                <div className="w-full h-6 rounded bg-gray-300"></div>
                <div className="w-3/4 h-6 rounded bg-gray-300"></div>
            </div>
        </div>;
    }

    if (wishlistBlogs.length === 0) {
        return <div className='text-center text-5xl my-36 font-seaweed font-extrabold '>Add blog in Wishlist</div>;
    }

    return (
        <div className='container mx-auto'>
            <div className='grid grid-cols-1 gap-5 my-20'>
                {wishlistBlogs.map(blog => (
                    <div key={blog._id} className="flex max-w-md overflow-hidden bg-purple-200 rounded-lg shadow-lg container mx-auto">
                        <div className="w-1/3 bg-cover" style={{ backgroundImage: `url(${blog.photo})` }}></div>
                        <div className="w-2/3 p-4 md:p-4">
                            <h1 className="text-xl font-bold text-gray-800 dark:text-white">{blog.title}</h1> <span>{blog.category}</span>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{blog.shortDescription}</p>
                            <div className="flex justify-between mt-3 items-center">
                                <Link to={`/blogDetails/${blog.blogId}`}><button className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-purple-900 rounded  hover:bg-gray-700 focus:outline-none focus:bg-gray-700 ">View Details</button></Link>
                                <button onClick={() => handleRemove(blog._id)} className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-purple-900 rounded  hover:bg-gray-700  focus:outline-none focus:bg-gray-700 ">Remove Blog</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
