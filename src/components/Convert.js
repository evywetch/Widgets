import React, { useState, useEffect } from 'react';
import axios from 'axios';
/*
=> props = language, text
=> ({language, text}) is the destructuring from {language, text} = props
=> This component will make a request to API whenever it gets a language or text 
=> NOTE: We r sending a POST request, so we r not going to send anything along with the body. Instead we r going to send all of our data along as query string parameters. To do so, we have to provide a 3rd argument ( a 3rd object) to the axios.post(). We gonna leave the 2nd argument as empty object to sat that we dont want to send along any information in the body of the request. Instaed, we want to provide a 3rd argument to a 2nd object
=> Google translate API key  =  AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms - IwDlM;
=> NOTE: We use the "debounce" technique with this component, so that it only makes API request when the user finish typing 
                        text === ''                            debouncedText === ''
                (whenever user types a text)                        |                   
                            |                                       |
                        useEffect#1                              useEffect#2
                            |                                       |
    Set a timer to update 'debouncedText' in 500ms          Make a request with 'debouncedText'
                            |
If the user types in the text again, earlier than 500 ms
Return a cleanup function that cancles this function
*/

const Convert = ({ language, text }) => {
  const [translated, setTranslated] = useState('');
  const [debouncedText, setDebouncedText] = useState(text);
  // useEffect()#1 will be invoked again whenever the 'text' changes
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedText(text);
    }, 500);

    /*
    => This return statement = We want to cancle the setTimeout() if the piece of state 'text' changes before 500ms
    */
    return () => {
      clearTimeout(timerId);
    };
  }, [text]);

  /*
  => useEffect()#2 makes a request using 'debouncedText'
  => Use [language, debouncedText] as a 2nd argument of useEffect() means any time that a new language or a new piece of debouncedText, we will run the function in useEffect()
   */
  useEffect(() => {
    const doTranslation = async () => {
      // { data } = destructuring from response.data
      const { data } = await axios.post(
        'https://translation.googleapis.com/language/translate/v2',
        {},
        {
          params: {
            q: debouncedText,
            target: language.value,
            key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms - IwDlM',
          },
        }
      );
      /*
      1st data = the info inside of the Axios response
      2nd data= is the actual response data
       */

      setTranslated(data.data.translations[0].translatedText);
    };
    doTranslation();
  }, [language, debouncedText]);
  return (
    <div>
      <h1 className="ui header">{translated}</h1>
    </div>
  );
};

export default Convert;
