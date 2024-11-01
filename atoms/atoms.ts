import { Picture, values } from "@/constants/Values";
import { getFromSecureStore } from "@/functions/secureStoreFunctions";
import { atom, selector } from "recoil";

export const likedArrayAtom = atom<number[]>({
    key: 'likedArrayAtom',
    default: selector({
        key: 'likedArrayAtomSelector',
        get: async () => {
            const data = await getFromSecureStore('liked');
            return data ? JSON.parse(data) : [];
        }
    })
})

export const libraryArrayAtom = atom<number[]>({
    key: 'libraryArrayAtom',
    default: selector({
        key: 'libraryArrayAtomSelector',
        get: async () => {
            const data = await getFromSecureStore('library');
            return data ? JSON.parse(data) : [];
        }
    })
})

export const likedPicturesAtom = selector<Picture[]>({
    key: 'likedPicturesAtom',
    get: async ({ get }) => {
        const dataArray = get(likedArrayAtom)
        const filteredElements = values
            .filter(element => dataArray.includes(element.id))
            .sort((a, b) => dataArray.indexOf(a.id) - dataArray.indexOf(b.id));
        return filteredElements
    }
})

export const libraryPicturesAtom = selector<Picture[]>({
    key: 'libraryPicturesAtom',
    get: async ({ get }) => {
        const dataArray = get(libraryArrayAtom)
        const filteredElements = values
            .filter(element => dataArray.includes(element.id))
            .sort((a, b) => dataArray.indexOf(a.id) - dataArray.indexOf(b.id));
        return filteredElements
    }
})

export const allPicturesAtom = atom<Picture[]>({
    key: 'allPicturesAtom',
    default: selector({
        key: 'allPicturesAtomSelector',
        get: ({ get }) => {
            const likedArray = get(likedArrayAtom);
            const libraryArray = get(libraryArrayAtom);
            const filteredElements = values.filter((element) => {
                return !likedArray.includes(element.id) && !libraryArray.includes(element.id);
            })

            return filteredElements;
        }
    })
})

export const showModalAtom = atom<boolean>({
    key: 'showModalAtom',
    default: false
})

export const currentSelectedAtom = atom<Picture>({
    key: 'currentSelectedAtom',
    default: { id: 0, url: "" }
})