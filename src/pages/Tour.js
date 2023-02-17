import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../App';
import { base_url } from '../public/constans';

function Tour() {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const { block, level } = useParams();


  useEffect(() => {
    if (level) {
      navigate(`/${base_url}/${block}/${level}/day`);
    }
    else if (block) {
      navigate(`/${base_url}/${block}/l2/day`);
    }
    else {
      navigate(`/${base_url}/a-block/l2/day`);
    }
  }, [navigate]);

  return (
    <>
      {/* This is the home page that only reason it is to navigate tower tours */}
    </>
  )
}

export default Tour