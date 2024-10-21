import { ChangeEvent, DragEvent, useState } from 'react';

window.addEventListener('dragstart', (e) => e.preventDefault());
window.addEventListener('dragover', (e) => e.preventDefault());
window.addEventListener('drop', (e) => e.preventDefault());

type FileInfo = {
    size: number;
    url: string;
};

export default function ImageProc() {
    let [images, setImages] = useState<Array<FileInfo>>([]);

    function HandleFileUpload(e: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>): void {
        let Files: FileList | null = null;

        if ((e.target as HTMLInputElement).files) {
            Files = (e.target as HTMLInputElement).files;
        }

        if ((e as DragEvent).dataTransfer) {
            Files = (e as DragEvent).dataTransfer.files;
        }

        if (Files) {
            for (let i = 0; i < Files.length; i++) {
                if (['image/png', 'image/jpeg', 'image/gif'].indexOf(Files[i].type) == -1) {
                    console.error(`${Files[i].type} is not part of the whitelist.`);
                    return;
                }

                let FR = new FileReader();
                FR.addEventListener('loadend', (e: ProgressEvent<FileReader>) => {
                    let newfile = {
                        size: e.total,
                        url: (e.target?.result as string) ?? '',
                    };

                    setImages((prevState) => [...prevState, newfile]);
                });
                FR.readAsDataURL(Files[i]);
            }
        }
    }

    function RenderImageCards() {
        if (images.length == 0) {
            return <p>No images yet...</p>;
        }

        return images.map((FileInfo, index) => {
            return (
                <div key={`fileinfo${index}`} className='card card-compact w-[16rem] h-[11rem] shadow border'>
                    <div className='card-body'>
                        <div className='flex flex-row flex-grow items-end justify-evenly border-b pb-2'>
                            <div className='border'>
                                <img src={FileInfo.url} className='max-h-[4rem] max-w-[4rem]' />
                            </div>
                            <div className='border'>
                                <img src={FileInfo.url} className='max-h-[3rem] max-w-[3rem]' />
                            </div>
                            <div className='border'>
                                <img src={FileInfo.url} className='max-h-[2rem] max-w-[2rem]' />
                            </div>
                        </div>
                        <div className='flex flex-row self-start items-center justify-center'>Size: {FileInfo.size} bytes</div>
                        <div className='card-actions'>
                            <button className='btn btn-sm btn-primary text-primary-content bi-files' onClick={() => navigator.clipboard.writeText(FileInfo.url)}>
                                Copy
                            </button>
                        </div>
                    </div>
                </div>
            );
        });
    }

    return (
        <>
            <h1>Image Processor</h1>
            <p>The image processor allows you to upload an image from your computer, and it will then be converted into a Data URL String.</p>
            <div className='flex gap-3 mb-3 flex-wrap overflow-y-auto h-[32rem]'>{RenderImageCards()}</div>
            <div className='mb-2 flex flex-grow flex-col border-4 border-dashed justify-center items-center' onDrop={HandleFileUpload}>
                Drag and drop files into this area!
            </div>
            <input type='file' className='file-input file-input-bordered file-input-primary w-full' multiple onChange={HandleFileUpload} />
        </>
    );
}
