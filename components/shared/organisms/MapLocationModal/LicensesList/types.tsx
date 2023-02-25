export type TLicenseProps = {
  licenseIndex: string;
  remove: (index: string) => void;
  setFieldValue: (field: string, value: any) => void;
  values: any;
};
