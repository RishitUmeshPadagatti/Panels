import { allPicturesAtom } from "@/atoms/atoms";
import { ImageComponent } from "@/components/ImageComponent";
import { ParallaxHeaderContent } from "@/components/ParallaxHeaderContent";
import { ModalPicture } from "@/components/ModalPicture";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";
import { useRecoilValue } from "recoil";

export default function Index() {
	
	return (
		<ThemedView style={styles.container}>
			<ParallaxScrollView
				headerImage={<ParallaxHeaderContent />}
				headerBackgroundColor={{ dark: 'black', light: 'white' }}
			>

				<AllPicturesComponent />
			</ParallaxScrollView>

			<ModalPicture />
		</ThemedView>
	);
}


function AllPicturesComponent() {
	const allPictures = useRecoilValue(allPicturesAtom);

	return (
		<ThemedView style={styles.allPicturesContainer}>
			{allPictures.map((element) => (
				<ImageComponent
					key={element.id}
					picture={element}
				/>
			))}
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	allPicturesContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		gap: 13,

		paddingTop: 15,
	},
});
