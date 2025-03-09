import axios from 'axios'
import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants'

const Premium = () => {
    const [data, setData] = useState("")
    
    axios.get(BASE_URL + "/shop/premium", {withCredentials:true}).then((res)=>{
        console.log(res.data);
        setData(res.data)        
    }).catch(error => console.log(error))
  return (
    <div>
        {data && <h1>{data}</h1>}
    </div>
  )
}

export default Premium