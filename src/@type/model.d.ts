import { JSX, ReactNode, Dispatch, SetStateAction } from "react";
import { ReactSweetAlert } from "sweetalert2-react-content";

declare module "model" {
    export declare const MySwal: ReactSweetAlert;
    export declare let defaultStyle: { iconCenter: string, button: string };

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
    export declare const calculator: CalculatorData<T_Generic, D_Generic, A_Generic>;

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
}
