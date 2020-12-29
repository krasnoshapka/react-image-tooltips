import * as React from 'react';
import {_ImageTooltipsItem, _ImageTooltipsItemProps} from '../ImageTooltipsItem';
import {fireEvent, render} from "@testing-library/react";

describe('<_ImageTooltipsItem />', () => {
  const defaultProps:_ImageTooltipsItemProps = {
    top: 226,
    left: 301,
    dataId: 1,
    imageSize: {
      initW: 816,
      initH: 544,
      curW: 816,
      curH: 544
    },
    toggle: false,
    parentHandleClick: jest.fn()
  }
  const defaultChild = (
    <p>Here's some content that lies inside an tooltip.</p>
  );

  it('renders correctly', () => {
    const container = render(
      <_ImageTooltipsItem {...defaultProps}>
        {defaultChild}
      </_ImageTooltipsItem>
    );
    expect(container).toMatchSnapshot();
  });

  it('appends passed classnames', () => {
    const {container} = render(
      <_ImageTooltipsItem {...defaultProps} className={"test-trigger"}>
        {defaultChild}
      </_ImageTooltipsItem>
    );

    expect(container.firstChild!.lastChild).toHaveClass('test-trigger');
  });

  it('calls parentHandleClick', () => {
    const {container} = render(
      <_ImageTooltipsItem {...defaultProps}>
        {defaultChild}
      </_ImageTooltipsItem>
    );

    expect(defaultProps.parentHandleClick).not.toBeCalled();

    fireEvent.click(container.firstChild!.firstChild!);

    expect(defaultProps.parentHandleClick).toBeCalled();
  });

  it('validates too big coordinates', () => {
    const {container} = render(
      <_ImageTooltipsItem {...defaultProps} top={1000} left={1000}>
        {defaultChild}
      </_ImageTooltipsItem>
    );

    expect(container.firstChild).toHaveStyle({
      top: '544px',
      left: '816px'
    });
  });

  it('validates too low coordinates', () => {
    const {container} = render(
      <_ImageTooltipsItem {...defaultProps} top={-1000} left={-1000}>
        {defaultChild}
      </_ImageTooltipsItem>
    );

    expect(container.firstChild).toHaveStyle({
      top: '1px',
      left: '1px'
    });
  });

  it('scales tooltip correctly', () => {
    // Scale to 50%
    defaultProps.imageSize.curW = 408;
    defaultProps.imageSize.curH = 272;
    const {container} = render(
      <_ImageTooltipsItem {...defaultProps}>
        {defaultChild}
      </_ImageTooltipsItem>
    );

    expect(container.firstChild).toHaveStyle({
      top: '113px',
      left: '151px'
    });
  });
});
