/* ErrorMessage */
declare interface ErrorMessageProps {
  text: string;
}
/* Empty */
declare interface EmptyProps {
  text: string;
  children?: React.ReactNode;
  top?: string;
}
/* Progress */
declare interface ProgressProps {
  isLoading: boolean;
}
/* Popup */
declare interface PopupState {
  isOpen: boolean;
  className: ClassColors;
  text: string;
}
declare type ClassColors = "green" | "red";
declare interface PopUpProps {
  isOpen: boolean;
  autoClose?: boolean;
  openDelay?: number;
  closeDelay?: number;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  className?: ClassColors;
}
/* ArticleSkeleton */
declare interface ArticleSkeletonProps {
  width: number;
  height: number;
}
