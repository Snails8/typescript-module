import { QueryDoErrorArgs } from "@/generated/graphql";
import { doErrorUC } from "@/usecase/doErrorUC";

type DoErrorInput = {
  params: string | 'handler' | 'usecase' | 'repository';
  sub: string;
};

type DoErrorArgs = {
  input: DoErrorInput;
};

export function doErrorHandler(parent: any, args: QueryDoErrorArgs, context: any, info: any): string {
  const { params, sub } = args.input;
  if (params == null) {
    throw new Error("mission params");
  }
  if (params === 'handler') {
    throw new Error("arg error");
  }

  doErrorUC(params);
  return 'error'
}