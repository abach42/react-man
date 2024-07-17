export type User = {
  email: string;
  role: "ADMIN" | "USER";
  password?: string;
};
