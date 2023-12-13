
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [age,setAge] = useState();

    const [error,setError] = useState('');

    const navigator = useNavigate();
    const {id} = useParams();

    const getSingleUser = async () => {

      try{

        const response = await fetch(`http://localhost:4000/${id}`);
        const result = await response.json();

        console.log(result);

        setName(result.userDatas.name);
        setAge(result.userDatas.age);
        setEmail(result.userDatas.email);

      }
      catch(e){
        console.log(e);
        setError(e);
      }

    }

    async function handleEdit(e){

      e.preventDefault();

      try{

        const updatedUser = {name,email,age};

        const response = await fetch(`http://localhost:4000/${id}`,{
                method:"PATCH",
                body: JSON.stringify(updatedUser),
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const result = await response.json();
            
            console.log("result updated = ",result);

        navigator("/all");
      }
      catch(e){
        console.log(e);
        setError(e);
      }
    }

    useEffect(()=>{
      getSingleUser();
    },[]);

  return (
    <div classNameName='container my-2'>

    {
        error && <div class="alert alert-danger" role="alert">
        {error}
        </div>
    }

    <h2 classNameName='text-center'>Edit The Data</h2>

    <form className='container' onSubmit={handleEdit}>
        <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" placeholder='Jitendriya Meher' className="form-control" value={name} onChange={(e)=>{
                setName(e.target.value);
            }}/>
            
        </div>
        <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" placeholder='jitenkvk@gmail.com'  className="form-control" value={email} onChange={(e)=>{
                setEmail(e.target.value);
            }}/>
            
        </div>
        <div className="mb-3">
            <label className="form-label">age</label>
            <input type="number" placeholder='21'  className="form-control" value={age} onChange={(e)=>{
                setAge(e.target.value);
            }}/>
        </div>
        
        <button type="submit" className="btn btn-primary"> Edit </button>
        </form>
      
    </div>
  )
}

export default Update
