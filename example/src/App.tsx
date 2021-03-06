import React from 'react';
import {ImageTooltips, ImageTooltipsItem, ImageTooltipsTrigger} from "react-image-tooltips";
import "react-image-tooltips/dist/index.css";
import "./styles.scss";

function App() {
  const MyTrigger = (<ImageTooltipsTrigger className="my-trigger">
    +
  </ImageTooltipsTrigger>);

  return (
    <div className="App">
      <h1>React Image Tooltips Demo</h1>

      <ImageTooltips src="example.jpg" width={816} height={544} className="my-image" triggerEvent="click">
        <ImageTooltipsItem top={226} left={301} trigger={MyTrigger} className="my-item">
          <p>Here's some content that lies inside an tooltip.</p>
          <p>This content can only be viewed, once the tooltip is toggled.</p>
        </ImageTooltipsItem>
        <ImageTooltipsItem top={300} left={504} trigger={MyTrigger} className="my-item">
          <p>Here's some content that lies inside an tooltip.</p>
          <p>This content can only be viewed, once the tooltip is toggled.</p>
        </ImageTooltipsItem>
      </ImageTooltips>

      © <a href="https://github.com/krasnoshapka">krasnoshapka</a>
    </div>
  );
}

export default App;
