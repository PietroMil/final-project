import './App.css';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './Home';
import Form from './components/common/Form';
import { useState } from 'react';
import { app } from './firebase-config';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'


function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')

  let navigate = useNavigate();
  const handleAction = (id: number) => {
    console.log(id);
    const authentication = getAuth(app);
      if (id === 2) {
        createUserWithEmailAndPassword(authentication, email, password)
          .then((response: any) => {
            navigate('/home')
            sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        }).catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            setError('Email Already in Use');
          }
        })
     }

     if (id === 1) {
      signInWithEmailAndPassword(authentication, email, password)
        .then((response: any) => {
          navigate('/home')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        }).catch((error) => {
         
          if(error.code === 'auth/wrong-password'){
           console.log('Please check the Password');
           setError('Please check the Password');
          }
          if(error.code === 'auth/user-not-found'){
            console.log('Please check the email');
            setError('Please check the email');
          }
        })
    }
  }
  
  
  useEffect(() => {
    
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken) {
      navigate('/home')
    }
  }, [])

  return (
    
   <>
          <Routes>
          <Route path='/' element={<Form title="Login" setEmail={setEmail}
                  setPassword={setPassword} handleAction={() => handleAction(1)} />} />
            <Route path='/register' element={<Form title="Register" setEmail={setEmail}
                  setPassword={setPassword} handleAction={() => handleAction(2)}  />} />
                  <Route
            path='/home'
            element={
              <Home />}
          />
          </Routes>

          
  <div className="w-full max-w-sm mt-6 m-auto p-4 mb-4 text-sm text-red-700 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{error}</div>

          

       </>
       
  );
}

export default App;
