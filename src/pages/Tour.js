import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Tour() {
  const navigate = useNavigate();
  const { block, level } = useParams();


  useEffect(() => {
    if (level) {
      navigate(`/${block}/${level}/day`);
    }
    else if (block) {
      navigate(`/${block}/l2/day`);
    }
    else {
      navigate(`/a-block/l2/day`);
    }
  }, [block, level, navigate]);

  return (
    <>
      {/* This is the home page that only reason it is to navigate tower tours */}
    </>
  )
}

export default Tour