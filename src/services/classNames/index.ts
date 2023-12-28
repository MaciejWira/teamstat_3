export type ClassNames = (string | boolean | undefined | null)[];

/**
 * Concatenate given arguments to receive valid list of CSS Classes
 *
 * @category Styles
 *
 * @param classes
 *
 * @returns - String with CSS Classes
 */

export default function classNames(...classes: ClassNames): string {
    let result = '';

    for (let i = 0; i < classes.length; i++) {
        if (classes[i]) {
            result += (result ? ' ' : '') + classes[i];
        }
    }

    return result;
}
