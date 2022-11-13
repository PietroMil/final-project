import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Button from './Button';
import { Link, useLocation } from 'react-router-dom'



function Form({ title, setPassword, setEmail, handleAction } : any) {

    const location = useLocation();
  return (


<form className="w-full max-w-sm mt-6 m-auto">
  <div className="md:flex md:items-center mb-6">
    <div className="md:w-1/3">
      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
        Email
      </label>
    </div>
    <div className="md:w-2/3">
      <input  onChange={(e) => setEmail(e.target.value)} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="Username" />
    </div>
  </div>
  <div className="md:flex md:items-center mb-6">
    <div className="md:w-1/3">
      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
        Password
      </label>
    </div>
    <div className="md:w-2/3">
      <input  onChange={(e) => setPassword(e.target.value)} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="password" placeholder="******************" />
    </div>
  </div>
 
  <div className="md:flex md:items-center">
    <div className="md:w-1/3"></div>
    <div className="md:w-2/3">
      <Button title={title} handleAction={handleAction}/>
      {location.pathname === "/" ? <Link className="ml-2 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/register">Register</Link> : <Link className="ml-2 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/">Login</Link>}

    </div>
    
  </div>
  <div>
        
   
    
  </div>
</form>
)
}

export default Form;