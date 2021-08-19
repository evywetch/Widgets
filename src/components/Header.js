/*
=> This component is called in App.js
 */

import React from 'react';
import Link from './Link';
/*
 NOTE: href="/" specifies the URL of the page that the like goes to
 */
const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link href="/" className="item">
        Accordion
      </Link>
      <Link href="/list" className="item">
        Search
      </Link>
      <Link href="/dropdown" className="item">
        Dropdown
      </Link>
      <Link href="/translate" className="item">
        Translate
      </Link>
    </div>
  );
};

export default Header;
