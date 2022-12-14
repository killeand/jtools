import React, { Component } from 'react';
import _ from 'lodash';

class GroupClass extends Component {
    constructor(props, insertClass) {
        super(props);

        let { className, children, ...everythingElse } = props;

        this.newClass = ((_.isNil(className))?"":className) + " " + insertClass;
        this.newProps = everythingElse;
        this.newChildren = children;
    }
}

export class GroupContainer extends GroupClass {
    constructor(props) { super(props, "group"); }
    render() {
        return (
            <div className={this.newClass} {...this.newProps}>{this.newChildren}</div>
        );
    }
}

export class GroupTitle extends GroupClass {
    constructor(props) { super(props, "group-title"); }
    render() {
        return (
            <div className={this.newClass} {...this.newProps}>{this.newChildren}</div>
        );
    }
}

export class GroupLabel extends GroupClass {
    constructor(props) { super(props, "group-label"); }
    render() {
        return (
            <label className={this.newClass} {...this.newProps}>{this.newChildren}</label>
        );
    }
}

export class GroupText extends GroupClass {
    constructor(props) { super(props, "group-text"); }
    render() {
        return (
            <div className={this.newClass} {...this.newProps}>{this.newChildren}</div>
        );
    }
}

export class GroupInput extends GroupClass {
    constructor(props) { 
        super(props, "group-input");
        
        let { value, onChange, ...otherInputProps} = this.newProps;

        this.state = { inputValue: ((!_.isNil(value))?value:"") }
        this.newChange = onChange;
        this.inputProps = otherInputProps;
    }

    ChangeValue(e) {
        if (!_.isNil(this.newChange))
            this.newChange(e.target.value);
        this.setState({inputValue:e.target.value});
    }

    render() {
        return (
            <input className={this.newClass} value={this.state.inputValue} onChange={this.ChangeValue.bind(this)} {...this.otherInputProps} />
        );
    }
}

export class GroupSelect extends GroupClass {
    constructor(props) { super(props, "group-input"); }
    render() {
        return (
            <select className={this.newClass} {...this.newProps}>{this.newChildren}</select>
        );
    }
}

export default class Group {
    static Box = GroupContainer;
    static Title = GroupTitle;
    static Label = GroupLabel;
    static Text = GroupText;
    static Input = GroupInput;
    static Select = GroupSelect;
}