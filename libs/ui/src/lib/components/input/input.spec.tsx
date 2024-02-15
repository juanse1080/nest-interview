import { composeStories } from '@storybook/testing-react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from './input';
import defaultStory, * as stories from './input.stories';

const composedStories = composeStories(stories);

describe(`[${defaultStory.title}]`, () => {
  Object.entries(composedStories).forEach(([story, Component]) => {
    it(`should render ${story}`, () => {
      const { asFragment } = render(<Component />);
      expect(asFragment).toMatchSnapshot();
    });
  });
});

describe('Input', () => {
  it('Content', async () => {
    const name = 'name';
    const label = 'label';
    const placeholder = 'placeholder';
    const helperText = 'helper text';

    render(
      <Input
        name={name}
        label={label}
        placeholder={placeholder}
        helperText={helperText}
      />
    );

    const inputComponent = screen.getByRole('textbox');
    expect(inputComponent).toHaveAttribute('name', name);
    expect(inputComponent).toHaveAttribute('placeholder', placeholder);
  });

  it('Enter value', async () => {
    const value = 'hello world';
    const placeholder = 'placeholder';
    const user = userEvent.setup();

    const handleChange = jest.fn();
    render(<Input placeholder={placeholder} onChange={handleChange} />);

    const input = screen.getByPlaceholderText(placeholder);
    await user.type(input, value);

    expect(handleChange).toHaveBeenCalled();
  });

  it('Enter value, when input is disabled', async () => {
    const value = 'hello world';
    const placeholder = 'placeholder';
    const user = userEvent.setup();

    const handleChange = jest.fn();
    render(
      <Input placeholder={placeholder} onChange={handleChange} disabled />
    );

    const input = screen.getByPlaceholderText(placeholder);
    await user.type(input, value);

    expect(input).not.toHaveValue(value);
    expect(handleChange).not.toHaveBeenCalled();
  });
});
