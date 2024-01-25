import { FC, ReactElement } from "react";
import { MySwal } from "../model/model";
import {
  defaultStyle,
  ButtonProps,
  ButtonOperatorProps,
  ButtonResultProps,
  ButtonDeleteProps,
} from "../model/model";

export const Button: FC<ButtonProps> = ({
  text,
  value,
  style,
  setNumbers,
  setCompleted,
}): ReactElement => (
  <button
    className={`${defaultStyle.button} ${style}`}
    onClick={(): void => {
      setNumbers((prevVal: string): string => `${prevVal + value}`);
      setCompleted(false);
    }}
  >
    {text}
  </button>
);

export const ButtonOperator: FC<ButtonOperatorProps> = ({
  text,
  icon,
  value,
  style,
  isIcon,
  isRoot,
  callback,
  numbers,
  setNumbers,
  setCompleted,
  setResult,
}): ReactElement => {
  return (
    <button
      className={`${defaultStyle.button} ${style}`}
      onClick={(): void => {
        // สำหรับกดปุ่ม root
        if (isRoot && typeof callback !== "undefined") {
          let result: number = callback(parseInt(numbers));
          if (isNaN(result)) {
            MySwal.fire({
              title: "เกิดข้อผิดพลาดขึ้น",
              text: "ไม่สารามาถหาค่าได้",
              icon: "error",
              showConfirmButton: false,
              timer: 1800,
            });
          } else {
            setResult(result.toString());
            setNumbers(result.toString());
            setCompleted(true);
          }
        }
        // สำหรับกดปุ่มเครื่องหมายทั่วไป
        else {
          setNumbers((prevVal: string): string => `${prevVal + value}`);
          setCompleted(false);
        }
      }}
    >
      {isIcon && isIcon !== undefined ? icon : text}
    </button>
  );
};

export const ButtonResult: FC<ButtonResultProps> = ({
  text,
  calculate,
  setCompleted,
}): ReactElement => (
  <button
    className={`${defaultStyle.button} w-full font-bold bg-emerald-700 text-3xl text-slate-50 hover:bg-emerald-800`}
    onClick={(): void => {
      calculate();
      setCompleted(true);
    }}
  >
    {text}
  </button>
);

export const ButtonDelete: FC<ButtonDeleteProps> = ({
  icon,
  callback,
}): ReactElement => {
  return (
    <button
      className={`${defaultStyle.button} bg-red-600 hover:bg-red-700 hover:text-slate-50`}
      onClick={callback}
    >
      {icon}
    </button>
  );
};
