import { FC, ReactElement, SetStateAction, Dispatch, JSX } from "react";
import { MySwal } from "./Calculator";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { TbHttpDelete } from "react-icons/tb";

type str = string;
let count: number = 0;
let btnDefaultStyle: str = "w-[70px] h-[70px] text-center p-4 cursor-pointer text-center ease-in-out duration-300 mx-auto";

interface ButtonProps<T = str, D = boolean> {
  text: T | JSX.Element;
  value: T;
  style: T;
  isPoint?: D;
  isRoot?: D;
  isPI?: D;
  callback?: (x: number) => number;
  numbers: T;
  setNumbers: Dispatch<SetStateAction<T>>;
  setCompleted: Dispatch<SetStateAction<D>>;
  setResult: Dispatch<SetStateAction<T>>;
}

interface ButtonResultProps {
  text: string;
  style: string;
  calculate: () => void;
  setCompleted: Dispatch<SetStateAction<boolean>>;
}

interface ButtonDeleteAllProps {
  style: string;
  clearNumber: () => void;
}

interface ButtonDeleteProps<T = str> {
  style: T;
  numbers: T;
  setNumbers: Dispatch<SetStateAction<T>>;
  setCompleted: Dispatch<SetStateAction<boolean>>;
}

export const Button: FC<ButtonProps> = ({
  text,
  value,
  style,
  isPoint,
  isRoot,
  isPI,
  callback,
  numbers,
  setNumbers,
  setCompleted,
  setResult,
}): ReactElement => (
  <button
    className={`${btnDefaultStyle} ${style}`}
    onClick={(): void => {
      if (Object.values(numbers).includes(".") && isPoint && typeof isPoint !== "undefined") {
        MySwal.fire({
          title: "เกิดข้อผิดพลาดขึ้น",
          text: "ไม่สารามาถกดใช้ . เพิ่มได้",
          icon: "error",
          showConfirmButton: false,
          timer: 1800,
        })
      } else if (isRoot && typeof callback !== "undefined") {
        let result: number = callback(parseInt(numbers));
        if (isNaN(result)) {
          MySwal.fire({
            title: "เกิดข้อผิดพลาดขึ้น",
            text: "ไม่สารามาถหาค่าได้",
            icon: "error",
            showConfirmButton: false,
            timer: 1800,
          })
        } else {
          setResult(result.toString());
          setNumbers(result.toString());
          setCompleted(true);
        }
      } else if (isPI && count >= 1) {
        MySwal.fire({
          title: "เกิดข้อผิดพลาดขึ้น",
          text: "ไม่สารามาถกดใช้ค่า PI ซ้ำได้",
          icon: "error",
          showConfirmButton: false,
          timer: 1800,
        })
      } else {
        setNumbers((prevVal: string): string => `${prevVal + value}`);
        setCompleted(false);
        // เช็คว่ากดปุุ่ม PI ซ้ำไหม
        if (isPI && value === "3.14") ++count
        else if (numbers.length === 0) count = 0;
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
      count = 0;
    }}
  >
    {text}
  </button>
);

export const ButtonDeleteAll: FC<ButtonDeleteAllProps> = ({
  style,
  clearNumber,
}): ReactElement => (
  <button className={`${btnDefaultStyle} ${style}`} onClick={():void => {
    clearNumber()
    count = 0;
  }}>
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
    if (numbers.length > 0) {
      let num: string[] = [...numbers];
      num.pop();
      setNumbers(num.join(""));
      setCompleted(false);
    } else {
      count = 0;
    }
  };
  return (
    <button className={`${btnDefaultStyle} ${style} `} onClick={delDigit}>
      <RiDeleteBack2Fill className=" text-2xl mx-auto"/>
    </button>
  );
};
