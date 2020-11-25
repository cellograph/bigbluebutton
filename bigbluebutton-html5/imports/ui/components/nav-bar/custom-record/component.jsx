import React from "react";
import useMediaRecorder from "@wmik/use-media-recorder";

function ScreenRecorderApp(props) {
  let {
    error,
    status,
    mediaBlob,
    stopRecording,
    getMediaStream,
    startRecording,
  } = useMediaRecorder({
    recordScreen: true,
    blobOptions: { type: "video/webm" },
    mediaStreamConstraints: { audio: true, video: true },
  });

  const handleStopRecord = (e) => {
    stopRecording();
    let url = URL.createObjectURL(mediaBlob);
    console.log(url);
    // Axios.post("https://bbb6.pressply.site/upload/bbb-record", {
    //   url,
    //   meetingId: props.meetingId,
    // }).then((res) => {
    //   console.log(res);
    //   console.log(url);
    // });
  };

  return (
    <div>
      {error ? `${status} ${error.message}` : status}

      <button
        type="button"
        onClick={getMediaStream}
        disabled={status === "ready"}
      >
        Share screen
      </button>
      <button
        type="button"
        onClick={startRecording}
        disabled={status === "recording"}
      >
        Start recording
      </button>
      <button
        type="button"
        onClick={(e) => handleStopRecord(e)}
        disabled={status !== "recording"}
      >
        Stop recording
      </button>
    </div>
  );
}

export default ScreenRecorderApp;
