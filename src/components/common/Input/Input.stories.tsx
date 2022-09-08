import { ComponentMeta, ComponentStory } from "@storybook/react";
import Input from "./Input";
import {
  MdOutlineEmail,
  MdLockOutline,
  MdLock,
  MdOutlineAccountCircle,
  MdOutlinePhoneIphone,
} from "react-icons/md";

export default {
  title: "Input",
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Id = Template.bind({});

Id.args = {
  placeholder: "아이디(이메일)",
  icon: MdOutlineEmail,
};

export const Password = Template.bind({});

Password.args = {
  placeholder: "비밀번호",
  icon: MdLockOutline,
};

export const PasswordConfirm = Template.bind({});

PasswordConfirm.args = {
  placeholder: "비밀번호 확인",
  icon: MdLock,
};

export const Name = Template.bind({});

Name.args = {
  placeholder: "이름",
  icon: MdOutlineAccountCircle,
};

export const PhoneNumber = Template.bind({});

PhoneNumber.args = {
  placeholder: "휴대폰 번호",
  icon: MdOutlinePhoneIphone,
};
