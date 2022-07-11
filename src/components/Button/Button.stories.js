import React from 'react';
import Button from './Button';

const ButtonStories = {
  title: 'Button',
  component: Button,
};

export default ButtonStories;

export const Primary = () => <Button variant="primary">Primary</Button>;
export const Default = () => <Button>Default</Button>;
