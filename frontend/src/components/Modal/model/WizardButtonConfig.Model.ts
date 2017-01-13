class WizardButtonConfig {
    title: string;
    icon: string;
    directiveType: WizardForm;
    form: any;
    position: number;
    isVisible: boolean;
    isDisabled: boolean;
    isFirstActiveElement: boolean;
    constructor(directiveType: WizardForm) {
        this.directiveType = directiveType;
        this.isVisible = true;
        this.isDisabled = false;
        this.isFirstActiveElement = false;
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

    disable(): WizardButtonConfig {
        this.isDisabled = true;
        return this;
    }

    enable(): WizardButtonConfig {
        this.isDisabled = false;
        return this;
    }

    setAsFirstElement(): WizardButtonConfig {
        this.isFirstActiveElement = true;
        return this;
    }

}