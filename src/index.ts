import {
  basekit,
  FieldType,
  field,
  FieldComponent,
  FieldCode,
} from "@lark-opdev/block-basekit-server-api";

import { CURRENCY } from "./const";
import { getExchangeRate } from "./exchange-api";

const { t } = field;

// 通过addDomainList添加请求接口的域名
basekit.addDomainList(["api.exchangerate-api.com"]);

basekit.addField({
  // 可选的授权。声明捷径需要 HeaderBearerToken APIKey 授权
  // authorizations: [
  //   {
  //     id: 'Outlook',
  //     platform: 'Outlook',
  //     label: 'Outlook',
  //     required:false,
  //     type: AuthorizationType.HeaderBearerToken,
  //     // 通过 instructionsUrl 向用户显示获取 APIKey 的地址
  //     instructionsUrl: 'https://www.feishu.cn/',
  //   }
  // ],
  // 定义捷径的i18n语言资源
  i18n: {
    messages: {
      "zh-CN": {
        currency_label: "货币",
        currency_type: "当前货币类型",
        convert_currency: "选择转换货币",
        CNY: "人民币",
        USD: "美元",
        EUR: "欧元",
        GBP: "英镑",
        AUD: "澳大利亚元",
        AED: "阿联酋迪拉姆",
        BRL: "巴西雷亚尔",
        CAD: "加拿大元",
        CHF: "瑞士法郎",
        HKD: "港元",
        INR: "印度卢比",
        JPY: "日元",
        KRW: "韩元",
        MOP: "澳门元",
        MXN: "墨西哥比索",
      },
      "en-US": {
        currency_label: "Currency",
        currency_type: "Currency Type",
        convert_currency: "Select the currency to convert",
        CNY: "RMB",
        USD: "Dollar",
        EUR: "EUR",
        GBP: "GBP",
        AUD: "Australian dollar",
        AED: "United Arab Emirates dirham",
        BRL: "Brazilian Real",
        CAD: "Canadian dollar",
        CHF: "Swiss franc",
        HKD: "Hong Kong dollar",
        INR: "Indian Rupee",
        JPY: "JPY",
        KRW: "Won",
        MOP: "Macau Pataca",
        MXN: "Mexican peso",
      },
      "ja-JP": {
        currency_label: "通貨",
        currency_type: "通貨タイプ",
        convert_currency: "変換する通貨を選択してください",
        CNY: "人民元",
        USD: "米ドル",
        EUR: "ユーロ",
        GBP: "ポンド",
        AUD: "豪ドル",
        AED: "アラブ首長国連邦ディラム",
        BRL: "ブラジルレアル",
        CAD: "カナダドル",
        CHF: "スイスフラン",
        HKD: "香港ドル",
      },
    },
  },
  // 定义捷径的入参
  formItems: [
    {
      key: "currency_label",
      label: t("currency_label"),
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Number],
      },
      validator: {
        required: true,
      },
    },
    {
      key: "currency_type",
      label: t("currency_type"),
      component: FieldComponent.SingleSelect,
      props: {
        options: CURRENCY.map((item) => {
          return {
            label: t(item.name),
            value: item.value,
          };
        }),
      },
      validator: {
        required: true,
      },
    },
    {
      key: "convert_currency",
      label: t("convert_currency"),
      component: FieldComponent.SingleSelect,
      props: {
        options: CURRENCY.map((item) => {
          return {
            label: t(item.name),
            value: item.value,
          };
        }),
      },
      validator: {
        required: true,
      },
    },
  ],
  // 定义捷径的返回结果类型
  resultType: {
    type: FieldType.Number,
  },
  // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
  execute: async (formItemParams, context) => {
    const { convert_currency, currency_label, currency_type } = formItemParams;
    // 默认为人民币
    const transformRate = await getExchangeRate(
      context,
      currency_type.value,
      convert_currency.value
    );
    if (!transformRate) {
      return {
        code: FieldCode.Error,
        data: null,
      };
    }

    return {
      code: FieldCode.Success,
      data: currency_label * transformRate,
    };
  },
});
export default basekit;
