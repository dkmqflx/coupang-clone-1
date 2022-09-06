import Link from "next/link";
import { useForm } from "react-hook-form";
import Button from "../../src/components/common/Button/Button";
import styled from "@emotion/styled";

export default function LoginPage() {
  const { register, handleSubmit } =
    useForm<{
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
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} />
        <input {...register("password")} />
        {/* <button type="submit">로그인</button> */}
        <Button primary>로그인</Button>
        {/* <a href="/auth/signup">회원가입</a> */}
        <Link href="/auth/signup" passHref>
          <Button>회원가입</Button>
        </Link>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
