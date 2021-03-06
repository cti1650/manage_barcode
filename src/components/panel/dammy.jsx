export function DammyPanel(props) {
  return (
    <>
      <div className='mx-1 my-1 px-2 w-40 h-16 whitespace-pre-wrap focus:outline-none'>
        <div className="animate-pulse flex items-center h-full">
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    </>
  )
}