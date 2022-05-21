import http from "@libs/http";
const commonUrl = "/electric";
const loginUrl = `${commonUrl}/user/userLogin`;
const logoutUrl = `${commonUrl}/user/logout`;
const allUserUrl = `${commonUrl}/user/getAllUser`;
const AllUserWithPageUrl = `${commonUrl}/user/getAllUserWithPage`;
const delUserUrl = `${commonUrl}/user/deleteUserById`;
const addUserUrl = `${commonUrl}/user/addUser`;
const postUserUrl = `${commonUrl}/user/updateUser`;
const addPlcUrl = `${commonUrl}/plc/addPlcInfo`;
const delPlcUrl = `${commonUrl}/plc/deletePlcInfo`;
const getPlcUrL = `${commonUrl}/plc/getUserPlcInfo`;
const updatePlcUrl = `${commonUrl}/plc/updatePlcInfo`;
const addDeviceUrl = `${commonUrl}/dev/AddDeviceInfo`;
const delDeviceUrl = `${commonUrl}/dev/deleteDevByIds`;
const getDeviceUrL = `${commonUrl}/dev/getDeviceInfo`;
const updateDeviceUrl = `${commonUrl}/dev/updateDeviceInfo`;
const deviceDataByPlcIdUrl = `${commonUrl}/dev/getDeviceDataByPlcId`;

export const login = async user => {
  return await http.request({
    url: loginUrl,
    method: "post",
    data: user
  });
};
export const logout = async user => {
  return await http.request({
    url: logoutUrl,
    method: "post",
    data: user
  });
};
export const getAllUserList = async user => {
  return await http.request({
    url: allUserUrl,
    method: "get",
    params: { ...user }
  });
};
export const getAllUser = async user => {
  return await http.request({
    url: AllUserWithPageUrl,
    method: "get",
    params: { ...user }
  });
};
export const deleteUser = async user => {
  return await http.request({
    url: delUserUrl,
    method: "post",
    data: { ...user }
  });
};
export const postUser = async user => {
  return await http.request({
    url: postUserUrl,
    method: "post",
    data: { ...user }
  });
};
export const addUser = async user => {
  return await http.request({
    url: addUserUrl,
    method: "post",
    data: { ...user }
  });
};
export const addPlc = async user => {
  return await http.request({
    url: addPlcUrl,
    method: "post",
    data: { ...user }
  });
};

export const delPlc = async user => {
  return await http.request({
    url: delPlcUrl,
    method: "post",
    data: { ...user }
  });
};

export const getPlc = async user => {
  return await http.request({
    url: getPlcUrL,
    method: "get",
    params: { ...user }
  });
};

export const updatePlc = async user => {
  return await http.request({
    url: updatePlcUrl,
    method: "post",
    data: { ...user }
  });
};

export const addDevice = async data => {
  return await http.request({
    url: addDeviceUrl,
    method: "post",
    data: { ...data }
  });
};

export const delDevice = async data => {
  return await http.request({
    url: delDeviceUrl,
    method: "post",
    data: { ...data }
  });
};

export const getDevice = async params => {
  return await http.request({
    url: getDeviceUrL,
    method: "get",
    params: { ...params }
  });
};

export const updateDevice = async data => {
  return await http.request({
    url: updateDeviceUrl,
    method: "post",
    data: { ...data }
  });
};
export const getDeviceDataByPlcId = async params => {
  return await http.request({
    url: deviceDataByPlcIdUrl,
    method: "get",
    params: { ...params }
  });
};
export const getTestCancelToken = async params => {
  return await http.request({
    url: "/get/test",
    method: "get",
    params: { ...params }
  });
};
