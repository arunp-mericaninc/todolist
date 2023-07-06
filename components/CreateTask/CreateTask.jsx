"use client";
import { app, db } from "@/utils/firebase";

// import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";
import withAuth from "@/components/Producted/ProductedRoute";
import { UserContext } from "@/Context/UserContext";

const CreateTask = () => {
  const {User} = useContext(UserContext)
    const router = useRouter()
    const [title, setTitle] = useState("");
    const [id, setId] = useState("");
    const [description, setDescription] = useState("");
    const [show, setShow] = useState(false);
  const [inputs, setInputs]= useState([]);
//   const [submit, setSubmit] = useState(false);

  const storage = getStorage(app);
  console.log(User.uid);

//   useEffect(()=>{
//     if(submit==true)
//     {
//         savePost();
//     }

//   },[submit])
  const handleChange = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values)=>({...values,[name]:value, uid:User.uid}))
  }
  // const handleSubmit=async(e)=>{
  //   // e.preventDefault()
  //   if (e && e.preventDefault) { e.preventDefault(); }
  //   console.log(inputs);
  //   await setDoc(doc(db, "post", Date.now().toString()), 
  //    inputs);
  // }
  const handleUpdate = async (e) => {
    e.preventDefault()
    const updateData = doc(db, "todo", id);
    await updateDoc(updateData, { title: title, description: description });
    setShow(false);
    Swal.fire("updated successfully")
    
  };
  const handleSubmit = async (e) => {
    if (e && e.preventDefault) { e.preventDefault(); }
    // setShowToast(true);
//     const storageRef = ref(storage, 'nextauth/'+file?.name);
//     uploadBytes(storageRef, file).then((snapshot) => {
//         console.log('Uploaded a blob or file!');
//       }).then(resp=>{
//         getDownloadURL(storageRef).then(async(url)=>{
            
//             setInputs((values)=>({...values,
//                 image:url}));          
//             setSubmit(true);

//         }) 
//       }) ;
//   };

//   const savePost=async()=>{
    await setDoc(doc(db, "todo", Date.now().toString()), inputs);
    router.push('/profile')
  }
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Create Post
        </h2>
        <form  >
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                for="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type Title"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                for="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
              required
                id="description"
                name="description"
                rows="8"
                onChange={handleChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Your description here"
              ></textarea>
            </div>
          </div>
          <button
            type="button" onClick={handleSubmit} 
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-black bg-blue-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default withAuth (CreateTask);
