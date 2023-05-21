import React, { useState, useEffect, useRef } from 'react';
import { Modal, IModal } from './Modal';
import './resizableFloatingModal.scss';
import useWindowDimensions from '../../utility/Hooks';

interface IResizableFloatingModal extends IModal {
  disablePortal?: boolean;
}

export const ResizableFloatingModal = (props: IResizableFloatingModal) => {
  let modalPos1 = 0;
  let modalPos2 = 0;
  let modalPos3 = 0;
  let modalPos4 = 0;

  const [modalTop, setModalTop] = useState<string | undefined>(props.top);
  const [modalLeft, setModalLeft] = useState<string | undefined>(props.left);
  const [width, setWidth] = useState<string | undefined>(props.width);
  const [height, setHeight] = useState<string | undefined>(props.height);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizingBottom, setResizingBottom] = useState(false);
  const [isResizingRight, setResizingRight] = useState(false);
  const { windowHeight, windowWidth } = useWindowDimensions();

  const modalRef = useRef<any>(null);
  const modalHeaderRef = useRef<any>(null);
  const modalRightResizerRef = useRef<any>(null);
  const modalBottomResizerRef = useRef<any>(null);

  useEffect(() => {
    if (props.isDragging !== false) {
      modalHeaderRef.current && modalHeaderRef.current.addEventListener('mousedown', dragMouseDown);
      modalBottomResizerRef.current &&
        modalBottomResizerRef.current.addEventListener('mousedown', initModalResizeBottom);
      modalRightResizerRef.current &&
        modalRightResizerRef.current.addEventListener('mousedown', initModalResizeRight);
      return () => {
        modalHeaderRef.current &&
          modalHeaderRef.current.removeEventListener('mousedown', dragMouseDown);
        modalBottomResizerRef.current &&
          modalBottomResizerRef.current.removeEventListener('mousedown', initModalResizeBottom);
        modalRightResizerRef.current &&
          modalRightResizerRef.current.removeEventListener('mousedown', initModalResizeRight);
      };
    } else {
      modalBottomResizerRef.current &&
        modalBottomResizerRef.current.addEventListener('mousedown', initModalResizeBottom);
      modalRightResizerRef.current &&
        modalRightResizerRef.current.addEventListener('mousedown', initModalResizeRight);
      return () => {
        modalBottomResizerRef.current &&
          modalBottomResizerRef.current.removeEventListener('mousedown', initModalResizeBottom);
        modalRightResizerRef.current &&
          modalRightResizerRef.current.removeEventListener('mousedown', initModalResizeRight);
      };
    }
  });

  function dragMouseDown(event: any): void {
    setIsDragging(true);
    modalPos3 = event.clientX;
    modalPos4 = event.clientY;
    document.addEventListener('mouseup', stopModalDrag);
    document.addEventListener('mousemove', modalDrag);
  }

  function modalDrag(event: any): void {
    setIsDragging(true);
    modalPos1 = modalPos3 - event.clientX;
    modalPos2 = modalPos4 - event.clientY;
    modalPos3 = event.clientX;
    modalPos4 = event.clientY;
    const { offsetTop, offsetLeft } = modalRef.current;
    if (offsetTop - modalPos2 > 0 && offsetTop - modalPos2 < windowHeight - 180)
      setModalTop(`${offsetTop - modalPos2}px`);
    if (offsetLeft - modalPos1 > 0 && offsetLeft - modalPos1 < windowWidth - 180)
      setModalLeft(`${offsetLeft - modalPos1}px`);
  }

  function stopModalDrag(): void {
    setIsDragging(false);
    document.removeEventListener('mouseup', stopModalDrag);
    document.removeEventListener('mousemove', modalDrag);
  }

  function initModalResizeBottom(): void {
    setResizingBottom(true);
    document.addEventListener('mousemove', ResizeModalBottom);
    document.addEventListener('mouseup', stopResizeBottom);
  }

  function initModalResizeRight(): void {
    setResizingRight(true);
    document.addEventListener('mousemove', ResizeModalRight);
    document.addEventListener('mouseup', stopResizeRight);
  }

  function ResizeModalBottom(event: any): void {
    setResizingBottom(true);
    const { offsetTop } = modalRef.current;
    setHeight(`${event.clientY - offsetTop}px`);
  }

  function ResizeModalRight(event: any): void {
    setResizingRight(true);
    const { offsetLeft } = modalRef.current;
    setWidth(`${event.clientX - offsetLeft}px`);
  }

  function stopResizeBottom(): void {
    setResizingBottom(false);
    document.removeEventListener('mousemove', ResizeModalBottom);
    document.removeEventListener('mouseup', stopResizeBottom);
  }

  function stopResizeRight(): void {
    setResizingRight(false);
    document.removeEventListener('mousemove', ResizeModalRight);
    document.removeEventListener('mouseup', stopResizeRight);
  }

  function getCustomClass(): string {
    let customClass = `draggable-modal ${props.customClass || ''}`;
    if (props.isDragging === false) {
      customClass += ' disable-background';
    }
    customClass += isDragging ? ' dragging ' : '';
    customClass += isResizingBottom ? ' resizing-bottom ' : '';
    customClass += isResizingRight ? ' resizing-right ' : '';
    return customClass;
  }

  return (
    <Modal
      {...props}
      customClass={getCustomClass()}
      top={modalTop}
      left={modalLeft}
      references={{
        modal: modalRef,
        modalHeader: modalHeaderRef,
        rightResizer: modalRightResizerRef,
        bottomResizer: modalBottomResizerRef
      }}
      isResizable={true}
      width={width}
      height={height}
      disablePortal={true}
    >
      {props.children}
    </Modal>
  );
};
