import React, {useState, useEffect } from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import { Link, NavLink } from "react-router-dom";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';

const Home =() =>{

        //Get Data
        const [getuserdata, setUserdata] = useState([]);
        console.log(getuserdata);

        const getdata = async(e) =>{
            const res = await fetch("getdata",{
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
                setUserdata(data)
                console.log("Get Data Sucssfully!!");
            }
        }

        useEffect(() =>{
            getdata();
        }, []);


//start Delete DataUser
const deleteuser = async (id) =>{

    const res2 = await fetch(`/deleteuser/${id}`,{
        method: "Delete",
        headers:{
            "Content-Type": "application/json"
        }
    });

    const deletedata =await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
       // console.log("error");
        alert("error")   
    } else {
      //console.log("user deleted!");
      alert("Did You Want to Datauser delete?");
      getdata();  
    }
}
//End Delete DataUser


    return(
        <>
        <div className="mt-5">
            <div className="container">
                <div className="add_button mt-2">
                    <NavLink to="/register" className="btn btn-primary mb-2">Add data</NavLink>
                </div>
                <table class="table">
                    <thead  class="table-dark">
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Username</th>
                            <th scope="col">email</th>
                            <th scope="col">Website URL</th>
                            <th scope="col">Images URLs</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    getuserdata.map((element, index) =>{
                        return (
                            <tr key={element._id}>
                                <td scope="row">{index + 1}</td>
                                <td>{element.name}</td>
                                <td>{element.email}</td>
                                <td>{element.website_url}</td>
                                <td>
                                    <Col xs={6} md={4}>
                                        
                                    {/* <p> {element.images}</p>  */}
                                     <Image src="https://picsum.photos/200/200" alt='response' thumbnail /> 
                                    </Col>
                                </td>
                                <td className="d-flex justify-content-between">
                                    <NavLink to={`/view/${element._id}`} className="btn btn-success" ><RemoveRedEyeIcon /></NavLink>
                                    <NavLink to={`/edit/${element._id}`}  className="btn btn-primary pencil" ><CreateIcon/></NavLink>
                                    <button className="btn btn-danger trash" onClick={()=>deleteuser(element._id)}  ><DeleteIcon/></button>
                                </td>
                            </tr>
                        );
                    })
                }

                        
                        
                    
                    </tbody>
                </table>
            </div>

        </div>
        </>
    )
}

export default Home;