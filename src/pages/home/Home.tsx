import './Home.css'
import { LoginButton, GetStarted, DarkModeSwitch} from '../../components/buttons/Buttons'
import { TypingEffect } from '../../components/animations/Animations';
import React from 'react';

function Home() {
  
  return (
    <React.Fragment>
    <LoginButton></LoginButton>
    <TypingEffect></TypingEffect>
    <GetStarted></GetStarted>
    <DarkModeSwitch ></DarkModeSwitch>
    </React.Fragment>
  );
}

export default Home;
