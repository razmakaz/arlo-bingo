import { useContext } from "react"
import { AppState } from "../../../App"
import { Button } from "../buttons/button";
import { Modal } from "./Modal";

export const IntroModal = () => {

  const [state, setState] = useContext(AppState);

  const HandleNeat = () => {
    setState({...state, showingIntroModal: false});
  }

  return (
    <Modal
      id={'intro-modal'}
      active={state.showingIntroModal}
      title={'Well, Hi! 👋'}
      allowDisable={true}
      actions={<>
        <Button onClick={HandleNeat} color="primary">Neat! 👍</Button>
      </>}
    >
      <h2><center>
        Welcome to Arlo's Nintendo 2022 E3 Bingo!
      </center></h2>
      <h3>What is this?</h3>
      <p>
        This is just... Bingo! Arlo made a few predictions about Nintendo's E3 Direct
        and I wanted to have a little fun and figured I'd share it with the community.
      </p><p>
        Of course, <b>you don't have to pay any money to play</b>. This is just for fun.
      </p>
      <h3>What are the rules?</h3>
      <p>
        The rules are pretty simple. When you load the page, your device will be assigned
        a random bingo card. Either:
      </p>
      <ul>
        <li>
          Watch Nintendo's E3 Direct (the rumors are that it's
          going to be Wednesday, June 15th, but currently, it's not confirmed) or;
        </li>
        <li>
          Watch Arlo's recap of the Direct when it comes out.
        </li>
      </ul>
      <p>
        When something comes up that's on your bingo card, click it on your card and
        it'll get "punched" and auto-save to your device so you don't lose any
        progress if you have to stop watching.
      </p>
      <h3>What if I can't watch the Nintendo Direct when it airs?</h3>
      <p>
        That's okay! The beauty of technology is that nothing has to be on time anymore.
      </p>
      <h3>I have questions, where can I get more info?</h3>
      <p>
        You can find more information about our tracking policy, who made this site,
        Arlo, the fundraiser, and more on the FAQ page.
      </p>
      <hr></hr>
      <p>
        Please remember that this is a game and the real winners are the charities
        that you donate to. They appreciate any and all of your help 💝.
      </p>
    </Modal>
  )
}