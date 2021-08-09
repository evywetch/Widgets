import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ label, options, selected, onSelectedChange }) => {
  const [textColor, setTextColor] = useState('red');
  // this state will track when the user clicks to toggle the dropdown
  const [open, setOpen] = useState(false);
  /*
  => Take this 'ref' and assign it to one of the element returning from Dropdown component.
  => In this case we assign 'ref' to the <div className="ui form">
  */
  const ref = useRef();
  // [] = We want this useEffect only runs 1 time when the component 1st rendered
  useEffect(() => {
    const onBodyClicked = (event) => {
      /*
   => After Dropdown component is rendered at the 1st time, we can get a reference to <div class="ui form"> by making use of ref.current.
   => "current" is a current property on a ref that is going to give us a reference to the <div class="ui form">
   => if (ref.current.contains(event.target)) == if the target that user clicked is inside the <div class="ui form">
   => NOTE: contains() belongs to all DOM elements
   => NOTE: If we dont add this if statement, it won't close dropdown when we click select something in the dropdown itself. It's becoz the event bubbling effect. Coz everytime we click at the dropdown form itself, the event here will be invoke first, and it setOpen = false, then the event in the dropdown is invoked which it will setOpen = open (the opposite value of the current value) That's why it won't close the dropdown after user clicks select an option.
   */
      if (ref.current.contains(event.target)) {
        return; // return this so it can close the dropdown when user clicks outside the dropdown form
      }
      setOpen(false); // setopen = false , then it will shrink the dropdown when user clicks on body
    };

    document.body.addEventListener('click', onBodyClicked, { capture: true });

    /*
    => This return function will be a cleanup function
    => It will remove the event listener from 'body' coz when this component is removed from the DOM, the ref is set to null and onBodyClicked uses ref in there, so we have to remove onBodyClicked if the component is removed from the DOM.
    => It will be called right b4 the next time this function is called
    => Another. scenerio, This return function will be invoked, whenever we r about to stop showing this entire component on the screen ❓❓❓❓❓❓ Why this clean up function gets invoked again when this Dropdown component gets removed from the screen❓❓❓❓❓❓
     */
    return () => {
      // onBodyClicked = the specific event listener we want to remove
      document.body.removeEventListener('click', onBodyClicked, {
        capture: true,
      });
    };
  }, []);
  const renderedOptions = options.map((option) => {
    // Dont show the option item in dropdown options if it is selected
    // return null in React == dont render anything
    if (option.value === selected.value) {
      return null;
    }
    return (
      <div
        key={option.value}
        className="item"
        onClick={() => {
          setTextColor(option.value);
          onSelectedChange(option);
        }}
      >
        {option.label}
      </div>
    );
  });
  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label">{label}</label>
        <div
          onClick={() => {
            setOpen(!open);
          }}
          className={`ui selection dropdown ${open ? 'visible active' : ''}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open ? 'visible transition' : ''}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
      <p style={{ color: `${textColor}` }}>
        This text is {textColor ? textColor : 'red'}
      </p>
    </div>
  );
};

export default Dropdown;

/*
NOTE: We have a challenging thing to do here. We want our dropdown to be able to detect the click outside of it. Means, we want the dropdown be able to open and close wherever the user clicks, even when outside the dropdown

What we got sofar:
=> The dropdown needs to detect a click event on any element besides one it created.
=> The dropdown has a hard time setting event handlers on elements that it does not create
=> Event Bubbling is a thing

How we solve this problem:
=> The dropdown can set up a manual event listener (without React) on the body element. 
=> A click on any element will bubble up to the body.
=> Ex. adding event listener (without React) on the body manually = document.body.addEventListener('click', () => console.log('click!!'));
NOTE: setOpen(!open); = toggle dropdown to open or close every time use clicks on the dropdown form

*/
