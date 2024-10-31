import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecoilState } from "recoil";
import { currentSelectedAtom, showModalAtom } from "@/atoms/atoms";
import { activeOpacity, Picture } from "@/constants/Values";
import { LikeIconInModal } from "./LikeIconInModal";

interface Props {
    pictureUrl: string
}

export function ModalPicture() {
    const currentTheme = useColorScheme() || "light"

    const [showModal, setShowModal] = useRecoilState<boolean>(showModalAtom)
    const [currentlySelected, setCurrentlySelected] = useRecoilState<Picture>(currentSelectedAtom)

    const saveToLibrary = () => {
        console.log("Save to Library")
    }

    const closeModal = () => {
        setCurrentlySelected({id: 0, url: ""})
        setShowModal(false)
    }

    return (
        <Modal animationType="slide" transparent={true} visible={showModal}>
            <View style={[{ backgroundColor: Colors[currentTheme].modalBackground }, styles.modalContainer]}>
                <SafeAreaView edges={['top', 'bottom']}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={{ width: '100%', height: '100%' }}
                            source={{ uri: currentlySelected.url }}
                            contentFit="cover"
                            cachePolicy={'memory-disk'}
                        />
                        <TouchableOpacity onPress={closeModal} style={styles.closeIcon} activeOpacity={activeOpacity}>
                            <Ionicons name="close" color={Colors[currentTheme].text} size={30} />
                        </TouchableOpacity>

                        
                        <LikeIconInModal />
                        
                    </View>

                    <View style={styles.parentButtonContainer}>
                        <TouchableOpacity onPress={saveToLibrary} activeOpacity={activeOpacity}>
                            <View style={[styles.buttonContainer, { backgroundColor: Colors[currentTheme].mkbhdOrange }]}>
                                <Ionicons name="arrow-down-circle" size={23} />
                                <Text style={[styles.buttonText, { backgroundColor: Colors[currentTheme].mkbhdOrange }]}>SAVE TO LIBRARY</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '92%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    imageContainer: {
        height: '78%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        overflow: 'hidden',

        position: 'relative',
    },
    closeIcon: {
        position: 'absolute',
        top: 12,
        left: 12,
        // zIndex: 1,
    },
    parentButtonContainer: {
        height: '22%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        paddingHorizontal: 25,
        paddingVertical: 20,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    }
});