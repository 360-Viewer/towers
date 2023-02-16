import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/tower_tour/about');
  }, [navigate]);

  return (
    <>
    </>
  )
}

export default Home