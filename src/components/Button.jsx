import React from 'react';
import _ from 'lodash';

export default function Button({className, as, color, children, ...props}) {
    let classes = `${_.isNil(className)?"":className} bg-gradient-to-br px-2 py-1 rounded-xl border font-bold text-center `;

    if (_.isNil(color)) color = "";

    switch(color) {
        case "red": classes += "from-red-100 to-red-400 hover:from-white hover:to-red-300"; break;
        case "green": classes += "from-emerald-100 to-emerald-400 hover:from-white hover:to-emerald-300"; break;
        case "blue": classes += "from-blue-100 to-blue-400 hover:from-white hover:to-blue-300"; break;
        case "gray": classes += "from-gray-100 to-gray-400 hover:from-white hover:to-gray-300"; break;
        case "yellow": classes += "from-amber-100 to-amber-400 hover:from-white hover:to-amber-300"; break;
        case "purple": classes += "from-purple-100 to-purple-400 hover:from-white hover:to-purple-300"; break;
        case "white": classes += "from-white to-gray-300 hover:from-gray-100 hover:to-gray-400"; break;
        case "disabled": classes += "from-gray-100 to-gray-400 text-gray-600"; break;
        default: classes += "from-slate-100 to-slate-400 hover:from-white hover:to-slate-300";
    }

    if (!_.isNil(as)) {
        return React.createElement(as, {...props, 'className':classes}, children);
    }
    else {
        return React.createElement("button", {...props, 'className':classes}, children);
    }
}