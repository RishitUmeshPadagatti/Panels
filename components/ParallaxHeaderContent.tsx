import { useCarPictures } from "@/hooks/useCarPictures"
import { Image } from "expo-image"
import { useState } from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import Carousel from "react-native-reanimated-carousel"

export function ParallaxHeaderContent() {
    const pictures = useCarPictures()
    const width = Dimensions.get('window').width
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <Carousel
                loop
                width={width}
                // height={width / 2}
                // autoPlay={true}  // Uncomment this
                autoPlayInterval={3500}
                scrollAnimationDuration={900}
                data={[...pictures]}
                // onSnapToItem={(index) => setActiveIndex(index)}
                onProgressChange={(_, absoluteProgress) => {
                    setActiveIndex(Math.round(absoluteProgress))
                }}
                renderItem={({ index }) => {
                    return (
                        <Image
                            style={{ width: '100%', height: '100%' }}
                            source={{ uri: pictures[index].url }}
                            placeholder={{ uri: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' }}
                            // transition={500}
                            cachePolicy={'memory'}
                        />
                    )
                }}
            />
            <View style={styles.dotContainer}>
                {pictures.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            activeIndex === index && styles.activeDot
                        ]}
                    />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        width: '100%',
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 4,
        backgroundColor: 'gray',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: 'white',
        width: 8,
        height: 8,
    },
})