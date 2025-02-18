const BASE64_STRING = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

export function StringToBase64(inputValue: string, urlEncode: boolean = false): string {
    let retval = btoa(inputValue);

    if (urlEncode) retval = retval.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+/, '');

    return retval;
}

export function Base64ToString(inputValue: string, urlDecode: boolean = false): string {
    let retval = inputValue;

    if (urlDecode) {
        retval = retval.replace(/\-/g, '+').replace(/_/g, '/');
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
    const newInput: Uint8Array = inputValue instanceof Uint8Array ? inputValue : new Uint8Array(inputValue);
    let retval = '';

    for (let i = 0; i < inputValue.byteLength; i += 3) {
        let chunk = (newInput[i] << 16) & 0xffffff;
        if (i + 1 < inputValue.byteLength) chunk |= (newInput[i + 1] << 8) & 0xffff;
        if (i + 2 < inputValue.byteLength) chunk |= newInput[i + 2] & 0xff;

        const chunkLength = Math.min(3, inputValue.byteLength - i);

        for (let j = 18; j >= 18 - chunkLength * 6; j -= 6) {
            const index = (chunk >> j) & 0x3f;
            retval += BASE64_STRING[index];
        }
    }

    const padding = (3 - (inputValue.byteLength % 3)) % 3;
    if (padding > 0 && !urlEncode) retval += '='.repeat(padding);

    return urlEncode ? retval.replace(/\+/g, '-').replace(/\//g, '_') : retval;
}

export function Base64ToBuffer(inputValue: string, urlEncode?: boolean): Uint8Array;
export function Base64ToBuffer(inputValue: string, urlEncode?: boolean): ArrayBuffer;
export function Base64ToBuffer(inputValue: string, urlEncode: boolean = false): Uint8Array | ArrayBuffer {
    if (inputValue.length % 4 !== 0) throw new Error('Invalid Base64 count');
    inputValue = inputValue.replace(/=/g, '');

    if (urlEncode) {
        inputValue = inputValue.replace(/\-/g, '+').replace(/_/g, '/');
    }

    const retval = new Uint8Array((inputValue.length * 3) / 4);

    for (let i = 0, k = 0; i <= inputValue.length; i += 4) {
        let chunk = 0;
        const chunkLength = Math.min(4, inputValue.length - i);

        for (let j = 0; j < chunkLength; j++) {
            const index = BASE64_STRING.indexOf(inputValue[i + j]);

            if (index === -1) throw new Error('Invalid character for Base64 encoded string');

            chunk |= (index & 0x3f) << ((3 - j) * 6);
        }

        retval[k] = (chunk >> 16) & 0xff;
        retval[k + 1] = (chunk >> 8) & 0xff;
        retval[k + 2] = chunk & 0xff;
        k += 3;
    }

    return retval;
}
