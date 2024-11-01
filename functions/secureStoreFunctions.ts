import * as SecureStore from 'expo-secure-store';

export type locationType = 'liked' | 'library'

export const saveToSecureStore = async (id: number, location: locationType) => {
    try {
        const existingData = await SecureStore.getItemAsync(location);

        let ids = [];
        try {
            ids = existingData ? JSON.parse(existingData) : [];
            if (!Array.isArray(ids)) ids = []; // Ensure it's an array
        } catch (e) {
            console.error("Error parsing JSON:", e);
            ids = []; // Fallback in case parsing fails
        }

        if (!ids.includes(id)) {
            ids.push(id);
            await SecureStore.setItemAsync(location, JSON.stringify(ids))
        }

    } catch (error) {
        console.error("\nError saving data", error)
    }
}

export const getFromSecureStore = async (location: locationType) => {
    try {
        const result = await SecureStore.getItemAsync(location);
        return result;
    } catch (error) {
        console.error("\nError getting data", error);
    }
};

export const removeFromSecureStore = async (id: number, location: locationType) => {
    try {
        const existingData = JSON.parse(await SecureStore.getItemAsync(location) || "");
        const updatedData = existingData.filter((item: number) => item !== id);
        await SecureStore.setItemAsync(location, JSON.stringify(updatedData))

    } catch (error) {
        console.error("\nError deleting data", error)
    }
}