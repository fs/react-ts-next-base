import React from 'react';
import theme from 'public/styles/theme';

import { usePresignFile } from 'lib/apollo/hooks/actions/presignFile';
import { useFileUpload } from 'hooks/useFileUpload';
import useNotifier from 'hooks/useNotifier';

import Button from 'components/shared/atoms/Button';

import { asyncCanvasToBlob, createAvatarCanvas } from 'helpers';

const getFirstLetter = str =>
  str
    .split(' ')
    .map(word => word[0])
    .join('');

const GenerateLogoButton = ({ name, word, setLogo = () => {}, setFieldValue = () => {} }) => {
  const [uploadFile] = useFileUpload();
  const [presignFile] = usePresignFile();
  const { setError } = useNotifier();

  const handleGenerateLogo = async () => {
    const letter = getFirstLetter(word).slice(0, 2).toUpperCase();

    const canvas = await createAvatarCanvas({
      initials: letter,
      initial_fg: theme.colors.grey,
      initial_bg: theme.colors.blueEE,
      size: 80,
      initial_weight: 100,
      initial_font_family: "'Lato', 'Lato-Regular', 'Helvetica Neue'",
    });
    const blob = await asyncCanvasToBlob(canvas);
    const file = new File([blob], 'defaultGeneratedLogo', { type: blob.type });

    try {
      const presignData = await presignFile({
        type: file.type,
        filename: file.name,
        size: file.size,
      });
      const uploadedLogo = await uploadFile(presignData, file);
      const url = URL.createObjectURL(file);

      setLogo(url);
      setFieldValue(name, uploadedLogo);
    } catch (error) {
      setError(error);
    }
  };

  return <Button label="Сгенерировать из названия компании" onClick={handleGenerateLogo} />;
};

export default GenerateLogoButton;
