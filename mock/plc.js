const Mock = require("mockjs");
module.exports = {
  "GET /get/test": function(req, res) {
    res.json(
      Mock.mock({
        code: 0,
        message: "",
        data: {}
      })
    );
  },
  "POST /v2/api-docs/plc/deletePlcInfo": function(req, res) {
    res.json(
      Mock.mock({
        code: 0,
        message: "",
        data: {}
      })
    );
  },
  "POST /v2/api-docs/plc/addPlcInfo": function(req, res) {
    res.json(
      Mock.mock({
        code: 0,
        message: "",
        data: {}
      })
    );
  },
  "GET /v2/api-docs/plc/getUserPlcInfo": function(req, res) {
    res.json(
      Mock.mock({
        code: 0,
        message: "",
        "data|1-100": [
          {
            byteOrder: "@int(1-100)",
            id: "@string",
            ip: "@ip",
            name: "@name",
            devCount: "@integer(1, 1000)",
            "protocol|1": ["1", "2", "3"],
            "userInfos|0-5": [
              {
                userName: "@name",
                id: "@string"
              }
            ]
          }
        ]
      })
    );
  },
  "POST /v2/api-docs/plc/updatePlcInfo": function(req, res) {
    res.json(
      Mock.mock({
        code: 0,
        message: "",
        data: {}
      })
    );
  },
  "POST /v2/api-docs/dev/deleteDevById": function(req, res) {
    res.json(
      Mock.mock({
        code: 0,
        message: "",
        data: {}
      })
    );
  },
  "POST /v2/api-docs/dev/AddDeviceInfo": function(req, res) {
    res.json(
      Mock.mock({
        code: 0,
        message: "",
        data: {}
      })
    );
  },
  "GET /v2/api-docs/dev/getDeviceInfo": function(req, res) {
    res.json(
      Mock.mock({
        code: 0,
        message: "",
        data: {
          total: 100,
          "list|1-100": [
            {
              address: "@int(1-4)",
              id: "@string",
              deviceNumber: "@int(1-4)",
              deviceName: "@name",
              plcId: "@string",
              plcName: "@name"
            }
          ]
        }
      })
    );
  },
  "POST /v2/api-docs/dev/updateDeviceInfo": function(req, res) {
    res.json(
      Mock.mock({
        code: 0,
        message: "",
        data: {}
      })
    );
  },
  "GET /electric/dev/getDeviceDataByPlcId": function(req, res) {
    res.json(
      Mock.mock({
        code: 0,
        message: "",
        "data|0-15": [
          {
            aelectric: "@integer(1, 1000)",
            alineVoltage: "@integer(1, 1000)",
            avgElectric: "@integer(1, 1000)",
            avoltage: "@integer(1, 1000)",
            batteryVoltage: "@integer(1, 1000)",
            belectric: "@integer(1, 1000)",
            blineVoltage: "@integer(1, 1000)",
            bvoltage: "@integer(1, 1000)",
            cbOpen: "@integer(0, 1)",
            celectric: "@integer(1, 1000)",
            clineVoltage: "@integer(1, 1000)",
            cvoltage: "@integer(1, 1000)",
            engineRpm: "@integer(1, 1000)",
            frequency: "@integer(1, 1000)",
            fuelLevel: "@integer(1, 1000)",
            gensetRuning: "@integer(1, 1000)",
            manual: "@integer(0, 2)",
            notInAuto: "@integer(1, 1000)",
            oilPressure: "@integer(1, 1000)",
            powerFactor: "@integer(1, 1000)",
            powerPercentage: "@integer(1, 1000)",
            remoteStart: "@integer(1, 1000)",
            shutDown: "@integer(1, 1000)",
            totalPower: "@integer(1, 1000)",
            unitRunTime: "@integer(1, 1000)",
            unitStatus: "@integer(1, 1000)",
            voltage: "@integer(1, 1000)",
            warring: "@integer(1, 1000)",
            waterTemperature1: "@integer(1, 1000)"
          }
        ]
      })
    );
  }
};
