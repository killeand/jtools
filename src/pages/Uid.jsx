import { v1, v3, v4, v5 } from "uuid";
import { ulid } from "ulidx";
import { useState } from "react";
import Button from "../components/Button";

export default function Uid() {
    let [id, setId] = useState([]);

    function AddID(idtype, idvalue) {
        setId([...id, { type: idtype, value: idvalue }]);
    }

    function RenderIDS() {
        if (id.length == 0) {
            return <p>No ID Generated Yet</p>;
        }

        return id.map((item) => {
            return (
                <div key={ulid()} className="flex flex-row border border-black p-2 odd:bg-slate-300 even:bg-slate-500">
                    <div className="w-1/6 bg-slate-800 text-center font-bold text-white">{item.type}</div>
                    <div className="w-5/6 flex-grow bg-white pl-2">{item.value}</div>
                </div>
            );
        });
    }

    return (
        <div className="flex flex-grow flex-row">
            <aside>
                <Button className="text-sm text-black" color="white" onClick={() => AddID("uuid v1", v1())}>
                    uuid v1
                </Button>
                <Button className="text-sm text-black" color="white" onClick={() => AddID("uuid v3", v3(ulid(), v1()))}>
                    uuid v3
                </Button>
                <Button className="text-sm text-black" color="white" onClick={() => AddID("uuid v4", v4())}>
                    uuid v4
                </Button>
                <Button className="text-sm text-black" color="white" onClick={() => AddID("uuid v5", v5(ulid(), v1()))}>
                    uuid v5
                </Button>
                <Button className="text-sm text-black" color="white" onClick={() => AddID("ulid", ulid())}>
                    ulid
                </Button>
                <Button className="text-sm text-black" color="white" onClick={() => setId([])}>
                    CLEAR
                </Button>
            </aside>
            <div className="flex-grow">{RenderIDS()}</div>
        </div>
    );
}
