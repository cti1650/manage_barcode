import cc from 'classcat';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle,faTimes,faEdit,faFlag,faWindowClose,faRemove,faPlus,faClose,faTrash,faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export function Modal(props) {
  const { flg,onClick,children } = props;
  return (
    <>
      {flg && (<div className='fixed bottom-0 left-0 z-20 w-full h-full px-5 py-5 sm:mx-auto bg-gray-600 bg-opacity-50'>
        <div className="fixed top-0 right-0"><button
        className='w-full h-full p-8 focus:outline-none'
        onClick={(e) => {
          onClick(e);
        }}><FontAwesomeIcon icon={faWindowClose} className='w-6 h-6' /></button></div>
        <div className='flex flex-col items-center w-full sm:w-2/3 h-full mx-auto bg-white'>
        {children}
        </div>
      </div>)}
    </>
  );
}