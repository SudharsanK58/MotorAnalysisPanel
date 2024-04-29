import React, { useState } from "react";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import backImage from "./loginPage.jpg"
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import { Form, Spinner, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");

  const onFormSubmit = async (formData) => {
    setLoading(true);
  
    try {
      const response = await fetch("http://3.144.9.52:8001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          password: formData.passcode,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.message === "Login successful") {
          localStorage.setItem("accessToken", "token");
          sessionStorage.setItem("isLoggedIn", true);
          sessionStorage.setItem("TimeZone", 0);
          sessionStorage.setItem("ShowUpdate", 1);
          localStorage.setItem("userName", formData.name); // Store the user's name
          // Redirect to the /overview page
          setTimeout(() => {
            window.history.pushState(
              `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`,
              "auth-login",
              `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`
            );
            window.location.reload();
          }, 1000);
        } else {
          // Handle unsuccessful login
          setError("Cannot login with credentials");
          setLoading(false);
        }
      } else {
        // Handle non-OK response (e.g., server error)
        setError("Server error");
        setLoading(false);
      }
    } catch (error) {
      // Handle network error or any other unexpected error
      setError("An error occurred");
      setLoading(false);
    }
  };
  

  const {  register, handleSubmit, formState: { errors } } = useForm();

  return <>
  <div
      style={{
        backgroundImage: `url(${backImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center', // Adjust as needed
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',

      }}
    >
     <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start',paddingTop: '5%', paddingLeft: '60%'}}>
    <Head title="Login"/>
      <Block className="nk-block-middle nk-auth-body  wide-xs" >
        
        <div className="brand-logo pb-4 text-center">
          <span style={{ fontWeight: 'bold', color: '#2263b3' ,fontSize: '20px'}}>	</span>
        </div>
        {/* <PreviewCard className="card-bordered" bodyClass="card-inner-lg" > */}  
          <BlockHead>
            <BlockContent>
              <BlockTitle tag="h4">WELCOME TO RHMS!</BlockTitle>
              <BlockDes>
                <p style={{fontWeight: 'bold' ,fontSize:'20px'}}>RHMS is designed to conveniently monitor and manage all of our ZIG networking devices</p>
              </BlockDes>
            </BlockContent>
          </BlockHead>
          {errorVal && (
            <div className="mb-3">
              <Alert color="danger" className="alert-icon">
                <Icon name="alert-circle" /> Unable to login with credentials{" "}
              </Alert>
            </div>
          )}
          <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="default-01">
                  Email
                </label>
              </div>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="default-01"
                  {...register('name', { required: "This field is required" })}
                  placeholder="Enter your email address"
                  className="form-control-lg form-control" />
                {errors.name && <span className="invalid">{errors.name.message}</span>}
              </div>
            </div>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="password">
                  Passcode
                </label>
              </div>
              <div className="form-control-wrap">
                <a
                  href="#password"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setPassState(!passState);
                  }}
                  className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                >
                  <Icon name="eye" className="passcode-icon icon-show"></Icon>

                  <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                </a>
                <input
                  type={passState ? "text" : "password"}
                  id="password"
                  {...register('passcode', { required: "This field is required" })}
                  placeholder="Enter your passcode"
                  className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`} />
                {errors.passcode && <span className="invalid">{errors.passcode.message}</span>}
              </div>
            </div>
            <div className="form-group">
              <Button size="lg" className="btn-block" type="submit" color="primary">
                {loading ? <Spinner size="sm" color="light" /> : "Sign in"}
              </Button>
            </div>
          </Form>
        {/* </PreviewCard> */}
              {/* <AuthFooter /> */}
      </Block>
            {/* <AuthFooter /> */}
      </div>
      
      </div>


  </>;
};
export default Login;
