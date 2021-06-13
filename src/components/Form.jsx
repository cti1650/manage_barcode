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

export const Form = ({ onSubmit, buttonText, inputList , children }) => {
  return (
    <section className="text-gray-600 body-font">
      <form onSubmit={onSubmit}
        className='flex flex-col'>
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-2/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-gray-900">バーコード管理</h1>
          <p className="leading-relaxed mt-4">手間な棚卸作業をお手伝いします！</p>
        </div>
        <div className="lg:w-3/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
          {inputList.map((props) => (
          <div className="relative mb-4">
            <label for="full-name" className="leading-7 text-sm text-gray-600">{props.name}</label>
            <input type={props.type} {...props.ref} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          ))}
          <button  type="submit" className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">{buttonText}</button>
          <p className="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them jean shorts.</p>
          {children && (
            <div className='relative mb-4'>{children}</div>
          )}
        </div>
      </div>
      </form>
    </section>
  );
};