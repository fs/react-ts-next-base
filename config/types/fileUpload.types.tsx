import { Uploader } from 'graphql/types';

export type TFile = { id: string; url: string; metadata: { filename: string } };

export type TUploadedFile = { uploadedFile: Uploader; url: string };
