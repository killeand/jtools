export function GenerateBytes(length: number): Uint8Array {
    const NewArray = new Uint8Array(length);
    crypto.getRandomValues(NewArray);

    return NewArray;
}

export function Base64toBase64url(base64: string): string {
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+/, '');
}

export function Base64urltoBase64(base64url: string): string {
    return base64url.replace(/\-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (base64url.length % 4)) % 4);
}

export function Byte2String(byteArray: Uint8Array): string {
    return btoa(String.fromCharCode(...byteArray));
}

export function Buffer2String(arrayBuffer: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
}

export function String2Buffer(value: string): ArrayBuffer {
    const decoded = atob(value);
    const length = decoded.length;
    const final = new Uint8Array(length);

    for (let i = 0; i < length; i++) {
        final[i] = decoded.charCodeAt(i);
    }

    return final;
}

export async function Hash(secret: string, value: string, encoding: boolean): Promise<string> {
    if (secret.length == 0 || value.length == 0) return Promise.reject('You must enter a secret and value');

    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret).buffer, { name: 'HMAC', hash: { name: 'SHA-256' } }, false, ['sign']);
    const data = new TextEncoder().encode(value).buffer;
    const hashBuffer = await crypto.subtle.sign('HMAC', key, data);

    if (encoding) return Base64toBase64url(Buffer2String(hashBuffer));
    else return Buffer2String(hashBuffer);
}

export async function Encrypt(secret: string, value: string, encoding: boolean, delimiter: string = '|'): Promise<string> {
    if (secret.length == 0 || value.length == 0) return Promise.reject('You must enter a secret and value');

    const secretBuffer = new TextEncoder().encode(secret).buffer;
    if (![16, 24, 32].includes(secretBuffer.byteLength)) return Promise.reject('Secret must be 16, 24, or 32 bytes in length');

    const key = await crypto.subtle.importKey('raw', secretBuffer, { name: 'AES-GCM' }, false, ['encrypt']);
    const iv = GenerateBytes(12);
    const data = new TextEncoder().encode(value).buffer;
    const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data);

    if (encoding) return `${Base64toBase64url(Buffer2String(encrypted))}${delimiter}${Base64toBase64url(Buffer2String(iv))}`;
    else return `${Buffer2String(encrypted)}${delimiter}${Buffer2String(iv)}`;
}

export async function Decrypt(secret: string, value: string, encoding: boolean, delimiter: string = '|'): Promise<string> {
    if (secret.length == 0 || value.length == 0) return Promise.reject('You must enter a secret and value');
    if (delimiter.length == 0 || value.split(delimiter).length != 2) return Promise.reject('You must include a delimiter, and it must be splitting your encrypted value and iv value');

    if (encoding) {
        secret = Base64urltoBase64(secret);
        const splitval = value.split(delimiter);
        value = `${Base64urltoBase64(splitval[0])}${delimiter}${Base64urltoBase64(splitval[1])}`;
    }

    const secretBuffer = new TextEncoder().encode(secret).buffer;
    const dataBuffer = String2Buffer(value.split(delimiter)[0]);
    const ivBuffer = String2Buffer(value.split(delimiter)[1]);

    const key = await crypto.subtle.importKey('raw', secretBuffer, { name: 'AES-GCM', length: secretBuffer.byteLength * 8 }, false, ['decrypt']);
    let decrypted: ArrayBuffer | null = null;

    try {
        decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: ivBuffer }, key, dataBuffer);
    } catch {
        return Promise.reject('Invalid key or iv');
    }

    return String.fromCharCode(...new Uint8Array(decrypted));
}
