interface URL {
  [key: string]: string;
}

export const setURLParams = (params: URL) => {
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    if (params[key]) searchParams.set(key, params[key]);
  });
  return searchParams.toString();
};

export const getURLParams = (queryString: string) => {
  return new URLSearchParams(queryString);
};
