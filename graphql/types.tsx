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

/** Data type for Activity */
export type Activity = {
  __typename?: 'Activity';
  /** Body */
  body: Scalars['String'];
  /** Created datetime */
  createdAt: Scalars['ISO8601DateTime'];
  /** Event type from Enum */
  event: ActivityEvent;
  /** ID */
  id: Scalars['ID'];
  /** Title */
  title: Scalars['String'];
  /** Activity initiator */
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

/** Data type for Activity Event */
export enum ActivityEvent {
  ResetPasswordRequested = 'RESET_PASSWORD_REQUESTED',
  UserLoggedIn = 'USER_LOGGED_IN',
  UserRegistered = 'USER_REGISTERED',
  UserResetPassword = 'USER_RESET_PASSWORD',
  UserUpdated = 'USER_UPDATED',
}

/** Input object for user confirmation flow */
export type ConfirmUserInput = {
  /** Token */
  value: Scalars['String'];
};

/** Payload object for user confirmation mutation */
export type ConfirmUserPayload = {
  __typename?: 'ConfirmUserPayload';
  /** Current User */
  me: CurrentUser;
};

/** Data type for Current User */
export type CurrentUser = {
  __typename?: 'CurrentUser';
  /** Activities array */
  activities?: Maybe<ActivityConnection>;
  /** URL for avatar image */
  avatarUrl?: Maybe<Scalars['String']>;
  /** Confirmation datetime */
  confirmedAt?: Maybe<Scalars['ISO8601DateTime']>;
  /** Email */
  email: Scalars['String'];
  /** First Name */
  firstName?: Maybe<Scalars['String']>;
  /** ID */
  id: Scalars['ID'];
  /** Last Name */
  lastName?: Maybe<Scalars['String']>;
};

/** Data type for Current User */
export type CurrentUserActivitiesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  events?: InputMaybe<Array<ActivityEvent>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** Data type for file direct upload */
export type ImageUploader = {
  /** ID */
  id: Scalars['String'];
  /** File metadata */
  metadata: ImageUploaderMetadata;
  /** Storage: cache or store */
  storage?: InputMaybe<Scalars['String']>;
};

/** Data type for file */
export type ImageUploaderMetadata = {
  /** Filename */
  filename: Scalars['String'];
  /** Filetype */
  mimeType: Scalars['String'];
  /** Size in bytes */
  size: Scalars['Int'];
};

/** Mutations */
export type Mutation = {
  __typename?: 'Mutation';
  /** Confirm user email */
  confirmUser?: Maybe<ConfirmUserPayload>;
  /** Authenticate with OAuth */
  omniauthSignInOrSignUp?: Maybe<SignInPayload>;
  /** File presign data for upload */
  presignData?: Maybe<PresignDataPayload>;
  /** Reset password request */
  requestPasswordRecovery?: Maybe<RequestPasswordRecoveryPayload>;
  /** Sign in */
  signIn?: Maybe<SignInPayload>;
  /** Sign out */
  signOut?: Maybe<SignOutPayload>;
  /** Sign up */
  signUp?: Maybe<SignUpPayload>;
  /** Update user password */
  updatePassword?: Maybe<UpdatePasswordPayload>;
  /** Update short live access token */
  updateToken?: Maybe<UpdateTokenPayload>;
  /** Update user info */
  updateUser?: Maybe<UpdateUserPayload>;
};

/** Mutations */
export type MutationConfirmUserArgs = {
  input: ConfirmUserInput;
};

/** Mutations */
export type MutationOmniauthSignInOrSignUpArgs = {
  input: OmniauthInput;
};

/** Mutations */
export type MutationPresignDataArgs = {
  input: PresignDataInput;
};

/** Mutations */
export type MutationRequestPasswordRecoveryArgs = {
  input: RequestPasswordRecoveryInput;
};

/** Mutations */
export type MutationSignInArgs = {
  input: SignInInput;
};

/** Mutations */
export type MutationSignOutArgs = {
  input: SignOutInput;
};

/** Mutations */
export type MutationSignUpArgs = {
  input: SignUpInput;
};

/** Mutations */
export type MutationUpdatePasswordArgs = {
  input: UpdatePasswordInput;
};

/** Mutations */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

/** Input object for oauth authentication */
export type OmniauthInput = {
  /** OAuth token from provider */
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

/** Data type to presign file for upload */
export type Presign = {
  __typename?: 'Presign';
  /** Metadata fields used as headers on upload to storage */
  fields: Array<PresignField>;
  /** URL where to upload file */
  url: Scalars['String'];
};

/** Input object for prepare presigned URL */
export type PresignDataInput = {
  /** Filename for presign */
  filename: Scalars['String'];
  /** Filetype */
  type: Scalars['String'];
};

/** Payload object for presign file data mutation */
export type PresignDataPayload = {
  __typename?: 'PresignDataPayload';
  /** Data */
  data: Presign;
};

/** Data type for presign fields */
export type PresignField = {
  __typename?: 'PresignField';
  /** Key */
  key: Scalars['String'];
  /** Value */
  value: Scalars['String'];
};

/** Data type for Public Activity */
export type PublicActivity = {
  __typename?: 'PublicActivity';
  /** Body */
  body: Scalars['String'];
  /** ID */
  id: Scalars['ID'];
  /** Title */
  title: Scalars['String'];
};

/** The connection type for PublicActivity. */
export type PublicActivityConnection = {
  __typename?: 'PublicActivityConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<PublicActivityEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<PublicActivity>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type PublicActivityEdge = {
  __typename?: 'PublicActivityEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<PublicActivity>;
};

/** Base query */
export type Query = {
  __typename?: 'Query';
  /** Activities */
  activities?: Maybe<PublicActivityConnection>;
  /** Current User */
  me?: Maybe<CurrentUser>;
};

/** Base query */
export type QueryActivitiesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** Input object for reset password flow */
export type RequestPasswordRecoveryInput = {
  /** Email */
  email: Scalars['String'];
};

/** Payload object for request password reset mutation */
export type RequestPasswordRecoveryPayload = {
  __typename?: 'RequestPasswordRecoveryPayload';
  /** Detail */
  detail: Scalars['String'];
  /** Message */
  message: Scalars['String'];
};

/** Input object for sign in */
export type SignInInput = {
  /** Email */
  email: Scalars['String'];
  /** Password */
  password: Scalars['String'];
};

/** Payload object for sign in mutation */
export type SignInPayload = {
  __typename?: 'SignInPayload';
  /** Short live access token */
  accessToken: Scalars['String'];
  /** Current User */
  me?: Maybe<CurrentUser>;
  /** Long live refresh token */
  refreshToken: Scalars['String'];
};

/** Input object for sign out */
export type SignOutInput = {
  /** If true all sessions will reset */
  everywhere?: InputMaybe<Scalars['Boolean']>;
};

/** Payload object for sign out mutation */
export type SignOutPayload = {
  __typename?: 'SignOutPayload';
  /** Confirmation message */
  message: Scalars['String'];
};

/** Input object for sign up */
export type SignUpInput = {
  /** URL to avatar image */
  avatar?: InputMaybe<ImageUploader>;
  /** Email */
  email: Scalars['String'];
  /** First Name */
  firstName?: InputMaybe<Scalars['String']>;
  /** Last Name */
  lastName?: InputMaybe<Scalars['String']>;
  /** Password */
  password: Scalars['String'];
};

/** Payload object for sign up mutation */
export type SignUpPayload = {
  __typename?: 'SignUpPayload';
  /** Short live access token */
  accessToken: Scalars['String'];
  /** Current User */
  me?: Maybe<CurrentUser>;
  /** Long live refresh token */
  refreshToken: Scalars['String'];
};

/** Input object for update user password on reset password */
export type UpdatePasswordInput = {
  /** A new password */
  password: Scalars['String'];
  /** Password reset token */
  resetToken: Scalars['String'];
};

/** Payload object for update password mutation */
export type UpdatePasswordPayload = {
  __typename?: 'UpdatePasswordPayload';
  /** Short live access token */
  accessToken: Scalars['String'];
  /** Current User */
  me?: Maybe<CurrentUser>;
  /** Long live refresh token */
  refreshToken: Scalars['String'];
};

/** Payload object for update token mutation */
export type UpdateTokenPayload = {
  __typename?: 'UpdateTokenPayload';
  /** Short live access token */
  accessToken: Scalars['String'];
  /** Current User */
  me?: Maybe<CurrentUser>;
  /** Long live refresh token */
  refreshToken: Scalars['String'];
};

/** Input object for update user info */
export type UpdateUserInput = {
  /** Avatar data */
  avatar?: InputMaybe<ImageUploader>;
  /** Password */
  currentPassword?: InputMaybe<Scalars['String']>;
  /** Email */
  email?: InputMaybe<Scalars['String']>;
  /** First Name */
  firstName?: InputMaybe<Scalars['String']>;
  /** Last Name */
  lastName?: InputMaybe<Scalars['String']>;
  /** Password */
  password?: InputMaybe<Scalars['String']>;
};

/** Payload object for update user mutation */
export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  /** Current User */
  me: CurrentUser;
};

/** Base user info */
export type User = {
  __typename?: 'User';
  /** URL to avatar image */
  avatarUrl?: Maybe<Scalars['String']>;
  /** Email */
  email: Scalars['String'];
  /** First Name */
  firstName?: Maybe<Scalars['String']>;
  /** ID */
  id: Scalars['ID'];
  /** Last Name */
  lastName?: Maybe<Scalars['String']>;
};
