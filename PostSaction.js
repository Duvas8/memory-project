import React from "react";
import { useState, useEffect } from "react";
import './PostSaction.css';



function PostSaction() {

    const [postInput , setPostInput] = useState('');
    const [ getPosts , setGetPosts] = useState([]);

   const getData = async () => {
     
    }

    

    const handelSubmit = () => {
        console.log(postInput)
     }
     useEffect(()=> {
        getData()
          //eslint-disable-next-line
     },[])
  
    return(
        <div className="container">
            <form className="formArea" >
                <input className="postArea" value={postInput} onChange={e => setPostInput(e.target.value)} placeholder={"placeholder"}>
                      
                </input>
                
            </form>
            <div className="btn_container">
            <button type="button" onClick={handelSubmit}>Post</button> 
            <button onClick={getData}>refetch</button>
            </div>
            
           <article>

            <h2>Posts</h2>


           
           </article>
        </div>
    )
}

export default PostSaction;

/*const   handleInput = (e) => {
            setPostInput({[e.target]: e.target.value});
       };

       const post = {
        post: postInput
    };

    const createPost = (e) => {
        e.preventDefault();
        console.log(postInput)
       
     createPost(post)

    }
     <div>
                <ul>
                    {
                        posts.map(post => <li key={post.id}>{post.title}</li>)
                    }
                </ul>
            </div>*/