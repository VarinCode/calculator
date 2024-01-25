import { JSX, ReactNode, Dispatch, SetStateAction } from "react";
import { TbMathPi, TbMath, TbHttpDelete } from "react-icons/tb";
import { RiDeleteBack2Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import withReactContent, { ReactSweetAlert } from "sweetalert2-react-content";
export const MySwal: ReactSweetAlert = withReactContent(Swal);

export let defaultStyle: { iconCenter: string; button: string } = {
  iconCenter: "mx-auto",
  button: "w-[70px] h-[70px] text-center p-4 cursor-pointer text-center ease-in-out duration-300",
};
export type Icon = { icon: JSX.Element };
export type NoReturn = () => void;
export type T_Generic = { text: string; value: string };
export type D_Generic = Icon & { value: number };
export type A_Generic = Icon & { root: (x: number) => number };

export default interface CalculatorData<
  T extends { text: string; value: string },
  D extends Icon & { value: number },
  A extends Icon & { root: (x: number) => number }
> {
  numbers: number[];
  mainOperators: T[];
  result: T;
  mod: T;
  power: T;
  point: T;
  PI: D;
  SQRT: A;
  DEL: Icon[];
}

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
    icon: <TbMath className={defaultStyle.iconCenter} />,
    root: (x: number): number => Math.sqrt(x),
  },
  PI: {
    icon: <TbMathPi className={defaultStyle.iconCenter}  />,
    value: Math.PI,
  },
  DEL: [
    {
      icon: <TbHttpDelete className={`${defaultStyle.iconCenter} text-4xl`}  />,
    },
    {
      icon: <RiDeleteBack2Fill className={`${defaultStyle.iconCenter} text-2xl`} />,
    },
  ],
};

export interface ContainerProps {
  children: ReactNode;
}
export interface ButtonProps<T = string, D = boolean> {
  text: T;
  value: T;
  style: T;
  setNumbers: Dispatch<SetStateAction<T>>;
  setCompleted: Dispatch<SetStateAction<D>>;
}
export interface ButtonOperatorProps<T = string, D = boolean> {
  text?: T;
  icon?: JSX.Element;
  value: T;
  style: T;
  isIcon?: D;
  isRoot?: D;
  callback?: (x: number) => number;
  numbers: T;
  setNumbers: Dispatch<SetStateAction<T>>;
  setCompleted: Dispatch<SetStateAction<D>>;
  setResult: Dispatch<SetStateAction<T>>;
}
export interface ButtonResultProps {
  text: string;
  calculate: NoReturn;
  setCompleted: Dispatch<SetStateAction<boolean>>;
}
export interface ButtonDeleteProps extends Icon {
  callback: NoReturn;
}

export interface Delete {
  clearAllNumber: NoReturn;
  digit: NoReturn;
}