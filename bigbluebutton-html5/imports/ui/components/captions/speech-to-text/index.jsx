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
    if (transcript.length > 200) {
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
  const handleStartCaption = () => {
    console.log("Started");
    SpeechRecognition.startListening({ continuous: true });
    setBtnState(!btnState);
  };

  const handleStopCaption = () => {
    console.log("Stopped");
    SpeechRecognition.stopListening();
    setBtnState(!btnState);
  };

  return (
    <>
      <button
        style={{ cursor: "pointer" }}
        onClick={() => handleStartCaption()}
        disabled={btnState === true ? true : false}
      >
        CC Start
      </button>

      <button
        disabled={btnState === false ? true : false}
        style={{ cursor: "pointer" }}
        onClick={() => handleStopCaption()}
      >
        CC Stop
      </button>
    </>
  );
};
