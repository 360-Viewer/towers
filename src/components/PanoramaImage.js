import React, {useEffect, useRef} from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";

function PanoramaImage({src, blur}) {
  const photoSphereRef = useRef(null);

  React.useEffect(() => {
    if (!photoSphereRef.current)
      return;
    
  }, [photoSphereRef]);

  console.log("src", src);

    return (
      <div>
        <ReactPhotoSphereViewer
          ref={photoSphereRef}
          // panorama={}
          width={"100%"}
          height={'100vh'}
          src={src}
          defaultZoomLvl={10}
          navbar={
            [
              'autorotate',
              'zoom',
              'move',
              'download',
              'description',
              'fullscreen'
            ]}
          // navbar={false}
          // onReady={() => {
          //   setIsPanoramaReady(true);
          // }}
        ></ReactPhotoSphereViewer>
      </div>
    )
}


export default PanoramaImage;
