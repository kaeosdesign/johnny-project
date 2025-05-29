import { APIEvent } from "@solidjs/start/server";
import { createResource, createSignal } from "solid-js";
import { getCookie, setCookie } from "vinxi/http";

//returns this object
type StationList = [
    {
        aidType: 2147483647;
        buildState: string | null;
        capacity: number;
        combineType: string | null;
        linkmanPho: string;
        stationAddr: string;
        stationCode: string;
        stationLinkman: string;
        stationName: string;
    }
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
async function getStationList(): Promise<StationList> {
    const res = await fetch(`${API_BASE_URL}/getStationList`, {
        method: "POST",
        headers: {
            "XSRF-TOKEN": `${getCookie("XSRF-TOKEN")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    });
    const data = await res.json();
    console.log("getStationList API response data:", data);
    return data as StationList;
}

export async function GET(event: APIEvent) {
    try {
        const stations = await getStationList();
        return stations;
    } catch (error) {
        console.error("Error fetching  stations:", error);
        return { fact: "Failed to fetch stations", length: 0 };
    }
}
