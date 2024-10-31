import { likedPicturesAtom, showModalAtom } from "@/atoms/atoms"
import { ImageComponent } from "@/components/ImageComponent"
import { ThemedView } from "@/components/ThemedView"
import { ScrollView, StyleSheet, View } from "react-native"
import { useRecoilValue } from "recoil"
import { BlankGIF } from "@/components/BlankGIF"
import { ModalPicture } from "@/components/ModalPicture"

export const LikedScreen = () => {
    const likedPictures = useRecoilValue(likedPicturesAtom)

    if (likedPictures.length == 0) {
        return <BlankGIF />
    }
    else {
        return <ThemedView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.imagesContainer}>
                {likedPictures.map((element) => (
                    <ImageComponent
                        key={element.id}
                        picture={element}
                    />
                ))}
            </ScrollView>

            <ModalPicture />
        </ThemedView>
    }
}

const styles = StyleSheet.create({
    imagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 13,

        paddingTop: 15,
    },
})