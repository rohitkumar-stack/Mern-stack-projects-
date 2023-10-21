import React, { useState, useEffect } from "react";
import{NavLink, useParams, useNavigate } from "react-router-dom";



const Edit =() =>{

    /*const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);*/

 //Redirect on page
 const Navigate = useNavigate();  

//Edit user data
    const [inpval, setINP] = useState({
        name:"",
        email:"",
        website_url: '',
        images:"",
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

    const {id} = useParams("");
    console.log(id);

    const getdata = async() =>{
         const res = await fetch(`/getuser/${id}`,{
             method:"GET",
             headers:{
                 "Content-Type": "application/json"
             }
         });
 
         const data = await res.json();
         console.log(data);
 
         if(res.status === 422 || !data){
             console.log("error");
         }else{
            setINP(data)
             console.log("Get Data Sucssfully!!");
         }
     }
  
   useEffect(() =>{
        getdata();
   }, []);


// Start updated user data
   const updateUser = async(e)=>{
       e.preventDefault();

       const {name, email, age, mobile, work, add, desc} = inpval;
       
       const res2 = await fetch(`/updateuser/${id}`,{
           method: "PATCH",
           headers:{
            "Content-Type": "application/json"

           },
           body:JSON.stringify({
            name,email,work,add,mobile,desc,age
        })
       });

       const data2 = await res2.json();
       console.log(data2);

       if(res2.status === 422 || !data2){
           alert("Fill tha data");
       }else{
           alert("Did you Want to data Update??");
           Navigate("/");
       }
   }
   
// End updated user data


    return(
        <>
          <div className="container">
               <NavLink to="/">home2</NavLink>
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
                            <label for="exampleInputPassword1" class="form-label">Website Url</label>
                            <input type="text" value={inpval.website_url} onChange={setdata} name="website_url" class="form-control" id="exampleInputPassword1" />
                        </div>
                        <div class="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" class="form-label">images</label>
                            <input type="file" src={inpval.images} onChange={setdata} name="images" class="form-control" id="exampleInputPassword1" />
                        </div>
                      

                        <button type="submit" onClick={updateUser} class="btn btn-primary">Submit</button>
                    </div>
            </form>
          </div>
        </>
    )
}



export default Edit;