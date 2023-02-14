import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '../../core';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import Viewer from 'react-viewer';
import './imageViewer.scss';
import ImageMagnifier from '../../core/ImageMagnifier';

export interface IImageViewerProps {
  src: string;
  id: string;
  width?: string | number;
  height?: string | number;
  rotatable?: boolean;
}

enum Orientation {
  Portrait = 1,
  Landscape = 2
}

export const ImageViewer = (props: IImageViewerProps) => {
  const { src, id, width, height, rotatable = false } = props;

  // const maxZoomOutHeight = 100;
  // const maxZoomOutWidth = 100;
  const [fullScreen, setfullScreen] = useState(false);
  const [image, setImage] = useState<any>(null);
  const [orientation, setOrientation] = useState<Orientation | null>();
  const [loading, setLoading] = useState(true);

  const imageRef = useRef<any>(null);

  // const zoomIn = () => {
  //   const creativeImage = imageRef.current;
  //   const currentHeight = creativeImage.clientHeight;
  //   const currentWidth = creativeImage.clientWidth;

  //   if (orientation === Orientation.Portrait)
  //     creativeImage.style.height = currentHeight + 50 + 'px';
  //   else creativeImage.style.width = currentWidth + 50 + 'px';
  // };

  // const zoomOut = (): any => {
  //   const creativeImage = imageRef.current;
  //   const currentHeight = creativeImage.clientHeight;
  //   const currentWidth = creativeImage.clientWidth;

  //   if (orientation === Orientation.Landscape) {
  //     if (currentWidth < maxZoomOutWidth) return false;
  //     creativeImage.style.width = currentWidth - 50 + 'px';
  //   } else {
  //     if (currentWidth < maxZoomOutHeight) return false;
  //     creativeImage.style.height = currentHeight - 50 + 'px';
  //   }
  // };

  const onImageLoad = () => {
    console.log(imageRef)
    const imageWidth = imageRef.current.clientWidth;
    const imageHeight = imageRef.current.clientHeight;
    if (imageHeight >= imageWidth) setOrientation(Orientation.Portrait);
    else setOrientation(Orientation.Landscape);
  };

  // const getImageStyle = () =>
  //   ({
  //     opacity: !orientation ? 0 : 1,
  //     width: '',
  //     height: orientation === Orientation.Portrait ? '100%' : '',
  //     display: loading ? 'none' : ''
  //   } as React.CSSProperties);

  const arrayBufferToBase64 = (buffer: any): any => {
    let binary = '';
    const bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((byte: any) => (binary += String.fromCharCode(byte)));
    return window.btoa(binary);
  };

  useEffect(() => {
    setLoading(true);
    fetch(src).then(response => {
      response.arrayBuffer().then(buffer => {
        const base64Flag = 'data:image/jpeg;base64,';
        const imageStr = arrayBufferToBase64(buffer);
        setImage(base64Flag + imageStr);
        setLoading(false);
      });
    });
  }, [src]);

  return (
    <>
      <div className='image-zoombox' style={{ width, height }}>
        <div className='zoom-container'>
          <div className={`zoom-container-image ${orientation ? 'scroller' : ''}`}>
            {(!orientation || loading) && (
              <div className='loading-container'>
                <div className='spinner' />
                <div className='spinner-text'>Loading</div>
              </div>
            )}
              <ImageMagnifier
                src={image}
                id={id}
                width={`${width}px`}
                height={`${height}px`}
                // style={getImageStyle()}
                onLoad={onImageLoad}
                ref={imageRef}
              />
          </div>
        </div>
        {!fullScreen ? (
          <>
            <Button customClass='image-expand-button' onClick={() => setfullScreen(true)}>
              <Icon icon={faExpand} />
            </Button>
            {/* <div className='zoom-controls'>
              <Button size={buttonSize.small} onClick={zoomIn} customClass='zoom-controls-button'>
                <Icon icon={faPlus} />
              </Button>
              <Button size={buttonSize.small} onClick={zoomOut} customClass='zoom-controls-button'>
                <Icon icon={faMinus} />
              </Button>
            </div> */}
          </>
        ) : (
          <Viewer
            visible={fullScreen}
            onClose={() => {
              setfullScreen(false);
            }}
            images={[{ src }]}
            noNavbar={true}
            noImgDetails={true}
            rotatable={rotatable}
            scalable={false}
            changeable={false}
          />
        )}
      </div>
    </>
  );
};
