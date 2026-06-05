export const BASE_PATH = "/invite";

export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`;
}
