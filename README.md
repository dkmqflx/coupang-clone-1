## NUMBLE - 가장 실무에 가까운 쿠팡 클론코딩 2회차

<img width="752" alt="(220531)메인이미지_쿠팡클론코딩챌린지 (1)" src="https://user-images.githubusercontent.com/103182032/174029124-6e64d0c2-fc52-48c9-bd73-b91546682242.png" style="width:100%">

[챌린지 페이지](https://www.numble.it/84b74183-c72e-4502-91c9-e41fbf0aa7aa)

이번 챌린지에서는 쿠팡 서비스에서 사용되는 컴포넌트들을 만들어볼게요!

총 네 개의 컴포넌트를 설계하며, 실무에서처럼 다양한 유즈케이스에 탄력적으로 대응할 수 있는 구조에 대해서 고민해보아요.

만든 컴포넌트들은 Storybook을 사용해 누구나 확인할 수 있도록 배포할거에요.

---

### StoryBook
- [https://634f61794a50407deecee4b4-zcznhsvkzt.chromatic.com/](https://634f61794a50407deecee4b4-zcznhsvkzt.chromatic.com/?path=/story/button--agreement-sign-up)

---

## Button

- 우선 로그인, 동의하고 가입하기 버튼과 회원가입 버튼의 스타일이 달랐기 때문에 primary 속성의 전달 유무에 따라서 Button의 스타일이 정해지도록 처리했습니다.

- 페이지 라우팅의 경우에는 next.js의 `Link` 태그로 Button 컴포넌트를 감싸주고 `passHref`와 `href`값을 전달해주었는데 href의 값의 전달 유무에 따라서 `<a>` 태그의 사용 유무를 결정했습니다.

- 그리고 Link 태그로 Button 컴포넌트를 감싸주는 경우에는 `ref`가 컴포넌트로 전달되기 때문에 `forwardRef`로 컴포넌트를 감싸주었는데 `ref`에 사용되는 타입과 `Props`의 타입을 지정해주었습니다.

```jsx
// Button.tsx

...

type AnchorProps = React.HTMLProps<HTMLAnchorElement> & {
  primary?: boolean;
  href?: "string" | undefined;
  children: string;
  type?: "button" | "submit" | "reset" | undefined;
};

const Button = forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ primary = false, href, children, type = "submit" }: AnchorProps, ref) => {
    return href ? (
      <a href={href} ref={ref}>
        <ButtonWrapper type="button" primary={primary}>
          {children}
        </ButtonWrapper>
        ;
      </a>
    ) : (
      <ButtonWrapper type={type} primary={primary}>
        {children}
      </ButtonWrapper>
    );
  }
);

export default Button;
```

```jsx
// pages/login.tsx

...

<Button primary>로그인</Button>
      <Link href="/auth/signup" passHref>
        <Button>회원가입</Button>
</Link>

...
```

---

## Input

- `Input` 컴포넌트의 경우에는 `react-hook-form`과 함께 사용하였습니다

- `react-hook-form`의 유효성 검증을 할 수 있는 `register`를 `props`로 전달해주었기 때문에 `Input` 컴포넌트에서도 `forwardRef`를 사용해서 `ref`를 전달받는 방식으로 처리해주었습니다.

```jsx
// Input.tsx

...

type InputProps = React.HTMLProps<HTMLInputElement> & {
  placeholder?: string;
  icon?: IconType;
  type?: string | undefined;
  errorMessage?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder,
      icon: Icon,
      type = "text",
      onChange,
      errorMessage,
      name,
    }: InputProps,
    ref
  ) => {
    return (
      <InputWrapper>
        <LabelStyled htmlFor={name} error={errorMessage ? true : false}>
          {Icon && (
            <IconeWrapper>
              <Icon></Icon>
            </IconeWrapper>
          )}
          <InputStyled
            onChange={onChange}
            ref={ref}
            name={name}
            placeholder={placeholder}
            type={type}
          />
        </LabelStyled>
        {errorMessage && <Message message={errorMessage}></Message>}
      </InputWrapper>
    );
  }
);

export default Input;
```

<br/>

- 회원가입 페이지에서 입력 값들 중 비밀번호는 이메일과 값이 일치하면 안되고 비밀번호확인은 비밀번호와 값이 일치해야 한다는 조건이 있습니다.

- 따라서 비밀번호와 이메일에 해당 하는 값들을 `react-hook-form`의 `watch` 함수를 사용해서 참고한 다음 각각의 유효성 검사를 해주었습니다.

```jsx
// signup.tsx
...

const password = useRef<string>();
const email = useRef<string>();

password.current = watch('password');
email.current = watch('email');

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

...
```

---

## Check

- `CheckBox` 컴포넌트도`react-hook-form`의 유효성 검증을 할 수 있는 `register`를 `props`로 전달해주었기 때문에 `forwardRef`를 사용해서 `ref`를 전달받는 방식으로 처리해주었습니다.

- 그리고 **[선택] 광고성 정보 수신 동의** 항목처럼 CheckBox 아래 또 다른 CheckBox 항목이 있는 경우에는 Children으로 컴포넌트를 전달받아서 해당 Children 컴포넌트에 패딩 값을 적용해주는 방식으로 스타일을 적용해주었습니다

```jsx
// CheckBox.tsx
...

<CheckBoxContaienr>
    <CheckBoxWrapper>
        <Label htmlFor="scales">
            <Input
              ref={ref}
              onChange={onChange}
              type="checkbox"
              name={name}
              checked={checked}
            />
            <Text bold={bold}>{text}</Text>
         </Label>
          {description && <MdKeyboardArrowRight />}
        </CheckBoxWrapper>

        <SubText>{subText}</SubText>
        {errorMessage && <Message message={errorMessage}></Message>}

    <ChildrenWrapper>{children}</ChildrenWrapper>
</CheckBoxContaienr>

...
```

<br/>

- signup 페이지에서 체크박스에 해당하는 항목들은 `watch` 함수를 사용해서 참조할 수 있도록 했습니다.

- 그 이유는 input 입력 값들은 `setValue` 함수를 사용해서 값을 설정하고 `getValues` 함수로 값을 가져오는 방식으로 처리하고 있습니다.

- 이 때 `getValues`로 가져오는 값이 변경된다고 해서 다시 렌더링되지 않지만 `watch`로 해당 값들을 참조하면 `watch`가 참조하는 값의 변화에 따라 컴포넌트가 다시 렌더링 되어서 변화된 값에 따라 UI도 변경되기 때문입니다.

- 즉 `watch`로 필요한 값들을 참조해야지 `setValue`를 통해서 값이 변경되었을 때 다시 렌더링 되기 때문에 필요한 값들을 `watch`로 참조하였습니다.

```jsx
// signup.tsx

...

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

// [선택] 광고성 정보 수신 동의 항목에 아래 해당하는 항목들 children으로 전달
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

...
```
