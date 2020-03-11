interface IDatatableService {
    getDTOptionsConfiguration(createdRow: Function, defaultSearch: string): Promise<any>;
    configRow(row: any, data: Process): void;
    getDetailHTML(id: number): string;
    getDTColumnConfiguration(addDetailButton: Function, addStatusStyle: Function, addActionsButtons: Function): Array<any>;
    getActionButtonConfig(process: Process): { [key: string]: ActionButtonConfig };
    getActionButtonsHTML(process: Process, actionButtonConfig: { [key: number]: any }): string;
    getStatusStyleHTML(data: Process): string;
}
