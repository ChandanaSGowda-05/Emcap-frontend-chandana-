import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const usenavigate = useNavigate();
   
    /*eslint-disable*/
    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
           usenavigate('/login');
        }
    }, []);
  return (
    <div>
      <h1>Hi welcome</h1>
    </div>
  )
}

export default Home
