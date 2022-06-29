export type YupErrorType = any &
  string & {
  key: string;
  values?: Record<string, PropertyKey>;
};

export const yupErrorMessage = (error: YupErrorType) => {

  return typeof(error) === 'string'?
    error:
    JSON.stringify(error);
};