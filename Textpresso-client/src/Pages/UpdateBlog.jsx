import {  useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from "sweetalert2";


const UpdateBlog = () => {
    const { id } = useParams();
    const [updateBlog, setUpdateBlog] = useState({}); 

    
    useEffect(() => {
        fetch(`https://textpresso-server.vercel.app/update/${id}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setUpdateBlog(data);
            })
            .catch(error => {
                console.error('Error fetching update item:', error);
            });
    }, [id]);
   
    const [category, setCategory] = useState('');
    const handleChange = (event) => {
        
        setCategory(event.target.value);
    };

    const handleUpdateBlog = event => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const photo = form.photo.value;
        const shortDescription = form.shortDescription.value;
        const longDescription = form.longDescription.value;
        
        const newBlog = { title, category, photo, shortDescription, longDescription };
        // console.log(newBlog);

        fetch(`https://textpresso-server.vercel.app/updateBlog/${id}`, {
            method : "PUT",
            headers : 
            {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(newBlog)
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            if(data.modifiedCount>0)
            {
                Swal.fire({
                    title: 'success!',
                    text: 'Blog Updated successfully.',
                    icon: 'success',
                    confirmButtonText: 'Proceed'
                })
                form.reset();
            }
        })
    }
    return (
        <div className="bg-transparent container mx-auto py-10">
        <h2 className="text-3xl text-purple-800 font-extrabold font-sedan py-5">Add Blog</h2>
        <form onSubmit={handleUpdateBlog}>
            {/* form name and quantity row */}
            <div className="md:flex md:items-center mb-8">
                <div className="form-control md:w-1/2">
                    <label className="label">
                        <span className="label-text">Blog Title</span>
                    </label>
                    <label className="input-group">
                        <input type="text" name="title" defaultValue={updateBlog.title} className="input input-bordered w-full" />
                    </label>
                </div>
                <div className="form-control md:w-1/2 ml-4">
                <span><strong>Category :</strong> {updateBlog.category}</span>
                    <FormControl sx={{ m: 1, minWidth: 120 }} className="bg-white">
                        
                        <InputLabel id="demo-simple-select-helper-label">Select Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={category}
                            label="select category"
                            onChange={handleChange}
                            
                        >

                            <MenuItem value="Cooking">Cooking</MenuItem>
                            <MenuItem value="Travel">Travel</MenuItem>
                            <MenuItem value="Life Style">Life Style</MenuItem>
                            <MenuItem value="Beauty">Beauty</MenuItem>
                            <MenuItem value="Sport">Sport</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>

            <div className="md:flex mb-8">
                <div className="form-control md:w-1/2">
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <label className="input-group">
                        <input type="text" name="photo" defaultValue={updateBlog.photo} className="input input-bordered w-full" />
                    </label>
                </div>
                <div className="form-control md:w-1/2 ml-4">
                    <label className="label">
                        <span className="label-text">Short Description</span>
                    </label>
                    <label className="input-group">
                        <input type="text" name="shortDescription" defaultValue={updateBlog.shortDescription} className="input input-bordered w-full" />
                    </label>
                </div>
            </div>
            {/* form category and details row */}
            <div >
                <div className="form-control md:w-full">
                    <label className="label">
                        <span className="label-text">Long Description</span>
                    </label>
                    <label className="input-group">
                        <input type="text" name="longDescription" defaultValue={updateBlog.longDescription}  className="input input-bordered w-full" />
                    </label>
                </div>
            </div>

            


            <input type="submit" value="Update Blog" className="btn w-full my-5 bg-purple-500 hover:text-black text-white" />

        </form>
    </div>
    );
};

export default UpdateBlog;