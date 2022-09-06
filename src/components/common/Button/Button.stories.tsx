import { ComponentMeta, ComponentStory } from "@storybook/react";

import Button from "./Button";

export default {
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>;

export const SignIn: ComponentStory<typeof Button> = () => (
  <Button primary>로그인</Button>
);

export const SignUp: ComponentStory<typeof Button> = () => (
  <Button>회원가입</Button>
);

export const AgreementSignUp: ComponentStory<typeof Button> = () => (
  <Button primary>동의하고 가입하기</Button>
);
