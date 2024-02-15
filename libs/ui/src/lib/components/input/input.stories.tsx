import type { Meta, StoryObj } from '@storybook/react';
import Input from './input';

const meta: Meta<typeof Input> = {
  title: 'Input',
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Basic: Story = {
  args: {
    name: 'basic',
    label: 'Basic',
    placeholder: 'Basic input',
  },
};

export const Required: Story = {
  args: {
    name: 'required',
    label: 'Required',
    placeholder: 'Required input',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    name: 'disabled',
    label: 'Disabled',
    placeholder: 'Disabled input',
    disabled: true,
  },
};

export const HelperText: Story = {
  args: {
    name: 'helperText',
    label: 'HelperText',
    helperText: 'HelperText input',
  },
};
