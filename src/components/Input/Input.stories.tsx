import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Input from './Input';
import { MdOutlineMailOutline } from 'react-icons/md';
import { FiLock } from 'react-icons/fi';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { AiOutlineUser } from 'react-icons/ai';
import { RiSmartphoneLine } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';

const WarningText = styled.p`
  color: #e52528;
  font-size: 12px;
  line-height: 18px;
  margin: 9px 12px 0;
  padding: 0;
`;

const InputStories = {
  title: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>;

export default InputStories;

type Inputs = {
  email: string;
  passwordConfirm: string;
  name: string;
  number: string;
};

export const Id: ComponentStory<typeof Input> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: any) => console.log(data);
  return (
    <>
      <Input
        id="id"
        icon={<MdOutlineMailOutline />}
        placeholder="아이디(이메일)"
        {...register('email', {
          required: '이메일을 입력하세요.',
          pattern: {
            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            message: '이메일을 올바르게 입력해주세요.',
          },
        })}
        error={errors.email ? true : false}
        onBlur={handleSubmit(onSubmit)}
      ></Input>
      {errors.email && <WarningText>{errors.email.message}</WarningText>}
    </>
  );
};

// export const Id: ComponentStory<typeof Input> = () => (
//   <Input id="id" icon={<MdOutlineMailOutline />} placeholder="아이디(이메일)"></Input>
// );

// export const Password: ComponentStory<typeof Input> = () => (
//   <Input id="password" icon={<FiLock />} placeholder="비밀번호"></Input>
// );

// export const PasswordConfirm: ComponentStory<typeof Input> = () => (
//   <Input id="passwordConfirm" icon={<HiOutlineLockClosed />} placeholder="비밀번호 확인"></Input>
// );

export const Name: ComponentStory<typeof Input> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: any) => console.log(data);

  return (
    <>
      <Input
        id="name"
        icon={<AiOutlineUser />}
        placeholder="이름"
        {...register('name', {
          required: '이름을 정확히 입력하세요.',
          pattern: {
            value: /^[ㄱ-ㅎ|가-힣|a-z|A-Z]{2,}$/,
            message: '이름을 정확히 입력하세요.',
          },
        })}
        error={errors.email ? true : false}
        onBlur={handleSubmit(onSubmit)}
      ></Input>

      {errors.name && <WarningText>{errors.name.message}</WarningText>}
    </>
  );
};

export const Number: ComponentStory<typeof Input> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: any) => console.log(data);

  return (
    <>
      <Input
        id="number"
        icon={<MdOutlineMailOutline />}
        placeholder="휴대폰 번호"
        {...register('number', {
          required: '휴대폰 번호를 정확하게 입력하세요.',
          pattern: {
            value: /^01[0-9]{8,}$/,
            message: '휴대폰 번호를 정확하게 입력해주세요.',
          },
        })}
        error={errors.email ? true : false}
        onBlur={handleSubmit(onSubmit)}
      ></Input>

      {errors.number && <WarningText>{errors.number.message}</WarningText>}
    </>
  );
};
