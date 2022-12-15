import AceEditor from 'react-ace';
import _ from 'lodash';
import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/theme-chrome';

export default function ReadOnlyEditor({defaultValue, title, height, type}) {
    if (_.isNil(defaultValue)) defaultValue = "Nobody here but us Chickens!";
    if (_.isNil(height)) height = "h-60";
    if (_.isNil(type)) type = "javascript";

    return (
        <div className={`flex flex-col mx-auto ${height}`}>
            { (!_.isNil(title)) && (
                <div className="border-2 border-b-0 rounded-t-lg text-lg font-bold px-2 py-1 bg-slate-300">{title}</div>
            )}
            <div className={`border-2 h-full ${_.isNil(title)?"rounded-lg":"rounded-b-lg"}`}>
                <AceEditor 
                    mode={type} 
                    theme="chrome"
                    height="100%"
                    width="100%"
                    className={_.isNil(title)?"rounded-lg":"rounded-b-lg"}
                    setOptions={{
                        fontSize: 16,
                        fontFamily: "monospace",
                        showGutter: true,
                        showPrintMargin: true,
                        showLineNumbers: true,
                        showFoldWidgets: true,
                        highlightActiveLine: true,
                        enableMultiselect: true,
                        useSoftTabs: true,
                        useWorker: false,
                        tabSize: 4,
                        newLineMode: "unix",
                        hScrollBarAlwaysVisible: true,
                        vScrollBarAlwaysVisible: true,
                        readOnly: true
                    }}
                    defaultValue={defaultValue}
                />
            </div>
        </div>
        
    );
}