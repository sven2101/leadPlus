// Type definitions for Dropzone 4.3.0
// Project: http://www.dropzonejs.com/
// Definitions by: Natan Vivo <https://github.com/nvivo>, Andy Hawkins <https://github.com/a904guy/,http://a904guy.com/,http://www.bmbsqd.com>, Vasya Aksyonov <https://github.com/outring>, Simon Huber <https://github.com/renuo>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

interface IDropzoneResizeInfo {
    srcX?: number;
    srcY?: number;
    trgX?: number;
    trgY?: number;
    srcWidth?: number;
    srcHeight?: number;
    trgWidth?: number;
    trgHeight?: number;
    optWidth?: number;
    optHeight?: number;
}

interface IDropzoneFile extends File {
    previewElement: HTMLElement;
    previewTemplate: HTMLElement;
    previewsContainer: HTMLElement;
    status: string;
    accepted: boolean;
}

interface IDropzoneOptions {
    url?: string;
    method?: string;
    withCredentials?: boolean;
    parallelUploads?: number;
    uploadMultiple?: boolean;
    maxFilesize?: number;
    paramName?: string;
    createImageThumbnails?: boolean;
    maxThumbnailFilesize?: number;
    thumbnailWidth?: number;
    thumbnailHeight?: number;
    filesizeBase?: number;
    maxFiles?: number;
    params?: {};
    headers?: {};
    clickable?: boolean | string | HTMLElement | (string | HTMLElement)[];
    ignoreHiddenFiles?: boolean;
    acceptedFiles?: string;
    renameFilename?(name: string): string;
    autoProcessQueue?: boolean;
    autoQueue?: boolean;
    addRemoveLinks?: boolean;
    previewsContainer?: boolean | string | HTMLElement;
    hiddenInputContainer?: HTMLElement;
    capture?: string;

    dictDefaultMessage?: string;
    dictFallbackMessage?: string;
    dictFallbackText?: string;
    dictFileTooBig?: string;
    dictInvalidFileType?: string;
    dictResponseError?: string;
    dictCancelUpload?: string;
    dictCancelUploadConfirmation?: string;
    dictRemoveFile?: string;
    dictRemoveFileConfirmation?: string;
    dictMaxFilesExceeded?: string;

    accept?(file: IDropzoneFile, done: (error?: string | Error) => void): void;
    init?(): void;
    forceFallback?: boolean;
    fallback?(): void;
    resize?(file: IDropzoneFile): IDropzoneResizeInfo;

    drop?(e: DragEvent): void;
    dragstart?(e: DragEvent): void;
    dragend?(e: DragEvent): void;
    dragenter?(e: DragEvent): void;
    dragover?(e: DragEvent): void;
    dragleave?(e: DragEvent): void;
    paste?(e: DragEvent): void;

    reset?(): void;

    addedfile?(file: IDropzoneFile): void;
    addedfiles?(files: IDropzoneFile[]): void;
    removedfile?(file: IDropzoneFile): void;
    thumbnail?(file: IDropzoneFile, dataUrl: string): void;

    error?(file: IDropzoneFile, message: string | Error, xhr: XMLHttpRequest): void;
    errormultiple?(files: IDropzoneFile[], message: string | Error, xhr: XMLHttpRequest): void;

    processing?(file: IDropzoneFile): void;
    processingmultiple?(files: IDropzoneFile[]): void;

    uploadprogress?(file: IDropzoneFile, progress: number, bytesSent: number): void;
    totaluploadprogress?(totalProgress: number, totalBytes: number, totalBytesSent: number): void;

    sending?(file: IDropzoneFile, xhr: XMLHttpRequest, formData: FormData): void;
    sendingmultiple?(files: IDropzoneFile[], xhr: XMLHttpRequest, formData: FormData): void;

    success?(file: IDropzoneFile, response: Object | string): void;
    successmultiple?(files: IDropzoneFile[], responseText: string): void;

    canceled?(file: IDropzoneFile): void;
    canceledmultiple?(file: IDropzoneFile[]): void;

    complete?(file: IDropzoneFile): void;
    completemultiple?(file: IDropzoneFile[]): void;

    maxfilesexceeded?(file: IDropzoneFile): void;
    maxfilesreached?(files: IDropzoneFile[]): void;
    queuecomplete?(): void;

    previewTemplate?: string;
}

declare class Dropzone {
    constructor(container: string | HTMLElement, options?: IDropzoneOptions);

    static autoDiscover: boolean;
    static options: any;
    static confirm: (question: string, accepted: () => void, rejected?: () => void) => void;

    static ADDED: string;
    static QUEUED: string;
    static ACCEPTED: string;
    static UPLOADING: string;
    static PROCESSING: string;
    static CANCELED: string;
    static ERROR: string;
    static SUCCESS: string;

    files: IDropzoneFile[];

    enable(): void;

    disable(): void;

    destroy(): Dropzone;

    addFile(file: IDropzoneFile): void;

    removeFile(file: IDropzoneFile): void;

    removeAllFiles(cancelIfNecessary?: boolean): void;

    processQueue(): void;

    cancelUpload(file: IDropzoneFile): void;

    processFiles(files: IDropzoneFile[]): void;

    processFile(file: IDropzoneFile): void;

    uploadFile(file: IDropzoneFile): void;

    getAcceptedFiles(): IDropzoneFile[];

    getRejectedFiles(): IDropzoneFile[];

    getQueuedFiles(): IDropzoneFile[];

    getUploadingFiles(): IDropzoneFile[];

    accept(file: IDropzoneFile, done: (error?: string | Error) => void): void;

    getActiveFiles(): IDropzoneFile[];

    getFilesWithStatus(status: string): IDropzoneFile[];

    enqueueFile(file: IDropzoneFile): void;

    enqueueFiles(file: IDropzoneFile[]): void;

    createThumbnail(file: IDropzoneFile, callback?: (...args: any[]) => void): any;

    createThumbnailFromUrl(file: IDropzoneFile, url: string, callback?: (...args: any[]) => void): any;

    on(eventName: string, callback: (...args: any[]) => void): Dropzone;

    off(eventName: string): Dropzone;

    emit(eventName: string, ...args: any[]): Dropzone;

    on(eventName: "drop", callback: (e: DragEvent) => any): Dropzone;
    on(eventName: "dragstart", callback: (e: DragEvent) => any): Dropzone;
    on(eventName: "dragend", callback: (e: DragEvent) => any): Dropzone;
    on(eventName: "dragenter", callback: (e: DragEvent) => any): Dropzone;
    on(eventName: "dragover", callback: (e: DragEvent) => any): Dropzone;
    on(eventName: "dragleave", callback: (e: DragEvent) => any): Dropzone;
    on(eventName: "paste", callback: (e: DragEvent) => any): Dropzone;

    on(eventName: "reset"): Dropzone;

    on(eventName: "addedfile", callback: (file: IDropzoneFile) => any): Dropzone;
    on(eventName: "addedfiles", callback: (files: IDropzoneFile[]) => any): Dropzone;
    on(eventName: "removedfile", callback: (file: IDropzoneFile) => any): Dropzone;
    on(eventName: "thumbnail", callback: (file: IDropzoneFile, dataUrl: string) => any): Dropzone;

    on(eventName: "error", callback: (file: IDropzoneFile, message: string | Error) => any): Dropzone;
    on(eventName: "errormultiple", callback: (files: IDropzoneFile[], message: string | Error) => any): Dropzone;

    on(eventName: "processing", callback: (file: IDropzoneFile) => any): Dropzone;
    on(eventName: "processingmultiple", callback: (files: IDropzoneFile[]) => any): Dropzone;

    on(eventName: "uploadprogress", callback: (file: IDropzoneFile, progress: number, bytesSent: number) => any): Dropzone;
    on(eventName: "totaluploadprogress", callback: (totalProgress: number, totalBytes: number, totalBytesSent: number) => any): Dropzone;

    on(eventName: "sending", callback: (file: IDropzoneFile, xhr: XMLHttpRequest, formData: FormData) => any): Dropzone;
    on(eventName: "sendingmultiple", callback: (files: IDropzoneFile[], xhr: XMLHttpRequest, formData: FormData) => any): Dropzone;

    on(eventName: "success", callback: (file: IDropzoneFile) => any): Dropzone;
    on(eventName: "successmultiple", callback: (files: IDropzoneFile[]) => any): Dropzone;

    on(eventName: "canceled", callback: (file: IDropzoneFile) => any): Dropzone;
    on(eventName: "canceledmultiple", callback: (file: IDropzoneFile[]) => any): Dropzone;

    on(eventName: "complete", callback: (file: IDropzoneFile) => any): Dropzone;
    on(eventName: "completemultiple", callback: (file: IDropzoneFile[]) => any): Dropzone;

    on(eventName: "maxfilesexceeded", callback: (file: IDropzoneFile) => any): Dropzone;
    on(eventName: "maxfilesreached", callback: (files: IDropzoneFile[]) => any): Dropzone;
    on(eventName: "queuecomplete"): Dropzone;

    emit(eventName: "drop", e: DragEvent): Dropzone;
    emit(eventName: "dragstart", e: DragEvent): Dropzone;
    emit(eventName: "dragend", e: DragEvent): Dropzone;
    emit(eventName: "dragenter", e: DragEvent): Dropzone;
    emit(eventName: "dragover", e: DragEvent): Dropzone;
    emit(eventName: "dragleave", e: DragEvent): Dropzone;
    emit(eventName: "paste", e: DragEvent): Dropzone;

    emit(eventName: "reset"): Dropzone;

    emit(eventName: "addedfile", file: IDropzoneFile): Dropzone;
    emit(eventName: "addedfiles", files: IDropzoneFile[]): Dropzone;
    emit(eventName: "removedfile", file: IDropzoneFile): Dropzone;
    emit(eventName: "thumbnail", file: IDropzoneFile, dataUrl: string): Dropzone;

    emit(eventName: "error", file: IDropzoneFile, message: string | Error): Dropzone;
    emit(eventName: "errormultiple", files: IDropzoneFile[], message: string | Error): Dropzone;

    emit(eventName: "processing", file: IDropzoneFile): Dropzone;
    emit(eventName: "processingmultiple", files: IDropzoneFile[]): Dropzone;

    emit(eventName: "uploadprogress", file: IDropzoneFile, progress: number, bytesSent: number): Dropzone;
    emit(eventName: "totaluploadprogress", totalProgress: number, totalBytes: number, totalBytesSent: number): Dropzone;

    emit(eventName: "sending", file: IDropzoneFile, xhr: XMLHttpRequest, formData: FormData): Dropzone;
    emit(eventName: "sendingmultiple", files: IDropzoneFile[], xhr: XMLHttpRequest, formData: FormData): Dropzone;

    emit(eventName: "success", file: IDropzoneFile): Dropzone;
    emit(eventName: "successmultiple", files: IDropzoneFile[]): Dropzone;

    emit(eventName: "canceled", file: IDropzoneFile): Dropzone;
    emit(eventName: "canceledmultiple", file: IDropzoneFile[]): Dropzone;

    emit(eventName: "complete", file: IDropzoneFile): Dropzone;
    emit(eventName: "completemultiple", file: IDropzoneFile[]): Dropzone;

    emit(eventName: "maxfilesexceeded", file: IDropzoneFile): Dropzone;
    emit(eventName: "maxfilesreached", files: IDropzoneFile[]): Dropzone;
    emit(eventName: "queuecomplete"): Dropzone;

}

interface IJQuery {
    dropzone(options: IDropzoneOptions): Dropzone;
}

declare module "dropzone" {
    export = Dropzone;
}