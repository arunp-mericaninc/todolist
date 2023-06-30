"use client";
import React, { useContext } from "react";
import { app } from "@/utils/firebase";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Home from "@/components/Home/Home";
import { userContext } from "@/Context/UserContext";
import Task from "@/components/Task/Task";

const Profile = () => {
  const {email, password} = useContext(userContext)
  const router = useRouter();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const [post, setPost] = useState([]);
  const [task, setTask] = useState([]);
  const [val, setVal] = useState([])
  const value = collection(db, "post")

  useEffect(()=>{
    const getData = async()=>{
      const dbVal = await getDocs(value);
      setPost(dbVal.docs.map((doc)=>({...doc.data(), id: doc.id})))
      console.log(val);
    };
    getData()
  },[])
  useEffect(()=>{
    const getData = async()=>{
      const dbVal = await getDocs(collection(db, "todo"));
      setTask(dbVal.docs.map((doc)=>({...doc.data(), id: doc.id})))
      console.log(task);
    };
    getData()
  },[])


  // useEffect(() => {
  //   getPost();
  // }, []);
  // const getPost = async () => {
  //       val.forEach((value)=>{
  //       if (value.email===email && value.password === password){
  //         console.log(value);
  //         setPost(value)
  //         console.log(setPost);
  //       } else {
  //         router.push("/")
  //       }
  //     })
  // };

  const handleLogout = () => {
    // signOut(auth).then(() => {
    router.push("/");
    // Sign-out successful.
    // }).catch((error) => {
    //   // An error happened.
    // });
  };
  return (
    <div className="flex items-center justify-center">
      <div><Home /></div>
      <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        {post.map((item, index) => {
        return (
          <div
            key={index}
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex justify-end px-4 pt-4">
              <button
                id="dropdownButton"
                data-dropdown-toggle="dropdown"
                className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                type="button"
              >
                <span className="sr-only">Open dropdown</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                </svg>
              </button>
              <div
                id="dropdown"
                className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul className="py-2" aria-labelledby="dropdownButton">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Edit
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Export Data
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Delete
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col items-center pb-10">
              <Image
                src={item.image}
                alt={item.username}
                width={70}
                height={50}
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
              />
              {/* <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"/> */}
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {item.username}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {item.phoneno}
              </span>
              <div className="flex mt-4 space-x-3 md:mt-6">
                <button onClick={()=>router.push('/profile/task')} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Add Task
                </button>
                <button
                  onClick={() => handleLogout()}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        );
      })}</div>
      <div ><Task task={task} className="flex flex-row"/></div>
      </div>
    </div>
  );
};

export default Profile;
