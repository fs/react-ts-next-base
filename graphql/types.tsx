export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ISO8601DateTime: string;
};

export type Activity = {
  __typename?: 'Activity';
  body: Scalars['String'];
  createdAt: Scalars['ISO8601DateTime'];
  event: ActivityEvent;
  id: Scalars['ID'];
  title: Scalars['String'];
  user: User;
};

/** The connection type for Activity. */
export type ActivityConnection = {
  __typename?: 'ActivityConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ActivityEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Activity>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ActivityEdge = {
  __typename?: 'ActivityEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Activity>;
};

export enum ActivityEvent {
  ResetPasswordRequested = 'RESET_PASSWORD_REQUESTED',
  UserLoggedIn = 'USER_LOGGED_IN',
  UserRegistered = 'USER_REGISTERED',
  UserResetPassword = 'USER_RESET_PASSWORD',
  UserUpdated = 'USER_UPDATED',
}

export type ConfirmUserInput = {
  value: Scalars['String'];
};

export type ConfirmUserPayload = {
  __typename?: 'ConfirmUserPayload';
  me: CurrentUser;
};

export type CurrentUser = {
  __typename?: 'CurrentUser';
  activities?: Maybe<ActivityConnection>;
  avatarUrl?: Maybe<Scalars['String']>;
  confirmedAt?: Maybe<Scalars['ISO8601DateTime']>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
};

export type CurrentUserActivitiesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  events?: InputMaybe<Array<ActivityEvent>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ImageUploader = {
  id: Scalars['String'];
  metadata: ImageUploaderMetadata;
  storage?: InputMaybe<Scalars['String']>;
};

export type ImageUploaderMetadata = {
  filename: Scalars['String'];
  mimeType: Scalars['String'];
  size: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmUser?: Maybe<ConfirmUserPayload>;
  omniauthSigninOrSignup?: Maybe<SignInPayload>;
  presignData?: Maybe<PresignDataPayload>;
  requestPasswordRecovery?: Maybe<RequestPasswordRecoveryPayload>;
  signin?: Maybe<SignInPayload>;
  signout?: Maybe<SignOutPayload>;
  signup?: Maybe<SignUpPayload>;
  updatePassword?: Maybe<UpdatePasswordPayload>;
  updateToken?: Maybe<UpdateTokenPayload>;
  updateUser?: Maybe<UpdateUserPayload>;
};

export type MutationConfirmUserArgs = {
  input: ConfirmUserInput;
};

export type MutationOmniauthSigninOrSignupArgs = {
  input: OmniauthInput;
};

export type MutationPresignDataArgs = {
  input: PresignDataInput;
};

export type MutationRequestPasswordRecoveryArgs = {
  input: RequestPasswordRecoveryInput;
};

export type MutationSigninArgs = {
  input: SignInInput;
};

export type MutationSignoutArgs = {
  input: SignOutInput;
};

export type MutationSignupArgs = {
  input: SignUpInput;
};

export type MutationUpdatePasswordArgs = {
  input: UpdatePasswordInput;
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type OmniauthInput = {
  authCode: Scalars['String'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type Presign = {
  __typename?: 'Presign';
  fields: Array<PresignField>;
  url: Scalars['String'];
};

export type PresignDataInput = {
  filename: Scalars['String'];
  type: Scalars['String'];
};

export type PresignDataPayload = {
  __typename?: 'PresignDataPayload';
  data: Presign;
};

export type PresignField = {
  __typename?: 'PresignField';
  key: Scalars['String'];
  value: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  activities?: Maybe<ActivityConnection>;
  me?: Maybe<CurrentUser>;
};

export type QueryActivitiesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  events?: InputMaybe<Array<ActivityEvent>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type RequestPasswordRecoveryInput = {
  email: Scalars['String'];
};

export type RequestPasswordRecoveryPayload = {
  __typename?: 'RequestPasswordRecoveryPayload';
  detail: Scalars['String'];
  message: Scalars['String'];
};

export type SignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignInPayload = {
  __typename?: 'SignInPayload';
  accessToken: Scalars['String'];
  me?: Maybe<CurrentUser>;
  refreshToken: Scalars['String'];
};

export type SignOutInput = {
  everywhere?: InputMaybe<Scalars['Boolean']>;
};

export type SignOutPayload = {
  __typename?: 'SignOutPayload';
  message: Scalars['String'];
};

export type SignUpInput = {
  avatar?: InputMaybe<ImageUploader>;
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};

export type SignUpPayload = {
  __typename?: 'SignUpPayload';
  accessToken: Scalars['String'];
  me?: Maybe<CurrentUser>;
  refreshToken: Scalars['String'];
};

export type UpdatePasswordInput = {
  password: Scalars['String'];
  resetToken: Scalars['String'];
};

export type UpdatePasswordPayload = {
  __typename?: 'UpdatePasswordPayload';
  accessToken: Scalars['String'];
  me?: Maybe<CurrentUser>;
  refreshToken: Scalars['String'];
};

export type UpdateTokenPayload = {
  __typename?: 'UpdateTokenPayload';
  accessToken: Scalars['String'];
  me?: Maybe<CurrentUser>;
  refreshToken: Scalars['String'];
};

export type UpdateUserInput = {
  avatar?: InputMaybe<ImageUploader>;
  currentPassword?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  me: CurrentUser;
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
};
