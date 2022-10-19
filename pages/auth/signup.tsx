import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../src/components/common/Button/Button';
import Input from '../../src/components/common/Input/Input';
import CheckBox from '../../src/components/common/CheckBox/CheckBox';

import {
  MdOutlineEmail,
  MdLockOutline,
  MdLock,
  MdOutlineAccountCircle,
  MdOutlinePhoneIphone,
} from 'react-icons/md';
import styled from '@emotion/styled';

type inputType = {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phoenNumber: string;
};

type agreementType = {
  all: boolean;
  age: boolean;
  termAndConditions: boolean;
  financialTransactions: boolean;
  personalInformation: boolean;
  personalInformationToThirdParty: boolean;
};

type optionalAgreementType = {
  personalInformationForMarketing: boolean;
  advertisingAll: boolean;
  advertisingEmail: boolean;
  sms: boolean;
  appPush: boolean;
};

type formType = inputType & agreementType & optionalAgreementType;

const ALL_TERMS_AND_CONDITIONS = [
  'age',
  'termAndConditions',
  'financialTransactions',
  'personalInformation',
  'personalInformationToThirdParty',
  'personalInformationForMarketing',
  'advertisingAll',
  'advertisingEmail',
  'sms',
  'appPush',
];

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<formType>({
    mode: 'onChange',
    criteriaMode: 'all',
  });

  const password = useRef<string>();
  const email = useRef<string>();
  const agreementAll = useRef<boolean[]>();

  password.current = watch('password');
  email.current = watch('email');
  agreementAll.current = watch([
    'age',
    'termAndConditions',
    'financialTransactions',
    'personalInformation',
    'personalInformationToThirdParty',

    'personalInformationForMarketing',

    'advertisingAll',
    'advertisingEmail',
    'sms',
    'appPush',
  ]);

  const onSubmit = ({
    email,
    password,
    passwordConfirm,
    name,
    phoenNumber,
    all,
  }: formType) => {};

  const getPasswordErrorMessage = () => {
    if (errors.password?.types?.passwordCheck !== true) {
      return '영문/숫자/특수문자 2가지 이상 조합 (8~20자)';
    }

    if (errors.password?.types?.compareEmail !== true) {
      return '아이디(이메일) 제외.';
    }
  };

  const checkAgreementAll = () => {
    setValue('all', !getValues('all'));

    const currentAllValue = getValues('all');

    if (currentAllValue) {
      ALL_TERMS_AND_CONDITIONS.map((value) =>
        setValue(value as keyof formType, true)
      );

      clearErrors('all');
    } else {
      ALL_TERMS_AND_CONDITIONS.map((value) =>
        setValue(value as keyof formType, false)
      );
    }
  };

  const checkMandatoryTerms = (
    name:
      | 'age'
      | 'termAndConditions'
      | 'financialTransactions'
      | 'personalInformation'
      | 'personalInformationToThirdParty'
  ) => {
    setValue(name, !getValues(name));

    const value = getValues(name);
    const mandatoryTerms = getValues([
      'age',
      'termAndConditions',
      'financialTransactions',
      'personalInformation',
      'personalInformationToThirdParty',
    ]);

    if (!value) {
      setValue('all', false);
    } else if (mandatoryTerms.every((value) => value)) {
      setValue('all', true);
      clearErrors('all');
    }
  };

  const checkOptionalAgreementAll = () => {
    setValue('advertisingAll', !getValues('advertisingAll'));
    const currentAllValue = getValues('advertisingAll');

    const mandatoryTerms = getValues([
      'age',
      'termAndConditions',
      'financialTransactions',
      'personalInformation',
      'personalInformationToThirdParty',
    ]);

    const optionalTerms = [
      'advertisingAll',
      'advertisingEmail',
      'sms',
      'appPush',
    ];

    if (currentAllValue) {
      optionalTerms.map((value) =>
        setValue(value as keyof optionalAgreementType, true)
      );

      if (mandatoryTerms.every((value) => value)) {
        setValue('all', true);
      }
    } else {
      optionalTerms.map((value) =>
        setValue(value as keyof optionalAgreementType, false)
      );

      setValue('all', false);
    }
  };

  const checkOptionalTerms = (
    name:
      | 'personalInformationForMarketing'
      | 'advertisingAll'
      | 'advertisingEmail'
      | 'sms'
      | 'appPush'
  ) => {
    setValue(name, !getValues(name));
    const value = getValues(name);

    const optionalTerms = getValues(['advertisingEmail', 'sms', 'appPush']);
    const mandatoryTerms = getValues([
      'age',
      'termAndConditions',
      'financialTransactions',
      'personalInformation',
      'personalInformationToThirdParty',
    ]);

    if (!value) {
      setValue('all', false);
      name !== 'personalInformationForMarketing' &&
        setValue('advertisingAll', false);

      return;
    }

    if (optionalTerms.every((value) => value)) {
      setValue('advertisingAll', true);
    }
    if (mandatoryTerms.every((value) => value)) {
      setValue('all', true);
      clearErrors('all');
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='email'
          {...register('email', {
            required: '이메일을 입력하세요.',
            pattern: {
              value: /^\S+@\S+\.[a-zA-Z]{2,3}$/i,
              message: '이메일을 올바르게 입력하세요.',
            },
          })}
          errorMessage={errors.email?.message}
          placeholder='아이디(이메일)'
          icon={MdOutlineEmail}
        />
        <Input
          type='password'
          {...register('password', {
            validate: {
              passwordCheck: (value) =>
                /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*.]{8,20}$/i.test(
                  value
                )
                  ? ''
                  : '영문/숫자/특수문자 2가지 이상 조합 (8~20자)',

              compareEmail: (value) =>
                email.current && value === email.current
                  ? '아이디(이메일) 제외.'
                  : '',
            },
          })}
          errorMessage={errors.password && getPasswordErrorMessage()}
          placeholder='비밀번호'
          icon={MdLockOutline}
        />
        <Input
          type='password'
          {...register('passwordConfirm', {
            required: '확인을 위해 새 비밀번호를 다시 입력해주세요.',
            validate: (value) =>
              value !== password.current
                ? '새 비밀번호가 일치하지 않습니다.'
                : '',
          })}
          errorMessage={errors.passwordConfirm?.message}
          placeholder='비밀번호 확인'
          icon={MdLock}
        />
        <Input
          {...register('name', {
            required: '이름을 정확히 입력하세요',
            pattern: {
              value: /[가-힣a-zA-Z]{2,}/i,
              message: '이름을 정확히 입력하세요.',
            },
          })}
          errorMessage={errors.name?.message}
          placeholder='이름'
          icon={MdOutlineAccountCircle}
        />
        <Input
          type='tel'
          {...register('phoenNumber', {
            required: '휴대폰 번호를 정확하게 입력하세요.',
            pattern: {
              value: /^\d{3}\d{3,4}\d{4}$/i,
              message: '휴대폰 번호를 정확하게 입력하세요.',
            },
          })}
          errorMessage={errors.phoenNumber?.message}
          placeholder='휴대폰 번호'
          icon={MdOutlinePhoneIphone}
        />

        <CheckBoxWrapper>
          <CheckBox
            {...register('all', {
              validate: () => {
                const values = getValues([
                  'age',
                  'termAndConditions',
                  'financialTransactions',
                  'personalInformation',
                  'personalInformationToThirdParty',
                ]);

                return values.every((value) => value)
                  ? ''
                  : '필수 항목에 모두 동의해주세요';
              },
            })}
            onChange={checkAgreementAll}
            bold
            text='모두 확인하였으며 동의합니다.'
            subText='동의에는 필수 및 선택 목적(광고성 정보 수신 포함)에 대한 동의가
          포함되어 있으며, 선택 목적의 동의를 거부하시는 경우에도 서비스 이용이
          가능합니다.'
            checked={getValues('all')}
            errorMessage={errors.all?.message}
          />
          <CheckBox
            {...register('age', {
              required: true,
            })}
            text='[필수] 만 14세 이상입니다'
            checked={getValues('age')}
            onChange={() => checkMandatoryTerms(`age`)}
          />
          <CheckBox
            {...register('termAndConditions', {
              required: true,
            })}
            description
            text='[필수] 쿠팡 이용약관 동의'
            checked={getValues('termAndConditions')}
            onChange={() => checkMandatoryTerms(`termAndConditions`)}
          />
          <CheckBox
            {...register('financialTransactions', {
              required: true,
            })}
            description
            text='[필수] 전자금융거래 이용약관 동의'
            checked={getValues('financialTransactions')}
            onChange={() => checkMandatoryTerms(`financialTransactions`)}
          />
          <CheckBox
            {...register('personalInformation', {
              required: true,
            })}
            description
            text='[필수] 개인정보 수집 및 이용 동의'
            checked={getValues('personalInformation')}
            onChange={() => checkMandatoryTerms(`personalInformation`)}
          />
          <CheckBox
            {...register('personalInformationToThirdParty', {
              required: true,
            })}
            description
            text='[필수] 개인정보 제3자 제공 동의'
            checked={getValues('personalInformationToThirdParty')}
            onChange={() =>
              checkMandatoryTerms(`personalInformationToThirdParty`)
            }
          />
          <CheckBox
            {...register('personalInformationForMarketing', {
              required: false,
            })}
            text='[선택] 마케팅 목적의 개인정보 수집 및 이용 동의'
            checked={getValues('personalInformationForMarketing')}
            onChange={() =>
              checkOptionalTerms('personalInformationForMarketing')
            }
          />

          <CheckBox
            {...register('advertisingAll', {
              required: false,
            })}
            onChange={checkOptionalAgreementAll}
            checked={getValues('advertisingAll')}
            description
            text='[선택] 광고성 정보 수신 동의'
          >
            <CheckBox
              {...register('advertisingEmail', {
                required: false,
              })}
              checked={getValues('advertisingEmail')}
              text='[선택] 이메일 수신 동의'
              onChange={() => checkOptionalTerms('advertisingEmail')}
            />
            <CheckBox
              {...register('sms', {
                required: false,
              })}
              checked={getValues('sms')}
              text='[선택] SMS,MMS 수신 동의'
              onChange={() => checkOptionalTerms('sms')}
            />
            <CheckBox
              {...register('appPush', {
                required: false,
              })}
              checked={getValues('appPush')}
              text='[선택] 앱 푸시 수신 동의'
              onChange={() => checkOptionalTerms('appPush')}
            />
          </CheckBox>
        </CheckBoxWrapper>

        <Button primary type='submit'>
          동의하고 회원가입하기
        </Button>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  margin-top: 20px;
`;

const CheckBoxWrapper = styled.div`
  margin: 18px 0;
`;
