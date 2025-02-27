import { Hash } from '@/scripts/CryptoUtils';
import { Base64ToBuffer, BufferToBase64 } from '@/scripts/StringUtils';
import { useState } from 'react';

export default function CryptoTabHash({ cryptedSetter }: { cryptedSetter: (secret: string, value: string, encrypted: string) => void }) {
    const [secret, setSecret] = useState<string>('');
    const [base64Key, setBase64Key] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const [encoding, setEncoding] = useState<boolean>(false);
    const [algorithm, setAlgorithm] = useState<string>('256');

    function HandleGenerateClick() {
        try {
            Hash(base64Key ? Base64ToBuffer(secret) : secret, value, algorithm)
                .then((resultBuffer: Uint8Array) => {
                    cryptedSetter(secret, value, BufferToBase64(resultBuffer, encoding));
                })
                .catch((error: string) => {
                    cryptedSetter('', '', `Error: ${error}`);
                });
        } catch (error: unknown) {
            cryptedSetter('', '', `Error: ${(error as Error).message}`);
        }
    }

    return (
        <div className='tab-content border-base-300 bg-base-100 p-2'>
            <p>Generates a hash of a value using the Hash-Based Message Authentication Code (HMAC) algorithm. This will allow for a predictable hash result based on the secret key provided.</p>
            <div className='flex flex-col gap-2'>
                <label className='input-bordered input w-full input-primary'>
                    <div className='label'>Secret Key</div>
                    <input type='text' placeholder='Please enter your secret key...' value={secret} onChange={(e) => setSecret(e.target.value)} />
                </label>
                <label className='label'>
                    <input type='checkbox' className='toggle toggle-primary' checked={base64Key} onChange={(e) => setBase64Key(e.target.checked)} />
                    <div className='label'>Current: {base64Key ? 'Base64 Encoded Key' : 'Passphrase Text'}</div>
                </label>
                <label className='select w-full select-primary'>
                    <div className='label'>Algorithm</div>
                    <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
                        <option value='256'>SHA-256</option>
                        <option value='384'>SHA-384</option>
                        <option value='512'>SHA-512</option>
                    </select>
                </label>
                <label className='input-bordered input w-full input-primary'>
                    <div className='label'>Value</div>
                    <input type='text' placeholder='Please enter your value to hash...' value={value} onChange={(e) => setValue(e.target.value)} />
                </label>
                <label className='label'>
                    <input type='checkbox' className='toggle toggle-primary' checked={encoding} onChange={(e) => setEncoding(e.target.checked)} />
                    <div className='label'>URL Encoding</div>
                </label>
                <button className='btn btn-primary' onClick={HandleGenerateClick}>
                    Generate Hash
                </button>
            </div>
        </div>
    );
}
