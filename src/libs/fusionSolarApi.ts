// src/services/fusionSolarApi.ts
import { createResource, createSignal } from "solid-js";

const API_BASE_URL = "https://eu5.fusionsolar.huawei.com/thirdData";

export interface LoginResponse {
    success: boolean;
    data: string; // xsrf-token
}

export interface StationData {
    // Define the structure of your station data here
    stationCode: string;
    stationName: string;
    instantPower: string;
    percentageOfNeed: string;
    treesPlanted: string;
}

export function createFusionSolarApi() {
    const [xsrfToken, setXsrfToken] = createSignal<string | null>(null);

    async function login(username: string, password: string) {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName: username,
                systemCode: password,
            }),
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        const data: LoginResponse = await response.json();
        if (data.success) {
            setXsrfToken(data.data);
            return true;
        }
        return false;
    }

    async function getStationList() {
        if (!xsrfToken()) {
            throw new Error("Not authenticated");
        }

        const response = await fetch(`${API_BASE_URL}/getStationList`, {
            method: "POST",
            headers: {
                "XSRF-TOKEN": xsrfToken()!,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch station list");
        }

        return await response.json();
    }

    const [stationData] = createResource<StationData[], Error>(getStationList);

    return {
        login,
        stationData,
        isLoading: () => stationData.loading,
        error: () => stationData.error,
    };
}