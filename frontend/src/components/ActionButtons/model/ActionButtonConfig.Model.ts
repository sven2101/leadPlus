/// <reference path="../../ActionButtons/model/ActionButtonType.Model.ts" />

class ActionButtonConfig {

    type: ActionButtonType;
    visible: boolean;
    disabled: boolean;
    title: string;
    icon: string;
    priority: number;
    visibleInDetailsDropdown: boolean;
    constructor(type: ActionButtonType) {
        this.type = type;
        this.visible = false;
        this.disabled = true;
    }

    setEnabled(enabled: boolean = true): ActionButtonConfig {
        this.disabled = !enabled;
        this.visible = enabled ? true : this.visible;
        return this;
    }

    setVisible(visible: boolean = true): ActionButtonConfig {
        this.visible = visible;
        return this;
    }

    setTitle(title: string): ActionButtonConfig {
        this.title = title;
        return this;
    }

    setIcon(icon: string): ActionButtonConfig {
        this.icon = icon;
        return this;
    }
}