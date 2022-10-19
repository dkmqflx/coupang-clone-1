import { ComponentMeta, ComponentStory } from '@storybook/react';
import CheckBox from './CheckBox';

export default {
  title: 'CheckBox',
  component: CheckBox,
} as ComponentMeta<typeof CheckBox>;

export const agreementAll: ComponentStory<typeof CheckBox> = () => (
  <CheckBox
    text='모두 확인하였으며 동의합니다.'
    subText='동의에는 필수 및 선택 목적(광고성 정보 수신 포함)에 대한 동의가
포함되어 있으며, 선택 목적의 동의를 거부하시는 경우에도 서비스 이용이
가능합니다.'
    checked
  ></CheckBox>
);

export const nonDescription: ComponentStory<typeof CheckBox> = () => (
  <CheckBox text='[필수] 만 14세 이상입니다' checked={false}></CheckBox>
);

export const description: ComponentStory<typeof CheckBox> = () => (
  <CheckBox
    text='[선택] 광고성 정보 수신 동의'
    checked={false}
    description
  ></CheckBox>
);
