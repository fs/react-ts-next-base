import { useRouter as useNativeRouter } from 'next/router';
import querystring from 'query-string';
import { UrlObject } from 'url';

const useRouter = () => {
  const { push, ...rest } = useNativeRouter();
  return {
    ...rest,
    pushRoute: (url: UrlObject | string) =>
      push(
        typeof url === 'string'
          ? url
          : {
              ...url,
              query:
                typeof url.query === 'string'
                  ? url.query
                  : querystring.stringify(url?.query || {}, { skipNull: true }),
            },
      ),
  };
};

export default useRouter;
