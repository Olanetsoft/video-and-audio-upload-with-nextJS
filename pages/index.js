import React, { useState } from "react";
import { Helmet } from "react-helmet";

const App = () => {
  const [videoPublicId, setVideoPublicId] = useState(null);
  const [alt, setAlt] = useState(null);
  const [audioPublicId, setAudioPublicId] = useState(null);

  const openWidget = () => {
    // create the widget
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "olanetsoft",
        uploadPreset: "w42epls6"
      },
      (error, result) => {
        if (result.event === "success") {
          console.log(result.info);
          if (result.info.is_audio === true) {
            setAudioPublicId(result.info.public_id);
            setAlt(`A file of ${result.info.original_filename}`);
          } else {
            setVideoPublicId(result.info.public_id);
            setAlt(`A file of ${result.info.original_filename}`);
          }
        }
      }
    );
    widget.open(); // open up the widget after creation
  };

  return (
    <div>
      <main className="App">
        <section className="left-side">
          <Helmet>
            <meta charSet="utf-8" />
            <script
              src="https://widget.Cloudinary.com/v2.0/global/all.js"
              type="text/javascript"
            ></script>
          </Helmet>
          <form>
            <button
              type="button"
              className="btn widget-btn"
              onClick={openWidget}
            >
              Upload Video
            </button>
            <button
              type="button"
              className="btn widget-btn"
              onClick={openWidget}
            >
              Upload Audio
            </button>
          </form>
        </section>
        <section className="right-side">
          <p>The resulting video with audio will be displayed here</p>

          {audioPublicId && (
            <>
              <video
                src={`https://res.cloudinary.com/olanetsoft/video/upload/l_video:${audioPublicId}/fl_layer_apply/${videoPublicId}.mp4`}
                alt={alt}
                controls
                autoPlay
              ></video>
            </>
          )}
        </section>
      </main>
    </div>
  );
};
export default App;
