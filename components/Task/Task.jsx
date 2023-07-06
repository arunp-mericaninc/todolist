import { useContext, useEffect, useMemo, useState } from "react";
import { LuEdit } from "react-icons/lu";
import { TiDeleteOutline } from "react-icons/ti";
import { UserContext } from "@/Context/UserContext";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/utils/firebase";

const Task = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);
  const { User } = useContext(UserContext);

  // console.log(todos);
  console.log(User.email);
//for the useEffect function to get data
  const fetchData = async () => {
    if(query(collection(db, "todo")!==null)){
    const q = query(collection(db, "todo")
    , where("email", "==", User.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      data.id = doc.id;
      setTodos((userPost) => [...userPost, data]);
    });}else{
      setButton(true)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
//Edit from todo
  const handleEditTodo = ( id, title, description ) => {
      setTitle(title);
      setDescription(description);
      setId(id);
      setShow(true);
  
  };

  //update the value in firebase
  const handleSubmit = async (e) => {
    e.preventDefault()
    const updateData = doc(db, "todo", id);
    await updateDoc(updateData, { title: title, description: description });
    setShow(false)
    setTodos([])
    fetchData()
  };

  //Delete From Firebase
  const handleDeleteTodo = async (id) => {
    await deleteDoc(doc(db, "todo", id));
    setTodos([])
    fetchData()
  };
  return (
    <div className="ml-[24%] grid grid-cols-3 grid-flow-row w-screen items-center ">
      {show ? (
        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Create Post
            </h2>
            <form>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Title"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    required
                    id="description"
                    name="description"
                    rows="8"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Your description here"
                  ></textarea>
                </div>
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-black bg-blue-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
                Update
              </button>
            </form>
          </div>
        </section>
      ) : (
        <div>
          {todos.map((item, i) => {
            return (
              <div
                key={i}
                className="flex flex-col justify-between m-4 items-center border-2 gap-1 p-2 hover:bg-slate-50 bg-slate-200"
              >
                <h2>Title: {item.title}</h2>
                <h3>Work Update: {item.description}</h3>
                <div className="flex justify-evenly items-center gap-5">
                  <span
                    onClick={() => {
                      handleEditTodo(item.id, item.title, item.description);
                    }}
                    className="bg-green-600 p-1 rounded-md flex items-center cursor-pointer "
                  >
                    Edit
                    <LuEdit />
                  </span>
                  <button
                    onClick={() => {
                      handleDeleteTodo(item.id);
                    }}
                    className="relative top-0 left-0 rounded-md p-1 flex items-center bg-black text-white"
                  >
                    Delete
                    <TiDeleteOutline
                      size={20}
                      className="text-red-500 font-thin"
                    />
                  </button>
                  {/* <button>
                <span>Complete</span>
                <MdOutlineDone/>
              </button> */}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Task;
