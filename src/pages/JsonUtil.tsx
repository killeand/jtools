import JsonTabTable from '@/components/JsonTabTable';

export default function JsonUtil() {
    return (
        <>
            <h1>JSON Utilities</h1>
            <div className='tabs tabs-box'>
                <input type='radio' name='json-table' className='tab' aria-label='JSON to Table' defaultChecked />
                <JsonTabTable />
            </div>
        </>
    );
}
