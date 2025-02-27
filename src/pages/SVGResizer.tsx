import { ChangeEvent, DragEvent, useState } from 'react';

export default function SVGResizer() {
    const [imageData, setImageData] = useState<Blob | null>(null);
    const [imageOutput, setImageOutput] = useState<string | null>(null);
    const [originalHeight, setOriginalHeight] = useState<number>(0);
    const [originalWidth, setOriginalWidth] = useState<number>(0);
    const [imageHeight, setImageHeight] = useState<number>(0);
    const [imageWidth, setImageWidth] = useState<number>(0);
    const [outputType, setOutputType] = useState<string>('image/png');

    function UpdateImageOutput(newWidth: number, newHeight: number, blobdata?: Blob | null, type?: string | null) {
        if (imageData || blobdata) {
            const dataurl = URL.createObjectURL((blobdata as Blob) ?? imageData);
            const img = new Image();
            img.addEventListener('load', (e) => {
                const cnv = document.createElement('canvas');
                const ctx = cnv.getContext('2d');

                if (ctx) {
                    cnv.height = newHeight;
                    cnv.width = newWidth;
                    ctx.fillStyle = 'rgba(255,255,255,1)';
                    ctx.fillRect(0, 0, cnv.width, cnv.height);
                    ctx.drawImage(img, 0, 0, cnv.width, cnv.height);

                    setImageOutput(cnv.toDataURL(type ?? outputType, 1));
                }

                URL.revokeObjectURL(dataurl);
            });
            img.src = dataurl;
        }
    }

    function HandleFileUpload(e: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>): void {
        let Files: FileList | null = null;

        if ((e.target as HTMLInputElement).files) {
            Files = (e.target as HTMLInputElement).files;
        }

        if (Files) {
            let FR = new FileReader();
            FR.addEventListener('loadend', (e: ProgressEvent<FileReader>) => {
                if (e.target?.result) {
                    const parser = new DOMParser();
                    const xml = parser.parseFromString(e.target.result as string, 'image/svg+xml');
                    const svg = xml.documentElement;

                    if (svg.nodeName != 'svg') return;

                    const svgHeight = svg.getAttribute('height');
                    const svgWidth = svg.getAttribute('width');

                    if (!svgHeight || !svgWidth) return;

                    const height = parseFloat(svgHeight.replace(/[^0-9.]/g, ''));
                    const width = parseFloat(svgWidth.replace(/[^0-9.]/g, ''));

                    if (isNaN(height) || isNaN(width)) return;

                    const blob = new Blob([e.target.result], { type: 'image/svg+xml;charset=utf-8' });
                    setImageData(blob);
                    setOriginalHeight(height);
                    setOriginalWidth(width);
                    setImageHeight(height);
                    setImageWidth(width);

                    UpdateImageOutput(width, height, blob);
                }
            });

            for (let i = 0; i < Files.length; i++) {
                if (!['image/svg+xml'].includes(Files[i].type)) {
                    return;
                }

                FR.readAsText(Files[i]);
            }
        }
    }

    function UniformScale({ width, height }: { width?: number; height?: number }) {
        let outputHeight = 0;
        let outputWidth = 0;

        if (width) {
            const newHeight = originalHeight * (width / originalWidth);
            outputHeight = newHeight;
            outputWidth = width;
        }

        if (height) {
            const newWidth = originalWidth * (height / originalHeight);
            outputHeight = height;
            outputWidth = newWidth;
        }

        return { w: outputWidth, h: outputHeight };
    }

    return (
        <>
            <h1>SVG Resizer</h1>
            <p>The SVG Resizer allows you to load an svg image, manipulate its dimensions, and finally download it as a PNG, JPEG, or WEBP file.</p>
            <div className='flex grow flex-col items-center justify-center'>
                {imageOutput == null && 'No Image Loaded'}
                {imageOutput != null && <img src={imageOutput} className='border-4 border-primary/20 align-middle' />}
            </div>
            <div className='sticky bottom-0 flex flex-col gap-2 bg-base-100/50 backdrop-blur-sm'>
                <div className='flex flex-col gap-2'>
                    {imageData != null && (
                        <>
                            <label className='input-bordered input w-full input-primary'>
                                <div className='label'>Width</div>
                                <input
                                    type='number'
                                    min={1}
                                    value={imageWidth}
                                    onChange={(e) => {
                                        const v = e.target.valueAsNumber;
                                        const o = UniformScale({ width: v });
                                        setImageHeight(o.h);
                                        setImageWidth(o.w);
                                        UpdateImageOutput(o.w, o.h);
                                    }}
                                />
                            </label>
                            <label className='input-bordered input w-full input-primary'>
                                <div className='label'>Height</div>
                                <input
                                    type='number'
                                    min={1}
                                    value={imageHeight}
                                    onChange={(e) => {
                                        const v = e.target.valueAsNumber;
                                        const o = UniformScale({ height: v });
                                        setImageHeight(o.h);
                                        setImageWidth(o.w);
                                        UpdateImageOutput(o.w, o.h);
                                    }}
                                />
                            </label>
                            <label className='select w-full select-primary'>
                                <div className='label'>File Type</div>
                                <select
                                    value={outputType}
                                    onChange={(e) => {
                                        const v = e.target.value;
                                        setOutputType(v);
                                        UpdateImageOutput(imageWidth, imageHeight, null, v);
                                    }}>
                                    <option value='image/png'>PNG</option>
                                    <option value='image/jpeg'>JPEG</option>
                                    <option value='image/webp'>WEBP</option>
                                </select>
                            </label>
                        </>
                    )}
                    <input type='file' className='file-input w-full file-input-primary' onChange={HandleFileUpload} />
                </div>
            </div>
        </>
    );
}
