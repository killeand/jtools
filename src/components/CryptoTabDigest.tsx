import { Digest } from '@/scripts/CryptoUtils';
import { BufferToBase64 } from '@/scripts/StringUtils';
import { useState } from 'react';

export default function CryptoTabDigest({ cryptedSetter }: { cryptedSetter: (algorithm: string, value: string, encrypted: string) => void }) {
    const [encryption, setEncryption] = useState<string>('256');
    const [value, setValue] = useState<string>('');
    const [encoding, setEncoding] = useState<boolean>(false);

    function HandleGenerateClick() {
        try {
            Digest(value, encryption)
                .then((resultBuffer: Uint8Array) => {
                    cryptedSetter(`SHA-${encryption}`, value, BufferToBase64(resultBuffer, encoding));
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
            <p>Generates a digest of a value using the SHA algorithm of your choice.</p>
            <div className='flex flex-col gap-2'>
                <label className='select w-full select-primary'>
                    <div className='label'>Algorithm</div>
                    <select value={encryption} onChange={(e) => setEncryption(e.target.value)}>
                        <option value='1'>SHA-1</option>
                        <option value='256'>SHA-256</option>
                        <option value='384'>SHA-384</option>
                        <option value='512'>SHA-512</option>
                    </select>
                </label>
                <label className='input-bordered input w-full input-primary'>
                    <div className='label'>Value</div>
                    <input type='text' placeholder='Please enter your value to digest...' value={value} onChange={(e) => setValue(e.target.value)} />
                </label>
                <label className='label'>
                    <input type='checkbox' className='toggle toggle-primary' checked={encoding} onChange={(e) => setEncoding(e.target.checked)} />
                    <div className='label'>URL Encoding</div>
                </label>
                <button className='btn btn-primary' onClick={HandleGenerateClick}>
                    Generate Digest
                </button>
            </div>
        </div>
    );
}
