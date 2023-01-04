import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

const App: React.FC<{ inputValue: string, onInputChange: (value: string) => void, onSearchPressed: () => void }> = ({ inputValue, onInputChange, onSearchPressed}) => (
  <>
    <Search placeholder="input search text" enterButton="Search" size="large"
    value={inputValue} onChange={event => onInputChange(event.target.value)} onSearch={() => onSearchPressed()}/>
  </>
);

export default App;