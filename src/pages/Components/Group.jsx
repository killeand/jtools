import ROEditor from "../../components/ReadOnlyEditor";
import Group from '../../components/Group';

export default function CompGroup() {
    return (
        <>
            <h1>Group Component</h1>
            <div className="w-1/2 mx-auto">
                <p>A collection of components that allows you to group components together in an interesting way.</p>
                <p>&nbsp;</p>

                <h2>Requires</h2>
                <p className="bi-wind"> - <a href="https://tailwindcss.com" target="_blank">Tailwind CSS</a></p>
                <p>&nbsp;</p>

                <h2>Basic Setup</h2>
                <p>The basic setup of a group:</p>
                <ROEditor height="h-24" defaultValue={`<Group.Box>
    <Group.Title pre>Title</Group.Title>
    <Group.Input type="text" post onChange={(e)=>console.log(e)} />
</Group.Box>`} />
                <p><strong>eg:</strong></p>
                <Group.Box>
                    <Group.Title pre>Title</Group.Title>
                    <Group.Input type="text" post onChange={(e)=>console.log(e)} />
                </Group.Box>
                <p>&nbsp;</p>

                <h2>Configurations</h2>
                <p>Here is a list of the different group elements:</p>
                <Group.Box><Group.Title pre post>Group.Title</Group.Title></Group.Box>
                <Group.Box><Group.Label pre post>Group.Label</Group.Label></Group.Box>
                <Group.Box><Group.Text pre post>Group.Text</Group.Text></Group.Box>
                <Group.Box><Group.Input pre post placeholder="Group.Input" /></Group.Box>
                <Group.Box><Group.Select pre post><option>Group.Select</option></Group.Select></Group.Box>
                <p>&nbsp;</p>

                <h2>Color Templates</h2>
                <p>A color template may be applied to the Box using <strong>color="value"</strong> or to any Title or Label using <strong>color="value"</strong>:</p>
                <ROEditor height="h-24" defaultValue={`<Group.Box color="red">
    <Group.Title pre color="red">Title</Group.Title>
    <Group.Input type="text" post onChange={(e)=>console.log(e)} />
</Group.Box>`} />
                <p><strong>eg:</strong></p>
                <Group.Box color="red">
                    <Group.Title pre color="red">Title</Group.Title>
                    <Group.Input type="text" post onChange={(e)=>console.log(e)} />
                </Group.Box>
                <p>&nbsp;</p>
                <p><strong>Available Colors:</strong></p>
                <Group.Box color="red">
                    <Group.Title pre color="red">Title</Group.Title>
                    <Group.Text post>color="red"</Group.Text>
                </Group.Box>
                <Group.Box color="green">
                    <Group.Title pre color="green">Title</Group.Title>
                    <Group.Text post>color="green"</Group.Text>
                </Group.Box>
                <Group.Box color="blue">
                    <Group.Title pre color="blue">Title</Group.Title>
                    <Group.Text post>color="blue"</Group.Text>
                </Group.Box>
                <Group.Box color="gray">
                    <Group.Title pre color="gray">Title</Group.Title>
                    <Group.Text post>color="gray"</Group.Text>
                </Group.Box>
                <Group.Box color="yellow">
                    <Group.Title pre color="yellow">Title</Group.Title>
                    <Group.Text post>color="yellow"</Group.Text>
                </Group.Box>
                <Group.Box color="purple">
                    <Group.Title pre color="purple">Title</Group.Title>
                    <Group.Text post>color="purple"</Group.Text>
                </Group.Box>
                <Group.Box color="white">
                    <Group.Title pre color="white">Title</Group.Title>
                    <Group.Text post>color="white"</Group.Text>
                </Group.Box>
                <Group.Box color="black">
                    <Group.Title pre color="black" className="text-white">Title</Group.Title>
                    <Group.Text post>color="black"</Group.Text>
                </Group.Box>
                <Group.Box>
                    <Group.Title pre>Title</Group.Title>
                    <Group.Text post>No Color</Group.Text>
                </Group.Box>
                <p>&nbsp;</p>

                <h2>Additional Styling</h2>
                <p>Additional styling rules can be added to the Group components.</p>
                <ROEditor height="h-24" defaultValue={`<Group.Box color="red" className="h-16">
    <Group.Title pre color="red" className="px-5">Title</Group.Title>
    <Group.Input type="text" post placeholder="Enter Text" className="text-center" />
</Group.Box>`} />
                <p><strong>eg:</strong></p>
                <Group.Box color="red" className="h-16">
                    <Group.Title pre color="red" className="px-5">Title</Group.Title>
                    <Group.Input type="text" post placeholder="Enter Text" className="text-center" />
                </Group.Box>
                <p>&nbsp;</p>

                <h2>Component Code</h2>
                <ROEditor title="Group.css" type="css" defaultValue={`.group {
    @apply flex flex-row border rounded-lg;
}

.group-pre {
    @apply rounded-l-lg border-r;
}

.group-post {
    @apply rounded-r-lg border-l;
}

.group-title {
    @apply p-1 font-bold;
}

.group-label {
    @apply p-1 font-bold;
}

.group-text {
    @apply p-1 flex-grow;
}

.group-input {
    @apply flex-grow w-full px-2;
}`} />
                <p>&nbsp;</p>
                <ROEditor title="Group.jsx" defaultValue={`import { useState } from 'react';
import '../styles/Group.css';

const GroupColor = {
    red: { bg: "bg-red-200", border: "border-red-800" },
    green: { bg: "bg-emerald-200", border: "border-emerald-800" },
    blue: { bg: "bg-blue-200", border: "border-blue-800" },
    gray: { bg: "bg-gray-200", border: "border-gray-800" },
    yellow: { bg: "bg-amber-200", border: "border-amber-800" },
    purple: { bg: "bg-purple-200", border: "border-purple-800" },
    white: { bg: "bg-white", border: "border-white" },
    black: { bg: "bg-black", border: "border-black" },
    default: { bg: "bg-gray-200", border: "border-gray-800" }
}

export function GroupContainer({className, color, ...props}) {
    let { border } = GroupColor[color] || GroupColor.default;
    return (<div className={\`group \${border} \${className}\`} {...props} />);
}

export function GroupTitle({className, color, pre, post, ...props}) {
    let { bg } = GroupColor[color] || GroupColor.default;
    let hasPre = pre ? "group-pre" : "";
    let hasPost = post ? "group-post" : "";
    return (<div className={\`group-title \${hasPre} \${hasPost} \${bg} \${className}\`} {...props} />);
}

export function GroupLabel({className, color, pre, post, ...props}) {
    let { bg } = GroupColor[color] || GroupColor.default;
    let hasPre = pre ? "group-pre" : "";
    let hasPost = post ? "group-post" : "";
    return (<label className={\`group-title \${hasPre} \${hasPost} \${bg} \${className}\`} {...props} />);
}

export function GroupText({className, pre, post, ...props}) {
    let hasPre = pre ? "group-pre" : "";
    let hasPost = post ? "group-post" : "";
    return (<div className={\`group-text \${hasPre} \${hasPost} \${className}\`} {...props} />);
}

export function GroupInput({className, value = "", onChange, pre, post, ...props}) {
    let [ inputValue, setInputValue ] = useState(value);
    let hasPre = pre ? "group-pre" : "";
    let hasPost = post ? "group-post" : "";

    function ChangeValue(e) {
        if (onChange) onChange(e.target.value);
        setInputValue(e.target.value);
    }

    return (<input className={\`group-input \${hasPre} \${hasPost} \${className}\`} value={inputValue} onChange={ChangeValue} {...props} />);
}

export function GroupSelect({className, pre, post, ...props}) {
    let hasPre = pre ? "group-pre" : "";
    let hasPost = post ? "group-post" : "";

    return (<select className={\`group-input \${hasPre} \${hasPost} \${className}\`} {...props} />);
}

export default class Group {
    static Box = GroupContainer;
    static Title = GroupTitle;
    static Label = GroupLabel;
    static Text = GroupText;
    static Input = GroupInput;
    static Select = GroupSelect;
}`} />
                <p>&nbsp;</p>
            </div>

        </>
    );
}