class WizardButtonConfig {

    title: string;
    icon: string;
    directiveType: WizardType;
    form: any;
    position: number;
    isVisible: boolean;
    showSaveButton: boolean;
    isDisabled: boolean;
    isEmail: boolean;
    isFollowUp: boolean;
    isFirstActiveElement: boolean;
    validation: boolean;
    sendButtonName: string;
    isVisited: boolean;

    constructor(directiveType: WizardType) {
        this.directiveType = directiveType;
        this.isVisible = true;
        this.showSaveButton = true;
        this.isDisabled = false;
        this.isFirstActiveElement = false;
        this.validation = true;
        this.isEmail = false;
        this.isFollowUp = false;
        this.isVisited = false;
    }

    setTitle(title: string): WizardButtonConfig {
        this.title = title;
        return this;
    }

    setIcon(icon: string): WizardButtonConfig {
        this.icon = icon;
        return this;
    }

    setForm(form: any): WizardButtonConfig {
        this.form = form;
        return this;
    }

    setPosition(position: number): WizardButtonConfig {
        this.position = position;
        return this;
    }

    setVisibility(visibility: boolean): WizardButtonConfig {
        this.isVisible = visibility;
        return this;
    }

    setEmail(isEmail: boolean, sendButtonName: string = "EMAIL_SEND"): WizardButtonConfig {
        this.isEmail = isEmail;
        this.sendButtonName = sendButtonName;
        return this;
    }

    setFollowUp(isFollowUp: boolean): WizardButtonConfig {
        this.isFollowUp = isFollowUp;
        return this;
    }

    setShowSaveButton(showSaveButton: boolean): WizardButtonConfig {
        this.showSaveButton = showSaveButton;
        return this;
    }

    visit(): WizardButtonConfig {
        this.isVisited = true;
        return this;
    }

    disable(): WizardButtonConfig {
        this.isDisabled = true;
        return this;
    }

    enable(): WizardButtonConfig {
        this.isDisabled = false;
        return this;
    }

    setValidation(validation: boolean): WizardButtonConfig {
        this.validation = validation;
        return this;
    }

    setAsFirstElement(): WizardButtonConfig {
        this.isFirstActiveElement = true;
        this.isVisited = true;
        return this;
    }

}