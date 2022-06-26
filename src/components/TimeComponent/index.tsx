import { NumberComponent } from '../NumberComponent';

export const TimeComponent: React.FC<{ time: number | string }> = ({
  time,
}) => {
  return (
    <div className="flex gap-5">
      <NumberComponent number={time.toString().padStart(2, '0')[0]} />
      <NumberComponent number={time.toString().padStart(2, '0')[1]} />
    </div>
  );
};
