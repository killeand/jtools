import { Decrypt, Digest } from '@/scripts/CryptoUtils';
import { Base64ToBuffer } from '@/scripts/StringUtils';
import { useState } from 'react';

export default function CryptoTabDecrypt({ cryptedSetter }: { cryptedSetter: (secret: string, value: string, result: string) => void }) {
    const [secret, setSecret] = useState<string>('');
    const [base64Key, setBase64Key] = useState<boolean>(false);
    const [keyEncoding, setKeyEncoding] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const [valueEncoding, setValueEncoding] = useState<boolean>(false);
    const [delimiter, setDelimiter] = useState<string>('|');

    async function HandleGenerateClick() {
        if (value.split(delimiter).length != 2) {
            cryptedSetter('', '', `Error: The value must be delimited with the ${delimiter} character`);
            return;
        }

        const CipherText: string = value.split(delimiter)[0];
        const IV: string = value.split(delimiter)[1];
        let SecretKey: Uint8Array | null = null;

        try {
            if (base64Key) SecretKey = Base64ToBuffer(secret, keyEncoding);
            else SecretKey = await Digest(secret, '256');
        } catch (error: unknown) {
            if (error instanceof String) cryptedSetter('', '', `Error: ${error}`);
            else cryptedSetter('', '', `Error:  ${(error as Error).message}`);

            return;
        }

        try {
            Decrypt(SecretKey, Base64ToBuffer(IV, valueEncoding), Base64ToBuffer(CipherText, valueEncoding))
                .then((resultString: string) => {
                    cryptedSetter(secret, value, resultString);
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
                    <input type='text' placeholder='Please enter your value to decrypt...' value={value} onChange={(e) => setValue(e.target.value)} />
                </label>
                <label className='label'>
                    <input type='checkbox' className='toggle toggle-primary' checked={valueEncoding} onChange={(e) => setValueEncoding(e.target.checked)} />
                    <div className='label'>URL Encoded Value</div>
                </label>
                <label className='input-bordered input w-full input-primary'>
                    <div className='label'>Delimiter</div>
                    <input type='text' placeholder='Please enter your delimiter...' value={delimiter} onChange={(e) => setDelimiter(e.target.value)} />
                </label>
                <button className='btn btn-primary' onClick={HandleGenerateClick}>
                    Show Decrypted String
                </button>
            </div>
        </div>
    );
}
