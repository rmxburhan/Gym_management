import { existsSync, unlinkSync } from "fs";
import path from "path";

export const publicExistSync = (url: string) => {
  return existsSync(path.join(process.cwd(), "public/", url));
};

export const publicRemoveSync = (url: string) => {
  return unlinkSync(path.join(process.cwd(), "public/", url));
};
