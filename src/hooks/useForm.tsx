import { useState } from "react";

export interface IInputValues {
  [key: string]: string;
}

export interface IUseFormReturn {
  values: IInputValues;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setValues: React.Dispatch<React.SetStateAction<IInputValues>>;
}

export function useForm(inputValues: IInputValues): IUseFormReturn {
    const [values, setValues] = useState<IInputValues>(inputValues);
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const {value, name} = event.target;
      setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
  }