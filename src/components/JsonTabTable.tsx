import { ChangeEvent, useState } from 'react';

export default function JsonTabTable() {
    const [headers, setHeaders] = useState<Array<string>>([]);
    const [data, setData] = useState<Array<{ [key: string]: unknown }>>([]);

    function RunBuild(e: ChangeEvent<HTMLTextAreaElement>) {
        const value = e.target?.value ?? '';
        let output: Array<unknown> = [];

        e.target.setCustomValidity('');

        try {
            output = JSON.parse(value);

            for (let i = 0; i < output.length; i++) {
                if (!(output instanceof Object) && Object.getPrototypeOf(output[i]) != Object.prototype) throw new Error('Invalid syntax');
            }

            setData(output as Array<{ [key: string]: unknown }>);
        } catch (error: unknown) {
            e.target.setCustomValidity('Invalid JSON');
        }
    }

    return (
        <div className='tab-content border-base-300 bg-base-100 p-2'>
            <p>Generally speaking for this to work, you need to set the input to be an array of objects. Sub arrays and objects might not be represented properly. Try to keep the sample set as simple as possible.</p>
            <div className='flex flex-col gap-2 md:flex-row'>
                <div className='h-fit grow'>
                    <h2>JSON Input</h2>
                    <textarea className='validator textarea h-full w-full textarea-primary' required onChange={RunBuild} />
                </div>
                <div className='grow'>
                    <h2>Table Output</h2>
                    <div className='overflow-scroll'>
                        {data.length === 0 && <p>No data yet</p>}
                        {data.length !== 0 && <pre>{JSON.stringify(data, null, '\t')}</pre>}
                    </div>
                </div>
            </div>
        </div>
    );
}
