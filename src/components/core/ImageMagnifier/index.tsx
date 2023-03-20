import React from "react";
import { useState } from "react";
// import "./styles.css";

interface ImageMagnifierProps {
    src: string;
    id: string;
    // ref: any;
    width?: string;
    height?: string;
    magnifierHeight?: number;
    magnifieWidth?: number;
    zoomLevel?: number;
    style?: any;
    onLoad?: () => void;
    innerRef: any
}

const ImageMagnifier = (props: ImageMagnifierProps) => {
    // console.log(style)
    const [[x, y], setXY] = useState([0, 0]);
    const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
    const [showMagnifier, setShowMagnifier] = useState(false);
    const {
        src,
        id,
        width,
        height,
        onLoad,
        magnifierHeight = 100,
        magnifieWidth = 100,
        zoomLevel = 1.5,
        innerRef
    } = props;
    return (
        <div
            style={{
                position: "relative",
                height: height,
                width: width,
                overflow: 'auto'
            }}
        >
            <img
                src={src}
                id={id}
                ref={innerRef}
                style={{ width: width, cursor: 'none' }}
                onMouseEnter={(e) => {
                    // update image size and turn-on magnifier
                    const elem = e.currentTarget;
                    const { width, height } = elem.getBoundingClientRect();
                    setSize([width, height]);
                    setShowMagnifier(true);
                }}
                onMouseMove={(e) => {
                    // update cursor position
                    const elem = e.currentTarget;
                    const { top, left } = elem.getBoundingClientRect();

                    // calculate cursor position on the image
                    const x = e.pageX - left - window.pageXOffset;
                    const y = e.pageY - top - window.pageYOffset;
                    setXY([x, y]);
                }}
                onMouseLeave={() => {
                    // close magnifier
                    setShowMagnifier(false);
                }}
                onLoad={onLoad}
                alt={"img"}
            />

            <div
                style={{
                    display: showMagnifier ? "" : "none",
                    position: "absolute",

                    // prevent maginier blocks the mousemove event of img
                    pointerEvents: "none",
                    // set size of magnifier
                    height: `${magnifierHeight}px`,
                    width: `${magnifieWidth}px`,
                    // move element center to cursor pos
                    top: `${y - magnifierHeight / 2}px`,
                    left: `${x - magnifieWidth / 2}px`,
                    opacity: "1", // reduce opacity so you can verify position
                    border: "1px solid lightgray",
                    backgroundColor: "white",
                    backgroundImage: `url('${src}')`,
                    backgroundRepeat: "no-repeat",

                    //calculate zoomed image size
                    backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel
                        }px`,

                    //calculete position of zoomed image.
                    backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
                    backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
                    cursor: 'none'
                }}
            ></div>
        </div>
    );
};

export default ImageMagnifier;
