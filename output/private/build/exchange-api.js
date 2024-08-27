"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExchangeRate = getExchangeRate;
const rateCache = {};
async function getExchangeRate(context, base, target) {
    const url = `https://api.exchangerate-api.com/v4/latest/${base}`;
    try {
        let data = null;
        if (rateCache[base]) {
            data = rateCache[base];
        }
        else {
            const response = await context.fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            data = (await response.json());
            rateCache[base] = data; // 存储整个ExchangeRatesResponse对象到缓存
        }
        const rate = data.rates[target];
        if (rate === undefined) {
            throw new Error(`Exchange rate not found for target currency: ${target}`);
        }
        return rate;
    }
    catch (error) {
        console.error(`Error fetching exchange rate: ${error.message}`);
        return undefined; // 在 catch 块中返回 undefined 或根据需要处理错误
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjaGFuZ2UtYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2V4Y2hhbmdlLWFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVVBLDBDQStCQztBQWpDRCxNQUFNLFNBQVMsR0FBOEMsRUFBRSxDQUFDO0FBRXpELEtBQUssVUFBVSxlQUFlLENBQ25DLE9BQVksRUFDWixJQUFZLEVBQ1osTUFBYztJQUVkLE1BQU0sR0FBRyxHQUFHLDhDQUE4QyxJQUFJLEVBQUUsQ0FBQztJQUVqRSxJQUFJLENBQUM7UUFDSCxJQUFJLElBQUksR0FBMEIsSUFBSSxDQUFDO1FBQ3ZDLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDcEIsSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixDQUFDO2FBQU0sQ0FBQztZQUNOLE1BQU0sUUFBUSxHQUFHLE1BQU0sT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUM1RCxDQUFDO1lBQ0QsSUFBSSxHQUFHLENBQUMsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQTBCLENBQUM7WUFDeEQsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLGlDQUFpQztRQUMzRCxDQUFDO1FBRUQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVoQyxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLGdEQUFnRCxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQzVFLENBQUM7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDaEUsT0FBTyxTQUFTLENBQUMsQ0FBQyxtQ0FBbUM7SUFDdkQsQ0FBQztBQUNILENBQUMifQ==