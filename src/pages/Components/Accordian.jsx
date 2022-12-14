import ROEditor from "../../components/ReadOnlyEditor";
import Button from '../../components/Button';
import Accordian from "../../components/Accordian";

export default function CompAccordian() {
    return (
        <>
            <h1>Accordian Component</h1>
            <div className="w-1/2 mx-auto">
                <p>An accordian is a component that can be used to hide additional components while providing an easy to use handlebar to open and close the container. This accordian component has the ability to include a title, additional title elements, and the ability to stylize the parent container.</p>
                <p>&nbsp;</p>

                <h2>Requires</h2>
                <p className="bi-wind"> - <a href="https://tailwindcss.com" target="_blank">Tailwind CSS</a></p>
                <p className="bi-tools"> - <a href="https://lodash.com" target="_blank">Lodash</a></p>
                <p>&nbsp;</p>

                <h2>Basic Setup</h2>
                <p>The basic setup of an accordian:</p>
                <ROEditor height="h-8" defaultValue={`<Accordian>Content</Accordian>`} />
                <p><strong>eg:</strong></p>
                <Accordian>Content</Accordian>
                <p>&nbsp;</p>

                <h2>Color Templates</h2>
                <p>Add the property <strong>color="value"</strong> to the component to activate:</p>
                <ROEditor height="h-8" defaultValue={`<Accordian color="red" title="red">Content</Accordian>`} />
                <p><strong>eg:</strong></p>
                <Accordian color="red" title="red">Content</Accordian>
                <p>&nbsp;</p>
                <p><strong>Available Colors:</strong></p>
                <div className="grid grid-cols-3 gap-2">
                    <Accordian color="red" title="red">Content</Accordian>
                    <Accordian color="green" title="green">Content</Accordian>
                    <Accordian color="blue" title="blue">Content</Accordian>
                    <Accordian color="gray" title="gray">Content</Accordian>
                    <Accordian color="yellow" title="yellow">Content</Accordian>
                    <Accordian color="purple" title="purple">Content</Accordian>
                    <Accordian color="white" title="white">Content</Accordian>
                    <Accordian title="No Color">Content</Accordian>
                </div>
                <p>&nbsp;</p>

                <h2>Handle Customization</h2>
                <p>The handle contains both a title and an aside. Both can be edited.</p>
                <ROEditor height="h-8" defaultValue={`<Accordian title="Custom" titleAside="Aside">Content</Accordian>`} />
                <p><strong>eg:</strong></p>
                <Accordian title="Custom" titleAside="Aside">Content</Accordian>
                <p>&nbsp;</p>

                <h2>Advanced Handle Customization</h2>
                <p>The handle can also contain sub components for use. Please note that only the aside can contain components with hover stylings or onClick events.</p>
                <ROEditor height="h-8" defaultValue={`<Accordian title={<h2>Header 2</h2>} titleAside={<input type="text" className="rounded-md" />}>Content</Accordian>`} />
                <p><strong>eg:</strong></p>
                <Accordian title={<h2>Header 2</h2>} titleAside={<input type="text" className="rounded-md" />}>Content</Accordian>
                <p>&nbsp;</p>

                <h2>Container Customization</h2>
                <p>The accordian container can also be customized as you see fit to meet your needs.</p>
                <ROEditor height="h-32" defaultValue={`<Accordian className="border border-black p-5 m-5">
    <p>Sub Component 1</p>
    <p>Sub Component 2</p>
</Accordian>`} />
                <p><strong>eg:</strong></p>
                <Accordian className="border border-black p-5 m-5"><p>Sub Component 1</p><p>Sub Component 2</p></Accordian>
                <p>&nbsp;</p>

                <h2>Component Code</h2>
                <ROEditor title="Accordian.jsx" defaultValue={`import _ from 'lodash';

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
            <div className={\`\${topStyle} \${handleColor} \${borderColor}\`} onClick={OpenClose}>
                <div className={caretStyle} />
                <div className={titleStyle}>{title}</div>
                <div className={asideStyle}>{titleAside}</div>
            </div>
            <div className={\`\${bottomStyle} \${borderColor}\`}>
                {children}
            </div>
        </div>
    );
}`} />
                <p>&nbsp;</p>
            </div>

        </>
    );
}