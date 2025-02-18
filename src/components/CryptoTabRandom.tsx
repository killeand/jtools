import { GenerateBytes } from '@/scripts/CryptoUtils';
import { BufferToBase64 } from '@/scripts/StringUtils';
import { useState } from 'react';

export default function CryptoTabRandom({ cryptedSetter }: { cryptedSetter: (key: string, value: string) => void }) {
    const [byteval, setByteval] = useState<number>(32);

    function HandleGenerateClick() {
        if (byteval >= 1 && byteval <= 65536) {
            cryptedSetter(`${byteval * 8}-Bit Value`, BufferToBase64(GenerateBytes(byteval)));
        }
    }

    return (
        <div className='tab-content border-base-300 bg-base-100 p-2'>
            <p>Generates a cryptographically random value and outputs as a base64 string.</p>
            <div className='flex flex-col gap-2'>
                <label className='input-bordered input w-full input-primary'>
                    Bytes
                    <input type='number' value={byteval} min={1} max={65536} onChange={(e) => setByteval(e.target.valueAsNumber)} />
                </label>
                <button onClick={HandleGenerateClick} className='btn btn-sm btn-primary'>
                    Generate {byteval}-Byte {byteval * 8}-Bit Value
                </button>
                <button onClick={() => setByteval(16)} className='btn btn-sm btn-info'>
                    Set 16-Byte 128-Bit Value
                </button>
                <button onClick={() => setByteval(32)} className='btn btn-sm btn-info'>
                    Set 32-Byte 256-Bit Value
                </button>
                <button onClick={() => setByteval(64)} className='btn btn-sm btn-info'>
                    Set 64-Byte 512-Bit Value
                </button>
                <button onClick={() => setByteval(128)} className='btn btn-sm btn-info'>
                    Set 128-Byte 1024-Bit Value
                </button>
            </div>
        </div>
    );
}
