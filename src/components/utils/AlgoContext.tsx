import { createContext, useState, useEffect } from 'react';
import { getInsertionSortAnims } from './algorithms/insertionSort';
import { getMergeSortAnims } from './algorithms/mergeSort';

const initVals: Settings = {
    algoType: "merge sort",
    arrayLen: 25,
    delay: 15,
}

export type Algo = "merge sort" | "insertion sort"

interface Settings {
    algoType: Algo,
    arrayLen: number;
    delay: number;
}

type SettingsContext = {
    settings: Settings,
    setSettings?: React.Dispatch<React.SetStateAction<Settings>>
    sort: (alogType: Algo) => void;
}

export const Context = createContext<SettingsContext>({ 
    settings: initVals,
    sort : () => {},  
});

type Items = {
    items : number[],
    setItems ?: React.Dispatch<React.SetStateAction<number[]>>
}

export const ItemsContext = createContext<Items>({ 
    items: [] 
});
   
interface Props{
    children: React.ReactNode;
}

const AlgoContext: React.FC<Props> = ({ children }) => {
    const [settings, setSettings] = useState(initVals)
    const [items, setItems] = useState<number[]>([])
    

    useEffect(() => {
        const randomNum = [];
        for (let i = 0; i < settings.arrayLen; i++) {
            randomNum.push(Math.floor(Math.random() * 540));
        }
        setItems(randomNum);
        console.log(randomNum);
    }, [settings.arrayLen])

    const sort = (algoType: Algo) => {
        // console.log(algoType);

        switch (algoType) {
            case "insertion sort":
                const { newArr, animArr } = getInsertionSortAnims(items);
                animateDivs(newArr, animArr) 
                // console.log(newArr);  
                break;
            case "merge sort":
                const aux: number[] = [];
                const arr: number[][] = [];
                const nums = [...items];
                getMergeSortAnims([...items], aux, arr, 0, items.length - 1);
                animateMerge(nums, arr);
                break;
            default:
                break;
        }
    };

    const animateMerge = (newArr: number[], arr: number[][]) => {
        arr.forEach(([newHeight, index], idx) => {
            const div = document.getElementById(`${index}`);
            if (!div) return;
            setTimeout(() => {
                div.style.backgroundColor = "#b041f0";
                div.style.height = `${newHeight / 7}%`;
                setTimeout(() => {
                    div.style.backgroundColor = "#482";
                    if (idx === arr.length - 1) {
                        setItems(newArr);
                    }
                }, settings.delay * 2);
            }, settings.delay * idx * 2);
        });
    }

    const animateDivs = (newArr: number[], arr: number[][]) => {
        arr.forEach(([first, second], idx) => {
            const div = document.getElementById(`${first}`);
            const div2 = document.getElementById(`${second}`);

            if (!div || !div2) return ;
            setTimeout(() => {
                div.style.backgroundColor = "#b041f0";
                div2.style.backgroundColor = "#b041f0";
                const divHeight = div.style.height;;
                div.style.height = div2.style.height;
                div2.style.height = divHeight;
                setTimeout(() => {
                    div.style.backgroundColor = "#482";
                    div2.style.backgroundColor = "#482";
                    if (idx === arr.length - 1) {
                        setItems(newArr);
                    }
                }, settings.delay * 2);
            }, settings.delay * idx * 2);
        })
    }
  
    return (
        <ItemsContext.Provider value={{ items, setItems }}>
            <Context.Provider value={{ sort, settings, setSettings }}>
                {children}
            </Context.Provider>
        </ItemsContext.Provider>
    );
};

export default AlgoContext