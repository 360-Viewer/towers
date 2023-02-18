import React, {useRef, useState} from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import "./PanoramaImage.css"
import { Controls } from "./Menu";

const PSVImage = ({ src, setIsLoaded }) => {
  const photoSphereRef = useRef(null);

  return (
    <>
      <ReactPhotoSphereViewer
        containerClass="panorama"
        ref={photoSphereRef}
        loadingImg={null}
        loadingTxt={null}
        width={"100%"}
        height={'100vh'}
        src={src}
        defaultZoomLvl={10}
        navbar={false}
        onReady={() => {
          // after 2 seconds set is loaded to true
          setTimeout(() => {
            setIsLoaded(true);
          }, 2000);
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
      setShow(true);
  }

  return (
    <>
      { !isLoaded && <div className="blurred"> <img src={blr} alt="loading" onLoad={imageLoaded}/> </div> }
      { show && <PSVImage src={src} setIsLoaded={setIsLoaded}/> }
      { !isLoaded && <Controls /> }
    </>
  )
}


export default PanoramaImage;
