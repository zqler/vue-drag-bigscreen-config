export default self => {
  return [
    {
      title: "用户名",
      dataIndex: "userName",
      width: "20%",
      scopedSlots: { customRender: "name" }
    },
    {
      title: "电话号码",
      dataIndex: "phone",
      width: "20%"
    },
    {
      title: "角色",
      dataIndex: "roleType",
      width: "20%",
      customRender: (text, record, index) => {
        const roleType = self.userType[text];
        return roleType;
      }
    },
    {
      title: "密码",
      dataIndex: "password"
    },
    {
      title: "操作",
      dataIndex: "options",
      scopedSlots: { customRender: "options" },
      width: 150
    }
  ];
};
