enum TemplateType {
    EMAIL = <any>"EMAIL",
    PDF = <any>"PDF",

    getAll = <any>function (): Array<TemplateType> {
        return Object.keys(TemplateType).filter(f => f !== "getAll").map(k => TemplateType[k]).filter(f => f !== "getAll");
    }
}