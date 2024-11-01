import WavesurferPlayer from '@wavesurfer/react'
import React,{useState} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
 

const App = ({audio}) => {
  const [wavesurfer, setWavesurfer] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const onReady = (ws) => {
    setWavesurfer(ws)
    setIsPlaying(false)
  }

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause()
  }

  return (
  
<div className='bg-green-500 p-2 items-center flex justify-center gap-3 w-[300px] rounded-md  h-[55px] '>
<button onClick={onPlayPause}>
        {isPlaying ? <FontAwesomeIcon className='text-[25px]' icon={faPause} /> : <FontAwesomeIcon className='text-[25px]' icon={faPlay} />}
      </button>
		<WavesurferPlayer
	  	barWidth={2}
	    
	  	width={290}
        height={37}
        waveColor="#ebebeb"
        url={audio}
        onReady={onReady}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
     
	</div>
     
    )
  
}
export default App