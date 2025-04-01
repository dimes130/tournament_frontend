import './Home.css'
import { LoginButton, GetStarted, DarkModeSwitch} from '../../components/buttons/Buttons'
import { TypingEffect } from '../../components/animations/Animations';

function Home() {

  return (
    <>

    <LoginButton></LoginButton>
    <TypingEffect></TypingEffect>
    <GetStarted></GetStarted>
    <DarkModeSwitch ></DarkModeSwitch>
    </>
  );
}

export default Home
