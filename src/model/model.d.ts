import { JSX, ReactNode, Dispatch, SetStateAction } from "react";
import { ReactSweetAlert } from "sweetalert2-react-content";
export declare const MySwal: ReactSweetAlert;

export default interface CalculatorData<
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
export type A_Generic = { icon: JSX.Element; root: (x: number) => number; };
export declare const calculator: CalculatorData<T_Generic, D_Generic, A_Generic>;

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

declare let btnDefaultStyle: number;
