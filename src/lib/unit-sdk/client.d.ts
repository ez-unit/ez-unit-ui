import { HyperUnitConfig, ApiResponse } from "./types";
/**
 * HTTP Client for HyperUnit API using Axios
 */
export declare class HyperUnitClient {
    private axiosInstance;
    constructor(config: HyperUnitConfig);
    /**
     * Make a GET request to the HyperUnit API
     */
    get<T>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>>;
}
//# sourceMappingURL=client.d.ts.map