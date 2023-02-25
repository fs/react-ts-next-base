export const SIZE_LIMITS = {
  photo: 2,
  pdf: 2,
  video: 20,
};

export const fileTypeNames = {
  photo: 'фото',
  pdf: 'файл',
  video: 'видео',
};

export const formatMapper = {
  photo: 'image/png, image/jpeg, image/bmp',
  pdf: 'application/pdf',
  // .mp4, .mov, .mpg, .avi, .mkv
  video:
    'video/mp4, video/x-m4v, video/mpeg, video/x-msvideo, video/quicktime, video/x-matroska, .mkv',
};
