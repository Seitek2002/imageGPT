const Item = ({ mode, selectedMode, handleModeChange }) => {
  return (
    <label
      onClick={() => handleModeChange(mode)}
      className={`modes__mode mode ${selectedMode === mode.id ? 'active' : ''}`}
    >
      <div className='mode-radio'>
        <img src={mode.photo} alt='' />
      </div>
      <div className='mode-detail'>
        <h3>{mode.name}</h3>
        <p>{mode.description}</p>
      </div>
    </label>
  );
};

export default Item;
