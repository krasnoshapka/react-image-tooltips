# react-image-tooltips
[![NPM version](https://img.shields.io/npm/v/react-image-tooltips.svg)](https://www.npmjs.com/package/react-image-tooltips)
[![Minified size](https://badgen.net/bundlephobia/min/react-image-tooltips)](https://bundlephobia.com/result?p=react-image-tooltips)
[![Minified + gzip size](https://badgen.net/bundlephobia/minzip/react-image-tooltips)](https://bundlephobia.com/result?p=react-image-tooltips)

React component that implements an image with tooltips (hot spots). 
May be useful for creating interactive images which user can click/tap on and see description of what is presented on the image. 

**[DEMO](https://krasnoshapka.github.io/react-image-tooltips/)**

## Install
[react-spring](https://www.react-spring.io/) is used for accordion animation so it's peer dependency that should be installed with react-image-tooltips.

```bash
npm install --save react-spring react-image-tooltips
```

## Usage

```jsx
import {ImageTooltips, ImageTooltipsItem, ImageTooltipsTrigger} from "react-image-tooltips";
import "react-image-tooltips/dist/index.css";

// ...

    const MyTrigger = (<ImageTooltipsTrigger className="my-trigger">
        +
    </ImageTooltipsTrigger>);
    
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

```

## License

MIT © [krasnoshapka](https://github.com/krasnoshapka)