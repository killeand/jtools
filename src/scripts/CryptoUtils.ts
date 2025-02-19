import { BufferToString, StringToBuffer } from './StringUtils';

export function GenerateBytes(length: number): Uint8Array {
    const NewArray = new Uint8Array(length);
    crypto.getRandomValues(NewArray);
    return NewArray;
}

export async function Hash(secretKey: string | Uint8Array, value: string): Promise<Uint8Array> {
    if (secretKey.length == 0 || value.length == 0) return Promise.reject('The secretKeyBuffer and/or value must not be empty');

    const keyBuffer = await crypto.subtle.importKey('raw', secretKey instanceof Uint8Array ? secretKey : StringToBuffer(secretKey), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    const hashBuffer = await crypto.subtle.sign('HMAC', keyBuffer, StringToBuffer(value));

    return new Uint8Array(hashBuffer);
}

export async function Digest(value: string, algorithm: string = '512'): Promise<Uint8Array> {
    if (value.length == 0) return Promise.reject('The value must not be empty');
    if (!['1', '256', '384', '512'].includes(algorithm)) return Promise.reject('The algorithm must be either 1, 256, 384, or 512');

    const hashBuffer = await crypto.subtle.digest(`SHA-${algorithm}`, StringToBuffer(value));

    return new Uint8Array(hashBuffer);
}

export async function Encrypt(secretKeyBuffer: Uint8Array, value: string): Promise<{ iv: Uint8Array; value: Uint8Array }> {
    if (secretKeyBuffer.byteLength !== 32) return Promise.reject('The secretKeyBuffer must be 32-bytes');
    if (value.length == 0) return Promise.reject('The value must not be empty');

    const keyBuffer = await crypto.subtle.importKey('raw', secretKeyBuffer, { name: 'AES-GCM' }, false, ['encrypt']);
    const ivBuffer = GenerateBytes(12);
    let encryptedBuffer: ArrayBuffer | null = null;

    try {
        encryptedBuffer = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: ivBuffer }, keyBuffer, StringToBuffer(value));
    } catch (error: unknown) {
        return Promise.reject(`Could not encrypt the value for the following reason: ${(error as Error).message}`);
    }

    return { iv: ivBuffer, value: new Uint8Array(encryptedBuffer) };
}

export async function Decrypt(secretKeyBuffer: Uint8Array, ivBuffer: Uint8Array, valueBuffer: Uint8Array): Promise<string> {
    if (secretKeyBuffer.byteLength !== 32) return Promise.reject('The secretKeyBuffer must be 32-bytes');
    if (ivBuffer.byteLength === 0) return Promise.reject('The ivBuffer must be greater than 0 bytes');
    if (valueBuffer.byteLength === 0) return Promise.reject('The valueBuffer must be greater than 0 bytes');

    const keyBuffer = await crypto.subtle.importKey('raw', secretKeyBuffer, { name: 'AES-GCM' }, false, ['decrypt']);
    let decryptedBuffer: ArrayBuffer | null = null;

    try {
        decryptedBuffer = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: ivBuffer }, keyBuffer, valueBuffer);
    } catch (error: unknown) {
        return Promise.reject(`Could not decrypt the value for the following reason: ${(error as Error).message}`);
    }

    return BufferToString(decryptedBuffer);
}
