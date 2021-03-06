import Head from 'next/head';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle,faTimes,faEdit,faFlag,faPlus,faTrash,faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Panel } from '../src/components/panel/default';
import { DammyPanel } from '../src/components/panel/dammy';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zpqdwrwmgualomsihngl.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMjk0NjQ0MCwiZXhwIjoxOTM4NTIyNDQwfQ.f7FXT6ZTRoQI4EOIxDf0v09HWChg8qktOC8yz8fAunQ';
const supabase = createClient(supabaseUrl, supabaseKey);

const updateDB = async () =>{
  return await supabase
      .from('codes')
      .select('code,lastat:max("createAt")');
}

export default function ListsPage() {
  const [panelData, setPanelData] = useState([]);
  const [newPanelName, setNewPanelName] = useState('');
  const [editMode, setEditMode] = useState(false);
  useEffect(async ()=>{
    let DB = await updateDB();
    setPanelData(DB.data);
  },[]);
  useEffect(()=>{
    supabase
      .from('codes')
      .select('code,lastat:max(createAt)')
      .on('*',async (data)=>{
        let DB = await updateDB();
        setPanelData(DB.data);
      })
      .subscribe();
  },[]);
  return (
    <div className='w-full'>
      <Head>
        <title>バーコード管理</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='relative w-full bg-gray-50'>
        <h1
          className='text-center text-2xl font-bold md:text-6xl pt-2 md:py-4 text-gray-800'
        >
          バーコード管理
        </h1>
      </div>
      <main className='container max-w-4xl px-8 sm:mx-auto flex flex-col'>
        <div className='text-2xl text-bold mt-4'>一覧</div>
        <div className='w-full flex flex-row flex-wrap justify-items-center'>
          {panelData.length === 0 ? (<DammyPanel />) :
            panelData.map(
              (item) =>(
                  <div className='w-full flex flex-row' key={item.code + item.lastat}>
                    <div className='flex flex-col flex-wrap w-auto mr-auto'>
                      <div className='text-gray-400 text-xs'>{item.lastat}</div>
                      <div className='pl-4 text-lg'>{item.code}</div>
                    </div>
                    <div className='h-full mr-0 my-auto'>
                    </div>
                  </div>
                )
            )}
        </div>
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
      </main>
    </div>
  );
}
