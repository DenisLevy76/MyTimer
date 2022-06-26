import { ButtonHTMLAttributes } from 'react';

export const ButtonComponent: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, ...others }) => {
  return (
    <button
      className={`flex item-center ${className} gap-2 justify-center text-white font-bold px-3 py-4 rounded whitespace-wrap  sm:whitespace-nowrap cursor-pointer transition-colors`}
      {...others}
    />
  );
};
