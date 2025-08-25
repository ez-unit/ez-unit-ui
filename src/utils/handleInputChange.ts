interface IHandleInputChange {
  value: string;
  decimals: number;
  callback: (value: string) => void;
  max?: number;
}
/**
 * This function handles the input change for a given value.
 *
 * It trims the value, removes non-numeric characters except dot,
 *
 * removes leading zeros unless it's followed by a dot,
 * removes leading dot if it's the first character,
 * limits to one dot, and ensures the input value is a valid string.
 * If the input value includes a dot, it splits the value into parts
 * and ensures the decimal part does not exceed the specified decimals.
 *
 * If a maximum value is specified, it checks if the input value is less than or equal to the maximum.
 *
 * If the input value is valid, it calls the callback function (setter) with the input value.
 *
 * @param value - The input value to be handled.
 * @param decimals - The maximum number of decimal places allowed.
 * @param callback - The function to be called with the input value if it is valid.
 * @param max - The maximum value allowed.
 */
export const handleInputChange = ({
  value,
  decimals,
  callback,
  max,
}: IHandleInputChange) => {
  let inputValue = value.trim(); // Remove leading and trailing whitespace

  // Handle the case where input is just a dot
  if (inputValue === '.') {
    callback('0.');
    return;
  }

  // Remove non-numeric characters except dot
  inputValue = inputValue.replace(/[^\d.]/g, '');
  // Remove leading zeros unless it's followed by a dot
  inputValue = inputValue.replace(/^0+(?=\d)/, '');
  // Remove leading dot if it's the first character
  inputValue = inputValue.replace(/^\./, '0.');
  // Limit to one dot
  inputValue = inputValue.replace(/(\..*)\./g, '$1');

  if (inputValue.includes('.')) {
    const parts = inputValue.split('.');
    if (parts[1] && parts[1].length > decimals) {
      parts[1] = parts[1].substring(0, decimals);
    }
    inputValue = parts.join('.');
  }

  // Handle empty input
  if (inputValue === '') {
    callback('');
    return;
  }

  if (max !== undefined) {
    const numValue = Number(inputValue);
    if (numValue <= max) {
      callback(inputValue);
    } else {
      callback(max.toString());
    }
  } else {
    callback(inputValue);
  }
};

// todo: handle decimals = 0 (no .)
