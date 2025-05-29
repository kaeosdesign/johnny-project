import { json } from "@solidjs/router";
import { XSRF_TOKEN, login } from "../login";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const API_USER_NAME = import.meta.env.VITE_API_USER_NAME as string;
const API_SYSTEM_CODE = import.meta.env.VITE_API_SYSTEM_CODE as string;

async function getStationList(XSRF_TOKEN: string) {
    const response = await fetch(`${API_BASE_URL}/getStationList`, {
        method: "POST",
        headers: {
            "XSRF-TOKEN": XSRF_TOKEN,
            "Content-Type": "application/json",
            Cookie: `XSRF-TOKEN=${XSRF_TOKEN}`,
        },
        body: JSON.stringify({}),
    });

    if (!response.ok) {
        throw new Error("Failed to get station list");
    }

    return response.json();
}

async function getStationRealKpi(XSRF_TOKEN: string, stationCode: string) {
    const response = await fetch(`${API_BASE_URL}/getStationRealKpi`, {
        method: "POST",
        headers: {
            "XSRF-TOKEN": XSRF_TOKEN,
            "Content-Type": "application/json",
            Cookie: `XSRF-TOKEN=${XSRF_TOKEN}`,
        },
        body: JSON.stringify({
            stationCodes: stationCode,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to get station real KPI");
    }

    return response.json();
}

export async function GET() {
    try {
        const xsrfToken = await login();
        if (!xsrfToken) {
            throw new Error("Failed to obtain XSRF token");
        }
        const stationList = await getStationList(xsrfToken);
        const stationName = stationList.data[1]?.stationName;
        const stationAddr = stationList.data[1]?.stationAddr;
        const stationCode = stationList.data[1]?.stationCode;
        if (!stationCode) {
            throw new Error("No station found");
        }
        const stationData = await getStationRealKpi(xsrfToken, stationCode);
        return json({ success: true, data: { stationName, stationAddr, stationData } }, { status: 200 });
    } catch (error) {
        return json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
