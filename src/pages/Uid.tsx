import { createId as cuid } from '@paralleldrive/cuid2';
import { useState } from 'react';
import { ulid } from 'ulidx';
import { v1, v3, v4, v5, v6, v7 } from 'uuid';

export default function Uid() {
    let [id, setId] = useState<Array<{ k: string; v: string }>>([]);

    return (
        <>
            <div className='flex-grow flex gap-2 flex-col'>
                {id.map((item, index) => (
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
                <button className='btn btn-sm btn-primary' onClick={() => setId([...id, { k: 'uuid v1', v: v1() }])}>
                    uuid v1
                </button>
                <button className='btn btn-sm btn-primary' onClick={() => setId([...id, { k: 'uuid v3', v: v3(ulid(), v1()) }])}>
                    uuid v3
                </button>
                <button className='btn btn-sm btn-primary' onClick={() => setId([...id, { k: 'uuid v4', v: v4() }])}>
                    uuid v4
                </button>
                <button className='btn btn-sm btn-primary' onClick={() => setId([...id, { k: 'uuid v5', v: v5(ulid(), v1()) }])}>
                    uuid v5
                </button>
                <button className='btn btn-sm btn-primary' onClick={() => setId([...id, { k: 'uuid v6', v: v6() }])}>
                    uuid v6
                </button>
                <button className='btn btn-sm btn-primary' onClick={() => setId([...id, { k: 'uuid v7', v: v7() }])}>
                    uuid v7
                </button>
                <button className='btn btn-sm btn-primary' onClick={() => setId([...id, { k: 'ulid', v: ulid() }])}>
                    ulid
                </button>
                <button className='btn btn-sm btn-primary' onClick={() => setId([...id, { k: 'cuid', v: cuid() }])}>
                    cuid
                </button>
                <button className='btn btn-sm btn-error' onClick={() => setId([])}>
                    CLEAR
                </button>
            </div>
        </>
    );
}
