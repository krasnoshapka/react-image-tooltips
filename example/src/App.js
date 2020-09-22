import React from 'react';
import {ImageTooltips, ImageTooltipsItem} from "react-image-tooltips";

function App() {
  return (
    <div className="App">
        <h2>React Image Tooltips Demo</h2>
        <ImageTooltips src="example.jpg"
            width={848} height={389}>
            <ImageTooltipsItem top={301} left={226}>
                <div>Test item</div>
            </ImageTooltipsItem>
        </ImageTooltips>
    </div>
  );
}

export default App;
