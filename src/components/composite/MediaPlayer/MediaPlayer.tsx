import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import {
  Button,
  FormGroup,
  FormItemLabel,
  TextInput,
  inputType,
  buttonVariant,
  Tooltip,
  tooltipPosition
} from '../../core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   // defaultMediaPlayerThumbnail,
//   // MediaNotAvailable
// } from '../../utility/Constants';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
// import { MessageService } from '../../../Framework';
import './mediaPlayer.scss';
// import { ERROR_MESSAGES } from '../../../Application/src/utility/AppConstants';

export interface IMediaPlayerProps {
  src: string;
  height?: string | number;
  width?: string | number;
  id: string;
  togglePlayerStatus: (id: string, status: boolean) => void;
  thumbnailPath?: string;
  isPlaying?: boolean;
  thumbnailStatus?: boolean;
  setMediaInstanceProgress: (id: any, progress: number) => void;
  setMediaInstanceProgressInSeconds?: (progress: number) => void;
  seekToStart: number;
  playbackRate?: number;
  retainVideoPlayedtime?: number;
  currentIndex?: number;
  isEditMode?: boolean;
  editConfig?: any;
  onPreviewCreativeClick?: (startTime: any, endTime: any) => void;
}

export const MediaPlayer = (props: IMediaPlayerProps) => {
  const {
    // height,
    // width,
    isPlaying = true,
    // thumbnailPath,
    src,
    id,
    thumbnailStatus,
    togglePlayerStatus,
    setMediaInstanceProgress,
    setMediaInstanceProgressInSeconds,
    seekToStart,
    playbackRate,
    retainVideoPlayedtime = 0,
    isEditMode = false,
    onPreviewCreativeClick
  } = props;

  // const [isMediaPlaying, setMediaPlaying] = useState(isPlaying !== undefined ? isPlaying : false);
  // const [isThumbnailVisible, setThumbnailVisible] = useState(
  //   thumbnailStatus !== undefined ? thumbnailStatus : true
  // );

  const playerRef: any = React.useRef(null);

  const [seekTo, setSeekTo] = useState(retainVideoPlayedtime);
  const [startTime, setStartTime] = useState('0');
  const [endTime, setEndTime] = useState('');
  // const [currentText, setCurrentText] = useState('');
  // const [pickVideo, setPickVideo] = useState(false);
  // const [showPickVideoForm, setShowPickVideoForm] = useState(false);

  const hideThumbnail = () => {
    // setThumbnailVisible(false);
    setMediaPlayStatus(true);
  };

  const setMediaPlayStatus = (status: boolean) => {
    // setMediaPlaying(status);
    if (togglePlayerStatus) togglePlayerStatus(id, status);
  };

  const startOver = () => {
    playerRef.current.seekTo(0, 'seconds');
  };

  const onProgessChange = (progress: any) => {
    if (setMediaInstanceProgress) setMediaInstanceProgress(id, progress.played);

    if (setMediaInstanceProgressInSeconds)
      setMediaInstanceProgressInSeconds(progress.playedSeconds);

    if (isEditMode) {
      if (parseInt(endTime, 10) !== 0 && progress.playedSeconds > parseInt(endTime, 10)) {
        // setMediaPlaying(false);
      }
    }
  };

  const isMediaSroucePresent = () => {
    // if (!src && !isThumbnailVisible) MessageService.showToastMessage(MediaNotAvailable);
  };

  useEffect(() => {
    // setMediaPlaying(isPlaying !== undefined ? isPlaying : false);
    if (isPlaying) {
      hideThumbnail();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (seekToStart) startOver();
  }, [seekToStart]);

  useEffect(() => {
    // setThumbnailVisible(thumbnailStatus !== undefined ? thumbnailStatus : true);
    isMediaSroucePresent();
  }, [thumbnailStatus]);

  useEffect(() => {
    setSeekTo(retainVideoPlayedtime);
  }, [retainVideoPlayedtime]);

  useEffect(() => {
    playerRef.current.seekTo(seekTo, 'seconds');
    isMediaSroucePresent();
  }, [src]);

  const onPreviewClick = () => {
    if (parseInt(startTime, 10) > parseInt(endTime, 10)) {
      // MessageService.showToastMessage(ERROR_MESSAGES.CreativeRangeError);
      return;
    }
    playerRef.current.seekTo(startTime);
    hideThumbnail();
    // setMediaPlaying(true);
    if (onPreviewCreativeClick) {
      onPreviewCreativeClick(startTime, endTime);
    }
  };

  // const onVideoSeek = () => {
  //   if (pickVideo) {
  //     setShowPickVideoForm(true);
  //   }
  //   // if (currentText === 'startTime') {
  //   //   setStartTime(playerRef.current.getCurrentTime())
  //   // }
  //   // if (currentText === 'endTime') {
  //   //   setEndTime(playerRef.current.getCurrentTime())
  //   // }
  // }

  const onResetClick = () => {
    setStartTime('0');
    setEndTime('');
    // setMediaPlaying(false);
    playerRef.current.seekTo(0);
  };

  const onPlay = () => {
    if (isEditMode && endTime === '') {
      setEndTime(playerRef.current.getDuration());
    }
  };

  return (
    <div className='media-player'>
      <>
        {isEditMode ? (
          <div className='reset-button-div'>
            <Tooltip text={'Reset Creative'} position={tooltipPosition.left}>
              <Button customClass='reset-button' onClick={onResetClick}>
                <FontAwesomeIcon className='reset-creative' icon={faSyncAlt} />
              </Button>
            </Tooltip>
          </div>
        ) : null}
        {/* {!isThumbnailVisible && (
          <div
            style={{
              backgroundImage: thumbnailPath
                ? `url(${thumbnailPath})`
                : '',
              backgroundSize: '100%',
              backgroundRepeat: 'no-repeat',
              width,
              height
            }}
            className='thumbnail-viewer'
          >
            <Button customClass='video-play-button' onClick={hideThumbnail}>
              <Icon icon={faPlay} />
            </Button>
          </div>
        )} */}

        <ReactPlayer
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload'
              }
            }
          }}
          controls={true}
          playing={isPlaying}
          className={'react-player-wrapper'}
          width='100%'
          height='100%'
          url={src}
          ref={playerRef}
          id={id}
          onPlay={() => {
            setMediaPlayStatus(true);
            onPlay();
          }}
          onPause={() => setMediaPlayStatus(false)}
          onProgress={(progress: any) => onProgessChange(progress)}
          playbackRate={playbackRate}
          onReady={() => setMediaPlayStatus(true)}
          // onSeek={onVideoSeek}
        />

        {isEditMode ? (
          <>
            <div className='text-button-container'>
              <div className='start-time-div'>
                <FormGroup>
                  <FormItemLabel isMandatory={true}>Start Time (In Seconds)</FormItemLabel>
                  <TextInput
                    id={'startTime'}
                    type={inputType.number}
                    step={1}
                    name='startTime'
                    value={startTime}
                    min={0}
                    onChange={event => setStartTime(event.target.value)}
                    disabled={false}
                  />
                </FormGroup>
              </div>
              <div className='end-time-div'>
                <FormGroup>
                  <FormItemLabel isMandatory={true}>End Time (In Seconds)</FormItemLabel>
                  <TextInput
                    id={'endTime'}
                    type={inputType.number}
                    name='endTime'
                    step={1}
                    min={0}
                    value={endTime}
                    onChange={event => setEndTime(event.target.value)}
                    disabled={false}
                  />
                </FormGroup>
              </div>
              <div className='preview-button-div'>
                <Button variant={buttonVariant.secondary} onClick={onPreviewClick}>
                  Preview
                </Button>
              </div>
            </div>
          </>
        ) : null}
      </>
    </div>
  );
};
