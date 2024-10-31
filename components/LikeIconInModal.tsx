import { currentSelectedAtom } from "@/atoms/atoms"
import { Colors } from "@/constants/Colors"
import { activeOpacity, Picture } from "@/constants/Values"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native"
import { useRecoilState } from "recoil"

export function LikeIconInModal() {
    const currentTheme = useColorScheme() || "light"

    const [imageLikedOrNot, setImageLikedOrNot] = useState<boolean>(true)
    const [currentlySelected, setCurrentlySelected] = useRecoilState<Picture>(currentSelectedAtom)

    console.log(currentlySelected.id)

    const likePicture = () => {
        setImageLikedOrNot(e => !e)
    }

    return <TouchableOpacity onPress={likePicture} style={styles.likeIcon} activeOpacity={activeOpacity}>
        <Ionicons name={imageLikedOrNot ? "heart" : "heart-outline"} color={imageLikedOrNot ? Colors.light.mkbhdOrange : Colors[currentTheme].text} size={30} />
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