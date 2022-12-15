import { useState } from 'react';
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
}