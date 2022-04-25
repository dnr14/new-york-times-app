declare interface ModalDatePickProps {
  placeholder: string;
  height?: string;
  datePickerValue: Date | null;
  onChange: (value: Date | null) => void;
}
