
import { useState, useEffect } from "react";
import useAxiosFunction from "../hooks/useAxiosFunction";
import axios from "../Apis/jsonPH";

const useAxiosFunction = () => {
   

   const [ response, setResponse] = useState([])
   const [ error, setError] = useState('')
   const [ loading, setLoading] = useState(false)
   const [ controller, setController] = useState()

  const axiosFetch = async (configObj) => {
    const{
        axiosInstance,
        method,
        url,
        requestConfig = {}
    } = configObj;

    try{
        setLoading(true);
        const ctrl = new AbortController();
        setController(ctrl)
        const res = await axiosInstance[method.toLowerCase()](url,{
            ...requestConfig,
            signal: ctrl.signal
        });
        console.log(res)
        setResponse(res.data);

    } catch (err) {
        console.log(err.message)
        setError(err.message)
    } finally {
        setLoading(false)
    }
  }

   useEffect(() => {
       console.log(controller)

       //useEffect cleanup function
       return () => controller && controller.abort()    
   }, [controller])
   
   
   return [response, error, loading, axiosFetch];
}

export default useAxiosFunction


const [posts , error, loading, axiosFetch] = useAxiosFunction()
const getData = () => {
   axiosFetch({
           axiosInstance: axios,
           method:'GET',
           url:'/posts',
   });
}
useEffect(()=> {
   getData()
     //eslint-disable-next-line
},[])

const handelSubmit = () => {
   console.log(postInput)
   axiosFetch({
       axiosInstance: axios,
       method:'POST',
       url:'/posts',
       requestConfig: {
           data: {
               _id: {  type: String, default: shortid.generate },
               postContant: postInput,

           }
       }
   })
}

useEffect(()=>{
},[])


{loading && <p>Loading...</p>}

            {!loading && error && <p className="errMeg">{error}</p>}

            {!loading && !error && posts?.length &&  
                <ul>
                {posts.map((post, i) => <li key={i}>{`${post._id}.${post.postContant}`} </li>)}
                </ul>
            }

            {!loading && !error && !posts?.length && posts?.data &&
                <p>
                {posts.map((post, i) => <li key={i}>{`${post._id}.${post.postContant}`} </li>)}
                </p>
                }
            
            {!loading && !error && !posts && <p>No posts to fetch</p> }