import { Digest, Hash } from '@/scripts/CryptoUtils';
import { Base64ToString, BufferToBase64 } from '@/scripts/StringUtils';
import { useState } from 'react';

export default function Jwt() {
    const [encoded, setEncoded] = useState<string>('');
    const [header, setHeader] = useState<string>('');
    const [payload, setPayload] = useState<string>('');
    const [algorithm, setAlgorithm] = useState<string>('256');
    const [secret, setSecret] = useState<string>('');
    const [valid, setValid] = useState<boolean>(true);
    const [ev, setEV] = useState<boolean>(true);
    const [hv, setHV] = useState<boolean>(true);
    const [pv, setPV] = useState<boolean>(true);

    async function HandleEncodedChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setEncoded(e.target.value);

        if (e.target.value === '') {
            setEV(true);
            setHV(true);
            setPV(true);
            setValid(true);
            setHeader('');
            setPayload('');
            return;
        } else if (!e.target.value.match(/^[\w\-]+\.[\w\-]+\.[\w\-]+$/gm)) {
            setEV(false);
            setHV(false);
            setPV(false);
            setValid(false);
            setHeader('');
            setPayload('');
            return;
        } else {
            setEV(true);
        }

        const split = e.target.value.split('.');
        let HeaderObj: { alg: 'HS256' | 'HS384' | 'HS512'; type: 'JWT'; [key: string]: string } | null = null;

        try {
            HeaderObj = JSON.parse(Base64ToString(split[0], true));
            setHeader(JSON.stringify(HeaderObj, null, '\t'));
            setHV(true);
            setAlgorithm(HeaderObj?.alg.substring(2) ?? '256');
        } catch {
            setHeader('Invalid Base64 Encoded JSON');
            setHV(false);
            setValid(false);
            return;
        }

        try {
            setPayload(JSON.stringify(JSON.parse(Base64ToString(split[1], true)), null, '\t'));
            setPV(true);
        } catch {
            setPayload('Invalid Base64 Encoded JSON');
            setPV(false);
            setValid(false);
            return;
        }

        try {
            const SHA = await Digest(secret, HeaderObj?.alg.substring(2) ?? '256');
            const Sig = await Hash(SHA, `${split[0]}.${split[1]}`);
            const SigEnc = BufferToBase64(Sig, true);

            if (SigEnc === split[2]) {
                setValid(true);
                console.log('Match');
            } else {
                setValid(false);
                console.log('Not Match');
            }
        } catch {
            setValid(false);
            console.log('Could not validate sig');
        }
    }

    return (
        <>
            <h1>JWT Debugger</h1>
            <p>
                JSON Web Tokens (JWT) are everywhere, and a very valuable resource for auth. While I am working on said systems, I tend to visit a website for understanding of the JWT, or to just see what is inside. That website is{' '}
                <a href='https://jwt.io' target='_blank' className='link'>
                    jwt.io
                </a>
                , run by the fine folks at Auth0. If for whatever reason that resource becomes unavailable, (or because I want to consolodate all tools I use into a single source), I have tried my best to duplicate their debugger here. I am, however, only using the more common HMAC algorithm instead of the RSA, ECDSA, etc... alternatives (because I already have handy HMAC SHA functions written).
            </p>
            <div className='flex grow flex-col gap-2 divide-primary md:flex-row'>
                <div className='flex flex-col gap-2 bg-base-200 p-2 md:w-1/2'>
                    <h2>Encoded</h2>
                    <textarea value={encoded} onChange={HandleEncodedChange} placeholder='Encoded JWT Here' className={`textarea h-full w-full textarea-primary ${ev ? 'bg-base-100' : 'bg-error text-error-content'}`}></textarea>
                </div>
                <div className='flex flex-col gap-2 p-2 md:w-1/2'>
                    <h2>Decoded</h2>
                    <fieldset>
                        <legend>Header</legend>
                        <textarea value={header} onChange={(e) => setHeader(e.target.value)} placeholder='Decoded Header Here' className={`textarea h-full w-full textarea-primary ${hv ? 'bg-base-100' : 'bg-error text-error-content'}`}></textarea>
                    </fieldset>
                    <fieldset>
                        <legend>Payload</legend>
                        <textarea value={payload} onChange={(e) => setPayload(e.target.value)} placeholder='Decoded Payload Here' className={`textarea h-full w-full textarea-primary ${pv ? 'bg-base-100' : 'bg-error text-error-content'}`}></textarea>
                    </fieldset>
                    <fieldset>
                        <legend>Signature</legend>
                        <div className='flex flex-col items-center md:flex-row'>
                            <label className='select select-primary md:w-5/12'>
                                <div className='label'>Algorithm</div>
                                <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
                                    <option value='256'>HMAC-SHA256</option>
                                    <option value='384'>HMAC-SHA384</option>
                                    <option value='512'>HMAC-SHA512</option>
                                </select>
                            </label>
                            <label className='input-bordered input input-primary md:w-3/6'>
                                <input type='text' placeholder='Secret Here' value={secret} onChange={(e) => setSecret(e.target.value)} />
                            </label>
                            <div className={`${valid ? 'bi-check-circle text-success' : 'bi-x-circle text-error'} text-center text-2xl md:w-1/12`} />
                        </div>
                    </fieldset>
                </div>
            </div>
        </>
    );
}
