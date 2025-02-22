export async function fetchFromAPI(url: string) {
    try {
        const response = await fetch(url+"?limit=5");
        if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error("API fetch error:", error);
        return null;
    }
}
