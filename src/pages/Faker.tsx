import { faker } from '@faker-js/faker';
import { useState } from 'react';

export default function Faker() {
    const [fakers, setFakers] = useState<Array<{ k: string; v: string }>>([]);
    const [alphanum, setAlphanum] = useState<number>(64);

    return (
        <>
            <p>
                @faker-js/faker is not owned by me; it is maintained by the{' '}
                <a className='link' href='https://opencollective.com/fakerjs'>
                    Faker Open Collective
                </a>{' '}
                on{' '}
                <a className='link' href='https://github.com/faker-js/faker'>
                    GitHub
                </a>
                . Please try their library whenever you need random data of various kinds for your own projects.
            </p>
            <div className='flex-grow flex gap-2 flex-col'>
                {fakers.map((item, index) => (
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
                <div className='join join-horizontal'>
                    <input type='number' value={alphanum} onChange={(e) => setAlphanum(e.target.valueAsNumber)} className='join-item input input-sm input-bordered w-20' />
                    <button className='btn btn-sm btn-primary join-item' onClick={() => setFakers([...fakers, { k: alphanum + '-Alpha', v: faker.string.alphanumeric(alphanum) }])}>
                        -Alpha
                    </button>
                </div>
                <button
                    className='btn btn-sm btn-error'
                    onClick={() => {
                        setFakers([]);
                        setAlphanum(64);
                    }}>
                    CLEAR
                </button>
            </div>
        </>
    );
}
