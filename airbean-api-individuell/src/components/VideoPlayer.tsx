import { useState } from 'react';
import ReactPlayer from 'react-player';
import Loader from './Loader';

export default function VideoPlayer() {
  const [ready, setReady] = useState(false);

  return (
    <div className='w-full h-full absolute top-[-5px] left-0 pb-[7.6dvh]'>
      <ReactPlayer
        fallback={<Loader />}
        width={'100%'}
        height={'100%'}
        playing={ready}
        onReady={() => setReady(true)}
        muted={true}
        loop={true}
        url='https://res.cloudinary.com/dqx1ejydp/video/upload/f_auto:video,q_auto/v1/Airbean/uroit1e4erfjdosanndo'
      />
      {!ready && <Loader />}
    </div>
  );
}
