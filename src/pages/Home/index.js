'use client'

import PostViewModal from "../../Components/PostViewModal";
import PostCreation from "../../Components/PostCreation"
import { useState } from "react"



export default function Home() {
  const [dataPost, setdataPost] = useState({

    name: "Alexandra",
    description: "",
    privacity: "Público",
    files: []

  });
  const [posts, setPosts] = useState([]);
  return (
    <div className="main-container">
      <PostCreation dataPost={dataPost} setDataPost={setdataPost} posts={posts} setPosts={setPosts} />
      <PostViewModal posts={posts} />
    </div>
  );
}
