import styled from '@emotion/styled';
import Button from '../../src/components/Button/Button';

export default function SignupPage() {
  return (
    <Wrapper>
      <Button primary>동의하고 가입하기</Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-width: 290px;
  max-width: 460px;
  margin: 0 auto;
`;
