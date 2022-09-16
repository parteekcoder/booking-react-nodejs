import React from 'react';
import axios from 'axios';
const useFetch=(url)=>{

const [data,setData]=React.useState([]);
const [loading,setLoading]=React.useState(false);
const [error,setError]=React.useState(false);

  React.useEffect(()=>{
    const fetchData=async()=>{

      setLoading(true);
     try {
      const res=await axios.get(url);

      setData(res.data);
     } catch (error) {
      setError(error);
     }
     setLoading(false);
    }
    fetchData(url)
  },[url])

  const reFetch=async()=>{

    setLoading(true);
   try {
    // console.log(url)
    const res=await axios.get(url);

    setData(res.data);
   } catch (error) {
    setError(error);
   }
   setLoading(false);
   
  }

  return {data,loading,error,reFetch};
}

export default useFetch;

