import { libraryPicturesAtom, likedPicturesAtom } from "@/atoms/atoms"
import { BlankGIF } from "@/components/BlankGIF"
import { ImageComponent } from "@/components/ImageComponent"
import { ModalPicture } from "@/components/ModalPicture"
import { ThemedView } from "@/components/ThemedView"
import { ScrollView, StyleSheet } from "react-native"
import { useRecoilValue } from "recoil"

export const LibraryScreen = () => {
    const libraryPictures = useRecoilValue(libraryPicturesAtom)

    if (libraryPictures.length == 0) {
        return <BlankGIF />
    }
    else {
        return <ThemedView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.imagesContainer}>
                {libraryPictures.map((element) => (
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
    }
})