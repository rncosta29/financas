import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = new Storage({
    size: 100,
    storageBackend: AsyncStorage,
    defaultExpires: 1000*3600*24,
    enableCache: true,
    sync: {

    }
});