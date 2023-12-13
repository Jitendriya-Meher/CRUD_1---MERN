
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Create = () => {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [age,setAge] = useState();

    const [error,setError] = useState('');

    const navigator = useNavigate();

    console.log(name,age,email);

    const handleSubmit = async(e) => {

        e.preventDefault();

       try{
            const addUser = {name,email,age};

            const response = await fetch("http://localhost:4000/",{
                method:"POST",
                body: JSON.stringify(addUser),
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const result = await response.json();
            
            console.log("result 1 = ",result);

            if( !response.ok){
                console.log(result.message);
                setError(result.message);
            }else{
                console.log("result 2 = ",result);
                setError("");
                setName("");
                setEmail("");
                setAge();

                navigator("/all");
            }
       }
       catch(e){
        console.log("error while creating user: " , e);
        setError(e);
       }

    }

  return (
    <div classNameName='container my-2'>

    {
        error && <div class="alert alert-danger" role="alert">
        {error}
        </div>
    }

    <h2 classNameName='text-center'>Enter The Data</h2>

    <form className='container' onSubmit={handleSubmit}>
        <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" placeholder='Enter your name' className="form-control" value={name} onChange={(e)=>{
                setName(e.target.value);
            }}/>
            
        </div>
        <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" placeholder='Enter your email'  className="form-control" value={email} onChange={(e)=>{
                setEmail(e.target.value);
            }}/>
            
        </div>
        <div className="mb-3">
            <label className="form-label">age</label>
            <input type="number" placeholder='Enter your age' className="form-control" value={age} onChange={(e)=>{
                setAge(e.target.value);
            }}/>
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      
    </div>
  )
}

export default Create
