import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
  faArrowAltCircleRight,
  faArrowAltCircleLeft,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../core';
import { Spinner } from './Spinner';

interface IFullScreenPDFViewer {
  pdfjsLib: any;
  src: string | null;
  setFullScreen: any;
}

export const FullScreenPDFViewer = (props: IFullScreenPDFViewer) => {
  const { pdfjsLib, src, setFullScreen } = props;

  if (pdfjsLib && pdfjsLib.GlobalWorkerOptions)
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://npmcdn.com/pdfjs-dist@2.4.456/build/pdf.worker.js';

  const [mediaPDF, setMediaPDF]: any = useState(null);
  const [page, setPage]: any = useState(1);
  const [loadingMedia, setLoadingMedia] = useState(true);
  const mediaRef = useRef(null);

  const getPDFMaxPageCount = () => (mediaPDF ? mediaPDF.numPages : 0);

  const onKeyDown = (event: any) => {
    if (event.keyCode === 27) setFullScreen(false);
  };

  useEffect(() => {
    if (src) {
      pdfjsLib.getDocument(src).promise.then((loadedPDF: any) => {
        setMediaPDF(loadedPDF);
      });
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (mediaPDF) {
      mediaPDF.getPage(page).then((currentPage: any) => {
        const viewport = currentPage.getViewport({ scale: 1 });
        const scaledViewport = currentPage.getViewport({
          scale: 490 / viewport.width
        });
        const canvas: any = mediaRef.current;
        const context = canvas.getContext('2d');
        canvas.height = scaledViewport.height;
        canvas.width = scaledViewport.width;
        const renderContext = {
          canvasContext: context,
          viewport: scaledViewport
        };
        const renderTask = currentPage.render(renderContext);

        renderTask.promise.then(() => {
          setLoadingMedia(false);
        });
      });
    }
  }, [page, mediaPDF]);

  return (
    <>
      <div className='pdf-container'>
        <Button tabIndex={0} onClick={() => setFullScreen(false)} customClass='close-button'>
          <Icon icon={faTimesCircle} />
        </Button>
        <div className='pdf-info'>
          {loadingMedia ? <Spinner /> : <></>}
          {!loadingMedia ? (
            <div className='pdf-header'>
              <div className='left-page-toggle'>
                <Button
                  arial-label='left-page-button'
                  customClass='left-page-button'
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  <Icon icon={faArrowAltCircleLeft} />
                </Button>
              </div>
              <div className='page-count'>
                {page} of {mediaPDF && mediaPDF.numPages}
              </div>
              <div className='right-page-toggle'>
                <Button
                  arial-label='right-page-button'
                  customClass='right-page-button'
                  onClick={() => setPage(page + 1)}
                  disabled={page === getPDFMaxPageCount()}
                >
                  <Icon icon={faArrowAltCircleRight} />
                </Button>
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className='pdf-content scroller'>
            <canvas
              ref={mediaRef}
              id={'full-screen-pdf-viewer'}
              style={{ visibility: loadingMedia ? 'hidden' : 'visible' }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
