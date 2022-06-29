import { isEmpty, omitBy } from "lodash";

export const compact = (params: any) => omitBy(params, isEmpty);


export const parseError = (e: Error): Error&{msg} => ({
  ...e,
  msg: e.stack.split('\n')[0].split(": ").slice(-1)[0],
});