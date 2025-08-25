"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HyperUnitClient = void 0;
const axios_1 = __importDefault(require("axios"));
const types_1 = require("./types");
const constants_1 = require("./constants");
/**
 * HTTP Client for HyperUnit API using Axios
 */
class HyperUnitClient {
    constructor(config) {
        this.axiosInstance = axios_1.default.create({
            baseURL: constants_1.BASE_URL[config.environment || "mainnet"],
            timeout: config.timeout || 30000,
            headers: {
                "Content-Type": "application/json",
                ...config.headers,
            },
        });
    }
    /**
     * Make a GET request to the HyperUnit API
     */
    async get(url, params) {
        try {
            const config = {
                method: "GET",
                url,
                params,
            };
            const response = await this.axiosInstance.request(config);
            return {
                data: response.data,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
            };
        }
        catch (error) {
            if (error.response) {
                throw new types_1.HyperUnitError(error.response.data?.error || "API request failed", error.response.status, error.response.data?.code, error.response.data);
            }
            else if (error.request) {
                throw new types_1.HyperUnitError("Network error: No response received");
            }
            else {
                throw new types_1.HyperUnitError(`Request error: ${error.message}`);
            }
        }
    }
}
exports.HyperUnitClient = HyperUnitClient;
//# sourceMappingURL=client.js.map