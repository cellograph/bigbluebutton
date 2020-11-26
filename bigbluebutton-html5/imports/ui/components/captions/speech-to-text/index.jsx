import "@babel/polyfill";
import React, { useContext, useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function CustomSpeechToTextCaption(props) {
  const { transcript, resetTranscript } = useSpeechRecognition();
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  useEffect(() => {
    if (transcript.length > 20) {
      resetTranscript();
    }
  }, [transcript]);

  return (
    <>
      <>{transcript}</>
    </>
  );
}

export default CustomSpeechToTextCaption;

export const CaptionButton = (props) => {
  const { transcript, resetTranscript } = useSpeechRecognition();

  const [btnState, setBtnState] = useState(false);
  const handleCaption = () => {
    console.log("clicked");
    setBtnState(!btnState);
  };
  return (
    <button style={{ cursor: "pointer" }} onClick={handleCaption}>
      {transcript}
      || {btnState ? "cc" : "c"}
    </button>
  );
};
