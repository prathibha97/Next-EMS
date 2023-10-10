'use client'
import { Triangle } from 'react-loader-spinner';

function Loader() {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black bg-opacity-50'>
      <Triangle
        color='#1DB3AB'
        width='100'
        visible
        ariaLabel='triangle-loading'
      />
    </div>
  );
}

export default Loader;