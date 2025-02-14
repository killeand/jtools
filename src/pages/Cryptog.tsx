import { useState } from 'react';

export default function Cryptog() {
    const [cryptids, setCryptids] = useState<Array<{ k: string; v: string }>>([]);
    const [secret, setSecret] = useState<string>('');
    const [value, setValue] = useState<string>('');
    const [delimiter, setDelimiter] = useState<string>('|');

    function GenerateBytes(length: number): Uint8Array {
        const NewArray = new Uint8Array(length);
        crypto.getRandomValues(NewArray);

        return NewArray;
    }

    function Base64toBase64url(base64: string): string {
        return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+/, '');
    }

    function Base64urltoBase64(base64url: string): string {
        return base64url.replace(/\-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (base64url.length % 4)) % 4);
    }

    function Byte2String(byteArray: Uint8Array): string {
        return btoa(String.fromCharCode(...byteArray));
    }

    function Buffer2String(arrayBuffer: ArrayBuffer): string {
        return btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    }

    function String2Buffer(value: string): ArrayBuffer {
        const decoded = atob(value);
        const length = decoded.length;
        const final = new Uint8Array(length);

        for (let i = 0; i < length; i++) {
            final[i] = decoded.charCodeAt(i);
        }

        return final;
    }

    async function Hash(): Promise<string> {
        if (secret.length == 0 || value.length == 0) return Promise.reject('You must enter a secret and value');

        const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret).buffer, { name: 'HMAC', hash: { name: 'SHA-256' } }, false, ['sign']);
        const data = new TextEncoder().encode(value).buffer;
        const hashBuffer = await crypto.subtle.sign('HMAC', key, data);

        return Buffer2String(hashBuffer);
    }

    async function Encrypt(): Promise<string> {
        if (secret.length == 0 || value.length == 0) return Promise.reject('You must enter a secret and value');

        const secretBuffer = new TextEncoder().encode(secret).buffer;
        if (![16, 24, 32].includes(secretBuffer.byteLength)) return Promise.reject('Secret must be 16, 24, or 32 bytes in length');

        const key = await crypto.subtle.importKey('raw', secretBuffer, { name: 'AES-GCM' }, false, ['encrypt']);
        const iv = GenerateBytes(12);
        const data = new TextEncoder().encode(value).buffer;
        const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data);

        return `${Buffer2String(encrypted)}${delimiter}${Buffer2String(iv)}`;
    }

    async function Decrypt(): Promise<string> {
        if (secret.length == 0 || value.length == 0) return Promise.reject('You must enter a secret and value');
        if (delimiter.length == 0 || value.split(delimiter).length != 2) return Promise.reject('You must include a delimiter, and it must be splitting your encrypted value and iv value');

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

    return (
        <>
            <div className='flex-grow flex gap-2 flex-col'>
                {cryptids.map((item, index) => (
                    <div key={item.k + index} className='flex flex-row'>
                        <div className='bg-base-300 text-base-content flex justify-center items-center px-2 min-w-[10%] rounded-l-lg'>{item.k}</div>
                        <div className='flex-grow flex items-center justify-start bg-base-100 text-base-content px-2 rounded-r-lg mr-2 border'>{item.v}</div>
                        <button className='btn btn-sm btn-info' onClick={() => navigator.clipboard.writeText(item.v)}>
                            Copy
                        </button>
                    </div>
                ))}
            </div>
            <div className='flex flex-col bottom-0 sticky p-2 bg-base-100/50 backdrop-blur-sm gap-2'>
                <div className='flex flex-col md:flex-row gap-2'>
                    <input type='text' placeholder='Enter Secret Key' value={secret} onChange={(e) => setSecret(e.target.value)} className='input input-sm input-primary input-bordered w-full md:w-1/3' />
                    <input type='text' placeholder='Enter Value' value={value} onChange={(e) => setValue(e.target.value)} className='input input-sm input-primary input-bordered w-full md:w-1/3' />
                    <input type='text' placeholder='Enter Delimiter' value={delimiter} onChange={(e) => setDelimiter(e.target.value)} className='input input-sm input-primary input-bordered w-full md:w-1/3' />
                </div>
                <div className='flex flex-col md:flex-row gap-2 [&_button]:w-full [&_button]:btn [&_button]:btn-sm [&_button]:btn-primary [&_button]:md:w-fit'>
                    <button
                        onClick={() =>
                            Hash()
                                .then((retval) => setCryptids([...cryptids, { k: 'Hash', v: retval }]))
                                .catch((error) => setCryptids([...cryptids, { k: 'Error', v: error }]))
                        }>
                        Generate Hash
                    </button>
                    <button onClick={() => setCryptids([...cryptids, { k: '16 Byte Key', v: Byte2String(GenerateBytes(12)) }])}>16 Byte Key</button>
                    <button onClick={() => setCryptids([...cryptids, { k: '24 Byte Key', v: Byte2String(GenerateBytes(16)) }])}>24 Byte Key</button>
                    <button onClick={() => setCryptids([...cryptids, { k: '32 Byte Key', v: Byte2String(GenerateBytes(24)) }])}>32 Byte Key</button>
                    <button
                        onClick={() =>
                            Encrypt()
                                .then((retval) => setCryptids([...cryptids, { k: 'Encrypt', v: retval }]))
                                .catch((error) => setCryptids([...cryptids, { k: 'Error', v: error }]))
                        }>
                        Encrypt (AES-GCM 12byte iv)
                    </button>
                    <button
                        onClick={() =>
                            Decrypt()
                                .then((retval) => setCryptids([...cryptids, { k: 'Decrypt', v: retval }]))
                                .catch((error) => setCryptids([...cryptids, { k: 'Error', v: error }]))
                        }>
                        Decrypt (AES-GCM 12byte iv)
                    </button>
                </div>
                <button
                    className='btn btn-sm btn-error w-full'
                    onClick={() => {
                        setCryptids([]);
                    }}>
                    CLEAR
                </button>
            </div>
        </>
    );
}
