/*
=> Route component is the one that going to decide which component will be displyed or hinded on the screen.
=> This component is called in App.js
=> We only need to import React if we want to write JSX
=> { path, children } = props.path, props.children
=> props.children in this case is when place another component inside this component, that component will be counted as props.children

=> To make sure that anytime the onLocationChange() is called, we have to tell the Route component to update to update itself, or to just rerender itself. When it rerenders itself, we are going to fetch whatever the current path name is and use that to decide whether or not this Route component should now display its child or hide it.
=> We are going to create a piece of state that will follow or track the value of the window location path name(the current URL inside the URL bar). 
=> This piece of state has a sole purpose of trying to get the Route component to rerender itself. Its the only job of this piece of state, because we could otherwise just refer to the window location pathname to figure out what the current path name is.
*/

import { useEffect, useState } from 'react';

const Route = ({ path, children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  /*
  NOTE: On event handlers that we wire up manually inside of a component. Usually we only want to run that event handler 1 time or wire it up, kind of start listening one time, That's y we provide [] as a 2nd argument. So we only run useEffect() when this component is first rendered to the screen. 
  NOTE: Coz we provide [] as 2nd argument for useEffect(), means that: 
      => useEffect() will be called only when this component is rendered for the 1st time.
      => Every code in the 1st argument of useEffect() is run and return a cleanup function. (the code in this cleanup function won't be executed)
      => Until there is a change, the component rerenders, the return statement is invoked, but the useEffect() won't be called again.
   */
  useEffect(() => {
    /*
    NOTE: The reason why we defining this callback function as a separate variable? Coz if we ever decide to stop showing the Route component on the screen, we would want to make sure that we clean up this event listener (window.addEventListener()). So we gonna make sure that from this useEffect(), we return a cleanup(), and inside there we will remove window.addEventListener(). This way we can use this callback in other function too.
    */
    const onLocationChange = () => {
      // set the current URL that shows on the URL bar on the currentPath
      // This code will cause the Route component rerenders and decide to display or hide its child
      setCurrentPath(window.location.pathname);
    };
    // Listen if there is a URL change
    window.addEventListener('popstate', onLocationChange);

    // Return a cleanup() to clean up event listener when this component stop showing on the screen
    // If we dont' remove it, window.removeEventListener() will be called everytime user clicks new link
    return () => {
      window.removeEventListener('popState', onLocationChange);
    };
  }, []);
  return currentPath === path ? children : null;
};

export default Route;
