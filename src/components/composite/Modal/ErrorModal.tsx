import React from 'react';
import { Modal } from './Modal';
import { Icon } from '../../core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import './ErrorModal.scss';

export interface IErrorModal {
  title: string;
  children: JSX.Element | JSX.Element[] | string;
  show: boolean;
  onOKClick?: () => void;
  customClass?: string;
  disablePortal?: boolean;
  isOkButtonEnabled?: boolean;
  OKButtonText?: string;
  showErrorIcon?: boolean;
}
export const ErrorModal = ({
  title,
  children,
  show,
  onOKClick,
  customClass = '',
  isOkButtonEnabled = true,
  OKButtonText = 'OK',
  disablePortal = false,
  showErrorIcon = true
}: IErrorModal) => {
  return (
    <Modal
      title={title}
      show={show}
      onClose={() => {
        // return;
      }}
      onSave={onOKClick}
      customClass={customClass}
      showButtons={true}
      hideCloseIcon={true}
      hideCancelButton={true}
      isSuccessButtonEnabled={isOkButtonEnabled}
      successButtonText={OKButtonText}
      disablePortal={disablePortal}
    >
      <div className='error-modal-error-content'>
        {showErrorIcon ? <Icon icon={faExclamationTriangle} className={'error-icon'} /> : null}
        <div className={`error-info ${!showErrorIcon ? 'hide-ml' : ''}`}>{children}</div>
      </div>
    </Modal>
  );
};
