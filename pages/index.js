/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import Router from 'next/router';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { ClipLoader } from 'react-spinners';
import jwtDecode from 'jwt-decode';
const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setphone] = useState("");
  const [city, setcity] = useState("");
  const [education, seteducation] = useState("");
  const [sw, setsw] = useState(false);
  const [submit, setsubmit] = useState(false);
  const [pin, setpin] = useState("");

  useEffect(() => {
    //if (localStorage.getItem("token")) { Router.push("/") }
    if (screen.width > 500) {
      setsw(true)
    }
    // fetch("https://restcountries.com/v3.1/alpha/{code}")
    // .then((data)=>{setpin(data);console.log(data)});
  }, []);
  const handleChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value)
    }
    if (e.target.name == "email") {
      setEmail(e.target.value)
    }
    if (e.target.name == "password") {
      setPassword(e.target.value)
    }
    if (e.target.name == "phone") {
      setphone(e.target.value)
    }
    if (e.target.name == "city") {
      setcity(e.target.value)
    }
    if (e.target.name == "education") {
      seteducation(e.target.value)
    }
    if (e.target.name == "pin") {
      setpin(e.target.value)
    }

  }
  const handleSubmit = async (e) => {
    setsubmit(true)
    e.preventDefault()
    const data = { name, email, password, phone,pin, city, education }
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify(data)
    })
    let response = await res.json()
    if (response.success) {
      setEmail("")
      setName("")
      setPassword("")
      setcity("")
      seteducation("")
      setphone("")
      setpin("")
      setsubmit(false)
      toast.success('congratulation your account is signed up', {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        Router.push("/Login")
      }, 2000);

    }
  }
  const assign = (obj) => {
    return { name: obj.name, email: obj.email, password: obj.email }
  }
  const auth = async (e) => {
    let obj = await jwtDecode(e.credential)
    const data = await assign(obj)

    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify(data)
    })
    let response = await res.json()
    setEmail("")
    setName("")
    setPassword("")
    setcity("")
    setphone("")
    seteducation("")
    setpin("")
    if (response.success) {
      toast.success('congratulation your account is signed up', {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        Router.push("/Login")
      }, 2000);
    }
  }
  return (
    <div className="min-h-full flex items-center justify-center bg-emerald-100">
      <div className='flex pt-8 pb-32 drop-shadow-md'>
        <div className='text-center max-sm:hidden bg-emerald-900 font-medium flex flex-col items-center justify-center w-80 space-y-5'>
          <h1 className='text-3xl font-semibold  '>Welcome back</h1>
          <p>To keep connected with us please <br></br>login with your personal info</p>
          <button style={{ border: "1px solid black" }} className='px-8 bg-emerald-900 hover:shadow-lg shadow-black py-1 drop-shadow-md '><a href='/Login'>SIGN IN</a></button>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className='bg-white md:px-32 py-2 md:py-12'>
          <div className="max-w-md w-full space-y-8 ">
            <div>
              <img
                className="mx-auto h-10 md:h-20 w-auto"
                src="/logo.png"
                alt="Workflow"
              />
              <h2 className="mt-6 text-center md:text-3xl px-4 font-extrabold text-gray-900">Sign up your Stirring Minds<br></br> or <a className='underline underline-offset-4 decoration-2  decoration-emerald-300 text-sm font-normal' href='/Login'>SIGN IN</a></h2>

            </div>
            <form onSubmit={handleSubmit} className="mt-8 scale-90 md:scale-100 space-y-6" method="POST">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className=" shadow-sm ">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input onChange={handleChange}
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    className="appearance-none  relative block w-full px-3 py-2 border mb-2 bg-gray-200 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input onChange={handleChange}
                    id="emai"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    className="appearance-none  relative block w-full px-3 py-2 border mb-2 bg-gray-200 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                    placeholder="Email"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input onChange={handleChange}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    required
                    value={password}
                    className="appearance-none mb-2 relative block w-full px-3 py-2 border bg-gray-200 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>

                <div>
                  <label htmlFor="education" className="sr-only">
                    Education
                  </label>
                  <select onChange={handleChange}
                    id="education"
                    name="education"
                    type="education"
                    autoComplete="education"
                    required
                    value={education}
                    className="appearance-none mb-2 relative block w-full px-3 py-2 border bg-gray-200 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                    placeholder="-- Highest Education Level --"
                    defaultValue="-- Highest Education Level --"
                  >
                    <option className='select-none' value="default">-- Highest Education Level --</option>
                    <option value="6th - 9th">6th-9th class</option>
                    <option value="10th">10th class</option>
                    <option value="11th">11th class</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="city" className="sr-only">
                    City
                  </label>
                  <select onChange={handleChange}
                    id="city"
                    name="city"
                    autoComplete="city"
                    required
                    value={city}
                    className="appearance-none mb-2 relative block w-full px-3 py-2 border bg-gray-200 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                  >
                    <option className='select-none' value="default">-- Select your city --</option>
                    <option value="delhi">Delhi</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="kolkata">Kolakata</option>
                    <option value="banglore">Banglore</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="pin" className="sr-only">
                    Country pin
                  </label>
                  <select onChange={handleChange}
                    id="pin"
                    name="pin"
                    autoComplete="pin"
                    required
                    value={pin}
                    className="appearance-none mb-2 relative block w-full px-3 py-2 border bg-gray-200 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                  >
                    <option value="+91">india ( +91)</option>
                    <option value="delhi">Afaganistan ( +93 )</option>
                    <option value="mumbai">Albania (+355 )</option>
                    <option value="kolkata">Algeria ( +213 )</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="phone" className="sr-only">
                    Phone
                  </label>
                  <input onChange={handleChange}
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="phone"
                    required
                    value={phone}
                    className="appearance-none  relative block w-full px-3 py-2 border mb-2 bg-gray-200 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                    placeholder="Mobile Number"
                  />
                </div>

              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="group drop-shadow-sm relative bg-emerald-900 w-full flex justify-center py-2 px-4 border hover:shadow-lg  text-sm font-medium  "
                >
                  {submit ?<ClipLoader
                    color="orange"
                    loading={submit}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  /> : "Sign up"}
                </button>
              </div>
              <div className='flex justify-center space-x-2 '>
                <div className='border-b border-gray-800 my-3 w-32'></div>
                <div className='text-black'>Or</div>
                <div className='border-b border-gray-800 my-3 w-32'></div>
              </div>
              <div className='md:text-center w-full flex justify-center'><GoogleOAuthProvider clientId="390204161646-6noec67uc8qleni584kq3ojnbbebeo1i.apps.googleusercontent.com"><GoogleLogin
                onSuccess={res => auth(res)}
                onError={() => {
                  console.log('Login Failed');
                }}
              /></GoogleOAuthProvider></div>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup