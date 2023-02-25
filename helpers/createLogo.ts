export const asyncCanvasToBlob = (canvas: HTMLCanvasElement, type = 'image/png'): Promise<Blob> =>
  new Promise(resolve => {
    canvas.toBlob(blob => {
      if (blob) resolve(blob);
    }, type);
  });

type CanvasSettingsType = {
  initials: string;
  initial_fg: string;
  initial_bg: string;
  size: number;
  initial_weight: number;
  initial_font_family: string;
  initial_size?: number;
};

export const createAvatarCanvas = (settings: CanvasSettingsType) => {
  const canvas = document.createElement('canvas');
  const width = settings.size;
  const height = settings.size;
  const devicePixelRatio = Math.max(window.devicePixelRatio, 1);
  canvas.width = width * devicePixelRatio;
  canvas.height = height * devicePixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const context = canvas.getContext('2d');
  if (!context) return canvas;

  context.scale(devicePixelRatio, devicePixelRatio);
  context.rect(0, 0, canvas.width, canvas.height);
  context.fillStyle = settings.initial_bg;
  context.fill();
  context.font = `${settings.initial_weight} ${settings.initial_size || height / 2}px ${
    settings.initial_font_family
  }`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillStyle = settings.initial_fg;
  context.fillText(settings.initials, width / 2, height / 2);

  return canvas;
};
