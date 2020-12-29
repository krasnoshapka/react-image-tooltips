import * as React from 'react';
import {ImageTooltips} from '../ImageTooltips';
import {render} from '@testing-library/react';

describe('<ImageTooltips />', () => {
  const defaultProps = {
    src: 'example.jpg',
    width: 816,
    height: 544
  };

  it('renders correctly', () => {
    const {container} = render(
      <ImageTooltips {...defaultProps}>
      </ImageTooltips>
    );

    expect(container).toMatchSnapshot();
  });

  it('forwards extra props', () => {
    const {getByRole} = render(
      <ImageTooltips {...defaultProps} id="test-id">
      </ImageTooltips>
    );

    expect(getByRole('img')).toHaveAttribute('id', 'test-id');
  });

  it('component with image renders', () => {
    const {getByRole} = render(
      <ImageTooltips {...defaultProps}>
      </ImageTooltips>
    );

    expect(getByRole('img')).toBeTruthy();
  });
});