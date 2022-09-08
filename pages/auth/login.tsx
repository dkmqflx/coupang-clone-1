import Link from "next/link";
import { useForm } from "react-hook-form";
import Button from "../../src/components/common/Button/Button";
import Input from "../../src/components/common/Input/Input";
import styled from "@emotion/styled";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
  }>();

  const onSubmit = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    console.log({ email, password });
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="email"
        {...register("email", {
          required: "아이디를 입력해주세요",
          pattern: {
            value: /^\S+@\S+\.[a-zA-Z]{2,3}$/i,
            message: "아이디(이메일)는 이메일 형식으로 입력해주세요.",
          },
        })}
        errorMessage={errors.email?.message}
        placeholder="아이디(이메일)"
        icon={MdOutlineEmail}
      />
      <Input
        type="password"
        {...register("password", {
          required: "비밀번호를 입력해주세요",
        })}
        errorMessage={errors.password?.message}
        placeholder="비밀번호"
        icon={MdLockOutline}
      />

      <Button primary>로그인</Button>
      <Link href="/auth/signup" passHref>
        <Button>회원가입</Button>
      </Link>
    </FormWrapper>
  );
}

const FormWrapper = styled.form`
  margin-top: 100px;
  & > div {
    margin: 0 auto;
  }
`;
