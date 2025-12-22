declare module "*.html" {
  const rawHtmlFile: string;
  export = rawHtmlFile;
}

declare module "*.bmp" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "@gtn/login-mfe" {
  import { LifeCycles } from 'single-spa';
  const lifecycles: LifeCycles;
  export const { bootstrap, mount, unmount }: LifeCycles;
}

declare module "@gtn/member-mfe" {
  import { LifeCycles } from 'single-spa';
  const lifecycles: LifeCycles;
  export const { bootstrap, mount, unmount }: LifeCycles;
}

declare module "@gtn/librarian-mfe" {
  import { LifeCycles } from 'single-spa';
  const lifecycles: LifeCycles;
  export const { bootstrap, mount, unmount }: LifeCycles;
}

declare module "@gtn/admin-mfe" {
  import { LifeCycles } from 'single-spa';
  const lifecycles: LifeCycles;
  export const { bootstrap, mount, unmount }: LifeCycles;
}