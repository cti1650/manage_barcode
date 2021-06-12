/*
import { FC } from "react";

type IProps = {
  onSubmit: any;
  buttonText: string;
  inputList: {
    name: string;
    ref: any;
    type: string;
  }[];
};
*/

// https://qiita.com/NozomuTsuruta/items/e730d037b679890e3d02

export const Form = ({ onSubmit, buttonText, inputList }) => {
  return (
    <form onSubmit={onSubmit}>
      {inputList.map((props) => (
        <label key={props.name}>
          <span>{props.name}</span>
          <input type={props.type} {...props.ref} />
        </label>
      ))}
      <button type="submit">{buttonText}</button>
    </form>
  );
};