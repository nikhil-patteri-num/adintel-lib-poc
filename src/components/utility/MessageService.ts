import { debounce } from 'ts-debounce';
import { toast } from 'react-toastify';

const showToastWarning = (message: string, autoCloseTime?: any) => {
  return toast.warn(message, {
    position: 'top-right',
    autoClose: autoCloseTime === null ? 3000 : autoCloseTime,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false
  });
};

const deboucedFunction = debounce(showToastWarning, 3000, { isImmediate: true });

export class MessageService {
  static showToastMessage(message: string, autoCloseTime?: any): void {
    deboucedFunction(message, autoCloseTime);
  }

  static showConcurrentToastMessages(message: string, autoCloseTime?: any): void {
    showToastWarning(message, autoCloseTime);
  }

}
