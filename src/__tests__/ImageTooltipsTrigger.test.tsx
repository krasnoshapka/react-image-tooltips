import * as React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {ImageTooltipsTrigger} from '../ImageTooltipsTrigger';

describe('<ImageTooltipsTrigger />', () => {
  it('renders correctly', () => {
    const {container} = render(
      <ImageTooltipsTrigger className="test-trigger">+</ImageTooltipsTrigger>
    );

    expect(container).toMatchSnapshot();
  });

  it('appends passed classnames', () => {
    const {container} = render(
      <ImageTooltipsTrigger className="test-trigger">+</ImageTooltipsTrigger>
    );

    expect(container.firstChild).toHaveClass('test-trigger');
  });

  it('forwards extra props', () => {
    const {container} = render(
      <ImageTooltipsTrigger id="test-id">+</ImageTooltipsTrigger>
    );

    expect(container.firstChild).toHaveAttribute('id', 'test-id');
  });

  it('calls handleClick', () => {
    const handleClick = jest.fn();

    const {container} = render(
      <ImageTooltipsTrigger handleClick={handleClick}>+</ImageTooltipsTrigger>
    );

    expect(handleClick).not.toBeCalled();

    fireEvent.click(container.firstChild!);

    expect(handleClick).toBeCalled();
  });

});