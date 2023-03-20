import * as React from 'react';
import { MediaPlayer } from '../MediaPlayer/MediaPlayer';
import { ImageViewer } from '../ImageViewer/ImageViewer';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
// import { PDFViewer } from '../PDFViewer/PDFViewer';
import {
  ERROR_MESSAGES,
  Creative,
  playbackQualityList,
  playbackRateList,
  CREATIVE_PLAYER,
  // CreativeStatus
} from '../../utility/Constants';
import { Button, Icon, Tooltip, tooltipPosition } from '../../core';
import {
  faExternalLinkAlt,
  faVideo,
  faExclamationCircle,
  faChevronCircleRight,
  faChevronCircleLeft,
  faPencilAlt,
  faImage
} from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleLeft, faArrowAltCircleRight, faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { PlaybackSelector } from './PlaybackSelector';
import { routes } from '../../utility/Routes';
// import { MessageService } from '../../utility/MessageService';
// import pdfjsLib from 'pdfjs-dist/build/pdf';
// import * as pdfjslib from "pdfjs-dist";
// import * as pdfjslib from 'pdfjs-dist';

// import { PDFJSStatic } from 'pdfjs-dist'
// import pdfjsLib from 'pdfjs-dist/build/pdf';
// import { MediaIssueReportPrompt } from './MediaIssueReportPrompt';
import { encrypt } from '../../utility/Crypt';
import { MediaCreativeIssueContext } from '../../utility/MediaCreativeIssueContextFactory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './creativePlayer.scss';
// import EditCreativeModal from './EditCreativeModal';
// import { UNIVERSAL_SEARCH_READONLY_PARAM } from './Constants';
import IFrameViewer from '../IFrameViewer';
import { useState } from 'react';

interface ICreativePlayerProps {
  title?: string;
  src: string;
  id: string;
  type: string;
  width?: string | number;
  height?: string | number;
  toggleMediaStatus: (id: any, status: boolean) => void;
  thumbnailPath?: string;
  fullScreenMode?: boolean;
  onCrossButtonClick?: () => void;
  playerProps?: {
    isPlaying?: boolean;
    thumbnailStatus?: boolean;
    setMediaInstanceProgress: (id: any, progress: number) => void;
    seekToStart: number;
  };
  setPlaybackRate?: (rate: number) => void;
  playbackRate?: number;
  setPlaybackQuality?: (quality: number) => void;
  playbackQuality?: number;
  onNextPrevClick?: (type: string) => void;
  mediaList?: any[];
  currentMediaIndex?: any;
  onCreativeEdit?: (payload: any) => void;
  onReviewThumbnailClick?: () => void;
  htmlSrc?: any;
  onPrevMediaClick?: () => void;
  onNextMediaClick?: () => void;
  currentMediaCount?: number;
  totalMediaCount?: number;
  rotatable?: boolean;
  showEditIcon?: boolean;
}

interface IMediaCreativeIssueContext {
  global_collection_id: number;
  media_group: number;
  creative_quality_codes: any[];
  onCreativeDiscard: () => void;
  onCreativeDiscardSuccess: () => void;
  context: number;
}

export enum MediaTypes {
  video = 'Video',
  audio = 'audio',
  image = 'image',
  document = 'document',
  iframe = 'Frame',
  html = 'Html'
}

export const MediaNotAvailable = () => {
  return (
    <div className='media-not-found'>
      <h4>{ERROR_MESSAGES.mediaNotFoundErrorText}</h4>
    </div>
  );
};

export const CreativePlayer = (props: ICreativePlayerProps) => {
  // let PDFJS = pdfjslib.PDFJS;
  // PDFJS.disableTextLayer = true;
  // PDFJS.disableWorker = true;
  const showNewTab = false;
  const showResSelector = false;
  const { type, title, src, playbackRate, playbackQuality, mediaList = [], showEditIcon = false } = props;
  const [showPlaybackContainer, setShowPlaybackContainer] = React.useState(false);
  const [showVideoQualityContainer, setShowVideoQualityContainer] = React.useState(false);
  const [mediaProgressInSeconds, setMediaProgressInSeconds]: any = React.useState(0);
  // const [showReportMediaIssueModal, setShowReportMediaIssueModal] = React.useState(false);
  const playbackRef: any = React.useRef(null);
  // const [showVideoEditor, setShowVideoEditor] = React.useState(false);
  // const [isCreativeEditDone] = React.useState(false);
  const [fullScreen, setfullScreen] = useState(false); 
  const mediaCreativeIssueContext: any = React.useContext(
    MediaCreativeIssueContext.getInstance().context
  ) as IMediaCreativeIssueContext;

  const setMediaInstanceProgressInSeconds = (progress: any) => {
    setMediaProgressInSeconds(progress);
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  // const trimCreativeSuccess = () => {
  //   setShowVideoEditor(false);
  //   MessageService.showToastMessage('Your Creative is under process');
  //   setIsCreaticeEditDone(true);

  // };

  // const creativeEditSave =(payload: any) => {
  //   payload.callback =  () => trimCreativeSuccess();
  //   props.onCreativeEdit && props.onCreativeEdit(payload)
  // }

  const handleClickOutside = (event: any): any => {
    if (playbackRef.current && playbackRef.current.contains(event.target)) {
      return;
    }
    setShowPlaybackContainer(false);
    setShowVideoQualityContainer(false);
  };

  const setPlaybackRates = (selectedRate: number) => {
    props.setPlaybackRate && props.setPlaybackRate(selectedRate);
    setShowPlaybackContainer(false);
  };

  const setPlaybackQuality = (selectedQuality: number) => {
    props.setPlaybackQuality && props.setPlaybackQuality(selectedQuality);
    setShowVideoQualityContainer(false);
  };

  const isRadioType = () => {
    return type === MediaTypes.audio;
  };

  const isVideoType = () => {
    return type === MediaTypes.video;
  };
  const isImageType = () => {
    return type === MediaTypes.image;
  };

  const getComponentByMediaType = (creativeType: string, creativeProps: ICreativePlayerProps) => {
    
    const { toggleMediaStatus, playerProps } = creativeProps;
    const modifiedPlayerProps = {
      ...playerProps,
      setMediaInstanceProgressInSeconds,
      retainVideoPlayedtime: mediaProgressInSeconds
    };

    switch (creativeType) {
      case MediaTypes.video: {
        return (
          <MediaPlayer
            togglePlayerStatus={toggleMediaStatus}
            {...modifiedPlayerProps}
            {...creativeProps}
            setMediaInstanceProgress={() => { }}
            seekToStart={0}
          />
        );
      }
      case MediaTypes.audio: {
        return (
          <MediaPlayer togglePlayerStatus={toggleMediaStatus} {...playerProps} {...creativeProps} setMediaInstanceProgress={() => { }} seekToStart={0} />
        );
      }
      case MediaTypes.image: {
        return <ImageViewer {...creativeProps} fullScreenView={fullScreen} onCloseViewerClick={onCloseViewerClick} />;
      }
      case MediaTypes.document: {
        // return <PDFViewer {...creativeProps} pdfjsLib={pdfjsLib} />;
        return <></>
      }
      case MediaTypes.iframe: {
        return <IFrameViewer />;
      }
      case MediaTypes.html: {
        return <div id={props.id} dangerouslySetInnerHTML={{ __html: src }}></div>
      }
      default: {
        return <MediaNotAvailable />;
      }
    }
  };

  const onPopOutButtonClick = (creativeType: any, creativeProps: ICreativePlayerProps) => {
    if ([MediaTypes.video, MediaTypes.image].includes(creativeType)) {
      const { playerProps } = creativeProps;
      const modifiedPlayerProps = {
        ...playerProps,
        setMediaInstanceProgressInSeconds,
        retainVideoPlayedtime: mediaProgressInSeconds
      };
      window.open(
        `#${routes.playMedia}?creativeType=${type}&creativeProps=${encrypt(
          creativeProps
        )}&modifiedPlayerProps=${encrypt(modifiedPlayerProps)}`,
        '_blank'
      );
    } else if (src) {
      window.open(src, '_blank');
      setShowVideoQualityContainer(false);
      setShowPlaybackContainer(false);
    } else {
      // MessageService.showToastMessage(ERROR_MESSAGES.MediaNotAvailable);
    }
  };

  const onReportIssueClick = () => {
    // setShowReportMediaIssueModal(true);
    if (mediaCreativeIssueContext.onReportMediaPopupOpen)
      mediaCreativeIssueContext.onReportMediaPopupOpen();
  };

  const enableMediaCreativeIssueFunctionality = () => {
    return title !== 'Similar Ad' && mediaCreativeIssueContext.show;
  };

  const onCloseViewerClick = (data:boolean) => {
    setfullScreen(data)
  }
  // const showEditCreativeOption = (): boolean => {
  //   if (
  //     (window.location.href.includes(routes.indexingDetailStepOne) ||
  //       window.location.href.includes(routes.classificationDetailStep1) ||
  //       window.location.href.includes(routes.audit)) &&
  //     !window.location.href.includes('component') &&
  //     !window.location.href.includes(routes.classificationDetailStep2) &&
  //     !(
  //       window.location.href.includes(routes.universalSearch) &&
  //       window.location.href.includes(UNIVERSAL_SEARCH_READONLY_PARAM)
  //     )
  //   ) {
  //     if (
  //       mediaList?.[props.currentMediaIndex].high_res?.path &&
  //       mediaList?.[props.currentMediaIndex].creative_id !== null
  //     ) {
  //       return true;
  //     }
  //     return false;
  //   }
  //   return true;
  // };

  const showReviewThumbnailIcon = () => {
    if (
      window.location.href.includes(routes.audit) && window.location.href.includes(routes.classificationDetailStep1) && !window.location.href.includes('read-only=true')
    ) {
      return true;
    }
    return false;
  }

  // const onCreativeEditClick = () => {
  //   if (
  //     mediaList[props.currentMediaIndex].status === CreativeStatus.IN_PROGRESS ||
  //     isCreativeEditDone === true
  //   ) {
  //     // MessageService.showToastMessage(
  //     //   "Creative trimming is under process. You can't trim it unless previous operations is done"
  //     // );
  //   } else {
  //     // setShowVideoEditor(true);
  //   }
  // };

  // const getCreativePathForEdit = () => {
  //   if (mediaList?.[props.currentMediaIndex].status === CreativeStatus.COMPLETE) {
  //     return mediaList[props.currentMediaIndex].creative_edit_config.original_high_res_path;
  //   }
  //   return mediaList[props.currentMediaIndex].high_res.path;
  // };

  return (
    <>
      <div className='creative-player-title'>
        <div className='title-label'>{title ? title : 'New Ad'}</div>
        <div className='multiple-creative-control'>
          {props.currentMediaCount && props.totalMediaCount && <div className='middle-div'>
            <Button
              id={Creative.editVideo}
              customClass='playback-rate-next'
              onClick={props.onPrevMediaClick}
              disabled={props.currentMediaCount === 1}
            >
              <Icon icon={faArrowAltCircleLeft} />
            </Button>
            {props.currentMediaCount} of {props.totalMediaCount}
            <Button
              id={Creative.editVideo}
              customClass='playback-rate-next'
              onClick={props.onNextMediaClick}
              disabled={props.currentMediaCount === props.totalMediaCount}
            >
              <Icon icon={faArrowAltCircleRight} />
            </Button>
          </div>}
        </div>
        <>
          <div className='playback-rate-wrapper' ref={playbackRef}>
            {isVideoType() && showEditIcon && title !== 'Similar Ad' ? (
              <Tooltip text='Edit Video'>
                <Button
                  id={Creative.editVideo}
                  customClass='playback-rate'
                  onClick={props.onCreativeEdit}
                // disabled={shouldDisableCreativeEdit()}
                >
                  <Icon icon={faPencilAlt} />
                </Button>
              </Tooltip>
            ) : null}
            {isVideoType() && showReviewThumbnailIcon() ? (
              <Tooltip text='Review Thumbnails'>
                <Button
                  id={Creative.editVideo}
                  customClass='playback-rate'
                  onClick={props.onReviewThumbnailClick}
                >
                  <Icon icon={faImage} />
                </Button>
              </Tooltip>
            ) : null}
            {isRadioType() || isVideoType() ? (
              <Tooltip text='Playback Speed'  position={tooltipPosition.left}>
                <Button
                  id={Creative.playbackRateButton}
                  customClass='playback-rate'
                  onClick={() => {
                    setShowVideoQualityContainer(false);
                    setShowPlaybackContainer(!showPlaybackContainer);
                  }}
                  onFocus={() => {
                    setShowVideoQualityContainer(false);
                  }}
                >
                  <Icon icon={faPlayCircle} />
                </Button>
              </Tooltip>
            ) : null}
            {showPlaybackContainer ? (
              <div className='playback-rate-popup'>
                <PlaybackSelector
                  id={Creative.playbackRatePopup}
                  onOptionClick={(selectedRate: number) => {
                    setPlaybackRates(selectedRate);
                  }}
                  selectedOption={playbackRate}
                  headerTitle={Creative.playbackRateHeader}
                  data={playbackRateList}
                />
              </div>
            ) : null}
            {isImageType() ? (
              <Tooltip text='Fullscreen'  position={tooltipPosition.left}>
                <Button customClass='image-expand-button' onClick={() => setfullScreen(true)}>
              <FontAwesomeIcon icon={faExpand} />
            </Button>
              </Tooltip>
            ):null}
            {showResSelector ? (
              <Tooltip text='Video Quality'>
                <Button
                  id={Creative.playbackQualityButton}
                  customClass='playback-rate'
                  onClick={() => {
                    setShowPlaybackContainer(false);
                    setShowVideoQualityContainer(!showVideoQualityContainer);
                  }}
                  onFocus={() => {
                    setShowPlaybackContainer(false);
                  }}
                >
                  <Icon icon={faVideo} />
                </Button>
              </Tooltip>
            ) : null}

            {showVideoQualityContainer ? (
              <div className='playback-rate-popup'>
                <PlaybackSelector
                  id={Creative.playbackQualityPopup}
                  onOptionClick={(selectedQuality: number) => {
                    setPlaybackQuality(selectedQuality);
                  }}
                  selectedOption={playbackQuality}
                  headerTitle={Creative.playbackQualityHeader}
                  data={playbackQualityList}
                />
              </div>
            ) : null}
            {showNewTab ? (
              <Tooltip text={Creative.newTab}>
                <Button
                  customClass='icon-wrapper new-tab-icon'
                  onClick={() => {
                    onPopOutButtonClick(type, props);
                  }}
                  onFocus={() => {
                    setShowPlaybackContainer(false);
                    setShowVideoQualityContainer(false);
                  }}
                >
                  <Icon icon={faExternalLinkAlt} className='new-tab-button' />
                </Button>
              </Tooltip>
            ) : null}
            {enableMediaCreativeIssueFunctionality() ? (
              <Tooltip text={Creative.reportIssue} position={tooltipPosition.left}>
                <Button customClass='icon-wrapper report-issue-icon' onClick={onReportIssueClick}>
                  <Icon icon={faExclamationCircle} className='report-issue-button' />
                </Button>
              </Tooltip>
            ) : null}
          </div>
        </>
      </div>
      <div className='creative-details-container'>
        <div className='creative-icons-container'>
          {mediaList?.length > 1 ? (
            <div className='left-arrow'>
              <FontAwesomeIcon
                icon={faChevronCircleLeft}
                onClick={() => props.onNextPrevClick && props.onNextPrevClick(CREATIVE_PLAYER.prev)}
              />
            </div>
          ) : (
            <></>
          )}
          <div className='creative-player'>{getComponentByMediaType(type, props)}</div>
          {mediaList?.length > 1 ? (
            <div className='right-arrow'>
              <FontAwesomeIcon
                icon={faChevronCircleRight}
                onClick={() => props.onNextPrevClick && props.onNextPrevClick(CREATIVE_PLAYER.next)}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* {enableMediaCreativeIssueFunctionality() && showReportMediaIssueModal ? (
        <MediaIssueReportPrompt
          onConfirmClick={(discard_type, reject_reason, quality_response) => {
            setShowReportMediaIssueModal(false);
            mediaCreativeIssueContext.onCreativeDiscard({
              global_collection_id: mediaCreativeIssueContext.global_collection_id,
              context: mediaCreativeIssueContext.context,
              discard_type,
              reject_reason,
              quality_response,
              successCallback: mediaCreativeIssueContext.onCreativeDiscardSuccess
            });
          }}
          context={mediaCreativeIssueContext.context}
          onClose={() => {
            setShowReportMediaIssueModal(false);
          }}
          creativeQualityCodes={mediaCreativeIssueContext.creative_quality_codes || []}
        />
      ) : null} */}
      {/* {showVideoEditor ? (
        <EditCreativeModal
          onModalClose={() => {
            setShowVideoEditor(false);
          }}
          src={getCreativePathForEdit()}
          media={mediaList[props.currentMediaIndex]}
          onCreativeEdit={creativeEditSave}
        />
      ) : null} */}
    </>
  );
};
