import { currentSelectedAtom, likedArrayAtom } from "@/atoms/atoms";
import { Picture } from "@/constants/Values";
import { useRecoilValue } from "recoil";

export function useLikedPictureOrNot (): boolean {
    const currentlySelected = useRecoilValue<Picture>(currentSelectedAtom)
    const likedArray = useRecoilValue<number[]>(likedArrayAtom)

    return likedArray.includes(currentlySelected.id)
}