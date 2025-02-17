import { GenerateBytes, Hash } from '@/scripts/CryptoUtils';
import { BufferToString, StringToBuffer } from '@/scripts/StringUtils';
import { ReactNode, useState } from 'react';
import { BufferToBase64, StringToBase64 } from '../scripts/StringUtils';

export default function Cryptog() {
    const [cryptids, setCryptids] = useState<Array<{ k: string; v: string; o?: string | ReactNode }>>([]);
    const [secret, setSecret] = useState<string>('');
    const [value, setValue] = useState<string>('');
    const [delimiter, setDelimiter] = useState<string>('|');
    const [encoding, setEncoding] = useState<boolean>(false);
    const [hashkey, setHashkey] = useState<boolean>(false);

    return (
        <>
            <div className='flex grow flex-col gap-2 divide-primary md:flex-row'>
                <div className='tabs tabs-box md:w-1/2'>
                    <input type='radio' name='crypto-selection' className='tab' aria-label='Random' defaultChecked />
                    <div className='tab-content border-base-300 bg-base-100 p-2'>
                        <p>Generates a cryptographically random value and outputs as a base64 string.</p>
                        <div className='flex flex-col gap-2 [&_button]:btn [&_button]:w-full [&_button]:btn-sm [&_button]:btn-primary'>
                            <button onClick={() => setCryptids([...cryptids, { k: '128-bit Value', v: BufferToBase64(GenerateBytes(16)) }])}>128-bit Value</button>
                            <button onClick={() => setCryptids([...cryptids, { k: '192-bit Value', v: BufferToBase64(GenerateBytes(24)) }])}>192-bit Value</button>
                            <button onClick={() => setCryptids([...cryptids, { k: '256-bit Value', v: BufferToBase64(GenerateBytes(32)) }])}>256-bit Value</button>
                            <button onClick={() => setCryptids([...cryptids, { k: '512-bit Value', v: BufferToBase64(GenerateBytes(64)) }])}>512-bit Value</button>
                        </div>
                    </div>
                    <input type='radio' name='crypto-selection' className='tab' aria-label='Hash' />
                    <div className='tab-content border-base-300 bg-base-100 p-2'>
                        <div className='flex flex-col gap-2'>
                            <label className='input-bordered input w-full input-primary'>
                                Secret Key
                                <input type='text' placeholder='Please enter your secret key...' value={secret} onChange={(e) => setSecret(e.target.value)} />
                            </label>
                            <label className='input-bordered input w-full input-primary'>
                                Value
                                <input type='text' placeholder='Please enter your value to hash...' value={value} onChange={(e) => setValue(e.target.value)} />
                            </label>
                            <label className='label'>
                                <input type='checkbox' className='toggle toggle-primary' checked={encoding} onChange={(e) => setEncoding(e.target.checked)} />
                                URL Encoding
                            </label>
                            <button
                                className='btn btn-primary'
                                onClick={() =>
                                    Hash(secret, value)
                                        .then((retval) =>
                                            setCryptids([
                                                ...cryptids,
                                                {
                                                    k: 'Hash',
                                                    v: StringToBase64(BufferToString(retval)),
                                                    o: (
                                                        <div className='flex flex-col'>
                                                            <div className='break-words'>
                                                                <span className='font-bold'>Key:</span> {secret}
                                                            </div>
                                                            <div className='break-words'>
                                                                <span className='font-bold'>Value:</span> {value}
                                                            </div>
                                                            <div className='break-words'>
                                                                <span className='font-bold'>Result:</span> {StringToBase64(BufferToString(retval))}
                                                            </div>
                                                        </div>
                                                    ),
                                                },
                                            ])
                                        )
                                        .catch((error: string) =>
                                            setCryptids([
                                                ...cryptids,
                                                {
                                                    k: 'Hash',
                                                    v: '',
                                                    o: (
                                                        <div className='flex flex-col'>
                                                            <div className='break-words'>
                                                                <span className='font-bold'>Error:</span> {error}
                                                            </div>
                                                        </div>
                                                    ),
                                                },
                                            ])
                                        )
                                }>
                                Generate Hash
                            </button>
                        </div>
                    </div>
                    {/* <input type='radio' name='crypto-selection' className='tab' aria-label='Encrypt' />
                    <div className='tab-content border-base-300 bg-base-100 p-2'>
                        <div className='flex flex-col gap-2'>
                            <p>Encryption uses the AES-GCM algorithm with a 16-byte random iv. The secret key must use either a 128-bit, 192-bit, or 256-bit value encoded with base64. If you wish to use some other kind of key, you must hash the key which will convert your string into a 256-bit hashed string.</p>
                            <label className='input-bordered input w-full input-primary'>
                                Secret Key
                                <input type='text' placeholder='Please enter your secret key...' value={secret} onChange={(e) => setSecret(e.target.value)} />
                            </label>
                            <label className='label'>
                                <input type='checkbox' className='toggle toggle-primary' checked={hashkey} onChange={(e) => setHashkey(e.target.checked)} />
                                Hash Key
                            </label>
                            <label className='input-bordered input w-full input-primary'>
                                Value
                                <input type='text' placeholder='Please enter your value to hash...' value={value} onChange={(e) => setValue(e.target.value)} />
                            </label>
                            <label className='input-bordered input w-full input-primary'>
                                Delimiter
                                <input type='text' placeholder='Please enter a delimiter' value={delimiter} onChange={(e) => setDelimiter(e.target.value)} />
                            </label>
                            <label className='label'>
                                <input type='checkbox' className='toggle toggle-primary' checked={encoding} onChange={(e) => setEncoding(e.target.checked)} />
                                URL Encoding
                            </label>
                            <button
                                className='btn btn-primary'
                                onClick={async () => {
                                    const NewSecret = hashkey ? await Hash(secret, secret, false) : secret;
                                    console.log(NewSecret, secret);

                                    Encrypt(NewSecret, value, encoding, delimiter)
                                        .then((retval) =>
                                            setCryptids([
                                                ...cryptids,
                                                {
                                                    k: 'Encrypt',
                                                    v: retval,
                                                    o: (
                                                        <div className='flex flex-col'>
                                                            <div className='break-words'>
                                                                <span className='font-bold'>Key:</span> {secret}
                                                            </div>
                                                            <div className='break-words'>
                                                                <span className='font-bold'>Value:</span> {value}
                                                            </div>
                                                            <div className='break-words'>
                                                                <span className='font-bold'>Result:</span> {retval}
                                                            </div>
                                                        </div>
                                                    ),
                                                },
                                            ])
                                        )
                                        .catch((error) =>
                                            setCryptids([
                                                ...cryptids,
                                                {
                                                    k: 'Encrypt',
                                                    v: error,
                                                    o: (
                                                        <div className='flex flex-col'>
                                                            <div className='break-words'>
                                                                <span className='font-bold'>Error:</span> {error}
                                                            </div>
                                                        </div>
                                                    ),
                                                },
                                            ])
                                        );
                                }}>
                                Encrypt Value
                            </button>
                        </div>
                    </div>
                    <input type='radio' name='crypto-selection' className='tab' aria-label='Decrypt' />
                    <div className='tab-content border-base-300 bg-base-100 p-2'>
                        <div className='flex flex-col gap-2'>
                            <p>Decryption uses the AES-GCM algorithm with a 16-byte random iv, each encoded as base64 strings, separated by a delimiter.</p>
                            <label className='input-bordered input w-full input-primary'>
                                Secret Key
                                <input type='text' placeholder='Please enter your secret key...' value={secret} onChange={(e) => setSecret(e.target.value)} />
                            </label>
                            <label className='input-bordered input w-full input-primary'>
                                Value
                                <input type='text' placeholder='Please enter your value to hash...' value={value} onChange={(e) => setValue(e.target.value)} />
                            </label>
                            <label className='input-bordered input w-full input-primary'>
                                Delimiter
                                <input type='text' placeholder='Please enter a delimiter' value={delimiter} onChange={(e) => setDelimiter(e.target.value)} />
                            </label>
                            <label className='label'>
                                <input type='checkbox' className='toggle toggle-primary' checked={encoding} onChange={(e) => setEncoding(e.target.checked)} />
                                URL Encoding
                            </label>
                            <button
                                className='btn btn-primary'
                                onClick={() =>
                                    Decrypt(secret, value, encoding, delimiter)
                                        .then((retval) =>
                                            setCryptids([
                                                ...cryptids,
                                                {
                                                    k: 'Decrypt',
                                                    v: retval,
                                                    o: (
                                                        <div className='flex flex-col'>
                                                            <div className='break-words'>
                                                                <span className='font-bold'>Key:</span> {secret}
                                                            </div>
                                                            <div className='break-words'>
                                                                <span className='font-bold'>Value:</span> {value}
                                                            </div>
                                                            <div className='break-words'>
                                                                <span className='font-bold'>Result:</span> {retval}
                                                            </div>
                                                        </div>
                                                    ),
                                                },
                                            ])
                                        )
                                        .catch((error) =>
                                            setCryptids([
                                                ...cryptids,
                                                {
                                                    k: 'Decrypt',
                                                    v: error,
                                                    o: (
                                                        <div className='flex flex-col'>
                                                            <div className='break-words'>
                                                                <span className='font-bold'>Error:</span> {error}
                                                            </div>
                                                        </div>
                                                    ),
                                                },
                                            ])
                                        )
                                }>
                                Decrypt Value
                            </button>
                        </div>
                    </div> */}
                </div>
                <div className='flex flex-col gap-2 md:w-1/2'>
                    <div className='flex grow flex-col gap-2'>
                        {cryptids.map((item, index) => (
                            <div key={item.k + index} className='join-horizontal join grid grid-cols-12 grid-rows-1'>
                                <div className='col-span-2 join-item flex items-center justify-center bg-base-300 px-2 text-base-content'>{item.k}</div>
                                <div className='col-span-8 join-item flex items-center justify-start border bg-base-100 px-2 text-base-content'>
                                    <div className='w-full break-words'>{item.o ?? item.v}</div>
                                </div>
                                <button className='btn col-span-2 join-item h-full btn-info' onClick={() => navigator.clipboard.writeText(item.v)}>
                                    Copy
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className='sticky bottom-0 flex flex-col gap-2 bg-base-100/50 p-2 backdrop-blur-sm'>
                        <button className='btn w-full btn-sm btn-error' onClick={() => setCryptids([])}>
                            CLEAR
                        </button>
                        <button
                            className='btn w-full btn-sm btn-error'
                            onClick={() => {
                                console.log(StringToBuffer('Test'));
                            }}>
                            Test
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
