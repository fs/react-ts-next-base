import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { usePresignFile } from 'lib/apollo/hooks/actions/presignFile';
import { useFileUpload } from 'hooks/useFileUpload';
import { asyncCanvasToBlob } from 'helpers';
import useNotifier from 'hooks/useNotifier';

import Button from 'components/shared/atoms/Button';
import ModalWindow from 'components/shared/atoms/ModalWindow';

import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { ActionsWrapper, ImageContainer, canvasStyles } from './styled';
import { TCropAvatarModal } from './types';

const CropAvatarModal = NiceModal.create<TCropAvatarModal>(
  ({ onSubmit: action, avatar = {}, temporaryUrl, rounded }) => {
    const currentCropAreaRef = useRef<HTMLCanvasElement | null>(null);
    const [currentImg, setCurrentImage] = useState<HTMLImageElement | null>(null);
    const [crop, setCrop] = useState<Crop>({});
    const [completedCrop, setCompletedCrop] = useState<Crop>({});

    const [presignFile] = usePresignFile();
    const [uploadFile] = useFileUpload();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { setError } = useNotifier();
    const { visible, remove } = useModal();

    useEffect(() => {
      if (!completedCrop || !currentCropAreaRef.current || !currentImg) {
        return;
      }

      const canvas = currentCropAreaRef.current;

      const scaleX = currentImg.naturalWidth / currentImg.width;
      const scaleY = currentImg.naturalHeight / currentImg.height;
      const ctx = canvas.getContext('2d');
      const pixelRatio = window.devicePixelRatio;

      if (!ctx) return;

      const { x = 0, y = 0, width = 0, height = 0 } = completedCrop;

      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = 'high';

      ctx.drawImage(
        currentImg,
        x * scaleX,
        y * scaleY,
        width * scaleX,
        height * scaleY,
        0,
        0,
        width,
        height,
      );
    }, [completedCrop]);

    const onLoad = useCallback((img: HTMLImageElement) => {
      setCurrentImage(img);

      const aspect = 1;
      const width = img.width < img.height ? img.width : img.height;
      const height = img.width > img.height ? img.height : img.width;

      const y = (img.height - height) / 2;
      const x = (img.width - width) / 2;
      const loadedCrop = {
        unit: 'px' as const,
        width,
        height,
        x,
        y,
        aspect,
      };

      setCompletedCrop(loadedCrop);
      setCrop(loadedCrop);

      return false;
    }, []);

    const onSubmit = async (canvas: HTMLCanvasElement) => {
      const blob = await asyncCanvasToBlob(canvas, avatar.type);
      const file = new File([blob], avatar.name || '', { type: blob.type });
      setIsSubmitting(true);

      try {
        const presignData = await presignFile({
          type: file.type,
          filename: file.name,
          size: file.size,
        });
        const uploadedAvatar = presignData && (await uploadFile(presignData, file));
        const url = URL.createObjectURL(blob);

        if (uploadedAvatar) await action(uploadedAvatar, url);

        remove();
      } catch (error) {
        setError(error);
      }
      setIsSubmitting(false);
    };

    return (
      <ModalWindow isOpen={visible} setIsOpen={remove} padding={0} closeOnOverlayClick={false}>
        <ImageContainer>
          <ReactCrop
            src={temporaryUrl}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={setCrop}
            onComplete={setCompletedCrop}
            circularCrop={rounded}
            keepSelection
          />
        </ImageContainer>
        <canvas
          ref={currentCropAreaRef}
          style={canvasStyles({
            height: Math.round(completedCrop?.height ?? 0),
            width: Math.round(completedCrop?.width ?? 0),
          })}
        />
        <ActionsWrapper>
          <Button
            label="Применить"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            onClick={() => currentCropAreaRef.current && onSubmit(currentCropAreaRef.current)}
            testId="crop-image-button"
          />
          <Button disabled={isSubmitting} label="Отменить" variant="hollow" onClick={remove} />
        </ActionsWrapper>
      </ModalWindow>
    );
  },
);

export default CropAvatarModal;
