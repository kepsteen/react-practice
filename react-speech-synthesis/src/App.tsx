import { useState } from "react";
import "./App.css";

const voices = speechSynthesis.getVoices();

function App() {
  const [text, setText] = useState("");

  const synth = window.speechSynthesis;
  function handleSubmit(e: any) {
    const utterthis = new SpeechSynthesisUtterance(text);
    utterthis.voice = voices[0];
    console.log("utterthis", utterthis);
    synth.speak(utterthis);
    setText("");
  }
  return (
    <>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="text">
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}

export default App;
