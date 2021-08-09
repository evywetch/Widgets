// NOTE: to use the Hooks functions, have to import it like below
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  /* 
    => When the component first rendered, useEffect() will be call, which it will make a request to API with empty search term, and that causes an error, so we prevent it by prividing a default search term.
    */
  const [term, setTerm] = useState('programming');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  // store results that we extract from response from API, results = an array contains objects of wat we did query
  const [results, setResults] = useState([]);

  /*
  NOTE: To make use of "useEffect" inside of the component, we call useEffect() and provide a function as 1st argument. The KEY of useEffect() is that we have to configure it to tell it when we want our code to be executed, can choose 1 of 3 options. Configure it to tell it when we want the function in the 1st arguent to be executed.
  SUM:
  1st argument = the function we want to execute.
  2nd argument = when do we want the 1st argument to be executed, an array, can be nothing, an empty array or an array that has data in it.
    => [] = Run at initial render
    => ..nothing.. = Run at initial render AND Run after every rerender(rerender = the whole code in the component is executed)
    => [data] = Run at initial render AND un after every rerender if at least one data(datas provided in an array) has changed since last render(we can put more than 1 data in this array)
    NOTE: => 🔥🔥🔥🔥🔥🔥 We are not allowed to mark the function that are passing into useEffect() as "async" and use any "await" keyword directly inside that function
        => We have to use some alternative solutions, there 3 difeerent ways to make requests inside useEffect():
            => 1. Make an "async" function inside the function that are passing into useEffect(), and use this function to do API request. Like wat we do in the code.
    NOTE: The pair" key value " that we put in "params" object, will be our query string based on this standard URL: en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=SEARCHTERM
    NOTE: href={`https://en.wikipedia.org?curid=${result.pageid}`} is the link where to find that particular info in wikipedia site
    NOTE: 🔥🔥🔥 We make use of 2 useEffect to avoid the warning bcoz of using 2 pieces of state(term, results) in the same useEffect() and unecessary api request, see reason in section12, video 170

  */

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);

    /*
      NOTE: If the user continue typing the query b4 1 sec, the returned function will call clearTimeout() to cancel the setDebouncedTerm(term); then it wont make request to the API
       */
    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: debouncedTerm,
        },
      });
      // data.query.seach = an array contains objects of wat we did query for
      setResults(data.query.search);
    };
    search();
  }, [debouncedTerm]);

  const renderedResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            className="input"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          ></input>
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default Search;
