import { useEffect, useState } from 'react';

const FeaturedBlogs = () => {
    const [featuredBlogs, setFeaturedBlogs] = useState([]);
    const [sortBy, setSortBy] = useState(null);

    useEffect(() => {
        fetchFeaturedBlogs();
    }, []);

    const fetchFeaturedBlogs = async () => {
        try {
            const response = await fetch('https://textpresso-server.vercel.app/featured-blogs');
            if (!response.ok) {
                throw new Error('Failed to fetch featured blogs');
            }
            const data = await response.json();
            
            // Sort blogs by word count
            const sortedBlogs = data.sort((a, b) => b.longDescription.length - a.longDescription.length);

            // Take the top 10 posts
            const topBlogs = sortedBlogs.slice(0, 10);

            // Set the state with the sorted and filtered data
            setFeaturedBlogs(topBlogs);
        } catch (error) {
            console.error('Error fetching featured blogs:', error);
        }
    };

    const handleSortByTitle = () => {
        if (sortBy === 'title') {
            // Reverse the order if already sorted by title
            setFeaturedBlogs([...featuredBlogs].reverse());
        } else {
            // Sort by title in ascending order
            const sortedBlogs = [...featuredBlogs].sort((a, b) => a.title.localeCompare(b.title));
            setFeaturedBlogs(sortedBlogs);
        }
        setSortBy('title');
    };

    // Similar functions for other columns

    return (
        <div className="container mx-auto">
             <div className="my-10"><h1 className="md:text-4xl text-2xl font-sedan font-semibold py-5 text-center">Explore Featured Blogs</h1></div>
            <table className="table my-10 shadow-2xl30 ">
                <thead>
                    <tr>
                        <th className='font-sedan font-semibold text-xl rounded-full py-1 px-2 bg-purple-200 text-center ' onClick={handleSortByTitle}>Serial Number</th>
                        <th className='font-sedan font-semibold text-xl rounded-full py-1 px-2 bg-purple-200 text-center ' onClick={handleSortByTitle}>Blog Title</th>
                        <th className='font-sedan font-semibold text-xl rounded-full py-1 px-2 bg-purple-200 text-center ' onClick={handleSortByTitle}>Blog Owner</th>
                        <th className='font-sedan font-semibold text-xl rounded-full py-1 px-2 bg-purple-200 text-center ' onClick={handleSortByTitle}>Profile Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {featuredBlogs.map((blog, index) => (
                        <tr key={blog.id}>
                            <td className='text-center'>{index + 1}</td>
                            <td className='text-center'>{blog.title}</td>
                            <td className='text-center'>{blog.userName}</td>
                            <td className='flex flex-col justify-center items-center'>
                                <img className='w-14 h-14 rounded-full ' src={blog.userPhoto} alt="Profile" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FeaturedBlogs;
