export const RouterPaths = {
  root: ():string => '/',
  product: (id: number | string):string => `/product/${id}`,
  notFound: ():string => '*',
};
