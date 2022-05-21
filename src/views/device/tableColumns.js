export default self => {
  return [
    {
      title: "设备名称",
      dataIndex: "deviceName",
      width: "20%",
      scopedSlots: { customRender: "name" }
    },
    {
      title: "设备地址",
      dataIndex: "address",
      width: "20%"
    },
    {
      title: "设备编号",
      dataIndex: "deviceNumber",
      width: "20%",
      scopedSlots: { customRender: "deviceNumber" }
    },
    {
      title: "Plc名称",
      dataIndex: "plcName",
      scopedSlots: { customRender: "plcName" }
    },
    {
      title: "操作",
      dataIndex: "options",
      scopedSlots: { customRender: "options" },
      width: 150
    }
  ];
};
