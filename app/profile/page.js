'use client'
import React from 'react'
import { app } from '@/utils/firebase'
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import Image from 'next/image';

const Profile = () => {
  const db=getFirestore(app);
  const [post, setPost] = useState([])
  useEffect(()=>{
    getPost();
  }, [])
  const getPost = async()=>{
    const querySnapshot = await getDocs(collection(db, "post"));
querySnapshot.forEach((doc) => {
  setPost(post =>[...post,doc.data()])
  // console.log(`${doc.id} => ${doc.data()}`);
});
  }
  return (
    <div>
      {post.map((item)=>{
        return(
            <div>
                <p>{item.username}</p>
                <p>{item.phoneno}</p>
                <Image src={item.image?item.image:'/images/cricket.png'} alt='prof' width={120} height={80}/>
            </div>
        )
      })}
    </div>
  )
}

export default Profile
