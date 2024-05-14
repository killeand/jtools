import { useState } from "react";
import Button from "../components/Button";
import _ from "lodash";
import "../styles/ImageProc.css";

window.addEventListener("dragstart", (e) => e.preventDefault());
window.addEventListener("dragover", (e) => e.preventDefault());
window.addEventListener("drop", (e) => e.preventDefault());

export default function ImageProc() {
    let [images, setImages] = useState([]);

    function HandleFileDrag(e) {
        console.log(e.type);
        if (e.type == "dragenter" || e.type == "dragstart") {
            document.getElementById("file__dragstart").classList.remove("hidden");
            document.getElementById("file__dragstart").classList.add("flex");
        } else {
            document.getElementById("file__dragstart").classList.remove("flex");
            document.getElementById("file__dragstart").classList.add("hidden");
        }
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
                if (["image/png", "image/jpeg", "image/gif"].indexOf(Files[i].type) == -1) {
                    console.error(`${Files[i].type} is not part of the whitelist.`);
                    return;
                }

                let FR = new FileReader();
                FR.addEventListener("loadend", (e) => {
                    let FileInfo = {
                        size: e.total,
                        url: e.target.result,
                    };

                    setImages((prevState) => [...prevState, FileInfo]);
                });
                FR.readAsDataURL(Files[i]);
            }
        }
    }

    function RenderImageCards() {
        if (images.length == 0) {
            return <p>No images yet</p>;
        }

        return images.map((FileInfo, index) => {
            return (
                <div key={`fileinfo${index}`} className="m-2 flex w-1/6 flex-col rounded-md border border-black p-2">
                    <div className="flex flex-row items-end justify-evenly">
                        <div className="border border-black">
                            <img src={FileInfo.url} className="max-lg" />
                        </div>
                        <div className="border border-black">
                            <img src={FileInfo.url} className="max-md" />
                        </div>
                        <div className="border border-black">
                            <img src={FileInfo.url} className="max-sm" />
                        </div>
                    </div>
                    <div className="border-t border-black p-2">
                        <p>Size: {FileInfo.size} bytes</p>
                        <Button color="yellow" onClick={() => navigator.clipboard.writeText(FileInfo.url)}>
                            Copy
                        </Button>
                    </div>
                </div>
            );
        });
    }

    return (
        <>
            <h1>Image Processor</h1>
            <p>The image processor allows you to upload an image from your computer, and it will then be converted into a Data URL String.</p>
            <div className="relative mb-2 flex flex-grow flex-col border-4 border-dashed border-black" onDragEnter={HandleFileDrag} onDragLeave={HandleFileDrag} onDrop={HandleFileUpload}>
                <div className="flex h-full w-full items-start">{RenderImageCards()}</div>
                <div id="file__dragstart" className="absolute left-0 top-0 hidden h-full w-full flex-col items-center justify-center bg-black/50 text-white backdrop-blur-sm">
                    Upload?
                </div>

                {/* <div className="flex w-5/6 flex-grow flex-row flex-wrap items-start">{RenderImageCards()}</div>
                <div className="bi-file-arrow-up flex flex-grow items-center justify-center border-4 border-dashed border-white p-2 text-2xl" onDragEnter={HandleFileDrag} onDragLeave={HandleFileDrag} onDrop={HandleFileUpload}>
                    Drop Files Here
                </div>
                <div className="flex">
                    
                </div> */}
            </div>
            <label>
                <input type="file" className="hidden" multiple onChange={HandleFileUpload} />
                <button className="bi-file-arrow-up btn btn-secondary btn-sm w-full text-secondary-content">Click here to upload file</button>
            </label>
        </>
    );
}
