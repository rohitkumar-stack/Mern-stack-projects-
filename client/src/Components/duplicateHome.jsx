import React, { useState } from "react";
import{NavLink, useNavigate} from "react-router-dom";

const Register =() =>{

 //page directries
const Navigate = useNavigate();
    
 //onnClick Add Data
    const [inpval, setINP] =useState({
        name:"",
        email:"",
        age:"",
        mobile:"",
        work:"",
        add:"",
        desc:"",
        website_url:"",
        images_urls:"",

    })

    const setdata =(e) =>{
        console.log(e.target.value);
        const {name, value} = e.target; 
        setINP((preval) =>{
            return{
                ...preval,
                [name]:value
            }
        })
    }

    const addinpdata = async(e) =>{
        e.preventDefault();

        const {name, email, age, mobile, work, add, desc,website_url,images_urls} = inpval;

        const res = await fetch("register",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, age, mobile, work, add, desc,website_url, images_urls
            })
        });

        const data = await res.json();
        console.log(data);

        if(res.status === 422 || !data){
            alert("error");
            console.log("error");
        }else{
            alert("Did you Want to data added??");
           console.log("data added Sucssfully!!");
            Navigate("/");
        }
    }

    return(
        <>
          <div className="container">
               <NavLink to="/">home</NavLink>
               <form className="mt-4">
                    <div className="row">
                        <div class="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputEmail1" class="form-label">Name</label>
                            <input type="text" value={inpval.name} onChange={setdata} name="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div class="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" class="form-label">email</label>
                            <input type="email" value={inpval.email} onChange={setdata} name="email" class="form-control" id="exampleInputPassword1" />
                        </div>
                        <div class="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" class="form-label">age</label>
                            <input type="text" value={inpval.age} onChange={setdata} name="age" class="form-control" id="exampleInputPassword1" />
                        </div>
                        <div class="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" class="form-label">Mobile</label>
                            <input type="number" value={inpval.mobile} onChange={setdata} name="mobile" class="form-control" id="exampleInputPassword1" />
                        </div>
                        <div class="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" class="form-label">Work</label>
                            <input type="text" value={inpval.work} onChange={setdata} name="work" class="form-control" id="exampleInputPassword1" />
                        </div>
                        <div class="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" class="form-label">Address</label>
                            <input type="text"  value={inpval.add} onChange={setdata} name="add" class="form-control" id="exampleInputPassword1" />
                        </div>
                        <div class="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" class="form-label">Website Url</label>
                            <input type="text"  value={inpval.website_url} onChange={setdata} name="website_url" class="form-control" id="exampleInputPassword1" />
                        </div>
                        <div class="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" class="form-label">Images Url</label>
                            <input type="file"  value={inpval.images_urls} onChange={setdata} name="images_urls" class="form-control" id="exampleInputPassword1" />
                        </div>
                        <div class="mb-3 col-lg-12 col-md-12 col-12">
                            <label for="exampleInputPassword1" class="form-label">Description</label>
                            <textarea value={inpval.desc} onChange={setdata} name="desc" className="form-control" id="" cols="30" rows="5"></textarea>
                        </div>

                        <button type="submit" onClick={addinpdata} class="btn btn-primary">Submit</button>
                    </div>
            </form>
          </div>
        </>
    )
}



export default Register;