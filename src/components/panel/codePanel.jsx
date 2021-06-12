import cc from 'classcat';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle,faTimes,faEdit,faFlag,faPlus,faTrash,faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { CodeDetail } from '../board/codeDetail';
import { Modal } from '../panel/modal';
import { DammyPanel } from '../panel/dammy';

const supabaseUrl = 'https://zpqdwrwmgualomsihngl.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMjk0NjQ0MCwiZXhwIjoxOTM4NTIyNDQwfQ.f7FXT6ZTRoQI4EOIxDf0v09HWChg8qktOC8yz8fAunQ';
const supabase = createClient(supabaseUrl, supabaseKey);

const updateDB = async (code) =>{
  return await supabase
      .from('codes')
      .select('*')
      .eq('uid',supabase.auth.user().id)
      .eq('code',code)
      .order('createAt', { ascending: false });
}

export function Panel(props) {
  const { item } = props;
  const [flg,setflg] = useState(false);
  const [panelData, setPanelData] = useState([]);
  useEffect(async ()=>{
    let DB = await updateDB(item.code);
    setPanelData(DB.data);
  },[]);
  useEffect(()=>{
    supabase
      .from('codes')
      .on('*',async (data)=>{
        let DB = await updateDB(item.code);
        setPanelData(DB.data);
      })
      .subscribe();
  },[]);
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
            className='h-full z-50 px-4 text-gray-400 border-none bg-while focus:outline-none focus:shadow-outline'
            title='コードの読み取り履歴を表示する'
            tabIndex={2}
            onClick={(e) => {
              setflg(true);
            }}
          ><FontAwesomeIcon icon={faInfoCircle} className='w-6 h-6' /></button>
          <Modal
            flg={flg}
            onClick={(e) => {
              setflg(false);
            }}>
            <div className='py-2 items-center text-3xl'>{item.code}</div>
            <div className='w-full flex flex-col flex-wrap justify-items-center p-5'>
              {panelData.length === 0 ? (<DammyPanel />) :
                panelData.map(
                  (item) => (<div key={item.id}>{item.createAt}</div>)
                )}
            </div>
            <button
              className='mb-4 mt-auto px-8 py-2 border border-gray-500 bg-gray-300 hover:text-red-500 text-white rounded-full focus:outline-none'
              tabIndex={2}
              title='コードを削除する'
              onClick={(e) => {
                supabase
                  .from('codes')
                  .delete()
                  .eq('uid',supabase.auth.user().id)
                  .eq('code', item.code)
                  .then(()=>{
                    console.log('delete ' + item.id);
                  });
                  setflg(false);
              }}
            ><FontAwesomeIcon icon={faTrash} className='w-6 h-6' /></button>
          </Modal>
        </div>
      </div>
    </>
  );
}