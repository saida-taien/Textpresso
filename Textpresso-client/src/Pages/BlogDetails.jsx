import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import AllComments from "../Components/AllComments";


const BlogDetails = () => {
    const { _id } = useParams();
    const [blog, setBlog] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [textValue, setTextValue] = useState('');
    const [placeholder, setPlaceholder] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const { user } = useContext(AuthContext);
    useEffect(() => {
        fetch(`https://textpresso-server.vercel.app/detailsBlog/${_id}`)
            .then(res => res.json())
            .then(data => {
                setBlog(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching item details:', error);
            });
    }, [_id]);
    // console.log(blog);
    const toggleExpanded = () => {
        setExpanded(!expanded);
    };
    // Function to handle changes in the textarea
    const handleChange = (event) => {
        setTextValue(event.target.value);
    };


    useEffect(() => {
        if (user?.email === blog?.email) {
            setPlaceholder('Owner can not do comment');
            setIsDisabled(true)
            setShowButton(true);
        } else {
            setPlaceholder('Write your comment...');
            setIsDisabled(false);
            setShowButton(false);
        }
    }, [user?.email, blog?.email]);






    // console.log(comments);



    const handleComment = event => {
        event.preventDefault();
        const userName = user?.displayName;
        const photo = user?.photoURL;
        const blogId = blog._id;
        const commentData = { userName, photo, blogId, textValue };
        // console.log(commentData);
        fetch('https://textpresso-server.vercel.app/addComment', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(commentData)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data?.insertedId) {
                    toast.success("Posted Comment!");
                    setTextValue('');
                }
            })
    }
    return (
        <div className="my-10">
            <div className="container max-w-screen-md mx-auto  bg-transparent rounded-lg shadow-md ">
                <img className="object-cover w-full h-96" src={blog?.photo} alt="Article" />

                <div className="p-6">
                    <div>
                        <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">{blog?.category}</span>
                        <a href="#" className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline" role="link">{blog?.title}</a>
                        <h1 className="mt-4 text-sm text-gray-600 dark:text-gray-400"><strong>In Short : </strong> {blog?.shortDescription}</h1>
                        <div className="max-h-48 "> {/* Limiting the height and enabling vertical scrolling */}
                            <div className="flex gap-6 items-center">
                                <h1 className="mt-4 text-justify text-sm text-gray-600 dark:text-gray-400 w-96"><strong>Details Here : </strong>
                                    {expanded ? blog?.longDescription : (blog?.longDescription && blog.longDescription.length > 100 ? blog.longDescription.slice(0, 100) : blog?.longDescription)}
                                    {!expanded && blog?.longDescription && blog.longDescription.length > 200 && <button className="text-purple-800 hover:underline" onClick={toggleExpanded}>Read More</button>}
                                </h1>
                                {showButton && (
                                    <Link to={`/updateBlog/${_id}`}><button className="btn bg-purple-800 text-white hover:text-black">Update</button></Link>
                                )}
                            </div>
                        </div>
                    </div>


                    <div className="mt-6 p-3 border border-purple-300 rounded-2xl max-w-min" >


                        <div className="flex items-center mb-4">
                            <div className="flex items-center">
                                <img className="object-cover h-10 rounded-full" src={user?.photoURL} alt="Avatar" />
                                <a href="#" className="mx-2 font-semibold text-gray-700 dark:text-gray-200" role="link">{user?.displayName}</a>
                            </div>


                        </div>
                        <textarea
                            value={textValue}
                            onChange={handleChange}
                            className="pl-20 pt-2 bg-purple-50 "
                            rows={4}
                            placeholder={placeholder}
                            disabled={isDisabled}
                        />
                        <button onClick={handleComment} className="btn w-full bg-purple-800 text-white hover:text-black">Post</button>

                    </div>

                </div>
            </div>
            <div className="my-10"><h1 className="md:text-4xl text-2xl font-sedan font-semibold py-5 text-center">Voices from the Community</h1></div>
            <AllComments blogId={_id}></AllComments>
            <ToastContainer />
        </div>
    );
};

export default BlogDetails;



