import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
type Prop ={
    iconName:IconProp
}

const MyIcon = ({iconName}:Prop) => {
  return <div className=' bg-background rounded-tl-md rounded-bl-md flex w-fit p-2 border-2  text-gray-200 border-gray-600'><FontAwesomeIcon  className='text-[10px]' icon={iconName} /></div> ;
};

export default MyIcon;