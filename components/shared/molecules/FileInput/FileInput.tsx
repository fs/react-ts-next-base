import React from 'react';

import { useFileUpload } from 'hooks/useFileUpload';
import { usePresignFile } from 'lib/apollo/hooks/actions/presignFile';

import useNotifier from 'hooks/useNotifier';

import { TUploadedFile } from 'config/types';
import { getFileTypeFromExtension } from 'helpers';

import { SIZE_LIMITS, formatMapper, fileTypeNames } from './constants';
import { Input } from './styled';
import { TFileInput } from './types';

const FileInput = ({
  name,
  testId,
  multiple = true,
  format = ['photo'],
  action = () => {},
  setLoading = () => {},
  disabled = false,
  limitUpload = 10,
}: TFileInput) => {
  const [uploadFile] = useFileUpload();
  const [presignFile] = usePresignFile();
  const { setError } = useNotifier();

  const accept = format.map(formatType => formatMapper[formatType]).join(', ');

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { validity, files: fileList },
    } = event;
    const files = [...(fileList || [])];
    const uploadedFiles: TUploadedFile[] = [];

    if (files.length > limitUpload) {
      setError(
        `Превышено максимальное кол-во файлов. Осталось загрузить максимум ${limitUpload} файлов.`,
      );
      return;
    }

    /* eslint-disable-next-line */
    for await (const file of files) {
      if (validity.valid && file) {
        try {
          const fileType = () => {
            if (formatMapper.video.includes(file.type)) return 'video';
            if (formatMapper.pdf.includes(file.type)) return 'pdf';
            return 'photo';
          };
          const fileSizeLimit = SIZE_LIMITS[fileType()];
          const fileTypeName = fileTypeNames[fileType()];

          if (file.size > fileSizeLimit * 1_048_576) {
            throw new Error(
              `Размер загружаемых файлов не должен превышать ${fileSizeLimit} Мб/${fileTypeName}`,
            );
          }
          setLoading(true);

          const presignData = await presignFile({
            type: getFileTypeFromExtension(file.name) || file.type,
            filename: file.name,
            size: file.size,
          });
          const uploadedFile = presignData && (await uploadFile(presignData, file));
          const url = URL.createObjectURL(file);

          if (uploadedFile) uploadedFiles.push({ uploadedFile, url });
        } catch (error) {
          setError(error);
        }

        setLoading(false);
      }
    }
    if (uploadedFiles.length) action(uploadedFiles);
  };

  return (
    <Input
      type="file"
      data-testid={testId}
      data-cy={testId}
      name={name}
      onChange={onChange}
      multiple={multiple}
      accept={accept}
      disabled={disabled}
      title="upload files"
    />
  );
};

export default FileInput;
