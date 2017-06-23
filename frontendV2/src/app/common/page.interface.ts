import { CachableObject } from "./cachable-object.interface";


export interface Page<T extends CachableObject> {
    content: Array<T>;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    size: number;
    _dirty: boolean;
    _active: Array<any>;
    setDirty: () => Promise<void>;
    setActiveFlag: (context: any) => Promise<void>;
    removeActiveFlag: (context: any) => void;
    responsibleMethod: () => Page<T>;
    sort: [
        {
            ascending: boolean;
            descending: boolean;
            direction: string;
            ignoreCase: false;
            nullHandling: string;
            property: string;
        }
    ];
    totalElemenets: number;
    totalPages: number;
}
