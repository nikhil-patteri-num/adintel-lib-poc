export interface IBaseControls {
  id?: any;
  value?: any;
  customClass?: string;
  name?: string;
  onChange?: (event: any) => void;
  children?: any;
  disabled?: boolean;
  title?: string;
  autofocus?: boolean;
  placeholder?: string;
  tabIndex?: number;
  hasError?: boolean;
  reference?: any;
  onKeyUp?: (event: any) => void;
  onKeyDown?: (event: any) => void;
}
