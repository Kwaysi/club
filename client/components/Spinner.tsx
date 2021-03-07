type props = {
  size?: number;
  color?: string;
};

export default function Spinner({ size = 1, color }: props) {
  const sides = 16 * size;

  return (
    <div
      className='loadingio-spinner-rolling-9wecyn0eoed'
      style={{
        width: `${sides}px`,
        height: `${sides}px`,
      }}
    >
      <div className='ldio-36ci75x0fkp'>
        <div
          style={{
            borderColor: color,
            top: `${sides / 2}px`,
            left: `${sides / 2}px`,
            width: `${sides - 8}px`,
            height: `${sides - 8}px`,
            borderWidth: `${2 * size}px`,
          }}
        ></div>
      </div>
    </div>
  );
}
