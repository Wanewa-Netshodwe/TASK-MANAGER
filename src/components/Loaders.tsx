import React from 'react'

type Props = {}

export default function SingleLoaderList() {
    return (
      <div className='p-6 flex flex-wrap justify-center gap-10'>
        {[1, 2, 3, 4, 5, ].map(l => (
          <SingleLoader key={l} />
        ))}
      </div>
    );
  }
function SingleLoader(){
    return(
        <div className='relative'>
        <div className="bg-[#d6d5d7] w-full md:w-[280px] min-h-[150px] rounded-md overflow-hidden">
            <div className=" animate-pulse flex flex-wrap md:gap-3 h-11 bg-gray-400 justify-start items-center">
               
                
            </div>
            
        </div>
        <span className=' animate-pulse absolute -bottom-[12px] -left-2 bg-gray-400 text-white w-9  h-9 rounded-full p-2' ></span>

    </div>
    )
}