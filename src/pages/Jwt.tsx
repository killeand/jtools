import { StringToBuffer } from '@/scripts/StringUtils';
import { JWTHeaderSchema } from '@/scripts/ZodJwt';
import { decodeJwt, decodeProtectedHeader, JWTPayload, jwtVerify, ProtectedHeaderParameters } from 'jose';
import { useState } from 'react';

export default function Jwt() {
    const [encoded, setEncoded] = useState<string>('');
    const [header, setHeader] = useState<string>('');
    const [payload, setPayload] = useState<string>('');
    const [algorithm, setAlgorithm] = useState<string>('HS256');
    const [secret, setSecret] = useState<string>('');
    const [valid, setValid] = useState<boolean>(true);
    const [ev, setEV] = useState<boolean>(true);
    const [hv, setHV] = useState<boolean>(true);
    const [pv, setPV] = useState<boolean>(true);

    function ResetFields(valid: boolean, ignore?: { h?: boolean; p?: boolean; e?: boolean }) {
        setEV(valid);
        setHV(valid);
        setPV(valid);
        setValid(valid);
        if (!ignore || (ignore && !ignore.h)) setHeader('');
        if (!ignore || (ignore && !ignore.p)) setPayload('');
        if (!ignore || (ignore && !ignore.e)) setEncoded('');
    }

    async function HandleEncodedChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const v = e.target.value;
        setEncoded(v);

        if (v === '') {
            ResetFields(true, { e: true });
            return;
        } else if (!v.match(/^[\w\-]+\.[\w\-]+\.[\w\-]+$/gm)) {
            ResetFields(false, { e: true });
            return;
        } else {
            setEV(true);
        }

        let header: ProtectedHeaderParameters | null = null;
        let payload: JWTPayload | null = null;
        let verify = false;

        try {
            header = decodeProtectedHeader(e.target.value);
            payload = decodeJwt(e.target.value);
        } catch {
            ResetFields(false, { e: true });
            return;
        }

        try {
            await jwtVerify(e.target.value, StringToBuffer(secret));
            verify = true;
        } catch {
            verify = false;
        }

        if (header) {
            setHeader(JSON.stringify(header, null, '\t'));
            setHV(true);
            setAlgorithm(header.alg ?? 'HS256');
        } else {
            setHeader('');
            setHV(false);
        }

        if (payload) {
            setPayload(JSON.stringify(payload, null, '\t'));
            setPV(true);
        } else {
            setPayload('');
            setPV(false);
        }

        setValid(verify);
    }

    async function HandleHeaderChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const v = e.target.value;

        if (v === '') {
            ResetFields(true, { h: true });
            return;
        }

        let header: ProtectedHeaderParameters | null = null;

        try {
            header = JSON.parse(v);

            if (JWTHeaderSchema.safeParse(header).success) {
                setHV(true);
            }
        } catch {}
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
                                    <option value='HS256'>HMAC-SHA256</option>
                                    <option value='HS384'>HMAC-SHA384</option>
                                    <option value='HS512'>HMAC-SHA512</option>
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
