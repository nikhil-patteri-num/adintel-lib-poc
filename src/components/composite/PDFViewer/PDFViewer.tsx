import * as React from 'react';
import { useState } from 'react';
import { Button } from '../../core';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { FullScreenPDFViewer } from './FullScreenPDFViewer';
import './pdfViewer.scss';

export interface IPDFViewerProps {
  src: string;
  id: string;
  width?: string | number;
  height?: string | number;
  thumbnailPath?: string;
  pdfjsLib?: any;
}

export const PDFViewer = (props: IPDFViewerProps) => {
  const { src, width, height, thumbnailPath, pdfjsLib } = props;

  const [fullscreen, setFullScreen] = useState(false);

  return (
    <>
      <div
        className='pdf-viewer'
        style={{
          width,
          height,
          backgroundImage: `url(${thumbnailPath ? thumbnailPath : ''})`,
          backgroundSize: '100% 100%'
        }}
        tabIndex={0}
      >
        {fullscreen ? (
          <FullScreenPDFViewer pdfjsLib={pdfjsLib} src={src} setFullScreen={setFullScreen} />
        ) : (
          <Button customClass='view-button' onClick={() => setFullScreen(true)}>
            <div className='view-button-icon'>
              <Icon icon={faFilePdf} className={'pdf-fullscreen'} />
            </div>
            <div className='view-button-label'>View</div>
          </Button>
        )}
      </div>
    </>
  );
};
