"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UserContext } from "@/Context/UserContext";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "@/utils/firebase";
import Link from 'next/link'
import { getAuth, signOut } from "firebase/auth";
import Task from "@/components/Task/Task";
import SideBar from "@/components/Home/SideBar";

const page = () => {
  const [val, setVal] = useState([]);
  const auth = getAuth(app);
  const [post, setPost] = useState([]);
  const [userPost, setUserPost] = useState([]);
  const { user } = useContext(UserContext);
  const router = useRouter();
  const db = getFirestore(app);

  const value = collection(db, "post");

  console.log(post);
  console.log(val);

  useEffect(() => {
    const getData = async () => {
      const dbVal = await getDocs(value);
      setPost(dbVal.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, [user]);

  useEffect(() => {
    getUserPost();
  }, [user]);

  const getUserPost = async () => {
    setUserPost([]);
    if (user.email) {
      const q = query(collection(db, "post"), where("email", "==", user.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        setVal((userPost) => [...userPost, data]);
      });
    }
  };
  const handleLogout = () => {
    router.push("/")
    signOut(auth)
      .then(() => {
        
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div>
        <SideBar/>
      <div class="ml-[14%] sm:ml-64">
        <div>
          {user?
          <div className="flex items-center justify-center h-screen">
            {val.map((item, index) => {
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
                      <button
                        onClick={() => router.push("/task")}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
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
            })}
          </div>:router.push("/")}
          <div className="flex flex-wrap">
          <Task/>
        </div>
        </div>
      </div>
    </div>
  );
};

export default page;
