export default {
  userInfoList: {},
  roleType:
    "" || localStorage.getItem("roleType")
      ? localStorage.getItem("roleType")
      : "",
  menu: [],
  userName: "" || JSON.parse(localStorage.getItem("userName"))
};
