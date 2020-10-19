import { serialize } from "cookie";

/**
 * This sets `cookie` on `res` object
 */
const cookie = (res: any, name: any, value: any, options: any = {}) => {
  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

  if ("maxAge" in options) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }

  res.setHeader("Set-Cookie", serialize(name, String(stringValue), options));
};

/**
 * Adds `cookie` function on `res.cookie` to set cookies for response
 */
const cookies = (handler: any) => (req, res) => {
  res.cookie = (name: any, value: any, options: any) =>
    cookie(res, name, value, options);

  return handler(req, res);
};

export default cookies;
