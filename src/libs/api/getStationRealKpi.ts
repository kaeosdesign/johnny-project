import { json } from "@solidjs/router";
import { APIEvent } from "@solidjs/start/server";
import { createResource } from "solid-js";
import { getCookie } from "vinxi/http";

//returns this object
type StationListRealKPI = {
    stationCode: string;
    dataItemMap: {
        total_income: number;
        total_power: number;
        day_power: number;
        day_income: number;
        real_health_state: number;
        month_power: number;
    };
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
async function getStationRealKpi(stationCode: string): Promise<StationListRealKPI> {
    const res = await fetch(`${API_BASE_URL}/getStationRealKpi`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "XSRF-TOKEN": `${getCookie("XSRF-TOKEN")}`,
        },
        body: JSON.stringify({
            stationCodes: `${stationCode}`,
        }),
    });
    const data = await res.json();
    console.log("getStationRealKpi API response data:", data); // Log the response data
    return data;
}

const stationCode = "NE=146100863";
export async function GET(event: APIEvent) {
    const stationsRealKpi = await getStationRealKpi(stationCode);
    try {
        if (!getCookie("XSRF-TOKEN")) {
            return json({ fact: "No XSRF-TOKEN cookie found" }, { status: 401 });
        }
        return stationsRealKpi;
    } catch (error) {
        console.error("Error fetching  stationsRealKpi:", error);
        return { fact: "Failed to fetch stationsRealKpi", length: 0 };
    }
}
