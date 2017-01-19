class WizardButtonConfig {
    title: string;
    icon: string;
    directiveType: WizardForm;
    form: any;
    position: number;
    isVisible: boolean;
    isDisabled: boolean;
    isEmail: boolean;
    isFirstActiveElement: boolean;
    validation: boolean;
    constructor(directiveType: WizardForm) {
        this.directiveType = directiveType;
        this.isVisible = true;
        this.isDisabled = false;
        this.isFirstActiveElement = false;
        this.validation = true;
        this.isEmail = false;
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

    setEmail(isEmail: boolean): WizardButtonConfig {
        this.isEmail = isEmail;
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
        return this;
    }

}