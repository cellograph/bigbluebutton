import React, { createContext, useContext } from "react";
import "@babel/polyfill";
import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export const CustomCaptionContext = createContext();

const CustomCaptionProvider = (props) => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  return (
    <CustomCaptionContext.Provider value={SpeechRecognition}>
      {props.children}
    </CustomCaptionContext.Provider>
  );
};

export default CustomCaptionProvider;
