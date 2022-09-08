import { useRef } from "react";
import { useForm } from "react-hook-form";
import Button from "../../src/components/common/Button/Button";
import Input from "../../src/components/common/Input/Input";
import {
  MdOutlineEmail,
  MdLockOutline,
  MdLock,
  MdOutlineAccountCircle,
  MdOutlinePhoneIphone,
} from "react-icons/md";
import styled from "@emotion/styled";

type formType = {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phoenNumber: string;
};

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<formType>({
    mode: "onChange",
    criteriaMode: "all",
  });

  const password = useRef<string>();
  const email = useRef<string>();

  password.current = watch("password");
  email.current = watch("email");

  const onSubmit = ({
    email,
    password,
    passwordConfirm,
    name,
    phoenNumber,
  }: formType) => {
    console.log({ email, password, passwordConfirm, name, phoenNumber });
  };

  const getPasswordErrorMessage = () => {
    if (errors.password?.types?.passwordCheck !== true) {
      return "영문/숫자/특수문자 2가지 이상 조합 (8~20자)";
    }

    if (errors.password?.types?.compareEmail !== true) {
      return "아이디(이메일) 제외.";
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          {...register("email", {
            required: "이메일을 입력하세요.",
            pattern: {
              value: /^\S+@\S+\.[a-zA-Z]{2,3}$/i,
              message: "이메일을 올바르게 입력하세요.",
            },
          })}
          errorMessage={errors.email?.message}
          placeholder="아이디(이메일)"
          icon={MdOutlineEmail}
        />

        <Input
          type="password"
          {...register("password", {
            validate: {
              passwordCheck: (value) =>
                /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*.]{8,20}$/i.test(
                  value
                )
                  ? ""
                  : "영문/숫자/특수문자 2가지 이상 조합 (8~20자)",

              compareEmail: (value) =>
                email.current && value === email.current
                  ? "아이디(이메일) 제외."
                  : "",
            },
          })}
          errorMessage={errors.password && getPasswordErrorMessage()}
          placeholder="비밀번호"
          icon={MdLockOutline}
        />

        <Input
          type="password"
          {...register("passwordConfirm", {
            required: "확인을 위해 새 비밀번호를 다시 입력해주세요.",
            validate: (value) =>
              value !== password.current
                ? "새 비밀번호가 일치하지 않습니다."
                : "",
          })}
          errorMessage={errors.passwordConfirm?.message}
          placeholder="비밀번호 확인"
          icon={MdLock}
        />

        <Input
          {...register("name", {
            required: "이름을 정확히 입력하세요",
            pattern: {
              value: /[가-힣a-zA-Z]{2,}/i,
              message: "이름을 정확히 입력하세요.",
            },
          })}
          errorMessage={errors.name?.message}
          placeholder="이름"
          icon={MdOutlineAccountCircle}
        />

        <Input
          type="tel"
          {...register("phoenNumber", {
            required: "휴대폰 번호를 정확하게 입력하세요.",
            pattern: {
              value: /^\d{3}\d{3,4}\d{4}$/i,
              message: "휴대폰 번호를 정확하게 입력하세요.",
            },
          })}
          errorMessage={errors.phoenNumber?.message}
          placeholder="휴대폰 번호"
          icon={MdOutlinePhoneIphone}
        />
        <Button primary>동의하고 회원가입하기</Button>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
