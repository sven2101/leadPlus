export interface Page<T> {
    content: Array<T>;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    size: number;
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
