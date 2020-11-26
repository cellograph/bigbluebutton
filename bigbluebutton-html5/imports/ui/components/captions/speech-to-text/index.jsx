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
    if (transcript.length > 250) {
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
    SpeechRecognition.startListening({ continuous: true });
    setBtnState(!btnState);
  };
  return (
    <>
      <button
        style={{ cursor: "pointer" }}
        onClick={() => SpeechRecognition.startListening({ continuous: true })}
      >
        Start
      </button>
      <button
        style={{ cursor: "pointer" }}
        onClick={() => SpeechRecognition.stopListening()}
      >
        Stop
      </button>
    </>
  );
};
