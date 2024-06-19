import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2'
const AddBlog = () => {
    const [category, setCategory] = useState('');

    const handleChange = (event) => {
        
        setCategory(event.target.value);
    };
    // console.log(category);
    const { user } = useContext(AuthContext);

    const handleAddBlog = event => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const photo = form.photo.value;
        const shortDescription = form.shortDescription.value;
        const longDescription = form.longDescription.value;
        const email = form.email.value;
        const userName = form.userName.value;
        const userPhoto = form.userPhoto.value;
        const newBlog = {title, photo, category, shortDescription, longDescription, userName, email , userPhoto}
        //send data to the server
        fetch('https://textpresso-server.vercel.app/addBlog' , {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBlog)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data?.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Blog added successfully',
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
            <form onSubmit={handleAddBlog}>
                {/* form name and quantity row */}
                <div className="md:flex md:items-center mb-8">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Blog Title</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="title" placeholder="Title Here..." className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
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
                            <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text">Short Description</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="shortDescription" placeholder="Short Description Here..." className="input input-bordered w-full" />
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
                            <input type="text" name="longDescription" placeholder="Long Description Here...." className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>

                {/* form category and details row */}
                <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">User Email</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="email" defaultValue={user?.email} className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text">User Name</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="userName" defaultValue={user?.displayName} className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text">User photo</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="userPhoto" defaultValue={user?.photoURL} className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>


                <input type="submit" value="Add Blog" className="btn w-full  bg-purple-500 hover:text-black text-white" />

            </form>
        </div>
    );
};

export default AddBlog;