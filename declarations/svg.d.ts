declare module '*.svg' {
  import React, { FC } from 'react';
  const src: FC<React.PropsWithChildren<React.SVGProps<SVGSVGElement>>>;
  export default src;
}
