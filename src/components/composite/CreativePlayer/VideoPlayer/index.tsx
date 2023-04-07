import React, { useEffect, useRef } from "react";

interface IVideoPlayerProps {
    src: string;
    controls: boolean;
    autoPlay: boolean;
    isPlaying: boolean;
    loop: boolean;
    playbackRate: number;
    muted: boolean;
}

const VideoPlayer = ({
    src,
    controls = false,
    autoPlay = true,
    isPlaying = true,
    loop = false,
    playbackRate = 1,
    muted
}: IVideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (!isPlaying && videoRef?.current) {
            videoRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        if (videoRef?.current) {
            videoRef.current.playbackRate = playbackRate;
        }
    }, [playbackRate]);

    useEffect(() => {
        if (videoRef?.current) {
            videoRef.current.playbackRate = 1;
        }
    }, [src]);

    return (
        <video
            ref={videoRef}
            src={src}
            controls={controls}
            width="100%"
            height="100%"
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
        />
    )
}

export default VideoPlayer;