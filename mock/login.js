const Mock = require("mockjs");
const data = Mock.mock({
  code: 0,
  message: "",
  "data|0-20": [
    {
      address: "@string",
      id: "@string",
      password: "123456",
      phone: "15108252197",
      roleType: "@int(1-3)",
      userName: "@name"
    }
  ]
});
module.exports = {
  "POST /v2/api-docs/user/userLogin": function(req, res) {
    res.json({
      code: 0,
      message: "",
      data: {
        address: "",
        id: "154445",
        password: "45454564",
        phone: "15108252197",
        roleType: 0,
        userName: "abc",
        token: "4145456458645450"
      }
    });
  },
  "POST /electric/user/logout": function(req, res) {
    res.json({
      code: 0,
      message: "",
      data: {
        token: "1111555fdklffdlkfjf"
      }
    });
  },
  "GET /v2/api-docs/user/getAllUser": function(req, res) {
    res.json(
      Mock.mock({
        code: 0,
        message: "",
        "data|1-50": [
          {
            address: "@string",
            id: "@string",
            password: "@string(6,32)",
            phone: "15108252197",
            roleType: "@int(1-3)",
            userName: "@name"
          }
        ]
      })
    );
  },
  "GET /v2/api-docs/user/getAllUserWithPage": function(req, res) {
    res.json(
      Mock.mock({
        code: 0,
        message: "",
        data: {
          total: 100,
          "list|0-20": [
            {
              address: "@string",
              id: "@string",
              password: "@string(6,32)",
              phone: "15108252197",
              roleType: "@int(1-3)",
              userName: "@name"
            }
          ]
        }
      })
    );
  },
  "POST /v2/api-docs/user/deleteUserById": function(req, res) {
    res.json(
      Mock.mock({
        code: 0,
        message: "",
        data: {}
      })
    );
  },
  "POST /v2/api-docs/user/updateUser": function(req, res) {
    res.json(
      Mock.mock({
        code: 0,
        message: "",
        data: {}
      })
    );
  }
};
