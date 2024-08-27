"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_basekit_server_api_1 = require("@lark-opdev/block-basekit-server-api");
const const_1 = require("./const");
const exchange_api_1 = require("./exchange-api");
const { t } = block_basekit_server_api_1.field;
// 通过addDomainList添加请求接口的域名
block_basekit_server_api_1.basekit.addDomainList(["api.exchangerate-api.com"]);
block_basekit_server_api_1.basekit.addField({
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
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Number],
            },
            validator: {
                required: true,
            },
        },
        {
            key: "currency_type",
            label: t("currency_type"),
            component: block_basekit_server_api_1.FieldComponent.SingleSelect,
            props: {
                options: const_1.CURRENCY.map((item) => {
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
            component: block_basekit_server_api_1.FieldComponent.SingleSelect,
            props: {
                options: const_1.CURRENCY.map((item) => {
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
        type: block_basekit_server_api_1.FieldType.Number,
    },
    // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
    execute: async (formItemParams, context) => {
        const { convert_currency, currency_label, currency_type } = formItemParams;
        // 默认为人民币
        const transformRate = await (0, exchange_api_1.getExchangeRate)(context, currency_type.value, convert_currency.value);
        if (!transformRate) {
            return {
                code: block_basekit_server_api_1.FieldCode.Error,
                data: null,
            };
        }
        return {
            code: block_basekit_server_api_1.FieldCode.Success,
            data: currency_label * transformRate,
        };
    },
});
exports.default = block_basekit_server_api_1.basekit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFNOEM7QUFFOUMsbUNBQW1DO0FBQ25DLGlEQUFpRDtBQUVqRCxNQUFNLEVBQUUsQ0FBQyxFQUFFLEdBQUcsZ0NBQUssQ0FBQztBQUVwQiwyQkFBMkI7QUFDM0Isa0NBQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUM7QUFFcEQsa0NBQU8sQ0FBQyxRQUFRLENBQUM7SUFDZiwyQ0FBMkM7SUFDM0Msb0JBQW9CO0lBQ3BCLE1BQU07SUFDTixxQkFBcUI7SUFDckIsMkJBQTJCO0lBQzNCLHdCQUF3QjtJQUN4QixzQkFBc0I7SUFDdEIsaURBQWlEO0lBQ2pELCtDQUErQztJQUMvQyxpREFBaUQ7SUFDakQsTUFBTTtJQUNOLEtBQUs7SUFDTCxnQkFBZ0I7SUFDaEIsSUFBSSxFQUFFO1FBQ0osUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBRSxJQUFJO2dCQUNwQixhQUFhLEVBQUUsUUFBUTtnQkFDdkIsZ0JBQWdCLEVBQUUsUUFBUTtnQkFDMUIsR0FBRyxFQUFFLEtBQUs7Z0JBQ1YsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLE9BQU87Z0JBQ1osR0FBRyxFQUFFLFFBQVE7Z0JBQ2IsR0FBRyxFQUFFLE9BQU87Z0JBQ1osR0FBRyxFQUFFLE1BQU07Z0JBQ1gsR0FBRyxFQUFFLE1BQU07Z0JBQ1gsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLE1BQU07Z0JBQ1gsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLEtBQUs7Z0JBQ1YsR0FBRyxFQUFFLE9BQU87YUFDYjtZQUNELE9BQU8sRUFBRTtnQkFDUCxjQUFj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