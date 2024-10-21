import { useState } from 'react';

export default function Cryptog() {
    const [cryptids, setCryptids] = useState<Array<{ k: string; v: string }>>([]);

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
            <div className='flex flex-row bottom-0 sticky p-2 bg-base-100/50 backdrop-blur-sm gap-2'>
                <button
                    className='btn btn-sm btn-primary'
                    onClick={() =>
                        crypto.subtle
                            .generateKey(
                                {
                                    name: 'AES-GCM',
                                    length: 256,
                                },
                                true,
                                ['encrypt']
                            )
                            .then((key) => crypto.subtle.exportKey('raw', key))
                            .then((buffer) => setCryptids([...cryptids, { k: 'AES-GCM[256]', v: btoa(String.fromCharCode(...new Uint8Array(buffer))) }]))
                            .catch((error: Error) => setCryptids([...cryptids, { k: 'AES-GCM[256]', v: error.message }]))
                    }>
                    AES-GCM[256]
                </button>
                <button
                    className='btn btn-sm btn-primary'
                    onClick={() =>
                        crypto.subtle
                            .generateKey(
                                {
                                    name: 'AES-CTR',
                                    length: 256,
                                },
                                true,
                                ['encrypt']
                            )
                            .then((key) => crypto.subtle.exportKey('raw', key))
                            .then((buffer) => setCryptids([...cryptids, { k: 'AES-CTR[256]', v: btoa(String.fromCharCode(...new Uint8Array(buffer))) }]))
                            .catch((error: Error) => setCryptids([...cryptids, { k: 'AES-CTR[256]', v: error.message }]))
                    }>
                    AES-CTR[256]
                </button>
                <button
                    className='btn btn-sm btn-error'
                    onClick={() => {
                        setCryptids([]);
                    }}>
                    CLEAR
                </button>
            </div>
        </>
    );
}
