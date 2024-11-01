import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import { Alert, Modal, Platform, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentSelectedAtom, libraryArrayAtom, showModalAtom } from "@/atoms/atoms";
import { activeOpacity, Picture } from "@/constants/Values";
import { LikeIconInModal } from "./LikeIconInModal";
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { saveToSecureStore } from "@/functions/secureStoreFunctions";

const saveImageToLibrary = async (imageUrl: string) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert("Permission denied", "We need permission to save images to your gallery.");
        return;
    }

    try {
        const fileUri = `${FileSystem.cacheDirectory}${imageUrl.split('/').pop()}`;
        const { uri } = await FileSystem.downloadAsync(imageUrl, fileUri);

        await MediaLibrary.createAssetAsync(uri);
        Alert.alert("Saved", "Image saved to your library!");
    } catch (error) {
        console.error("Error saving image:", error);
        Alert.alert("Error", "Failed to save the image.");
    }
};

export function ModalPicture() {
    const currentTheme = useColorScheme() || "light"

    const [showModal, setShowModal] = useRecoilState<boolean>(showModalAtom)
    const [currentlySelected, setCurrentlySelected] = useRecoilState<Picture>(currentSelectedAtom)
    const setLibraryArray = useSetRecoilState(libraryArrayAtom)

    const closeModal = () => {
        setCurrentlySelected({ id: 0, url: "" })
        setShowModal(false)
    }

    const saveToLibrary = async () => {
        if (currentlySelected.url) {
            saveImageToLibrary(currentlySelected.url);
            await saveToSecureStore(currentlySelected.id, "library");
            setLibraryArray((prevArray) => [currentlySelected.id, ...prevArray])
        }
    };

    return (
        <Modal animationType="slide" transparent={true} visible={showModal}>
            <View style={[{ backgroundColor: Colors[currentTheme].modalBackground }, styles.modalContainer]}>
                <SafeAreaView edges={['top', 'bottom']}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={{ width: '100%', height: '100%' }}
                            source={{ uri: currentlySelected.url }}
                            contentFit={"cover"}
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
        height: '75%',
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
        height: '25%',

        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        width: 280,
        height: 60,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    }
});