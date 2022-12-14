import { useState } from 'react';
import Button from '../components/Button';
import _ from 'lodash';
import '../styles/ImageProc.css';

window.addEventListener("dragover", (e) => e.preventDefault());
window.addEventListener("drop", (e) => e.preventDefault());

export default function PageImageProc() {
    let [ images, setImages ] = useState([]);

    function HandleFileDrag(e) {
        e.target.classList.toggle("border-gray-700");
    }

    function HandleFileUpload(e) {
        let Files = null;

        if (!_.isNil(e.target.files)) {
            Files = e.target.files;
        }

        if (_.has(e, "dataTransfer")) {
            Files = e.dataTransfer.files;
            e.target.classList.toggle("border-gray-700");
        }

        if (!_.isNil(Files)) {
            for (let i = 0; i < Files.length; i++) {
                if (["image/png","image/jpeg","image/gif"].indexOf(Files[i].type) == -1) {
                    console.error(`${Files[i].type} is not part of the whitelist.`);
                    return;
                }

                let FR = new FileReader();
                FR.addEventListener('loadend', (e) => {
                    let FileInfo = {
                        size: e.total,
                        url: e.target.result
                    }

                    setImages(prevState => [...prevState, FileInfo]);
                });
                FR.readAsDataURL(Files[i])
            }
        }
    }

    function RenderImageCards() {
        if (images.length == 0) {
            return (<p>No images yet</p>);
        }

        return images.map((FileInfo, index) => {
            return (
                <div key={`fileinfo${index}`} className="w-1/6 m-2 p-2 border border-black rounded-md flex flex-col">
                    <div className="flex flex-row items-end justify-evenly">
                        <div className="border border-black"><img src={FileInfo.url} className="max-lg" /></div>
                        <div className="border border-black"><img src={FileInfo.url} className="max-md" /></div>
                        <div className="border border-black"><img src={FileInfo.url} className="max-sm" /></div>
                    </div>
                    <div className="border-t border-black p-2">
                        <p>Size: {FileInfo.size} bytes</p>
                        <Button color="yellow" onClick={() => navigator.clipboard.writeText(FileInfo.url)}>Copy</Button>
                    </div>
                </div>
            );
        });
    }

    return (
        <div className="flex flex-row flex-grow">
            <aside>
                <div className="bi-file-arrow-up flex flex-grow items-center justify-center p-2 text-2xl border-4 border-white border-dashed" onDragEnter={HandleFileDrag} onDragLeave={HandleFileDrag} onDrop={HandleFileUpload}>
                    Drop Files Here
                </div>
                <div className="flex">
                    <label className="cursor-pointer flex-grow">
                        <input type="file" className="hidden" multiple onChange={HandleFileUpload} />
                        <Button className="w-full text-black bi-file-arrow-up" color="white">Or, click on this button...</Button>
                    </label>
                </div>
            </aside>
            <div className="w-5/6 flex flex-row flex-grow flex-wrap items-start">{RenderImageCards()}</div>
        </div>
    );
}