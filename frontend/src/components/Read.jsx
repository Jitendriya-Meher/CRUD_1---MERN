
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./read.css"

const Read = () => {

  const [data,setData] = useState([]);
  const [error,setError] = useState('');

  async function getData(){

    const response = await fetch("http://localhost:4000");
    const result = await response.json();

    console.log(result);
      
    if( !response.ok){
      console.log(result.message);
      setError(result.message);
      setData([]);
    }
    else{
      setData(result.userDatas);
    }
  }

  useEffect( ()=>{
    getData();
  },[]);

  const handleDelete = async (id) => {

    try{
          const response = await fetch(`http://localhost:4000/${id}`,{
          method: 'DELETE'
        });

        const result = await response.json();

        setError("User deleted Successfully");

        setTimeout(() => {
          setError("");
          getData();
        }, 2000);
    }
    catch(e){
      setError("Cannot delete The User");
      setTimeout(() => {
        setError("");
        getData();
      }, 1800);
    }

  }


  return (
    <div className='container my-2 all'>

    {
        error && <div class="alert alert-danger" role="alert">
        {error}
        </div>
    }

      <div className="row">    

        <div className="col">

        {
          data.length > 0 ? <div className="post">All Posts</div> :
          <div className='post'>Please Enter Some User</div>
        }

        {
          data.length > 0 ? (
            
            
            data.map( (user) => (
              <div className="card my-4" key={user._id}>
                <div className="card-body">
                  <h5 className="card-title">
                    Name : {user.name}
                  </h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    age : {user.age}
                  </h6>
                  <p className="card-text">
                    Email : {user.email}
                  </p>
                  <a className="btn btn-danger mx-2"
                  onClick={ () => {handleDelete(user._id)}}
                  >Delete</a>
                  <Link to={`/${user._id}`} className="btn btn-primary mx-2">Edit</Link>
                </div>
              </div>
            ))
            
          ):(
            <div className=""></div>
          )
        }

        </div>

      </div>
      
    </div>
  )
}

export default Read
