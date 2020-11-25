import React, { useEffect, useState } from "react";
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

  const [url, setUrl] = useState("");

  // useEffect(() => {
  //   let url = window.URL.createObjectURL(mediaBlob);
  //   console.log(url);
  //   Axios.post("https://bbb6.pressply.site/upload/bbb-record", {
  //     url,
  //     meetingId: props.meetingId,
  //   }).then((res) => {
  //     console.log(res);
  //     console.log(url);
  //   });

  //   return true;
  // }, [url]);

  const handleStopRecord = (e) => {
    stopRecording();
    setUrl("done");
    console.log(URL.createObjectURL(new Blob(mediaBlob)));
  };

  return (
    <div>
      {error ? `${status} ${error.message}` : status}
      <section>
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
      </section>
      {/* <Player srcBlob={mediaBlob} /> */}
    </div>
  );
}

export default ScreenRecorderApp;
