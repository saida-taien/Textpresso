import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";

const AllBlogs = () => {
    const [allBlogs, setAllBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const {user} = useContext(AuthContext);
    useEffect(() => {
        fetch(`https://textpresso-server.vercel.app/addBlog`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setAllBlogs(data);
                setFilteredBlogs(data);
            })
    }, []);

    useEffect(() => {
        let filtered = allBlogs;
        if (searchTerm) {
            filtered = filtered.filter(blog =>
                blog.title && blog.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (categoryFilter) {
            filtered = filtered.filter(blog =>
                blog.category && blog.category.toLowerCase() === categoryFilter.toLowerCase()
            );
        }
        setFilteredBlogs(filtered);
    }, [searchTerm, categoryFilter, allBlogs]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCategoryFilter = (e) => {
        setCategoryFilter(e.target.value);
    };


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
        <div className="container mx-auto mb-20">

            <div className="my-10"><h1 className="md:text-4xl text-2xl font-sedan font-semibold py-5 text-center">Journey Through Our Stories: All Blogs</h1></div>



            <div className="flex justify-between items-center my-10">
                <fieldset className="w-full space-y-1 dark:text-gray-800">
                    <label htmlFor="Search" className="hidden">Search</label>
                    <div className="relative ">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-5">
                            <button type="button" title="search" className="p-1 focus:outline-none focus:ring">
                                <svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 dark:text-gray-800">
                                    <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                                </svg>
                            </button>
                        </span>
                        <input type="text" name="Search" placeholder="Search by title" className="w-32 py-4 px-10 pl-20 text-sm rounded-md sm:w-auto focus:outline-none  bg-transparent border border-purple-500" value={searchTerm}
                            onChange={handleSearch} />
                    </div>
                </fieldset>



                <select onChange={handleCategoryFilter} className="shadow menu dropdown-content z-[1] rounded-box m-4 p-5 px-8 border text-lg border-purple-500 bg-transparent">
                    <option className="text-purple-500" value="">Filter by Category</option>
                    <option className="text-purple-500" value="Cooking">Cooking</option>
                    <option className="text-purple-500" value="Travel">Travel</option>
                    <option className="text-purple-500" value="Life Style">Life Style</option>
                    <option className="text-purple-500" value="Beauty">Beauty</option>
                    <option className="text-purple-500" value="Sport">Sport</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredBlogs.map(blog => (
                    <div key={blog._id}>
                        <div className="w-full max-w-xs h-[550px] overflow-hidden bg-white rounded-lg shadow-lg">
                            <img className="object-cover w-full h-56" src={blog.photo} alt="avatar" />
                            <div className="py-5 px-3 space-y-3">
                                <Link to={`/blogDetails/${blog._id}`} className="block text-center text-xl font-bold text-purple-900">{blog.title}</Link>
                                <h1 className="text-sm text-center text-gray-700">{blog.shortDescription}</h1>
                                <h1 className="text-sm text-gray-700 text-justify">{blog.longDescription}</h1>
                                <div className="grid grid-cols-3 gap-2">
                                    <button className="uppercase text-purple-900 border border-purple-200 bg-purple-100 px-2 rounded-3xl font-sedan font-semibold text-sm">{blog.category}</button>
                                    <Link to={`/blogDetails/${blog.blogId}`}><button className="uppercase text-purple-900 border border-purple-200 bg-purple-100 px-2 rounded-3xl font-sedan font-semibold text-sm">Details</button></Link>
                                    <button onClick={()=> handleWishlist(blog._id)}  className="uppercase text-purple-900 border border-purple-200 bg-purple-100 px-2 rounded-3xl font-sedan font-semibold text-sm">Wishlist</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <ToastContainer/>
        </div>
    );
};

export default AllBlogs;

