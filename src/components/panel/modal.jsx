import cc from 'classcat';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle,faTimes,faEdit,faFlag,faWindowClose,faRemove,faPlus,faClose,faTrash,faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export function Modal(props) {
  const { flg,onClick,children } = props;
  return (
    <>
      {flg && (<div className='fixed top-0 left-0 z-30 w-full h-full bg-gray-600 bg-opacity-50'>
        <div className='grid grid-cols-6 h-full'>
          <div className='col-start-1'>
            <button
              className='w-full h-full text-right focus:outline-none'
              onClick={(e) => {
                onClick(e);
            }}>
            </button>
          </div>
          <div className='col-start-2 col-span-4 py-4'>
            <div className='flex flex-col z-30 items-center w-full h-full bg-white'>
              {children}
            </div>
          </div>
          <div className='col-start-6'>
            <button
              className='w-full h-full text-right focus:outline-none'
              onClick={(e) => {
                onClick(e);
            }}>
            </button>
          </div>
        </div>
      </div>)}
    </>
  );
}