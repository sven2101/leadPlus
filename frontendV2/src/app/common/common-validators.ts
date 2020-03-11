import { FormControl } from "@angular/forms";
export class CommonValidators {

    public static max(maxValue: number): (c: FormControl) => {} | null {
        return (c: FormControl) => c.value > maxValue ? { "max": maxValue.toString } : null;
    }

    public static min(minValue: number): (c: FormControl) => {} | null {
        return (c: FormControl) => c.value < minValue ? { "min": minValue.toString() } : null;
    }
}
