import React, {useRef} from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import "./PanoramaImage.css"

import { Controls } from "./Menu";




const PSVImage = ({ src, setIsLoaded }) => {
  const photoSphereRef = useRef(null);
  return (
    <>
      <ReactPhotoSphereViewer
        ref={photoSphereRef}
        loadingImg={''}
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
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [show, setShow] = React.useState(false);

  // React.useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setShow(true)
  //   }, 750)

  //   return () => clearTimeout(timeout)
  // }, [show])

  const imageLoaded = () => {
    const timeout = setTimeout(() => {
    }, 1000);
    setShow(true);
    return () => clearTimeout(timeout);
  }

  // prevent context menu
  React.useEffect(() => {
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }, []);

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
