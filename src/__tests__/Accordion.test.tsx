import * as React from 'react';
import {render} from '@testing-library/react';
import {Accordion} from '../Accordion';

describe('<Accordion />', () => {
  it('renders correctly when open', () => {
    const {container} = render(
      <Accordion toggled={true}>
        <span>Accordion content</span>
      </Accordion>
    );

    expect(container).toMatchSnapshot();
  });

  it('renders correctly when closed', () => {
    const {container} = render(
      <Accordion toggled={false}>
        <span>Accordion content</span>
      </Accordion>
    );

    expect(container).toMatchSnapshot();
  });

  it('appends passed classnames', () => {
    const {container} = render(
      <Accordion className="test-accordion">Children</Accordion>
    );

    expect(container.firstChild).toHaveClass('test-accordion');
  });

  it('forwards extra props', () => {
    const {container} = render(
      <Accordion id="test-id">Children</Accordion>
    );

    expect(container.firstChild).toHaveAttribute('id', 'test-id');
  });

  it('should open', () => {
    const {container, rerender} = render(
      <Accordion toggled={false}>Children</Accordion>
    );

    rerender(<Accordion toggled={true}>Children</Accordion>);

    expect(container.firstChild).toHaveStyle({ height: 'auto' });
  });

  it('calls onFullyShown', () => {
    const onFullyShown = jest.fn();

    const {rerender} = render(
      <Accordion toggled={false} onFullyShown={onFullyShown}>
        Children
      </Accordion>
    );

    expect(onFullyShown).not.toBeCalled();

    rerender(
      <Accordion toggled={true} onFullyShown={onFullyShown}>
        Children
      </Accordion>
    );

    expect(onFullyShown).toBeCalled();
  });

  it('calls onFullyHidden', () => {
    const onFullyHidden = jest.fn();

    const {rerender} = render(
      <Accordion toggled={true} onFullyHidden={onFullyHidden}>
        Children
      </Accordion>
    );

    expect(onFullyHidden).not.toBeCalled();

    rerender(
      <Accordion toggled={false} onFullyHidden={onFullyHidden}>
        Children
      </Accordion>
    );

    expect(onFullyHidden).toBeCalled();
  });
});
