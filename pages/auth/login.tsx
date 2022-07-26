import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import Input from '../../src/components/Input/Input';
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
        <Input {...register('email')} />
        <Input {...register('password')} />
        <Button primary type="submit">
          로그인
        </Button>
        <hr />
        <Button>
          <Link href="/auth/signup">
            <a>회원가입</a>
          </Link>
        </Button>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-width: 290px;
  max-width: 460px;
  margin: 0 auto;
`;
