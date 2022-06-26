import Logo from '../../assets/Logo.png';
import { FormEvent, useEffect, useState } from 'react';
import { InputComponent } from '../../components/InputComponent';
import { Pause, Play, XCircle } from 'phosphor-react';
import { TimeComponent } from '../../components/TimeComponent';
import { ButtonComponent } from '../../components/ButtonComponent';
import { secondsToHours } from 'date-fns';
import { secondsToMinutes } from 'date-fns/esm';

import AlarmSong from '../../assets/harp.wav';

export const HomePage: React.FC = () => {
  const [timer, setTimer] = useState<number>(0);
  const [active, setActive] = useState<boolean>(false);

  const [inputValues, setInputValues] = useState<{
    hour: string;
    min: string;
    sec: string;
  }>({
    hour: '00',
    min: '00',
    sec: '00',
  });

  const hour = secondsToHours(timer);
  const min = secondsToMinutes(timer - hour * 3600);
  const sec = timer % 60;

  const startTimer = () => {
    if (
      inputValues.hour != '00' ||
      inputValues.min != '00' ||
      inputValues.sec != '00'
    ) {
      const timerValue =
        Number(inputValues.hour) * 3600 +
        Number(inputValues.min) * 60 +
        Number(inputValues.sec) -
        1;
      if (timerValue > 0) setTimer(timerValue);
      else alert('Invalid timer');

      setActive(true);
    }
  };

  let timeout: any;

  const cancelTimer = () => {
    setTimer(0);
    clearTimeout(timeout);
  };

  const handleTimer = () => {
    setActive(!active);
    clearTimeout(timeout);
  };

  let timerTimeout;

  useEffect(() => {
    if (timer && timer > 0 && active) {
      timeout = setTimeout(() => {
        timerTimeout = setTimer(timer - 1);
      }, 1000);

      if (timer === 1) setTimeout(() => new Audio(AlarmSong).play(), 1000);
    } else {
      setActive(false);
    }

    return () => clearTimeout(timeout);
  }, [timer, active]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <audio src="../../assets/harp.wav" autoPlay></audio>
      <header className="bg-grey-700 w-full flex items-center justify-center p-3 border-b border-grey-500">
        <img src={Logo} alt="Logo" />
      </header>
      <main className="text-white flex flex-1 flex-col items-center justify-center gap-16 text-center">
        <form
          onSubmit={(event: FormEvent) => {
            event.preventDefault();
            startTimer();
          }}
          className="flex flex-col gap-16 items-center justify-center"
        >
          <fieldset className="flex gap-5 items-center justify-center">
            {timer ? (
              <TimeComponent time={hour} />
            ) : (
              <InputComponent
                onChange={(event) =>
                  setInputValues({
                    ...inputValues,
                    hour: event.target.value.trim(),
                  })
                }
                value={inputValues.hour}
                onBlur={() =>
                  setInputValues({
                    ...inputValues,
                    hour: inputValues.hour.padStart(2, '0'),
                  })
                }
              />
            )}

            <p className="flex text-9xl text-green-500 font-bold items-center justify-center -translate-y-3">
              :
            </p>

            {timer ? (
              <TimeComponent time={min} />
            ) : (
              <InputComponent
                onChange={(event) =>
                  setInputValues({
                    ...inputValues,
                    min: event.target.value.trim(),
                  })
                }
                value={inputValues.min}
                onBlur={() =>
                  setInputValues({
                    ...inputValues,
                    min: inputValues.min.padStart(2, '0'),
                  })
                }
              />
            )}

            <p className="text-9xl text-green-500 font-bold flex items-center justify-center -translate-y-3">
              :
            </p>

            {timer ? (
              <TimeComponent time={sec} />
            ) : (
              <InputComponent
                onChange={(event) =>
                  setInputValues({
                    ...inputValues,
                    sec: event.target.value.trim(),
                  })
                }
                value={inputValues.sec}
                onBlur={() =>
                  setInputValues({
                    ...inputValues,
                    sec: inputValues.sec.padStart(2, '0'),
                  })
                }
              />
            )}
          </fieldset>
          {!timer ? (
            <ButtonComponent
              type="submit"
              className="bg-green-500 hover:bg-green-700"
            >
              <Play size={24} weight="bold" /> INICIAR CONTAGEM
            </ButtonComponent>
          ) : (
            <div className="flex gap-5">
              <ButtonComponent
                onClick={handleTimer}
                className="bg-orange-500 hover:bg-orange-700"
              >
                <Pause size={24} weight="bold" /> PAUSAR CONTAGEM
              </ButtonComponent>
              <ButtonComponent
                onClick={cancelTimer}
                className="bg-red-500 hover:bg-red-700 "
              >
                <XCircle size={24} weight="bold" /> CANCELAR CONTAGEM
              </ButtonComponent>
            </div>
          )}
        </form>
      </main>
    </div>
  );
};
