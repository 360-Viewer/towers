import React, {useRef} from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import "./PanoramaImage.css"
import zoom_in from "../public/icons/zoom-in.svg";
import zoom_out from "../public/icons/zoom-out.svg";
import left from "../public/icons/left.svg";
import right from "../public/icons/right.svg";
import fullscreen from "../public/icons/fullscreen.svg";
import autorotate from "../public/icons/autorotate.svg";
import LazyLoad from 'react-lazy-load';

const PSVImage = ({ src, setIsLoaded }) => {
  const photoSphereRef = useRef(null);
  const [yaw, setYaw] = React.useState(0); 
  const [zoom, setZoom] = React.useState(10);
  
  const handleLeftClick = () => {
    photoSphereRef.current.animate({
      yaw: yaw - 0.5,
      pitch: photoSphereRef.current.getPosition().pitch,
      speed: '3rpm',
    }); 
    setYaw(yaw - 0.5);
  }

  const handleRightClick = () => {
    photoSphereRef.current.animate({
      yaw: yaw + 0.5,
      pitch: photoSphereRef.current.getPosition().pitch,
      speed: '3rpm',
    }); 
    setYaw(yaw + 0.5);
  }

  const handleZoomIn = () => {
    photoSphereRef.current.animate({
      zoom: zoom + 10,
      speed: '3rpm',
    });
    setZoom(zoom > 90 ? 100 : zoom + 10);
  }

  const handleZoomOut = () => {
    photoSphereRef.current.animate({
      zoom: zoom - 10,
      speed: '3rpm',
    });
    setZoom(zoom < 10 ? 0 : zoom - 10);
  }


  return (
    <>
      <ReactPhotoSphereViewer
        ref={photoSphereRef}
        width={"100%"}
        height={'100vh'}
        src={src}
        defaultZoomLvl={10}
        navbar={false}
        onReady={() => {
          setIsLoaded(true);
        }}
      ></ReactPhotoSphereViewer>
      {Controls(handleLeftClick, handleRightClick, photoSphereRef, handleZoomIn, handleZoomOut)}
    </>
  );
};

export function Controls(handleLeftClick, handleRightClick, photoSphereRef, handleZoomIn, handleZoomOut) {
  return <div className="controls">
    <div className="buttons">
      <button onClick={handleLeftClick}>
        <img src={left} alt="left" />
      </button>
      <button onClick={handleRightClick}>
        <img src={right} alt="right" />
      </button>
      <button onClick={() => photoSphereRef.current.toggleAutorotate()}>
        <img src={autorotate} alt="autorotate" />
      </button>
      <button onClick={handleZoomIn}>
        <img src={zoom_in} alt="zoom-in" />
      </button>
      <button onClick={handleZoomOut}>
        <img src={zoom_out} alt="zoom-out" />
      </button>
      <button onClick={() => { photoSphereRef.current.toggleFullscreen(); } }>
        <img src={fullscreen} alt="fullscreen" />
      </button>
    </div>
  </div>;
}

function PanoramaImage({ src, blr }) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true)
    }, 500)

    return () => clearTimeout(timeout)
  }, [show])

  // prevent context menu
  React.useEffect(() => {
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }, []);

  return (
    <>
      {/* {!isLoaded && <div className="blurred" style={{ backgroundImage: `url(${blr})` }}></div>} */}
      {!isLoaded && <div className="blurred">
        <LazyLoad>
          <img src={blr} alt="loading" />
        </LazyLoad>
      </div>}
      {
        show && 
        <div className="panorama">
          <PSVImage src={src} setIsLoaded={setIsLoaded} />
        </div>
      }
      {!isLoaded && <Controls />}
    </>
  )
}


export default PanoramaImage;
