import React, {useRef, useState} from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import "./PanoramaImage.css"
import { Controls } from "./Menu";

const PSVImage = ({ src, setIsLoaded }) => {
  const photoSphereRef = useRef(null);

  return (
    <>
      <ReactPhotoSphereViewer
        ref={photoSphereRef}
        loadingImg={null}
        loadingTxt={null}
        width={"100%"}
        height={'100vh'}
        src={src}
        defaultZoomLvl={10}
        navbar={false}
        onReady={() => {
          setIsLoaded(true);
        }}
      ></ReactPhotoSphereViewer>
      <Controls photoSphereRef={photoSphereRef} />
    </>
  );
};


function PanoramaImage({ src, blr }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [show, setShow] = useState(false);

  const imageLoaded = () => {
    setTimeout(() => {
      setShow(true);
    }, 10);
  }

  return (
    <>
      {
        !isLoaded &&
        <div className="blurred">
          <img src={blr} alt="loading" onLoad={imageLoaded} />
        </div>
      }
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
