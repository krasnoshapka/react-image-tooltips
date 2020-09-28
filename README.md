# react-image-tooltips
React component that implements an image with tooltips. 
May be useful for creating interactive images which user can click/tap and see description of what is presented on the image. 

**[DEMO](https://github.com/krasnoshapka/react-image-tooltips)**

## Install

```bash
npm install --save react-image-tooltips
```

## Usage

```jsx
import React from 'react';
import {ImageTooltips, ImageTooltipsItem} from "react-image-tooltips";
import "react-image-tooltips/dist/index.css";

function App() {
  return (
    <div className="App">
        <h2>React Image Tooltips Demo</h2>

        <ImageTooltips src="example.jpg" width={816} height={544}>
            <ImageTooltipsItem top={226} left={301}>
                <p>Here's some content that lies inside an tooltip.</p>
                <p>This content can only be viewed, once the tooltip is toggled.</p>
            </ImageTooltipsItem>
            <ImageTooltipsItem top={300} left={504}>
                <p>Here's some content that lies inside an tooltip.</p>
                <p>This content can only be viewed, once the tooltip is toggled.</p>
            </ImageTooltipsItem>
        </ImageTooltips>

    </div>
  );
}

export default App;
```

## License

MIT © [krasnoshapka](https://github.com/krasnoshapka)