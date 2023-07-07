'use client'
import React, { useContext, useEffect, useState } from 'react'
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from '@/utils/firebase';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import withAuth from '@/components/Producted/ProductedRoute';
import { UserContext } from '@/Context/UserContext';
// import { v4 as uuidv4 } from "uuid";

const Form = () => {
  const [inputs, setInputs]= useState([]);
  const [submit, setSubmit] = useState(false);
  const [file, setFile] = useState();
  const storage = getStorage(app);
  const db = getFirestore(app);
  const router = useRouter();
  const {User}= useContext(UserContext)
  // let uniqueid= uuidv4()
  // console.log(uniqueid);
  useEffect(()=>{
    if(submit==true)
    {
        savePost();
    }

  },[submit])
  const handleChange = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values)=>({...values,[name]:value}))
  }
  const handleSubmit = async(e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    const storageRef = ref(storage, 'todolist/'+file?.name);
    uploadBytes(storageRef, file).then((snapshot) => {
        // console.log('Uploaded a blob or file!');
      }).then(resp=>{
        getDownloadURL(storageRef).then(async(url)=>{
            
            setInputs((values)=>({...values,
              uid:User.uid,
                image:url}));          
            setSubmit(true);

        }) 
      }) ;
  };
  // console.log(inputs);
  const savePost=async()=>{
    await setDoc(doc(db, "post", Date.now().toString()), inputs);
    Swal.fire(
      "Good Job",
      "User Details Updated",
      "success",
    )
  router.push("/")
  };
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className=" bg-slate-100 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 gap-1">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign Up to your account
          </h1>
          <form className="space-y-2 md:space-y-2 bg-slate-100">
            <div className="flex justify-between gap-1 ">
              <div>
                <label
                  htmlFor="firstname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  FirstName
                </label>
                <input
                  type="text"
                  name="firstname"
                  onChange={handleChange}
                  id="firstname"
                  placeholder="First Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="LastName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="LastName"
                  onChange={handleChange}
                  id="LastName"
                  placeholder="Last Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  UserName
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={handleChange}
                  placeholder="User Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phoneno"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone No
                </label>
                <input
                  type="phoneno"
                  name="phoneno"
                  id="phoneno"
                  onChange={handleChange}
                  placeholder="PhoneNo"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
            </div>
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
                // onChange={(e)=>setEmail(e.target.value)}
                onChange={handleChange}
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
                // onChange={(e)=>setPassword(e.target.value)}
                onChange={handleChange}
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
                onChange={handleChange}
                placeholder="confirm password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="file"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Upload Photo
              </label>
              <input
                name="file"
                placeholder="upload Profile Image"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              />
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign in
            </button>
            {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <span
              onClick={() => router.push("/")}
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign up
            </span>
          </p> */}
          </form>
        </div>
      </section>
    </div>
  );
}

export default withAuth (Form)
