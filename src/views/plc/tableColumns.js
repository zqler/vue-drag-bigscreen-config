export default self => {
  return [
    {
      title: "PLC站点名",
      dataIndex: "name",
      width: "20%",
      scopedSlots: { customRender: "name" }
    },
    {
      title: "plc索引",
      dataIndex: "index",
      width: "20%"
    },
    {
      title: "心跳信息",
      dataIndex: "heartbeatMessage",
      width: "20%"
    },
    {
      title: "协议类型",
      dataIndex: "protocol",
      width: "20%",
      scopedSlots: { customRender: "protocol" }
    },
    {
      title: "用户名",
      dataIndex: "userInfos",
      scopedSlots: { customRender: "userInfos" }
    },
    {
      title: "操作",
      dataIndex: "options",
      scopedSlots: { customRender: "options" },
      width: 150
    }
  ];
};
