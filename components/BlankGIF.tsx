import { Image } from "expo-image";
import { ThemedView } from "./ThemedView";
import BlankGif from "../assets/images/blank.webp"

export function BlankGIF(){
    return <ThemedView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image 
                source={BlankGif}
                style={{width: 200, height: 200, borderRadius: 10}}
            />
        </ThemedView>
}