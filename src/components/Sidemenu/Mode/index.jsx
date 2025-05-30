import { useState } from 'react';
import {
  setActiveAssistant,
  setChooseAssistant,
  toggleBurgerMenu,
} from '../../../store/Slice';
import Item from './Item';

import './style.scss';

const Mode = ({ dispatch, assistantsList }) => {
  const [selectedMode, setSelectedMode] = useState(0);

  const handleModeChange = (mode) => {
    setSelectedMode(mode.id);
    dispatch(setActiveAssistant(mode));
    dispatch(toggleBurgerMenu());
    dispatch(setChooseAssistant(false));
  };

  return (
    <form>
      {assistantsList.map((mode) => (
        <Item
          key={mode.id}
          mode={mode}
          selectedMode={selectedMode}
          handleModeChange={handleModeChange}
        />
      ))}
    </form>
  );
};

export default Mode;
