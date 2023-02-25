declare module '*.svg' {
  import React from 'react';
  const src: React.FunctionComponent<React.PropsWithChildren<React.SVGProps<SVGSVGElement>>>;
  export default src;
}
