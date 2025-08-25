interface IButtonState {
  loadingText: string;
  onClick?: (() => void) | undefined;
  loading?: boolean;
  disabled?: boolean;
}
