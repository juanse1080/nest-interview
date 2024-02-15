import { composeStories } from '@storybook/testing-react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import Button from './button';
import defaultStory, * as stories from './button.stories';

const composedStories = composeStories(stories);

describe(`[${defaultStory.title}]`, () => {
  Object.entries(composedStories).forEach(([story, Component]) => {
    it(`should render ${story}`, () => {
      const { asFragment } = render(<Component />);
      expect(asFragment).toMatchSnapshot();
    });
  });
});

describe('Button', () => {
  it('Content', async () => {
    const name = 'hello world';

    render(<Button>{name}</Button>);
    const button = screen.getByRole('button', { name });

    expect(button).toHaveTextContent(name);
  });

  it('Click button', async () => {
    const name = 'hello world';
    const user = userEvent.setup();

    const onClick = jest.fn();
    render(<Button onClick={onClick}>{name}</Button>);

    const button = screen.getByRole('button', { name });
    await user.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it('Disabled button', async () => {
    const name = 'hello world';
    const user = userEvent.setup();

    const onClick = jest.fn();
    render(
      <Button onClick={onClick} disabled>
        {name}
      </Button>
    );

    const button = screen.getByRole('button', { name });
    await user.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });
});
