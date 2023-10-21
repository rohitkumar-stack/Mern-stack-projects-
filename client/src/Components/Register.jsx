import React, { useState } from "react";
import{NavLink, useNavigate,useHistory} from "react-router-dom";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";
// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Please enter your first name'),
    email: Yup.string().email('Invalid email address').required('Please enter your email'),
    website_url: Yup.string().required('Please enter a website URL'),
    images: Yup.string().required('Please enter a images URL'),
  });
  

const Register =() =>{

 //page directries
const Navigate = useNavigate();
    
 //onnClick Add Data

// form validation

const notify = () => toast.success("Sign Up Successfully!");
const emptyData = () => toast.warn("Please fill out all the fields");
const emailExits = () => toast.error("User with this Email already exists!");

const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: '',
      email: '',
      website_url: '',
      images: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
  
      formData.append('name', values.firstName);
      formData.append('email', values.email);
      formData.append('website_url', values.website_url);
      formData.append('images', values.images); // Append the actual file
  
      try {
        const res = await axios.post('http://localhost:8003/register', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        console.log(res.data);
  
        if (res.status === 200) {
          if (window.confirm('Do you want to add the data?')) {
            console.log('Data added successfully!!');
            console.log(res.data);
            console.log(res, "=======>Data");
            Navigate('/')
            // Replace 'Navigate("/")' with the navigation logic as per your application.
          }
        } else {
        //   alert('Error while adding data');
          console.log('Error while adding data');
          Navigate('/')
        
        }
      } catch (error) {
        alert('Error while making the request');
        console.error('Error:', error);
        console.log(Error, "=======>Error");
      }
    },
  });
  

  
    return(
        <>
          <div className="container">
               <NavLink to="/">home</NavLink>
               <Form className="form-horizontal" onSubmit={validation.handleSubmit}>

                <div className="mt-4">
                    <div className="row">
                        <div class="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputEmail1" class="form-label">Name<span  style={{color: "red"}}>*</span></label>
                            <Input
                              name="firstName"
                              type="text"
                              placeholder="Enter firstName"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.firstName || ""}
                              invalid={
                                validation.touched.firstName && validation.errors.firstName ? true : false
                              }
                            />
                            {validation.touched.firstName && validation.errors.firstName ? (
                              <FormFeedback type="invalid">{validation.errors.firstName}</FormFeedback>
                            ) : null}
                        </div>

                        <div class="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" class="form-label">email<span  style={{color: "red"}}>*</span></label>
                            <Input
                              id="email"
                              name="email"
                              className="form-control"
                              placeholder="Enter email"
                              type="email"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.email || ""}
                              invalid={
                                validation.touched.email && validation.errors.email ? true : false
                              }
                            />
                            {validation.touched.email && validation.errors.email ? (
                              <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                            ) : null}
                        </div>
                        <div class="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputEmail1" class="form-label">Website Url<span  style={{color: "red"}}>*</span></label>
                            <Input
                              name="website_url"
                              type="text"
                              placeholder="Enter website_url"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.website_url || ""}
                              invalid={
                                validation.touched.website_url && validation.errors.website_url ? true : false
                              }
                            />
                            {validation.touched.website_url && validation.errors.website_url ? (
                              <FormFeedback type="invalid">{validation.errors.website_url}</FormFeedback>
                            ) : null}
                        </div>
                        <div class="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputEmail1" class="form-label">Images Url<span >*</span></label><br></br>
                            
                            {/* <Input
                              name="images"
                              type="text"
                              placeholder="Enter images"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.images || ""}
                              invalid={
                                validation.touched.images && validation.errors.images ? true : false
                              }
                            />
                            {validation.touched.images && validation.errors.images ? (
                              <FormFeedback type="invalid">{validation.errors.images}</FormFeedback>
                            ) : null} */}


                            <input
                                name="images"
                                type="file"
                                accept="image/*"
                                onChange={(event) => {
                                    if (event.currentTarget.files && event.currentTarget.files.length) {
                                    validation.setFieldValue("images", event.currentTarget.files[0].name); // Store the file name
                                    } else {
                                    validation.setFieldValue("images", null); // Reset the value if no file is selected
                                    }
                                }}
                                onBlur={validation.handleBlur}
                                invalid={validation.touched.images && !!validation.errors.images}
                                />
                        </div>
                     

                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
            </div>
             
                  
               </Form>
          </div>
        </>
    )
}



export default Register;