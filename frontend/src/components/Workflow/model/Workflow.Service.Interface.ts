interface IWorkflowService {
    deleteRow(process: Process, dtInstance: any): void;
    removeOrUpdateRow(process: Process, loadAllData: boolean, dtInstance: any, scope: any): void;
    updateRow(process: Process, dtInstance: any, scope: any): void;
    setRow(id: number, row: any): void;
}
