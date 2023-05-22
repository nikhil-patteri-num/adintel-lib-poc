import React from 'react';
import * as ReactDOM from 'react-dom';
import './Modal.scss';
import { Button } from '../../core';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
export interface IModal {
  title: string;
  onClose: () => void;
  children: JSX.Element | JSX.Element[] | string;
  show: boolean;
  onSave?: () => void;
  showNewButton?: boolean;
  newButtonText?: string;
  onNewButtonClick?: () => void;
  autoFocus?: boolean;
  isSuccessButtonEnabled?: boolean;
  isNewButtonEnabled?: boolean;
  showButtons?: boolean;
  customClass?: string;
  successButtonText?: string;
  cancelButtonText?: string;
  hideCloseIcon?: boolean;
  disablePortal?: boolean;
  hideCancelButton?: boolean;
  left?: string;
  top?: string;
  height?: string; // valid css height value: ex- 100px
  width?: string; // valid css width value: ex- 100px
  references?: {
    modal?: any;
    modalHeader?: any;
    rightResizer?: any;
    bottomResizer?: any;
  };
  isResizable?: boolean;
  isDragging?: boolean;
  extraModalButtons?: any[];
  customWidth?: number;
  customMarginLeft?: number;
}

export const Modal = ({
  title,
  onClose,
  children,
  show,
  onSave,
  showNewButton,
  newButtonText,
  onNewButtonClick,
  customClass = '',
  autoFocus = false,
  showButtons = true,
  isNewButtonEnabled = true,
  isSuccessButtonEnabled = true,
  successButtonText = 'Save',
  cancelButtonText = 'Cancel',
  hideCloseIcon = false,
  disablePortal = false,
  hideCancelButton = false,
  left,
  top,
  height,
  width,
  references,
  isResizable,
  extraModalButtons,
  customWidth,
  customMarginLeft
}: IModal) => {
  const getModalStyle = () => {
    const styleObj: any = {
      left,
      top
    };
    width && (styleObj.width = width);
    if (height) {
      styleObj.height = height;
      styleObj.maxHeight = height;
    }
    if (customWidth) {
      styleObj.width = customWidth;
    }
    if (customMarginLeft) {
      styleObj.marginLeft = customMarginLeft;
    }
    return styleObj;
  };
  const getModalComponent = () => (
    <div className={customClass ? `modal ${customClass}` : 'modal'}>
      <div ref={references?.modal} className='modal-content' style={getModalStyle()}>
        <div ref={references?.modalHeader} className='modal-header' id='modal-header'>
          <p>{title}</p>
          {extraModalButtons?.map((item, index) => (
            <div
              key={index}
              id={`extra-modal-btn-${index}`}
              className='extra-modal-btns'
              onClick={item.onClick}
              style={{ marginRight: (index + 1) * 20 }}
            >
              {/* <Tooltip position={tooltipPosition.top} text={item.tooltipText}> */}
              <Icon icon={item.icon} />
              {/* </Tooltip> */}
            </div>
          ))}
          {!hideCloseIcon ? (
            <div className='close-modal-btn' onClick={onClose}>
              <Icon icon={faTimes} />
            </div>
          ) : null}
        </div>
        <div className='modal-body scroller'>{children}</div>
        {showButtons ? (
          <div className='modal-footer'>
            <div className='button-wrapper'>
              {!hideCancelButton ? (
                <Button
                  id={cancelButtonText}
                  customClass='btn-cancel'
                  onClick={onClose}
                  autoFocus={autoFocus}
                >
                  {cancelButtonText}
                </Button>
              ) : null}
              {showNewButton ? (
                <Button
                  id={newButtonText}
                  customClass='btn-continue'
                  onClick={onNewButtonClick}
                  autoFocus={autoFocus}
                  disabled={!isNewButtonEnabled}
                >
                  {newButtonText}
                </Button>
              ) : null}
              <Button
                id={successButtonText}
                customClass='btn-continue'
                onClick={onSave}
                disabled={!isSuccessButtonEnabled}
              >
                {successButtonText}
              </Button>
            </div>
          </div>
        ) : (
          <> </>
        )}
        {isResizable ? (
          <>
            <div ref={references?.bottomResizer} id='resizer-bottom' className='resizer-bottom' />
            <div ref={references?.rightResizer} id='resizer-right' className='resizer-right' />
          </>
        ) : null}
      </div>
    </div>
  );
  if (show && !disablePortal) return ReactDOM.createPortal(getModalComponent(), document.body);
  else if (show) return getModalComponent();
  else return null;
};
