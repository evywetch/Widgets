/*
=>This component is going to be in charged of showing different sets of questtion and answer.
=> It will be a reusable component
=> this component decieds what set of questions and answers to show based on the props called "items" 
=> NOTE: We use React.fragment tag instead of <div> coz if we use <div> there, it turns out that the border top and bottom of question sets block, has 2 border lines, which does not look goed. It turns out like this coz semantic ui expects a very strict, very specific structure of each of these question set items. In particular, semantic ui is assuming that we are not adding in this extra <div>. If we put in this extra <div>, then Seamntic is going to accidentally apply a CSS rule that displays a second border. So we solve this problem by returning a React.Fragment instead, so it wont mess up Semantic UI and can supply "key" attribute.
=> React.Fragment -> is just a containing JSX element that React understands
=> NOTE: NOTE: onClick={() => onTitleClick(index)} Why do we call onTitleClick(index) in an arrow function? => Coz we want to call it a parameter. if we just write the code like this " onClick={onTitleClick(index)} "" then onTitleClick(index) will be invoke the instant(the moment) that this code is execucute, not when the user clicks the title og the question. But if we write code like this: " onClick={onTitleClick} "" onTitleClick function will be treated as a callback function which will be invoked only when the user cilcks. 
NOTE: 💚💚💚 About Hooks ===> We use useState() with this component
=> { useState } this is a Hooks that gives us access to "state" inside of a function component
=>  const [activeIndex, setActiveIndex] = refer to as an array destructuring. The idea behind the array destructuring is identical to Object destructuring. It's just a shortcut to get access to some elements inside of an array.
    Ex. Array destructuring
    const colors = ['red', 'yellow'];
    ### Normal way to get seperate array value
    const redColor = colors[0];
    const yellowColor = colors[1];
    #### Deconstructoring
    const [firstElement, secondElement] = colors;  
    *** firstElement = we want to get access to the 1st element of the array and assign it to a varialble called "firstElement" 
=> Whenever we call useState(null), we get back an array with exactly 2 elements inside of it.
    => The 1st argument of the array(activeIndex) coming back from calling useState(), is the piece of "state" that we are trying to keep track of. So this 1st argument is a reference to some variable or some value that is going to change over time.
    => The 2nd argument of the array(setActiveIndex) is a function that we call to update our piece of state. Anytime that we call this setActiveIndex() to update our piece of state, just like inside of a class based-component, it will cause our entire component to automatically rerender.
    => When we call useState(), it takes in 1 argument and that is going to be the default value for our piece of state which can be null, 0 or ""
    => We can change the name of variable inside the array to anything we want.
    => The piece of state, the setter and the initial value have direct parallels to the class-based component implementation of state

                            Didgram compare "state" in class-based VS function component

                        Class Component                             Function Component
Initialization      state={activeIndex: 0}              ----->          useState(0);    
Reference           this.state.activeIndex              ----->          activeIndex;
Update              this.setState({activeIndex: 10})    ----->          setActiveIndex(10);

    => NOTE: the one key thing that quite confusing between class components and function components when it comes to the state system, is that with a class components, we can very easily define and change multiple pieces of state at the same time.

                        Class Component                                     Function Component
Initialization     state={activeIndex: 0, term: ' '}   ----->      const [activeIndex, setActiveIndex] = useState(0)
                                                                   const [term, setTerm] = useState('');;  
Reference          this.state.activeIndex              ----->      activeIndex;
                   this.state.term                                 term;
Update             this.setState({activeIndex: 10, term: "hi"})    ----->   setActiveIndex(10);
                                                                            setTerm('search');

 */

import React, { useState } from 'react';

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Helper function
  const onTitleClick = (index) => {
    setActiveIndex(index);
  };

  // Helper function
  const renderedItems = items.map((item, index) => {
    /* 
    set active class to the title that user clicks, then the div of that question title will expand or shrink
    */
    const active = index === activeIndex ? 'active' : '';
    return (
      <React.Fragment key={item.title}>
        <div className={`title ${active}`} onClick={() => onTitleClick(index)}>
          <i className="dropdown icon"></i>
          {item.title}
        </div>
        <div className={`content ${active}`}>
          <p>{item.content}</p>
        </div>
      </React.Fragment>
    );
  });
  return <div className="ui styled accordion">{renderedItems}</div>;
};

export default Accordion;
