module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": "off",
    "key-spacing": [
      0,
      {
        singleLine: {
          beforeColon: false,
          afterColon: true
        },
        multiLine: {
          beforeColon: true,
          afterColon: true,
          align: "colon"
        }
      }
    ],
    //空行最多不能超过100行
    "no-multiple-empty-lines": [0, { max: 100 }],
    //关闭禁止混用tab和空格
    "no-mixed-spaces-and-tabs": [0],
    //数组第一个指定是否启用这个规则，第二个指定几个空格
    indent: [1, 2]
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        jest: true
      }
    }
  ]
};
