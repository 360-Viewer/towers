import React, {useEffect, useRef} from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import "./PanoramaImage.css"

const PSVImage = ({ src, setIsLoaded }) => {
  const photoSphereRef = useRef(null);

  useEffect(() => {
    if (!photoSphereRef.current)
      return;
  }, [photoSphereRef]);

  return (
    <ReactPhotoSphereViewer
      ref={photoSphereRef}
      // panorama={}
      width={"100%"}
      height={'100vh'}
      src={src}
      defaultZoomLvl={10}
      // navbar={
      //   [
      //     'autorotate',
      //     'zoom',
      //     'move',
      //     'download',
      //     'description',
      //     'fullscreen'
      //   ]}
      navbar={false}
      onReady={() => {
        setIsLoaded(true);
      }}
    ></ReactPhotoSphereViewer>
  );
};

    

function PanoramaImage({ src, blr }) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [show])


  return (
    <>
      {!isLoaded && <div className="blurred" style={{ backgroundImage: `url(${blr})` }}></div>}
      {
        show && 
        <div className="panorama">
          <PSVImage src={src} setIsLoaded={setIsLoaded} />
        </div>
      }
    </>
  )
}


export default PanoramaImage;
