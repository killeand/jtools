import ROEditor from "../components/ReadOnlyEditor";

export default function ProjectFiles() {
    return (
        <div className="pagecont">
            <h1>Common Projec Files</h1>
            <div className="w-1/2 mx-auto">
                <p>The following files are common files or commands that I include in projects to make my time and experience more efficient.</p>
                <p>&nbsp;</p>

                <h2>Commands</h2>
                <p>Project Extras</p>
                <ROEditor height="h-8" defaultValue={`pnpm install -D autoprefixer postcss eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh`} />
                <ROEditor height="h-8" defaultValue={`pnpm install bootstrap-icons daisyui lodash tailwindcss theme-change ulidx`} />
            </div>
        </div>
    );
}