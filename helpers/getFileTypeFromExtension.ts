import { last } from 'lodash';

export const getFileTypeFromExtension = (fileName: string) => {
  const fileExtension = last(fileName.split('.'));
  switch (fileExtension) {
    case 'pdf':
      return 'application/pdf';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'mp4':
    case 'm4v':
      return 'video/mp4';
    case 'mpeg':
    case 'mpg':
      return 'video/mpeg';
    case 'avi':
      return 'video/x-msvideo';
    case 'mov':
      return 'video/quicktime';
    case 'mkv':
      return 'video/x-matroska';
    default:
      return null;
  }
};

export const getExtension = (name: string, url: string) => {
  const expr = name?.toString().match(/\.[0-9a-z]+$/i) || url?.toString().match(/\.[0-9a-z]+$/i);
  return expr?.[0].toLowerCase() || '';
};
