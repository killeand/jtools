import { createId as cuid } from '@paralleldrive/cuid2';
import { useState } from 'react';
import { ulid } from 'ulidx';
import { v1, v3, v4, v5, v6, v7 } from 'uuid';

export default function Uid() {
    let [id, setId] = useState<Array<{ k: string; v: string }>>([]);

    return (
        <>
            <h1>UID Functions</h1>
            <div className='flex grow flex-col gap-2 divide-primary md:flex-row'>
                <div className='flex flex-col gap-2 md:w-1/4'>
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
                </div>
                <div className='flex flex-col gap-2 md:w-3/4'>
                    <div className='flex grow flex-col gap-2'>
                        {id.map((item, index) => (
                            <div key={item.k + index} className='join-horizontal join grid grid-cols-12 grid-rows-1'>
                                <div className='col-span-2 join-item flex items-center justify-center bg-base-300 px-2 text-base-content'>{item.k}</div>
                                <div className='col-span-8 join-item flex items-center justify-start border bg-base-100 px-2 text-base-content'>
                                    <div className='w-full break-words'>{item.v}</div>
                                </div>
                                <button className='btn col-span-2 join-item h-full btn-info' onClick={() => navigator.clipboard.writeText(item.v)}>
                                    Copy
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className='sticky bottom-0 flex flex-col gap-2 bg-base-100/50 p-2 backdrop-blur-sm'>
                        <button className='btn w-full btn-sm btn-error' onClick={() => setId([])}>
                            CLEAR
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
