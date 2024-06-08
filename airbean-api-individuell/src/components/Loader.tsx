import ReactLoading from 'react-loading';
export default function Loader() {
  return (
    <div className='z-50 w-screen h-screen fixed top-0 left-0 flex items-center justify-center backdrop-blur-sm'>
      <ReactLoading
        type={'bubbles'}
        color={'#774936'}
        height={'50px'}
        width={'70px'}
      />
    </div>
  );
}
