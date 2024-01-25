import { useState, ReactElement } from "react";
import { Button, ButtonOperator, ButtonResult, ButtonDelete } from "./Button";
import { MySwal } from "../model/model";
import uuid from "react-uuid";

import CalculatorData, {
  calculator as getCalculator,
  T_Generic,
  D_Generic,
  A_Generic,
  Icon,
  NoReturn,
  Delete
} from "../model/model";

const Calculator = (): ReactElement => {
  const [data, setData] = useState<CalculatorData<T_Generic, D_Generic, A_Generic>>(getCalculator);
  const [numbers, setNumbers] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);

  const del: Delete = {
    clearAllNumber: (): void => {
      setCompleted(false);
      setResult("");
      setNumbers("");
    },
    digit: (): void => {
      let num: string[] = [...numbers];
      num.pop();
      setNumbers(num.join(""));
      setCompleted(false);
    },
  };

  const tupleFunc: [NoReturn, NoReturn] = [del.clearAllNumber, del.digit];

  const calculate = (): void => {
    try {
      const r: number = eval(numbers) as number;
      // console.log(r);
      if (isNaN(r)) {
        throw new Error("ไม่สามารถหาค่าได้");
      } else if (!isFinite(r)) {
        throw new Error("ไม่สามารถหารด้วย 0 ได้");
      } else {
        setResult(r.toString());
        setNumbers(r.toString());
      }
    } catch (e: any) {
      MySwal.fire({
        title: "เกิดข้อผิดพลาดขึ้น",
        text: e.message,
        icon: "error",
        showConfirmButton: false,
        timer: 1800,
      }).then((): void => {
        setData(getCalculator);
        del.clearAllNumber();
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-max w-[350px] bg-stone-950 shadow-2xl border-8 border-neutral-50 mb-20">
      <div className="flex items-center justify-end h-32 w-full p-4 bg-neutral-900 mb-8 text-end tracking-wide">
        <h1 className="text-4xl text-slate-50 text-end truncate ... cursor-default">
          {completed ? result : numbers === "" || !numbers ? 0 : numbers}
        </h1>
      </div>
      <div className="grid grid-cols-4 grid-rows-6 place-items-center gap-1 mt-4 p-4">
        {data.DEL.map((item: Icon, index: number) => (
          <ButtonDelete key={uuid()} icon={item.icon} callback={tupleFunc[index]} />
        ))}
        <ButtonOperator
          icon={data.PI.icon}
          isIcon={true}
          value={data.PI.value.toFixed(2)}
          style={"text-2xl text-black bg-sky-950 hover:bg-sky-900 hover:text-slate-50"}
          numbers={numbers}
          setNumbers={setNumbers}
          setCompleted={setCompleted}
          setResult={setResult}
        />
        <ButtonOperator
          icon={data.SQRT.icon}
          isIcon={true}
          value={""}
          style={"text-3xl text-black bg-sky-950 hover:bg-sky-900 hover:text-slate-50"}
          isRoot={true}
          callback={data.SQRT.root}
          numbers={numbers}
          setNumbers={setNumbers}
          setCompleted={setCompleted}
          setResult={setResult}
        />
        <div className="row-span-4 col-span-3 grid grid-rows-4 grid-cols-3 gap-1">
          {data.numbers.map(
            (item: number): ReactElement => (
              <Button
                key={uuid()}
                text={item.toString()}
                value={item.toString()}
                style={"text-center p-4 text-3xl text-slate-50 bg-gray-900 hover:bg-gray-950"}
                setNumbers={setNumbers}
                setCompleted={setCompleted}
              />
            )
          )}
          <Button
            text={data.point.text}
            value={data.point.value}
            style={"text-3xl text-black bg-sky-950 hover:bg-sky-900 hover:text-slate-50"}
            setNumbers={setNumbers}
            setCompleted={setCompleted}
          />
          <ButtonOperator
            text={data.mod.text}
            value={data.mod.value}
            style={
              "text-2xl text-black bg-sky-950 hover:bg-sky-900 hover:text-slate-50"
            }
            numbers={numbers}
            setNumbers={setNumbers}
            setCompleted={setCompleted}
            setResult={setResult}
          />
        </div>
        <div className="row-span-4 grid grid-rows-4 gap-1 place-items-center">
          {data.mainOperators.map(
            (item: T_Generic): ReactElement => (
              <ButtonOperator
                key={uuid()}
                text={item.text}
                value={item.value}
                style={"text-2xl text-black bg-blue-500 hover:bg-blue-800 hover:text-slate-50"}
                numbers={numbers}
                setNumbers={setNumbers}
                setCompleted={setCompleted}
                setResult={setResult}
              />
            )
          )}
        </div>
        <ButtonOperator
          text={data.power.text}
          value={data.power.value}
          style={"text-2xl text-black bg-sky-950 hover:bg-sky-900 hover:text-slate-50"}
          numbers={numbers}
          setNumbers={setNumbers}
          setCompleted={setCompleted}
          setResult={setResult}
        />
        <div className="w-full col-span-3 grid ">
          <ButtonResult
            text={data.result.text}
            calculate={calculate}
            setCompleted={setCompleted}
          />
        </div>
      </div>
    </div>
  );
};

export default Calculator;
