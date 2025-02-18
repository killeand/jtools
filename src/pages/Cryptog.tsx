import CryptoTabHash from '@/components/CryptoTabHash';
import CryptoTabRandom from '@/components/CryptoTabRandom';
import { Base64ToBuffer } from '@/scripts/StringUtils';
import { ReactNode, useState } from 'react';
import { BufferToBase64 } from '../scripts/StringUtils';

export default function Cryptog() {
    const [cryptids, setCryptids] = useState<Array<{ k: string; v: string; o?: string | ReactNode }>>([]);

    return (
        <>
            <div className='flex grow flex-col gap-2 divide-primary md:flex-row'>
                <div className='tabs tabs-box md:w-1/2'>
                    <input type='radio' name='crypto-selection' className='tab' aria-label='Random' defaultChecked />
                    <CryptoTabRandom cryptedSetter={(key, value) => setCryptids([...cryptids, { k: key, v: value }])} />
                    <input type='radio' name='crypto-selection' className='tab' aria-label='Hash' />
                    <CryptoTabHash
                        cryptedSetter={(secret, value, encrypted) =>
                            setCryptids([
                                ...cryptids,
                                {
                                    k: 'Hash',
                                    v: value,
                                    o: (
                                        <div className='flex flex-col'>
                                            <div className='break-words'>
                                                <span className='font-bold'>Secret:</span> {secret}
                                            </div>
                                            <div className='break-words'>
                                                <span className='font-bold'>Value:</span> {value}
                                            </div>
                                            <div className='break-words'>
                                                <span className='font-bold'>Result:</span> {encrypted}
                                            </div>
                                        </div>
                                    ),
                                },
                            ])
                        }
                    />
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
                                let testray = [];
                                for (let i = 0; i < 256; i++) testray.push(i);
                                const newray: Uint8Array = new Uint8Array(testray);

                                const native_encode = btoa(String.fromCharCode(...newray));
                                const mine_encode = BufferToBase64(newray);

                                console.log(native_encode, mine_encode, native_encode === mine_encode);

                                const native_decode = new Uint8Array([...atob(mine_encode)].map((c) => c.charCodeAt(0)));
                                const mine_decode = Base64ToBuffer(native_encode);

                                console.log(native_decode, mine_decode);
                                newray.forEach((v, i) => {
                                    if (v !== native_decode[i]) console.log('Native wrong');
                                    if (v !== mine_decode[i]) console.log('Mine wrong');
                                });
                            }}>
                            Test
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
