import { JSX } from "react";
import { TbMathPi, TbMath } from "react-icons/tb";

export default interface Data<
  T extends { text: string; value: string },
  D extends { icon: JSX.Element; value: number },
  A extends { icon: JSX.Element; root: (x: number) => number; }
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
export type A_Generic = { icon: JSX.Element; root: (x: number) => number;};

export const data: Data<T_Generic, D_Generic, A_Generic> = {
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
    root: (x: number): number => Math.sqrt(x)
  },
  PI: {
    icon: <TbMathPi className="mx-auto" />,
    value: Math.PI,
  }
};
