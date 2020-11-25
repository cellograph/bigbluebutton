import React from "react";
import useMediaRecorder from "@wmik/use-media-recorder";

function Player({ srcBlob, audio }) {
  if (!srcBlob) {
    return null;
  }

  if (audio) {
    return <audio src={URL.createObjectURL(srcBlob)} controls />;
  }

  return (
    <video
      style={{ display: "none" }}
      src={URL.createObjectURL(srcBlob)}
      width={520}
      height={480}
      controls
    />
  );
}

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
    <article>
      <h1>Screen recorder</h1>
      {error ? `${status} ${error.message}` : status}
      <section>
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
          onClick={stopRecording}
          disabled={status !== "recording"}
        >
          Stop recording
        </button>
      </section>
      <Player srcBlob={mediaBlob} />
    </article>
  );
}

export default ScreenRecorderApp;
