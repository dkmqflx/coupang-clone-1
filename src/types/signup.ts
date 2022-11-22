export type inputType = {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phoenNumber: string;
};

export type agreementType = {
  all: boolean;
  age: boolean;
  termAndConditions: boolean;
  financialTransactions: boolean;
  personalInformation: boolean;
  personalInformationToThirdParty: boolean;
};

export type optionalAgreementType = {
  personalInformationForMarketing: boolean;
  advertisingAll: boolean;
  advertisingEmail: boolean;
  sms: boolean;
  appPush: boolean;
};

export type formType = inputType & agreementType & optionalAgreementType;
