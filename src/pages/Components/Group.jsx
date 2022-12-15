import ROEditor from "../../components/ReadOnlyEditor";
import Group from '../../components/Group';

export default function CompGroup() {
    return (
        <>
            <h1>Button Component</h1>
            <div className="w-1/2 mx-auto">
                <p>A collection of components that allows you to group components together in an interesting way.</p>
                <p>&nbsp;</p>

                <h2>Requires</h2>
                <p className="bi-wind"> - <a href="https://tailwindcss.com" target="_blank">Tailwind CSS</a></p>
                <p className="bi-tools"> - <a href="https://lodash.com" target="_blank">Lodash</a></p>
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
                <p>A color template may be applied to the Box using <strong>border="value"</strong> or to any Title or Label using <strong>color="value"</strong>:</p>
                <ROEditor height="h-24" defaultValue={`<Group.Box border="red">
    <Group.Title pre color="red">Title</Group.Title>
    <Group.Input type="text" post onChange={(e)=>console.log(e)} />
</Group.Box>`} />
                <p><strong>eg:</strong></p>
                <Group.Box border="red">
                    <Group.Title pre color="red">Title</Group.Title>
                    <Group.Input type="text" post onChange={(e)=>console.log(e)} />
                </Group.Box>
                <p>&nbsp;</p>
                <p><strong>Available Colors:</strong></p>
                <Group.Box border="red">
                    <Group.Title pre color="red">Title</Group.Title>
                    <Group.Text post>border="red" color="red"</Group.Text>
                </Group.Box>
                <Group.Box border="green">
                    <Group.Title pre color="green">Title</Group.Title>
                    <Group.Text post>border="green" color="green"</Group.Text>
                </Group.Box>
                <Group.Box border="blue">
                    <Group.Title pre color="blue">Title</Group.Title>
                    <Group.Text post>border="blue" color="blue"</Group.Text>
                </Group.Box>
                <Group.Box border="gray">
                    <Group.Title pre color="gray">Title</Group.Title>
                    <Group.Text post>border="gray" color="gray"</Group.Text>
                </Group.Box>
                <Group.Box border="yellow">
                    <Group.Title pre color="yellow">Title</Group.Title>
                    <Group.Text post>border="yellow" color="yellow"</Group.Text>
                </Group.Box>
                <Group.Box border="purple">
                    <Group.Title pre color="purple">Title</Group.Title>
                    <Group.Text post>border="purple" color="purple"</Group.Text>
                </Group.Box>
                <Group.Box border="black">
                    <Group.Title pre color="white">Title</Group.Title>
                    <Group.Text post>border="black" color="white"</Group.Text>
                </Group.Box>
                <Group.Box>
                    <Group.Title pre>Title</Group.Title>
                    <Group.Text post>No Border No Color</Group.Text>
                </Group.Box>
                <p>&nbsp;</p>

                <h2>Additional Styling</h2>
                <p>Additional styling rules can be added to the Group components.</p>
                <ROEditor height="h-24" defaultValue={`<Group.Box border="red" className="h-16">
    <Group.Title pre color="red" className="px-5">Title</Group.Title>
    <Group.Input type="text" post placeholder="Enter Text" className="text-center" />
</Group.Box>`} />
                <p><strong>eg:</strong></p>
                <Group.Box border="red" className="h-16">
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
import _ from 'lodash';
import '../styles/Group.css';

function GroupColor(color) {
    switch(color) {
        case 'red': return 'bg-red-200 border-red-800';
        case 'green': return 'bg-emerald-200 border-emerald-800';
        case 'blue': return 'bg-blue-200 border-blue-800';
        case 'gray': return 'bg-gray-200 border-gray-800';
        case 'yellow': return 'bg-amber-200 border-amber-800';
        case 'purple': return 'bg-purple-200 border-purple-800';
        case 'white': return 'bg-white';
        default: return 'bg-gray-200 border-gray-800';
    }
}

export function GroupContainer({className, children, border, ...props}) {
    switch(border) {
        case 'red': border = 'border-red-800 '; break;
        case 'green': border = 'border-emerald-800 '; break;
        case 'blue': border = 'border-blue-800 '; break;
        case 'gray': border = 'border-gray-800 '; break;
        case 'yellow': border = 'border-amber-800 '; break;
        case 'purple': border = 'border-purple-800 '; break;
        case 'black': border = 'border-black '; break;
        default: border = 'border-gray-800 '; break;
    }

    className = "group " + border + className;

    return (<div className={className} {...props}>{children}</div>);
}

export function GroupTitle({className, color, children, pre, post, ...props}) {
    color = GroupColor(color) + " ";
    className = "group-title " + ((pre)?"group-pre ":"") +  ((post)?"group-post ":"") + color + className;
    
    return (<div className={className} {...props}>{children}</div>);
}

export function GroupLabel({className, color, children, pre, post, ...props}) {
    color = GroupColor(color) + " ";
    className = "group-label " + ((pre)?"group-pre ":"") +  ((post)?"group-post ":"") + color + className;
    
    return (<label className={className} {...props}>{children}</label>);
}

export function GroupText({className, children, pre, post, ...props}) {
    className = "group-text " + ((pre)?"group-pre ":"") +  ((post)?"group-post ":"") + className;

    return (<div className={className} {...props}>{children}</div>);
}

export function GroupInput({className, children, value, onChange, pre, post, ...props}) {
    let [ inputValue, setInputValue ] = useState((_.isNil(value)?"":value));
    className = "group-input " + ((pre)?"group-pre ":"") +  ((post)?"group-post ":"") + className;

    function ChangeValue(e) {
        if (!_.isNil(onChange)) onChange(e.target.value);
        setInputValue(e.target.value);
    }

    return (<input className={className} value={inputValue} onChange={ChangeValue} {...props} />);
}

export function GroupSelect({className, children, pre, post, ...props}) {
    className = "group-input " + ((pre)?"group-pre ":"") +  ((post)?"group-post ":"") + className;

    return (<select className={className} {...props}>{children}</select>);
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