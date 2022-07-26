import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../src/components/Input/Input';
import Button from '../../src/components/Button/Button';
import styled from '@emotion/styled';
import { MdOutlineMailOutline } from 'react-icons/md';
import { FiLock } from 'react-icons/fi';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { AiOutlineUser } from 'react-icons/ai';
import { RiSmartphoneLine } from 'react-icons/ri';

type Inputs = {
  id: string;
  password: string;
  passwordConfirm: string;
  name: string;
  number: string;
};

type InputPassword = {
  password: string;
  passwordConfirm: string;
};

const WarningText = styled.p`
  color: #e52528;
  font-size: 12px;
  line-height: 18px;
  margin: 9px 12px 0;
  padding: 0;
`;

export default function SignupPage() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onBlur',
  });

  const {
    register: registerPassword,
    watch: watchPassword,
    formState: { errors: errosPassword },
  } = useForm<InputPassword>({
    mode: 'onChange',
    criteriaMode: 'all',
  });

  const [password, setPassword] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState(false);

  const idRef = useRef('');
  idRef.current = watch('id');

  const passwordRef = useRef('');
  passwordRef.current = watchPassword('password');
  console.log(errors);
  console.log(errosPassword);

  return (
    <Wrapper>
      <p>회원정보를 입력해주세요</p>
      <div>
        <Input
          id="id"
          icon={<MdOutlineMailOutline />}
          type="email"
          placeholder="아이디(이메일)"
          {...register('id', {
            required: '이메일을 입력하세요.',
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: '이메일을 올바르게 입력해주세요.',
            },
          })}
          error={errors.id ? true : false}
        ></Input>
        {errors.id && <WarningText>{errors.id.message}</WarningText>}
      </div>

      {/* story에서 password는 Input 컴포넌트 안에 sub로 넣어준다 */}
      <div onClick={() => setPassword(true)}>
        <Input
          id="password"
          type="password"
          icon={<FiLock />}
          placeholder="비밀번호"
          error={errosPassword.password ? true : false}
          {...registerPassword('password', {
            validate: {
              isEqualId: (value) => (idRef.current && value === idRef.current ? false : true),
              isConsecutive: (value) => (/([a-zA-Z0-9])\1\1+/.test(value) ? false : true),
              checkInvalidate: (value) => /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/.test(value),
            },
          })}
        ></Input>
        {password && (
          <div>
            <div>
              <span>X</span>
              <span>영문/숫자/특수문자 2가지 이상 조합 (8~20자)</span>
            </div>
            <div>
              <span>X</span>
              <span>3개 이상 연속되거나 동일한 문자/숫자 제외</span>
            </div>
            <div>
              <span>X</span>
              <span>아이디(이메일) 제외</span>
            </div>
          </div>
        )}
      </div>

      <div onClick={() => setPasswordConfirm(true)}>
        <Input
          id="passwordConfirm"
          type="password"
          icon={<HiOutlineLockClosed />}
          placeholder="비밀번호 확인"
          error={errosPassword.passwordConfirm ? true : false}
          {...registerPassword('passwordConfirm', {
            validate: {
              isEqualPassword: (value) => passwordRef.current && value === passwordRef.current,
            },
          })}
        ></Input>
        {passwordConfirm && (
          <div>
            <span>X</span>
            <span>확인을 위해 새 비밀번호를 다시 입력해주세요.</span>
          </div>
        )}
      </div>

      <div>
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
          error={errors.name ? true : false}
        ></Input>
        {errors.name && <WarningText>{errors.name.message}</WarningText>}
      </div>

      <div>
        <Input
          id="number"
          icon={<RiSmartphoneLine />}
          placeholder="휴대폰 번호"
          {...register('number', {
            required: '휴대폰 번호를 정확하게 입력하세요.',
            pattern: {
              value: /^01[0-9]{8,}$/,
              message: '휴대폰 번호를 정확하게 입력해주세요.',
            },
          })}
          error={errors.number ? true : false}
        ></Input>
        {errors.number && <WarningText>{errors.number.message}</WarningText>}
      </div>

      <br />
      <Button primary type="submit" id="signup">
        동의하고 가입하기
      </Button>
      {/* 다른 useForm 사용해서 submit하도록 처리 */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-width: 290px;
  max-width: 460px;
  margin: 0 auto;
`;
