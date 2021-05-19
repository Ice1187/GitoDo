
/* TODO: need link api*/
export default function AddTitle() {
  let color = 'red';
  let prop = 'Branch';
  return (
    <>
      <div className='container shadow rounded-lg p-4 my-3 flex-row flex items-center cursor-default bg-white'>
        <div className={`sm:ml-5 h-4 w-0.5 bg-${color}-500 ring-2 ring-${color}-500`}></div>
        <span className='ml-5 font-semibold overflow-hidden'>{prop} name</span>
        <div className='flex-grow' />
        <input className='text-center sm:mr-10 mx-3 w-20 sm:w-32 md:w-80 bg-white border-gray-200 border-b-2 p-1 outline-none focus:outline-none hover:border-red-200 focus:border-red-500 cursor-auto focus:placeholder-transparent' placeholder='Type your title'></input>
      </div>
    </>
  )
}