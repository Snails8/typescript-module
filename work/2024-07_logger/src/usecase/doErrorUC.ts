

export function doErrorUC(params: string) {
  if (params === 'usecase') {
    throw new Error("usecase error");
  }
  // throw new Error("Test error");
  return 'error'
}