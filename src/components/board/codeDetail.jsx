import cc from 'classcat';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle,faTimes,faEdit,faFlag,faPlus,faTrash,faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const supabaseUrl = 'https://zpqdwrwmgualomsihngl.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMjk0NjQ0MCwiZXhwIjoxOTM4NTIyNDQwfQ.f7FXT6ZTRoQI4EOIxDf0v09HWChg8qktOC8yz8fAunQ';
const supabase = createClient(supabaseUrl, supabaseKey);

export function CodeDetail(props) {
  const { flg,item,onClick } = props;
  const [disp, setDisp] = useState(flg);
  return (
    <>
      {flg && (<div className='fixed bottom-0 left-0 z-20 w-full h-full bg-gray-600 bg-opacity-50'>
        <button
        className="fixed top-0 right-0 p-5 active:outline-none"
        onClick={(e) => {
          onClick(e);
        }}>✕</button>
        <div>{item.code}</div>
      </div>)}
    </>
  );
}