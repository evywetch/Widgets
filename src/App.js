// NOTE: to use the Hooks functions, have to import it like below
import React, { useState } from "react";
import Accordion from "./components/Accordion";
import Search from "./components/Search";
import Dropdown from "./components/Dropdown";
import Translate from "./components/Translate";
import Route from "./components/Route";
import Header from "./components/Header";
/*
=> We can either create "items", "options" array inside the component or outside of it. It does NOT MATTER coz this a static array that we are creating that is not going to change over time.
=> const items is for Accordian component, but we create it here coz we want to pass it as a prop to a child component (Accordian). In React, we pass a prop from parent to children
=> <Dropdown selected={selected} options={options} />  We pass down as a prop "selected" and "onSelectedChange" atributes, so whenever user changes the current setting inside the dropdown, whenever they click on the other options, we can tell our app component to update its selected piece of state
=>  const [selected, setSelected] ; we created it here coz we want it to be able to access "options"
*/
const items = [
  {
    title: "What is React?",
    content: "React is a front end Javascript framework",
  },
  {
    title: "Why use React?",
    content: "React is a favorite JS library among engineers",
  },
  {
    title: "How do you use React?",
    content: "You use React by creating components",
  },
];

const options = [
  {
    label: "The Color Red",
    value: "red",
  },
  {
    label: "The Color Green",
    value: "green",
  },
  {
    label: "A Shade of Blue",
    value: "blue",
  },
];

export default () => {
  /* 
                  Demonstrate if we want to toggle a Dropdown component
                  -----------------------------------------------------
  // Declare this state here coz it relates to options object which is declared here also
  const [selected, setSelected] = useState(options[0]);

  // This code is for toggling the visibility of the Dropdown component
 const [showDropdown, setShowDropdown] = useState(true);

  return (
    <div>
      <button onClick={() => setShowDropdown(!showDropdown)}>
        Toggle Dropdown
      </button>
      {showDropdown ? (
        <Dropdown
          selected={selected}
          onSelectedChange={setSelected}
          options={options}
        />
      ) : null}
    </div>
  );
  */

  const [selected, setSelected] = useState(options[0]);
  return (
    <div>
      <Header />
      <Route path="/">
        <Accordion items={items} />
      </Route>
      <Route path="/list">
        <Search />
      </Route>
      <Route path="/dropdown">
        <Dropdown
          label="Select a color"
          options={options}
          selected={selected}
          onSelectedChange={setSelected}
        />
      </Route>
      <Route path="/translate">
        <Translate />
      </Route>
    </div>
  );
};
