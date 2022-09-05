export type SignupAgreements = {
  privacy: boolean;
  ad:
    | {
        email: boolean;
        sms: boolean;
        app: boolean;
      }
    | false;
};

export type userInfoType = {
  email: string;
  password: string;
  name?: string;
  phoneNumber?: string;
  agreements?: SignupAgreements;
};
