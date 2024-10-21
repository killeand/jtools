import { useState } from 'react';

export default function Random() {
    const [numbers, setNumbers] = useState<Array<Array<number>>>([]);

    function RandomNum(low: number, high: number): number {
        return low + Math.floor(Math.random() * (high + 1 - low));
    }

    return (
        <>
            <h1>Random Number Function</h1>
            <div className='indicator w-1/2 mx-auto'>
                <span className='indicator-item badge badge-primary'>JS</span>
                <code className='w-full'>
                    <pre data-prefix='1'>export function RandomNum(low, high) &#123;</pre>
                    <pre data-prefix='2'>&nbsp;&nbsp;&nbsp;&nbsp;return low + Math.floor(Math.random() * (high + 1 - low));</pre>
                    <pre data-prefix='3'>&#125;</pre>
                </code>
            </div>
            <div className='indicator w-1/2 mx-auto'>
                <span className='indicator-item badge badge-primary'>TS</span>
                <code className='w-full'>
                    <pre data-prefix='1'>export function RandomNum(low: number, high: number): number &#123;</pre>
                    <pre data-prefix='2'>&nbsp;&nbsp;&nbsp;&nbsp;return low + Math.floor(Math.random() * (high + 1 - low));</pre>
                    <pre data-prefix='3'>&#125;</pre>
                </code>
            </div>
            <button
                className='btn btn-primary btn-sm'
                onClick={() => {
                    const totals: Array<Array<number>> = [];

                    for (let i = 0; i < 1000000; i++) {
                        const newrandom = RandomNum(-100, 100);

                        const filtered = totals.filter((item) => item[0] == newrandom);

                        if (filtered.length > 0) filtered[0][1] += 1;
                        else totals.push([newrandom, 1]);
                    }

                    setNumbers(totals.sort((a, b) => (a[0] < b[0] ? 1 : -1)));
                }}>
                Generate Random Numbers
            </button>
            <p>Please note that the generation may take a few seconds (system may hang). This will generate 1 million numbers from -100 to 100. You should see all 201 numbers (including 0) in the list, and the numbers should be around the average of 4975 &plusmn; 201 (&lfloor;1000000 / 201&rfloor;).</p>
            <div className='flex flex-row gap-1 flex-wrap'>
                {numbers.map((item) => (
                    <div key={item[0]} className='flex flex-row'>
                        <div className='bg-base-300 text-base-content min-w-12 text-center rounded-l-lg'>{item[0]}</div>
                        <div className='flex-grow border rounded-r-lg px-1'>{item[1]}</div>
                    </div>
                ))}
            </div>
        </>
    );
}
