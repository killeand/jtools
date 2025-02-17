export function StringToBase64(inputValue: string, urlEncode: boolean = false): string {
    let retval = btoa(inputValue);

    if (urlEncode) retval = retval.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+/, '');

    return retval;
}

export function Base64ToString(inputValue: string, urlDecode: boolean = false): string {
    let retval = inputValue;

    if (urlDecode) {
        retval = retval.replace(/\-/g, '+').replace(/_/g, '/');
        retval += '='.repeat((4 - (retval.length % 4)) % 4);
    }

    return atob(retval);
}

export function StringToBuffer(inputValue: string): Uint8Array {
    const retval = new Uint8Array(inputValue.length);

    return retval.map((item, i) => inputValue.charCodeAt(i));
}

export function BufferToString(inputValue: Uint8Array): string;
export function BufferToString(inputValue: ArrayBuffer): string;
export function BufferToString(inputValue: Uint8Array | ArrayBuffer): string {
    if (inputValue instanceof Uint8Array) return String.fromCharCode(...inputValue);
    else return String.fromCharCode(...new Uint8Array(inputValue));
}

export function BufferToBase64(inputValue: Uint8Array, urlEncode?: boolean): string;
export function BufferToBase64(inputValue: ArrayBuffer, urlEncode?: boolean): string;
export function BufferToBase64(inputValue: Uint8Array | ArrayBuffer, urlEncode: boolean = false): string {
    if (inputValue instanceof Uint8Array) {
        return StringToBase64(String.fromCharCode(...inputValue), urlEncode);
    } else {
        return StringToBase64(String.fromCharCode(...new Uint8Array(inputValue)), urlEncode);
    }
}

export function Base64ToBuffer(inputValue: string, urlEncode?: boolean): Uint8Array;
export function Base64ToBuffer(inputValue: string, urlEncode?: boolean): Uint8Array;
export function Base64ToBuffer(inputValue: string, urlEncode: boolean = false): Uint8Array {
    return new Uint8Array(
        Base64ToString(inputValue, urlEncode)
            .split('')
            .map((c) => c.charCodeAt(0))
    );
}
