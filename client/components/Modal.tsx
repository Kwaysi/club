export default function Modal({ control, close, children }) {
  return (
    <>
      <div
        className='modal-bg'
        style={{ display: control ? 'block' : 'none' }}
        onClick={() => close(false)}
      />
      <div
        className='modal-auth'
        style={{
          top: control ? '50%' : '-50%',
          opacity: control ? 1 : 0,
        }}
      >
        {children}
      </div>
    </>
  );
}
