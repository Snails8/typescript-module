import { doErrorUC } from "@/usecase/doErrorUC";

type DoErrorInput = {
  params: string | 'handler' | 'usecase' | 'repository';
  sub: string;
};

export function doErrorHandler(parent: any, args: { input: { params: string, sub: string } }, context: any, info: any) {
  const { params, sub } = args.input;
  
  if (params === 'handler') {
    throw new Error("arg error");
  }

  // ここでdoErrorUC関数を呼び出す（実装に応じて）
  doErrorUC(params);
  return 'error'
}