export const NumberComponent: React.FC<{ number: string }> = ({ number }) => {
  return (
    <span
      className="flex 
        text-center 
        font-mono 
        items-center 
        justify-center 
        px-4 py-11 
        bg-grey-700 
        border 
        border-grey-500 
        rounded 
        text-9xl
        max-h-[189px]"
    >
      {number}
    </span>
  );
};
