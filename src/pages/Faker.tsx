import { faker } from '@faker-js/faker';
import { useState } from 'react';

export default function Faker() {
    const [fakers, setFakers] = useState<Array<{ k: string; v: string }>>([]);
    const [alphanum, setAlphanum] = useState<number>(64);

    return (
        <>
            <h1>Faker Functions</h1>
            <p>
                @faker-js/faker is not owned by me; it is maintained by the{' '}
                <a className='link' href='https://opencollective.com/fakerjs' target='_blank'>
                    Faker Open Collective
                </a>{' '}
                on{' '}
                <a className='link' href='https://github.com/faker-js/faker' target='_blank'>
                    GitHub
                </a>
                . Please try their library whenever you need random data of various kinds for your own projects.
            </p>
            <div className='flex grow flex-col gap-2 divide-primary md:flex-row'>
                <div className='flex flex-col gap-2 md:w-1/2'>
                    <label className='input-bordered input w-full input-primary'>
                        <div className='label'>Characters</div>
                        <input type='number' value={alphanum} min={0} max={65536} onChange={(e) => setAlphanum(e.target.valueAsNumber)} />
                    </label>
                    <button onClick={() => setFakers([...fakers, { k: `${alphanum}-Alphanum`, v: faker.string.alphanumeric(alphanum) }])} className='btn btn-sm btn-primary'>
                        Generate
                    </button>
                </div>
                <div className='flex flex-col gap-2 md:w-1/2'>
                    <div className='flex grow flex-col gap-2'>
                        {fakers.map((item, index) => (
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
                        <button className='btn w-full btn-sm btn-error' onClick={() => setFakers([])}>
                            CLEAR
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
