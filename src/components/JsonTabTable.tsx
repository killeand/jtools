import { GenerateBytes } from '@/scripts/CryptoUtils';
import { ChangeEvent, useState } from 'react';

export default function JsonTabTable() {
    const [headers, setHeaders] = useState<Array<string>>([]);
    const [data, setData] = useState<Array<{ [key: string]: unknown }>>([]);

    function isObject(value: unknown): boolean {
        return value instanceof Object && Object.getPrototypeOf(value) === Object.prototype;
    }

    function RunBuild(e: ChangeEvent<HTMLTextAreaElement>) {
        const value = e.target?.value ?? '';
        let output: Array<unknown> = [];

        e.target.setCustomValidity('');

        try {
            let input = JSON.parse(value);
            let newheaders: Array<string> = [];

            if (!Array.isArray(input)) output = [input];
            else output = input;

            for (let i = 0; i < output.length; i++) {
                if (!isObject(output[i])) throw new Error('Invalid syntax');

                Object.keys(output[i] as Object).forEach((outputkey: string) => {
                    if (newheaders.findIndex((headerkey: string) => outputkey === headerkey) == -1) newheaders.push(outputkey);
                });
            }

            setHeaders(newheaders);
            setData(output as Array<{ [key: string]: unknown }>);
        } catch (error: unknown) {
            e.target.setCustomValidity((error as Error).message);
        }
    }

    return (
        <div className='tab-content border-base-300 bg-base-100 p-2'>
            <p>Generally speaking for this to work, you need to set the input to be an array of objects. Sub arrays and objects might not be represented properly. Try to keep the sample set as simple as possible.</p>
            <div className='flex flex-col gap-2 md:flex-row'>
                <div className='grow'>
                    <h2>JSON Input</h2>
                    <textarea className='validator textarea h-full w-full grow textarea-primary' required onChange={RunBuild} />
                </div>
                <div className='grow'>
                    <h2>Table Output</h2>
                    <div className='overflow-scroll'>
                        {data.length === 0 && <p>No data yet</p>}
                        {data.length !== 0 && (
                            <table className='table table-zebra'>
                                <thead>
                                    <tr>
                                        {headers.map((header) => (
                                            <th key={`headerdata-${header}`}>{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((subobject) => (
                                        <tr key={`bodyrow-${GenerateBytes(32)}`}>
                                            {headers.map((header) => (
                                                <td key={`rowcol-${GenerateBytes(32)}`}>{JSON.stringify(subobject[header]) ?? ''}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
