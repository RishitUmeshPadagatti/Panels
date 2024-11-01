import { currentSelectedAtom, likedArrayAtom } from "@/atoms/atoms"
import { Colors } from "@/constants/Colors"
import { activeOpacity } from "@/constants/Values"
import { removeFromSecureStore, saveToSecureStore } from "@/functions/secureStoreFunctions"
import { useLikedPictureOrNot } from "@/hooks/useLikedPictureOrNot"
import { Ionicons } from "@expo/vector-icons"
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native"
import { useRecoilValue, useSetRecoilState } from "recoil"

export function LikeIconInModal() {
    const currentTheme = useColorScheme() || "light"
    const pictureLikedOrNot = useLikedPictureOrNot()

    const currentlySelected = useRecoilValue(currentSelectedAtom)
    const setLikedArray = useSetRecoilState(likedArrayAtom)
    
    const toggleLikePicture = async () => {
        if (pictureLikedOrNot){
            // Disliking
            await removeFromSecureStore(currentlySelected.id, "liked")
            setLikedArray((prevArray) => prevArray.filter((element) => element !== currentlySelected.id));
        }
        else {
            // Liking
            await saveToSecureStore(currentlySelected.id, "liked");
            setLikedArray((prevArray) => [currentlySelected.id, ...prevArray]);
        }
    }

    return <TouchableOpacity onPress={toggleLikePicture} style={styles.likeIcon} activeOpacity={activeOpacity}>
        <Ionicons name={pictureLikedOrNot ? "heart" : "heart-outline"} color={pictureLikedOrNot ? Colors.light.mkbhdOrange : Colors[currentTheme].text} size={30} />
    </TouchableOpacity >
} 

const styles = StyleSheet.create({
    likeIcon: {
        position: 'absolute',
        top: 12,
        right: 12,
        // zIndex: 1,
    }
})