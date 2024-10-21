import { createId as cuid } from '@paralleldrive/cuid2';
import { useState } from 'react';
import { ulid } from 'ulidx';
import { v1, v3, v4, v5, v6, v7 } from 'uuid';

export default function Uid() {
    let [id, setId] = useState<Array<{ type: string; value: string }>>([]);

    function AddID(idtype: string, idvalue: string) {
        setId([...id, { type: idtype, value: idvalue }]);
    }

    function RenderIDS() {
        if (id.length == 0) {
            return <p>No ID's Generated Yet</p>;
        }

        return id.map((item) => {
            return (
                <div key={ulid()} className='flex flex-row p-2 bg-base-100'>
                    <div className='bg-base-300 text-base-content flex justify-center items-center px-2 min-w-[10%] rounded-l-lg'>{item.type}</div>
                    <div className='flex-grow flex items-center justify-start bg-base-100 text-base-content px-2 rounded-r-lg mr-2 border'>{item.value}</div>
                    <button className='btn btn-sm btn-info' onClick={() => navigator.clipboard.writeText(item.value)}>
                        Copy
                    </button>
                </div>
            );
        });
    }

    return (
        <>
            <div className='flex-grow flex gap-2 flex-col'>{RenderIDS()}</div>
            <div className='flex flex-row gap-2'>
                <button className='btn btn-sm btn-primary' onClick={() => AddID('uuid v1', v1())}>
                    uuid v1
                </button>
                <button className='btn btn-sm btn-primary' onClick={() => AddID('uuid v3', v3(ulid(), v1()))}>
                    uuid v3
                </button>
                <button className='btn btn-sm btn-primary' onClick={() => AddID('uuid v4', v4())}>
                    uuid v4
                </button>
                <button className='btn btn-sm btn-primary' onClick={() => AddID('uuid v5', v5(ulid(), v1()))}>
                    uuid v5
                </button>
                <button className='btn btn-sm btn-primary' onClick={() => AddID('uuid v6', v6())}>
                    uuid v6
                </button>
                <button className='btn btn-sm btn-primary' onClick={() => AddID('uuid v7', v7())}>
                    uuid v7
                </button>
                <button className='btn btn-sm btn-primary' onClick={() => AddID('ulid', ulid())}>
                    ulid
                </button>
                <button className='btn btn-sm btn-primary' onClick={() => AddID('cuid', cuid())}>
                    cuid
                </button>
                <button className='btn btn-sm btn-error' onClick={() => setId([])}>
                    CLEAR
                </button>
            </div>
        </>
    );
}
