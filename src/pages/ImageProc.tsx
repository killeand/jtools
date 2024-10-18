import '@/styles/ImageProc.css';
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

    function HandleFileDrag(e: DragEvent<HTMLDivElement>) {
        console.log(e.type);
        if (e.type == 'dragenter' || e.type == 'dragstart') {
            document.getElementById('file__dragstart')?.classList.remove('hidden');
            document.getElementById('file__dragstart')?.classList.add('flex');
        } else {
            document.getElementById('file__dragstart')?.classList.remove('flex');
            document.getElementById('file__dragstart')?.classList.add('hidden');
        }
    }

    function HandleFileUpload(e: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>): void {
        let Files: FileList | null = null;

        if ((e.target as HTMLInputElement).files) {
            Files = (e.target as HTMLInputElement).files;
        }

        if ((e as DragEvent).dataTransfer) {
            Files = (e as DragEvent).dataTransfer.files;
            e.currentTarget.classList.toggle('border-gray-700');
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
            return <p>No images yet</p>;
        }

        return images.map((FileInfo, index) => {
            return (
                <div key={`fileinfo${index}`} className='m-2 flex w-1/6 flex-col rounded-md border border-black p-2'>
                    <div className='flex flex-row items-end justify-evenly'>
                        <div className='border border-black'>
                            <img src={FileInfo.url} className='max-lg' />
                        </div>
                        <div className='border border-black'>
                            <img src={FileInfo.url} className='max-md' />
                        </div>
                        <div className='border border-black'>
                            <img src={FileInfo.url} className='max-sm' />
                        </div>
                    </div>
                    <div className='border-t border-black p-2'>
                        <p>Size: {FileInfo.size} bytes</p>
                        <button className='btn btn-sm btn-info bi-files' onClick={() => navigator.clipboard.writeText(FileInfo.url)}>
                            Copy
                        </button>
                    </div>
                </div>
            );
        });
    }

    return (
        <>
            <h1>Image Processor</h1>
            <p>The image processor allows you to upload an image from your computer, and it will then be converted into a Data URL String.</p>
            <div className='relative mb-2 flex flex-grow flex-col border-4 border-dashed border-black' onDragEnter={HandleFileDrag} onDragLeave={HandleFileDrag} onDrop={HandleFileUpload}>
                <div className='flex h-full w-full items-start'>{RenderImageCards()}</div>
                <div id='file__dragstart' className='absolute left-0 top-0 hidden h-full w-full flex-col items-center justify-center bg-black/50 text-white backdrop-blur-sm'>
                    Upload?
                </div>
            </div>
            <input type='file' className='file-input file-input-bordered w-full' multiple onChange={HandleFileUpload} />
        </>
    );
}
