/// <reference path="../../common/model/ActionButtonConfig.Model.ts" />
/// <reference path="../../common/model/ActionButtonType.Model.ts" />


class ActionButtonConfigBuilder {
    private actionButtons: { [key: string]: ActionButtonConfig } = {};

    constructor() {

        this.actionButtons[ActionButtonType.CREATE_NEXT_WORKFLOWUNIT] = new ActionButtonConfig(ActionButtonType.CREATE_NEXT_WORKFLOWUNIT);
        this.actionButtons[ActionButtonType.PIN_DROPDOWN] = new ActionButtonConfig(ActionButtonType.PIN_DROPDOWN);
        this.actionButtons[ActionButtonType.PIN_DROPDOWN_EMPTY_PROCESSOR] = new ActionButtonConfig(ActionButtonType.PIN_DROPDOWN_EMPTY_PROCESSOR);
        this.actionButtons[ActionButtonType.PIN_BUTTON] = new ActionButtonConfig(ActionButtonType.PIN_BUTTON);
        this.actionButtons[ActionButtonType.SET_INCONTACT] = new ActionButtonConfig(ActionButtonType.SET_INCONTACT);
        this.actionButtons[ActionButtonType.OPEN_FOLLOWUP_MODAL] = new ActionButtonConfig(ActionButtonType.OPEN_FOLLOWUP_MODAL);
        this.actionButtons[ActionButtonType.SET_OFFER_DONE] = new ActionButtonConfig(ActionButtonType.SET_OFFER_DONE);
        this.actionButtons[ActionButtonType.DETAILS_DROPDOWN] = new ActionButtonConfig(ActionButtonType.DETAILS_DROPDOWN);
        this.actionButtons[ActionButtonType.DETAILS_TOGGLE_CLOSE_OR_OPEN] = new ActionButtonConfig(ActionButtonType.DETAILS_TOGGLE_CLOSE_OR_OPEN);
        this.actionButtons[ActionButtonType.DETAILS_OPEN_EDIT_MODAL] = new ActionButtonConfig(ActionButtonType.DETAILS_OPEN_EDIT_MODAL);
        this.actionButtons[ActionButtonType.DETAILS_OPEN_ROLLBACK_MODAL] = new ActionButtonConfig(ActionButtonType.DETAILS_OPEN_ROLLBACK_MODAL);
        this.actionButtons[ActionButtonType.DETAILS_OPEN_DELETE_MODAL] = new ActionButtonConfig(ActionButtonType.DETAILS_OPEN_DELETE_MODAL);

    }
    get(type: ActionButtonType): ActionButtonConfig {
        return this.actionButtons[type];
    }

    disableAll(): void {
        for (let actionButtonConfig in this.actionButtons) {
            this.actionButtons[actionButtonConfig].setEnabled(false);
        }
    }
    build(): { [key: string]: ActionButtonConfig } {
        return this.actionButtons;
    }
}