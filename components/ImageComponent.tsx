import { currentSelectedAtom, showModalAtom } from "@/atoms/atoms";
import { activeOpacity, Picture } from "@/constants/Values";
import { Image } from "expo-image";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { useSetRecoilState } from "recoil";

interface Props {
    picture: Picture
}

export function ImageComponent({ picture }: Props) {
    const screenWidth = Dimensions.get('screen').width
    const imageWidth = (screenWidth / 2) - 16;
    const imageHeight = imageWidth * (16 / 9);

    const setShowModal = useSetRecoilState(showModalAtom)
    const setCurrentlySelected = useSetRecoilState(currentSelectedAtom)

    const changeModal = ({id, url}: Picture) => {
        setCurrentlySelected({id: id, url: url})
        setShowModal(true)
    }

    return <TouchableOpacity onPress={() => changeModal(picture)} activeOpacity={activeOpacity}>
        <Image
            style={[{ width: imageWidth, height: imageHeight }, styles.imageStyles]}
            source={{uri: picture.url}}
            contentFit="cover"
            cachePolicy={'memory-disk'}
        />
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    imageStyles: {
        borderRadius: 10,
    },
})