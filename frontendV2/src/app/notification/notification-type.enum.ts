export enum NotificationType {
    LEAD = <any>"LEAD",
    OFFER = <any>"OFFER",
    FOLLOWUP = <any>"FOLLOWUP",
    SALE = <any>"SALE",
    ERROR = <any>"ERROR",

    getAll = <any>function (): Array<NotificationType> {
        return Object.keys(NotificationType).filter(f => f !== "getAll").map(k => NotificationType[k]).filter(f => f !== "getAll");
    }
}
