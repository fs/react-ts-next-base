declare module '*.svg' {
  import { FC, PropsWithChildren, SVGProps } from 'react';
  const src: FC<PropsWithChildren<SVGProps<SVGSVGElement>>>;
  export default src;
}
