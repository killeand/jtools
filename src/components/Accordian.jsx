import _ from 'lodash';

export default function Accordian({title, titleAside, color, className, children}) {
    if (_.isNil(title)) title = "Accordian";
    if (_.isNil(titleAside)) titleAside = "";
    if (_.isNil(className)) className = "";
    if (_.isNil(color)) color = "";

    let handleColor = "";
    let borderColor = "";
    let topStyle = "flex flex-row space-x-1 p-1 cursor-pointer rounded-t-md border-b rounded-b-md";
    let caretStyle = "pointer-events-none bi-caret-right";
    let titleStyle = "pointer-events-none flex-grow font-bold";
    let asideStyle = "flex flex-row space-x-2";
    let bottomStyle = "pointer-events-none border px-1 rounded-b-md hidden";

    switch (color) {
        case 'red': handleColor="bg-red-200"; borderColor="border-red-800"; break;
        case 'green': handleColor="bg-emerald-200"; borderColor="border-emerald-800"; break;
        case 'blue': handleColor="bg-blue-200"; borderColor="border-blue-800"; break;
        case 'gray': handleColor="bg-gray-200"; borderColor="border-gray-800"; break;
        case 'yellow': handleColor="bg-amber-200"; borderColor="border-amber-800"; break;
        case 'purple': handleColor="bg-purple-200"; borderColor="border-purple-800"; break;
        case 'white': handleColor="bg-white"; borderColor="border-gray-600"; break;
        default: handleColor="bg-gray-200"; borderColor="border-gray-800"; break;
    }

    function OpenClose(e) {
        let container = e.target;
        let sibling = container.nextSibling;

        if (_.isNil(container.querySelector(".bi-caret-right")) && _.isNil(container.querySelector(".bi-caret-down"))) return;

        if (container.classList.contains("rounded-b-md")) {
            container.classList.remove("rounded-b-md");
            container.querySelector(".bi-caret-right").classList.add("bi-caret-down");
            container.querySelector(".bi-caret-right").classList.remove("bi-caret-right");
            sibling.classList.remove("hidden");
            sibling.classList.add("block");
        }
        else {
            container.classList.add("rounded-b-md");
            container.querySelector(".bi-caret-down").classList.add("bi-caret-right");
            container.querySelector(".bi-caret-down").classList.remove("bi-caret-down");
            sibling.classList.add("hidden");
            sibling.classList.remove("block");
        }
    }

    return (
        <div className={className}>
            <div className={`${topStyle} ${handleColor} ${borderColor}`} onClick={OpenClose}>
                <div className={caretStyle} />
                <div className={titleStyle}>{title}</div>
                <div className={asideStyle}>{titleAside}</div>
            </div>
            <div className={`${bottomStyle} ${borderColor}`}>
                {children}
            </div>
        </div>
    );
}