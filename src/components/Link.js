/*
=> This component is called in Header.js
=> When user clicks on the Link, it will build a Nevigation Event. It's going to be an object that is going to communicate to the rest of our application that the URL has just changed. The navigation event will then be sent off to all of the different Route components inside the app. When these Route components recieve the navigation event, they r going to know that the URL has just changed. They will then take a look at the updated URL and decide whether or not they should show their respective child components
=> NOTE: {children} in this case means the text that put inside the Link component
 */

import React from 'react';

const Link = ({ className, href, children }) => {
  // Helper function
  const onClick = (event) => {
    /* 
    =>This will enable Command click to open a window in new tab
     =>metaKey == for MacOS, ctrlKey == for windows
     => if event.metaKey || event.ctrlKey is true, we dont want to run the rest of the code in onClick(), instaed, we want the browser to do its normal thing, which is to open up a new tab and navigate to the href on this link
     */
    if (event.metaKey || event.ctrlKey) {
      return;
    }
    // This will stop the full page reload
    event.preventDefault();
    // Make sure that the URL will change correctly after we click the link
    // It will update the URL on the URL bar everytime we click the link
    window.history.pushState({}, '', href);

    /*
    This is going to communicate over to the Route component that the URL has just changed. Then the Route can listen to it.
    */
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };
  return (
    <a onClick={onClick} className={className} href={href}>
      {children}
    </a>
  );
};

export default Link;
