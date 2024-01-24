import { JSX, ReactNode, Dispatch, SetStateAction } from "react";
import { TbMathPi, TbMath } from "react-icons/tb";
import Swal from "sweetalert2";
import withReactContent, { ReactSweetAlert } from "sweetalert2-react-content";
export const MySwal: ReactSweetAlert = withReactContent(Swal);

export default interface CalculatorData<
  T extends { text: string; value: string },
  D extends { icon: JSX.Element; value: number },
  A extends { icon: JSX.Element; root: (x: number) => number }
> {
  numbers: number[];
  mainOperators: T[];
  result: T;
  mod: T;
  power: T;
  point: T;
  PI: D;
  SQRT: A;
}

export type T_Generic = { text: string; value: string };
export type D_Generic = { icon: JSX.Element; value: number };
export type A_Generic = { icon: JSX.Element; root: (x: number) => number };

export const calculator: CalculatorData<T_Generic, D_Generic, A_Generic> = {
  numbers: [7, 8, 9, 4, 5, 6, 1, 2, 3, 0],
  mainOperators: [
    {
      text: "+",
      value: "+",
    },
    {
      text: "-",
      value: "-",
    },
    {
      text: "x",
      value: "*",
    },
    {
      text: "/",
      value: "/",
    },
  ],
  result: {
    text: "=",
    value: "=",
  },
  mod: {
    text: "%",
    value: "%",
  },
  power: {
    text: "^",
    value: "**",
  },
  point: {
    text: ".",
    value: ".",
  },
  SQRT: {
    icon: <TbMath className="mx-auto" />,
    root: (x: number): number => Math.sqrt(x),
  },
  PI: {
    icon: <TbMathPi className="mx-auto" />,
    value: Math.PI,
  },
};

export interface ContainerProps {
  children: ReactNode;
}
export interface ButtonProps<T = string, D = boolean> {
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
export interface ButtonResultProps {
  text: string;
  style: string;
  calculate: () => void;
  setCompleted: Dispatch<SetStateAction<boolean>>;
}
export interface ButtonDeleteAllProps {
  style: string;
  clearNumber: () => void;
}
export interface ButtonDeleteProps<T = string> {
  style: T;
  numbers: T;
  setNumbers: Dispatch<SetStateAction<T>>;
  setCompleted: Dispatch<SetStateAction<boolean>>;
}

export let btnDefaultStyle: string =
  "w-[70px] h-[70px] text-center p-4 cursor-pointer text-center ease-in-out duration-300 mx-auto";
