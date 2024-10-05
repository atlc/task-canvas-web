export const TOKEN_KEY = 'token';
export const SERVER_URL = import.meta.env.VITE_SERVER_URL;

async function fetcher<T = any>(url: string, method: string = "GET", rawData?: any) {
    const headers: HeadersInit = {}
    const options: RequestInit = { headers, method };

    if (method === "POST" || method === "PUT") {
        headers['Content-Type'] = 'application/json';
        options['body'] = JSON.stringify(rawData);
    }

    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }

    try {
        const res = await fetch(SERVER_URL + url, options);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message)

        return data as T
    } catch (error) {
        throw error
    }
}


export const GET = <T = any>(url: string) => fetcher<T>(url);
export const POST = <T = any>(url: string, rawData: any) => fetcher<T>(url, 'POST', rawData);
export const PUT = <T = any>(url: string, rawData: any) => fetcher<T>(url, 'PUT', rawData);
export const DELETE = <T = any>(url: string) => fetcher<T>(url, 'DELETE');