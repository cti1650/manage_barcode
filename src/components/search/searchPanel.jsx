import cc from 'classcat';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle,faTimes,faEdit,faFlag,faPlus,faTrash,faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const supabaseUrl = 'https://zpqdwrwmgualomsihngl.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMjk0NjQ0MCwiZXhwIjoxOTM4NTIyNDQwfQ.f7FXT6ZTRoQI4EOIxDf0v09HWChg8qktOC8yz8fAunQ';
const supabase = createClient(supabaseUrl, supabaseKey);

export function SearchPanel(props) {
  const [newPanelName, setNewPanelName] = useState('');
  return (
    <>
      <div className='fixed bottom-0 left-0 z-10 mt-8 px-3 py-1 flex flex-row w-full h-auto bg-white'>
        <input
          type="text"
          className='resize-none z-20 border rounded-lg w-full h-full p-1 h-20 focus:h-40'
          value={newPanelName}
          tabIndex={1}
          onChange={(e) => {
            setNewPanelName(e.target.value);
          }}
          onKeyUp={(e) => {
            if(!e.shiftKey && !e.ctrlKey && !e.altKey && e.key === 'Enter'){
              if (newPanelName) {
                supabase
                  .from('codes')
                  .insert([{ code: newPanelName }], { upsert: true })
                  .then(() => {
                    setNewPanelName('');
                  });
              }
            }
          }}
          cols={50}
          rows={1}
        />
        <button
          className='-ml-10 z-50 text-gray-400 border-none bg-while focus:outline-none focus:shadow-outline'
          tabIndex={2}
          onClick={(e) => {
            if (newPanelName) {
              supabase
                .from('codes')
                .insert([{ code: newPanelName }], { upsert: true })
                .then(() => {
                  setNewPanelName('');
                });
            }
          }}
        >
          <FontAwesomeIcon icon={faPaperPlane} className='w-6 h-6' />
        </button>
      </div>
    </>
  );
}