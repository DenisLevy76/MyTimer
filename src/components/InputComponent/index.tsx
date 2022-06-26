import { InputHTMLAttributes } from 'react';

export const InputComponent: React.FC<InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return (
    <input
      type="text"
      className="text-center bg-grey-700 text-9xl max-w-[241.62px] rounded border border-grey-500 px-4 py-11 max-h-[189px]"
      maxLength={2}
      onFocus={(event) => event.target.select()}
      {...props}
    />
  );
};
