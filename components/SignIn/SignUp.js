"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import Swal from "sweetalert2";
import { app } from "@/utils/firebase";

const SignUp = () => {
 
 
  
  const[confirmPassword, setConfirmPassword] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter();
  const auth = getAuth(app);
  

const handleSubmit=(e)=>{
  e.preventDefault();
  if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          router.push("/form")
          Swal.fire(
            'Good job!',
            'Login Success!',
            'success'
          )
          
          
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Swal.fire(
            'Oops!',
            errorMessage,
            'error'
          )
          // ..
        });
    } else {
    console.log("password mismatch");
    Swal.fire(
      'Oops!',
      'Password Mismatch!',
      'error'
    )
  }
}

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className=" bg-slate-100 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 gap-1">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign Up to your account
        </h1>
        <form className="space-y-2 md:space-y-2 bg-slate-100">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e)=>setEmail(e.target.value)}
              // onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e)=>setPassword(e.target.value)}
              // onChange={handleChange}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirm password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm Password
            </label>
            <input
              type="confirm password"
              name="confirm password"
              id="confirm password"
              onChange={(e)=>setConfirmPassword(e.target.value)}
              // onChange={handleChange}
              placeholder="confirm password"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <button
          onClick={handleSubmit}
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Sign in
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <span
              onClick={() => router.push("/")}
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
