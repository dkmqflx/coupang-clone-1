import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import Button from '../../src/components/Button/Button';
import Link from 'next/link';

export default function LoginPage() {
  const { register, handleSubmit } =
    useForm<{
      email: string;
      password: string;
    }>();

  const onSubmit = () => {};

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('email')} />
        <input {...register('password')} />
        <Button variant="primary" type="submit">
          로그인
        </Button>
        <Button>
          <Link href="/auth/signup">
            <a>회원가입</a>
          </Link>
        </Button>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
