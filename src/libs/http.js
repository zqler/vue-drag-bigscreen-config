import HttpRequest from "./request";
const getBaseUrl = env => {
  let base = {
    production: "http://388025c31y.wicp.vip",
    development: "/",
    test: "/"
  }[env];
  if (!base) {
    base = "/";
  }
  return base;
};
const env = process.env.NODE_ENV;
const url = getBaseUrl("development");
const http = new HttpRequest({ url });
export default http;
