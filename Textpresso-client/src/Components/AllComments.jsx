import { useEffect, useState } from "react";


const AllComments = ({ blogId }) => {
    // console.log(blogId);
    const [comments, setComments] = useState([]);
    useEffect(() => {
        fetch(`https://textpresso-server.vercel.app/comments/${blogId}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setComments(data);
            })
    }, [blogId])
    // console.log(comments);
    return (
        <div className="my-10">
            <div className="flex flex-col gap-5">
                {
                    comments?.map(comment => <div key={comment.blogId} className="container flex flex-col w-full max-w-lg border border-purple-400 mx-auto divide-y rounded-md dark:divide-gray-300 dark:bg-gray-50 dark:text-gray-800">
                        <div className="flex justify-between p-2">
                            <div className="flex items-center space-x-4">
                                <div>
                                    <img src={comment?.photo} alt="" className="object-cover w-12 h-12 rounded-full dark:bg-gray-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold">{comment?.userName}</h4>
                                </div>
                            </div>

                        </div>
                        <div className="p-4 space-y-2 text-sm dark:text-gray-600">
                            <p>{comment?.textValue}</p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default AllComments;