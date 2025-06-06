import './style.scss';

const Segments = ({ setActiveSegment, activeSegment }) => {
  return (
    <div className='segments'>
      <div
        onClick={() => setActiveSegment('consultant')}
        className={`segment ${activeSegment === 'consultant' ? 'active' : ''}`}
      >
        <span>Идеи</span>
      </div>
      <div
        className={`segment ${activeSegment === 'history' ? 'active' : ''}`}
        onClick={() => setActiveSegment('history')}
      >
        <span>Мои</span>
      </div>
    </div>
  );
};

export default Segments;
