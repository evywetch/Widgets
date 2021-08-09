import React, { useState } from 'react';
import Dropdown from './Dropdown';
import Convert from './Convert';

/*
=> This component will provide some options to the Dropdown, and also gonna provide the currently selected item and a callback to change the currently selected
=> The Dropdown component expects to recieve the props with the specific names as defined in Dropdown's parameters. That's why we do <Dropdown selected={language} onSelectedChange={setLanguage}/>

*/

const options = [
  {
    label: 'Africaans',
    value: 'af',
  },
  {
    label: 'Arabic',
    value: 'ar',
  },
  {
    label: 'Hindi',
    value: 'hi',
  },
  {
    label: 'Dutch',
    value: 'nl',
  },
];

const Translate = () => {
  const [language, setLanguage] = useState(options[0]);
  const [text, setText] = useState('');
  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Text</label>
          <input value={text} onChange={(e) => setText(e.target.value)}></input>
        </div>
      </div>
      <Dropdown
        label="Select a language"
        selected={language}
        onSelectedChange={setLanguage}
        options={options}
      />
      <hr />
      <h3 className="ui header">Output</h3>
      <Convert text={text} language={language} />
    </div>
  );
};

export default Translate;
