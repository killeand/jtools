import { useState } from 'react';
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
    return (<div className={`group ${border} ${className}`} {...props} />);
}

export function GroupTitle({className, color, pre, post, ...props}) {
    let { bg } = GroupColor[color] || GroupColor.default;
    let hasPre = pre ? "group-pre" : "";
    let hasPost = post ? "group-post" : "";
    return (<div className={`group-title ${hasPre} ${hasPost} ${bg} ${className}`} {...props} />);
}

export function GroupLabel({className, color, pre, post, ...props}) {
    let { bg } = GroupColor[color] || GroupColor.default;
    let hasPre = pre ? "group-pre" : "";
    let hasPost = post ? "group-post" : "";
    return (<label className={`group-title ${hasPre} ${hasPost} ${bg} ${className}`} {...props} />);
}

export function GroupText({className, pre, post, ...props}) {
    let hasPre = pre ? "group-pre" : "";
    let hasPost = post ? "group-post" : "";
    return (<div className={`group-text ${hasPre} ${hasPost} ${className}`} {...props} />);
}

export function GroupInput({className, value = "", onChange, pre, post, ...props}) {
    let [ inputValue, setInputValue ] = useState(value);
    let hasPre = pre ? "group-pre" : "";
    let hasPost = post ? "group-post" : "";

    function ChangeValue(e) {
        if (onChange) onChange(e.target.value);
        setInputValue(e.target.value);
    }

    return (<input className={`group-input ${hasPre} ${hasPost} ${className}`} value={inputValue} onChange={ChangeValue} {...props} />);
}

export function GroupSelect({className, pre, post, ...props}) {
    let hasPre = pre ? "group-pre" : "";
    let hasPost = post ? "group-post" : "";

    return (<select className={`group-input ${hasPre} ${hasPost} ${className}`} {...props} />);
}

export default class Group {
    static Box = GroupContainer;
    static Title = GroupTitle;
    static Label = GroupLabel;
    static Text = GroupText;
    static Input = GroupInput;
    static Select = GroupSelect;
}