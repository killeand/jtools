import { Digest, Encrypt } from '@/scripts/CryptoUtils';
import { Base64ToBuffer, BufferToBase64 } from '@/scripts/StringUtils';
import { useState } from 'react';

export default function CryptoTabEncrypt({ cryptedSetter }: { cryptedSetter: (secret: string, value: string, encrypted: string, iv: string, combined: string) => void }) {
    const [secret, setSecret] = useState<string>('');
    const [base64Key, setBase64Key] = useState<boolean>(false);
    const [keyEncoding, setKeyEncoding] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const [delimiter, setDelimiter] = useState<string>('|');
    const [encoding, setEncoding] = useState<boolean>(false);

    async function HandleGenerateClick() {
        let SecretKey: Uint8Array | null = null;

        try {
            if (base64Key) SecretKey = Base64ToBuffer(secret, keyEncoding);
            else SecretKey = await Digest(secret, '256');
        } catch (error: unknown) {
            if (error instanceof String) cryptedSetter('', '', '', '', `Error: ${error}`);
            else cryptedSetter('', '', '', '', `Error:  ${(error as Error).message}`);

            return;
        }

        try {
            Encrypt(SecretKey, value)
                .then((resultObject: { iv: Uint8Array; value: Uint8Array }) => {
                    cryptedSetter(secret, value, BufferToBase64(resultObject.value, encoding), BufferToBase64(resultObject.iv, encoding), `${BufferToBase64(resultObject.value, encoding)}${delimiter}${BufferToBase64(resultObject.iv, encoding)}`);
                })
                .catch((error: string) => {
                    cryptedSetter('', '', '', '', `Error: ${error}`);
                });
        } catch (error: unknown) {
            cryptedSetter('', '', '', '', `Error: ${(error as Error).message}`);
        }
    }

    return (
        <div className='tab-content border-base-300 bg-base-100 p-2'>
            <p>Encryption uses the AES-GCM algorithm with a 16-byte random iv. The secret key must use either a 128-bit, 192-bit, or 256-bit value encoded with base64. If you use a passphrase, it will be digested into a 256-bit value first.</p>
            <div className='flex flex-col gap-2'>
                <label className='input-bordered input w-full input-primary'>
                    <div className='label'>Secret Key</div>
                    <input type='text' placeholder='Please enter your secret key...' value={secret} onChange={(e) => setSecret(e.target.value)} />
                </label>
                <div className='flex flex-row gap-3'>
                    <label className='label'>
                        <input type='checkbox' className='toggle toggle-primary' checked={base64Key} onChange={(e) => setBase64Key(e.target.checked)} />
                        <div className='label'>Current: {base64Key ? 'Base64 Encoded Key' : 'Passphrase Text'}</div>
                    </label>
                    {base64Key && (
                        <label className='label'>
                            <input type='checkbox' className='toggle toggle-primary' checked={keyEncoding} onChange={(e) => setKeyEncoding(e.target.checked)} />
                            <div className='label'>Key URL Encoded</div>
                        </label>
                    )}
                </div>
                <label className='input-bordered input w-full input-primary'>
                    <div className='label'>Value</div>
                    <input type='text' placeholder='Please enter your value to encrypt...' value={value} onChange={(e) => setValue(e.target.value)} />
                </label>
                <label className='input-bordered input w-full input-primary'>
                    <div className='label'>Delimiter</div>
                    <input type='text' placeholder='Please enter your delimiter...' value={delimiter} onChange={(e) => setDelimiter(e.target.value)} />
                </label>
                <label className='label'>
                    <input type='checkbox' className='toggle toggle-primary' checked={encoding} onChange={(e) => setEncoding(e.target.checked)} />
                    <div className='label'>URL Encoding</div>
                </label>
                <button className='btn btn-primary' onClick={HandleGenerateClick}>
                    Generate Encrypted String
                </button>
            </div>
        </div>
    );
}
