import Head from 'next/head';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle,faTimes,faEdit,faFlag,faPlus,faTrash,faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Panel } from '../src/components/panel/codePanel';
import { SearchPanel } from '../src/components/search/searchPanel';
import { DammyPanel } from '../src/components/panel/dammy';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zpqdwrwmgualomsihngl.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMjk0NjQ0MCwiZXhwIjoxOTM4NTIyNDQwfQ.f7FXT6ZTRoQI4EOIxDf0v09HWChg8qktOC8yz8fAunQ';
const supabase = createClient(supabaseUrl, supabaseKey);

const updateDB = async () =>{
  return await supabase
      .from('codes')
      .select('*')
      .order('createAt', { ascending: false });
}

export default function Home2() {
  const [panelData, setPanelData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  useEffect(async ()=>{
    let DB = await updateDB();
    let codeList = [];
    setPanelData(DB.data.filter(item=>{
      if(~codeList.indexOf(item.code)){
        return false;
      }else{
        codeList = [...codeList,item.code];
        return true;
      }
    }));
  },[]);
  useEffect(()=>{
    supabase
      .from('codes')
      .on('*',async (data)=>{
        let DB = await updateDB();
        let codeList = [];
        setPanelData(DB.data.filter(item=>{
          if(~codeList.indexOf(item.code)){
            return false;
          }else{
            codeList = [...codeList,item.code];
            return true;
          }
        }));
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
      <main className='container max-w-4xl px-8 pb-16 sm:mx-auto flex flex-col'>
        <div className='text-2xl text-bold mt-4'>該当：{panelData.length} 個<a href="https://support.ubiregi.com/archives/8171" className='text-xs text-gray-400'>(バーコードリーダーMS910の設定方法)</a></div>
        <div className='w-full flex flex-row flex-wrap justify-items-center'>
          {panelData.length === 0 ? (<DammyPanel />) :
            panelData.map(
              (item) => (<Panel key={item.id} item={item}></Panel>)
            )}
        </div>
        <SearchPanel></SearchPanel>
      </main>
    </div>
  );
}
