import SectionTitle from "../../../components/SectionTitle/SectionTitle";

import { useForm } from 'react-hook-form';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
const img_hosting_token =import.meta.env.VITE_Image_URL_token;

const AddItem = () => {
    const [axiosSecure] = useAxiosSecure();
    // formState: { errors }
    const { register, handleSubmit,reset } = useForm();

    // const img_hosting_url = `https://api.imgbb.com/1/upload?expiration=600&key=${img_hosting_token}`;
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

    const onSubmit = data => {

        // console.log(data);
        const formData = new FormData();
        formData.append('image',data.image[0]);
        // console.log(formData);

        fetch(img_hosting_url,{
            method : 'POST',
            body:formData
        })
        .then(res=>res.json())
        .then(imgResponse=>{
            console.log('imgResponse',imgResponse)
            if(imgResponse.success){
                const imgURL = imgResponse.data.display_url;
                 // console.log(data,imgURL)
                // const manuItem = data;
                // manuItem.image = imgURL
                const {name,price,category,recipe} =data;
                const newItem = {name, price:parseFloat(price),category,recipe,image : imgURL}
                console.log(newItem);
                axiosSecure.post('/menu',newItem)
                .then(data=>{
                    console.log('after posting new menu item', data.data);
                    if(data.data.insertedId){
                        reset()
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'manu added successfully',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }
                })

            }
        })
    }
    // console.log(errors);
    // console.log(img_hosting_token);
    
    return (
        <div className="w-full px-10 mb-4">

            <SectionTitle subHeading={"What's new"} heading={"Add An Item"}></SectionTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Recipe Name *</span>

                    </label>
                    <input type="text" placeholder="Recipe Name"
                        {...register("name", { required: true, maxLength: 80 })}
                        className="input input-bordered w-full" />

                </div>

                <div className="flex my-4">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Category*</span>

                        </label>
                        <select defaultValue="Pick One" {...register("category", { required: true })} className="select select-bordered">
                            <option disabled>Pick One</option>
                            <option>Pizza</option>
                            <option>Soup</option>
                            <option>Salad</option>
                            <option>Drinks</option>
                            <option>Dessert</option>
                            <option>Desi</option>
                            <option>Star Trek</option>
                        </select>

                    </div>
                    <div className="form-control w-full ml-4">
                        <label className="label">
                            <span className="label-text font-semibold">Price*</span>

                        </label>
                        <input type="number" placeholder="Enter Your Price" {...register("price", { required: true })} className="input input-bordered w-full" />

                    </div>

                </div>


                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Recipe Details</span>

                    </label>
                    <textarea {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>

                </div>
                <div className="form-control w-full my-4">
                    <label className="label">
                        <span className="label-text">Item Image</span>

                    </label>
                    <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full" />

                </div>
                <input className="btn btn-sm mt-4" type="submit" value="Add Item" />
            </form>
        </div>
    );
};

export default AddItem;