import { FC, ReactElement } from "react";
import { MySwal } from "../model/model";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { TbHttpDelete } from "react-icons/tb";
import {
  btnDefaultStyle,
  ButtonProps,
  ButtonResultProps,
  ButtonDeleteAllProps,
  ButtonDeleteProps,
} from "../model/model";

export const Button: FC<ButtonProps> = ({
  text,
  value,
  style,
  isRoot,
  callback,
  numbers,
  setNumbers,
  setCompleted,
  setResult,
}): ReactElement => (
  <button
    className={`${btnDefaultStyle} ${style}`}
    onClick={(): void => {
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
      } else {
        setNumbers((prevVal: string): string => `${prevVal + value}`);
        setCompleted(false);
      }
    }}
  >
    {text}
  </button>
);

export const ButtonResult: FC<ButtonResultProps> = ({
  text,
  style,
  calculate,
  setCompleted,
}): ReactElement => (
  <button
    className={`${btnDefaultStyle} ${style}`}
    onClick={(): void => {
      calculate();
      setCompleted(true);
    }}
  >
    {text}
  </button>
);

export const ButtonDeleteAll: FC<ButtonDeleteAllProps> = ({
  style,
  clearNumber,
}): ReactElement => (
  <button className={`${btnDefaultStyle} ${style}`} onClick={clearNumber}>
    <TbHttpDelete className="mx-auto text-4xl" />
  </button>
);

export const ButtonDelete: FC<ButtonDeleteProps> = ({
  style,
  numbers,
  setNumbers,
  setCompleted,
}): ReactElement => {
  const delDigit = (): void => {
    let num: string[] = [...numbers];
    num.pop();
    setNumbers(num.join(""));
    setCompleted(false);
  };
  return (
    <button className={`${btnDefaultStyle} ${style} `} onClick={delDigit}>
      <RiDeleteBack2Fill className=" text-2xl mx-auto" />
    </button>
  );
};
