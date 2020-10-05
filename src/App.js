import React, { useState, useEffect }from 'react';
import './App.css';
import { FormControl,InputLabel,Input,FormHelperText } from '@material-ui/core';
import Message from "./Message.js";
import db from './Firebase.js'
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import Navbar from './Navbar.js'
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';


function App() {
  /*Use State = Temporarily storage */
  // State to accept Input
  const [input, setInput] = useState('');
  /*State to save messages*/
  const [messages, setMessages] = useState ([]);
  // State to save User Names
  const [username, setUsername] = useState('');

  // Block of code that get executed with a condition 
  useEffect(() => {
                    // Run code here
                    //  Meaning: If blank, this code runs once when the app(app.js)loads
                      setUsername  (prompt('Please enter your Name'));
                  }
                    , [/*Condition*/ ])
  
  // Create another useEffect that will fire to store information in the DB 
  useEffect(() => 
                        { 
                          // Read and output data from Firebase
                          db.collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot => 
                                                                            {                                       /*Sectioning it out to avoid reoading of the page*/
                                                                              setMessages(snapshot.docs.map(doc =>({ id:doc.id, message:doc.data()})))
                                                                            }
                                                               )
                                               
                        }
      ,[]);

  // Function to send message
  const sendMessage = (event) => 
            {
              // // Logic to where stored messages will be sent
              // setMessages([...messages, {username:username, message:input}]);
              // setInput('');
              // Pushing data to the database
              db.collection('messages').add({username:username,message:input, timestamp:firebase.firestore.FieldValue.serverTimestamp()})
              event.preventDefault();
              setInput('');
            }
  return (

    <div className="App">
      <Navbar/>
      {/* <img src="https://img.icons8.com/color/144/000000/facebook-messenger.png"/>
      <h1>Facebook Messenger clone🚀<br/><small>Created by Brian Kibet</small><span role='img'>😗📕</span></h1> */}
              <small><i> Welcome {username}</i></small> 
   {/* Input Form */}
      <form className="app__form">
      <FormControl className = "app__formControl">
        <Input className = "app__input" placeholder = 'Enter a message' value = {input} onChange = {event => setInput(event.target.value)} aria-describedby="my-helper-text" />
          <IconButton className="app__iconbutton" variant = "contained" color="primary" type="submit" onClick = {sendMessage} disabled= {!input}>
            <SendIcon/>
          </IconButton>
      </FormControl>
      </form>
          {/* <input /> <br/> */}
        {/* Message output */}
        
        <FlipMove>
            {messages.map (({id, message}) => {
              return (<Message key={id} username={username} message={message} />);
            }) }
        </FlipMove>
    </div>
  );
}

export default App;
