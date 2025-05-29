import { json } from "@solidjs/router";

import { useSession, setCookie, readBody } from "vinxi/http";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const API_USER_NAME = import.meta.env.VITE_API_USER_NAME as string;
const API_SYSTEM_CODE = import.meta.env.VITE_API_SYSTEM_CODE as string;

//
async function login() {
    "use server";
    const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userName: `${API_USER_NAME}`,
            systemCode: `${API_SYSTEM_CODE}`,
        }),
    });
    if (!res.ok) {
        throw new Error("Login failed");
    }
    const token = res.headers.get("xsrf-token");
    return token;
}

export async function GET() {
    try {
        const token = await login();
        if (!token) {
            throw new Error("Failed to obtain XSRF token");
        }
        setCookie("XSRF-TOKEN", token?.toString() || "", { path: "/", secure: true });
        return json({ success: true, xsrfToken: token }, { status: 200 });
    } catch (error) {
        return json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
