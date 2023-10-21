import React,{useEffect, useState} from 'react';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';  
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useParams } from 'react-router-dom';



 const Details = () => {
// Start Get Data Userdeatills
     const {id} = useParams("");
     console.log(id);

     const [getuserdata, setUserdata] = useState([]);
     console.log(getuserdata);

     const getdata = async() =>{
          const res = await fetch(`/getuser/${id}`,{
              method:"GET",
              headers:{
                  "Content-Type": "application/json"
              }
          });
  
          const data = await res.json();
          console.log(data);
  
          if(res.status === 422|| !data){
              console.log("error");
          }else{
              setUserdata(data)
              console.log("Get Data Sucssfully!!");
          }
      }


      useEffect(() =>{
           getdata();
      },[]);

// End Get Data Userdeatills





  return (
    <>
      <div className="container mt-3">
           <h1 style={{fontWeight:400}}>Welcome to Mern Stack Developer</h1>

           <Card sx={{ maxWidth: 675 }}>
                <CardContent>
                <div className='add_btn'>
                     <button className="btn btn-primary pencil mx-2"><CreateIcon/></button>
                    <button className="btn btn-danger trash"><DeleteIcon/></button>
               </div>
                     <div className='row'>
                         <div className="left_view col-lg-6 col-md-6 col-12">
                              <img src="/image/profile.png" style={{ width: 50 }} alt="profile" />
                              <h3 className='mt-3'>Name: <span>{getuserdata.name}</span></h3>
                              <h3 className='mt-3'>Age:<span>{getuserdata.age}</span></h3>
                              <p className='mt-3'><EmailIcon/> Email:<span>{getuserdata.email}</span></p>
                              <p className='mt-3'><WorkIcon/> Occuption: <span>{getuserdata.work}</span></p>
                         </div>

                         <div className="right_view col-lg-6 col-md-6 colo-12">
                              <p className='mt-5'><PhoneAndroidIcon/> mobile:<span>{getuserdata.mobile}</span> </p>
                              <p className='mt-3'><LocationOnIcon/> location: <span>{getuserdata.add}</span> </p>
                              
                              <p className='mt-3'>Description: <span>{getuserdata.desc}</span> </p>

                         </div>

                     </div>
                     
                </CardContent>
           </Card>

      </div>
      
    </>
  )
}

export default Details;