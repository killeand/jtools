import CryptoTabDecrypt from '@/components/CryptoTabDecrypt';
import CryptoTabDigest from '@/components/CryptoTabDigest';
import CryptoTabEncrypt from '@/components/CryptoTabEncrypt';
import CryptoTabHash from '@/components/CryptoTabHash';
import CryptoTabRandom from '@/components/CryptoTabRandom';
import { Base64ToBuffer } from '@/scripts/StringUtils';
import { ReactNode, useState } from 'react';
import { BufferToBase64 } from '../scripts/StringUtils';

export default function Cryptog() {
    const [cryptids, setCryptids] = useState<Array<{ k: string; v: string; o?: string | ReactNode }>>([]);

    return (
        <>
            <h1>Cryptographic Functions</h1>
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
                                    v: encrypted,
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
                    <input type='radio' name='crypto-selection' className='tab' aria-label='Digest' />
                    <CryptoTabDigest
                        cryptedSetter={(algorithm, value, encrypted) =>
                            setCryptids([
                                ...cryptids,
                                {
                                    k: 'Digest',
                                    v: encrypted,
                                    o: (
                                        <div className='flex flex-col'>
                                            <div className='break-words'>
                                                <span className='font-bold'>Algorithm:</span> {algorithm}
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
                    <input type='radio' name='crypto-selection' className='tab' aria-label='Encrypt' />
                    <CryptoTabEncrypt
                        cryptedSetter={(secret, value, encrypted, iv, combined) =>
                            setCryptids([
                                ...cryptids,
                                {
                                    k: 'Encrypt',
                                    v: combined,
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
                                            <div className='break-words'>
                                                <span className='font-bold'>IV:</span> {iv}
                                            </div>
                                            <div className='break-words'>
                                                <span className='font-bold'>Combined:</span> {combined}
                                            </div>
                                        </div>
                                    ),
                                },
                            ])
                        }
                    />
                    <input type='radio' name='crypto-selection' className='tab' aria-label='Decrypt' />
                    <CryptoTabDecrypt
                        cryptedSetter={(secret, value, result) =>
                            setCryptids([
                                ...cryptids,
                                {
                                    k: 'Decrypt',
                                    v: result,
                                    o: (
                                        <div className='flex flex-col'>
                                            <div className='break-words'>
                                                <span className='font-bold'>Secret:</span> {secret}
                                            </div>
                                            <div className='break-words'>
                                                <span className='font-bold'>Value:</span> {value}
                                            </div>
                                            <div className='break-words'>
                                                <span className='font-bold'>Result:</span> {result}
                                            </div>
                                        </div>
                                    ),
                                },
                            ])
                        }
                    />
                    <input type='radio' name='crypto-selection' className='tab' aria-label='Notes' />
                    <div className='tab-content border-base-300 bg-base-100 p-2'>
                        <p>All of the crypto functions use custom written code to handle byte array buffers to/from base64 encoded text. This is to prevent a potential encoding problem if using the utf-8 text set, but for most cases this error never occurs. So writing these function became more of an academic exercise. The following button will generate a byte array of values from 0 to 255 and will encode the results using the built in btoa and atob functions, and then using the custom functions. To view the result, please check your console output.</p>
                        <button
                            className='btn w-full btn-sm btn-error'
                            onClick={() => {
                                const SampleData = new Uint8Array(256);
                                for (let i = 0; i < 256; i++) SampleData[i] = i;
                                console.info('Sample Data Array:', SampleData);

                                const NativeEncode = btoa(String.fromCharCode(...SampleData));
                                const WrittenEncode = BufferToBase64(SampleData);

                                console.info('btoa(String.fromCharCode):', NativeEncode);
                                console.info('Custom Function:', WrittenEncode);
                                console.info('Native === Written:', NativeEncode === WrittenEncode);

                                const NativeDecode = new Uint8Array([...atob(NativeEncode)].map((c) => c.charCodeAt(0)));
                                const WrittenDecode = Base64ToBuffer(WrittenEncode);

                                console.info('Array([...atob(NativeEncode)]):', NativeDecode);
                                console.info('Custom Function:', WrittenDecode);

                                const TestArray: Array<{ Index: number; Native: boolean; Written: boolean }> = [];
                                SampleData.forEach((v, i) => {
                                    TestArray.push({ Index: i, Native: v === NativeDecode[i], Written: v === WrittenDecode[i] });
                                });
                                console.info('Comparison to SampleData:', TestArray);
                            }}>
                            Test
                        </button>
                    </div>
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
                    </div>
                </div>
            </div>
        </>
    );
}
