import cc from 'classcat';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle,faTimes,faEdit,faFlag,faPlus,faTrash } from '@fortawesome/free-solid-svg-icons';
import { CodeDetail } from '../board/codeDetail';

const supabaseUrl = 'https://zpqdwrwmgualomsihngl.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMjk0NjQ0MCwiZXhwIjoxOTM4NTIyNDQwfQ.f7FXT6ZTRoQI4EOIxDf0v09HWChg8qktOC8yz8fAunQ';
const supabase = createClient(supabaseUrl, supabaseKey);

export function Panel(props) {
  const { item } = props;
  const [flg,setflg] = useState(false);
  return (
    <>
      <div className='w-full flex flex-row' key={item.code + item.createAt}>
        <div className='flex flex-col flex-wrap w-auto mr-auto'>
          <div className='text-gray-400 text-xs'>{item.createAt}</div>
          <div className='pl-4 text-lg'>{item.code}</div>
          <div className='pl-4'>{item.comment}</div>
        </div>
        <div className='h-full mr-0 my-auto'>
          <button
            className='h-full z-50 text-gray-400 border-none bg-while focus:outline-none focus:shadow-outline'
            tabIndex={2}
            onClick={(e) => {
              supabase
                .from('codes')
                .delete()
                .eq('code', item.code)
                .then(()=>{
                  console.log('delete ' + item.id);
                });
            }}
          >削除</button>
          <button
            className='h-full z-50 px-4 text-gray-400 border-none bg-while focus:outline-none focus:shadow-outline'
            tabIndex={2}
            onClick={(e) => {
              setflg(true);
            }}
          >情報</button>
          <CodeDetail
            item={item}
            flg={flg}
            onClick={(e) => {
              setflg(false);
            }}></CodeDetail>
        </div>
      </div>
    </>
  );
}