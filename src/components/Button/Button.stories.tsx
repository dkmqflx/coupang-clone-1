import React from 'react';
import Button from './Button';
import { ComponentStory, ComponentMeta } from '@storybook/react';

const ButtonStories = {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

export default ButtonStories;

export const Primary: ComponentStory<typeof Button> = () => <Button primary>Primary</Button>;
export const Default: ComponentStory<typeof Button> = () => <Button>Default</Button>;
