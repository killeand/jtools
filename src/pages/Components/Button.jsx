import ROEditor from "../../components/ReadOnlyEditor";
import Button from '../../components/Button';

export default function CompButton() {
    return (
        <>
            <h1>Button Component</h1>
            <div className="w-1/2 mx-auto">
                <p>A standard button component that has several color templates, a disabled state, and the ability to be mutated as another element type.</p>
                <p>&nbsp;</p>

                <h2>Requires</h2>
                <p className="bi-wind"> - <a href="https://tailwindcss.com" target="_blank">Tailwind CSS</a></p>
                <p>&nbsp;</p>

                <h2>Basic Setup</h2>
                <p>The basic setup of a button:</p>
                <ROEditor height="h-8" defaultValue={`<Button>Text</Button>`} />
                <p><strong>eg:</strong> <Button>Text</Button></p>
                <p>&nbsp;</p>

                <h2>Color Templates</h2>
                <p>Add the property <strong>color="value"</strong> to the component to activate:</p>
                <ROEditor height="h-8" defaultValue={`<Button color="red">color="red"</Button>`} />
                <p><strong>eg:</strong> <Button color="red">color="red"</Button></p>
                <p>&nbsp;</p>
                <p><strong>Available Colors:</strong></p>
                <div className="grid grid-cols-3 gap-2">
                    <Button color="red">red</Button>
                    <Button color="green">green</Button>
                    <Button color="blue">blue</Button>
                    <Button color="gray">gray</Button>
                    <Button color="yellow">yellow</Button>
                    <Button color="purple">purple</Button>
                    <Button color="white">white</Button>
                    <Button color="disabled">disabled</Button>
                    <Button>No Color</Button>
                </div>
                <p>&nbsp;</p>

                <h2>Additional Styling</h2>
                <p>Additional styling rules can be added to the button, however, the buttons default classes will override your own.</p>
                <ROEditor height="h-8" defaultValue={`<Button className="text-sm">Smaller Text Button</Button>`} />
                <p><strong>eg:</strong> <Button className="text-sm">Smaller Text Button</Button></p>
                <p>&nbsp;</p>

                <h2>Events</h2>
                <p>Events on buttons should be carried over as expected.</p>
                <ROEditor height="h-8" defaultValue={`<Button onClick={() => alert("Hello World!")}>Click to be Alerted</Button>`} />
                <p><strong>eg:</strong> <Button onClick={() => alert("Hello World!")}>Click to be Alerted</Button></p>
                <p>&nbsp;</p>

                <h2>Overloading Type</h2>
                <p>Overloading the default type should be possible so long as you also include any of the original elements properites in the button as well.</p>
                <ROEditor height="h-8" defaultValue={`<Button as="input" type="text" placeholder="Enter Text?" />`} />
                <p><strong>eg:</strong> <Button as="input" type="text" placeholder="Enter Text?" /></p>
                <p>&nbsp;</p>

                <h2>Component Code</h2>
                <ROEditor title="Button.jsx" defaultValue={`import React from 'react';

export default function Button({className, as, color, ...props}) {
    const colorClasses = {
        red: "from-red-100 to-red-400 hover:from-white hover:to-red-300",
        green: "from-emerald-100 to-emerald-400 hover:from-white hover:to-emerald-300",
        blue: "from-blue-100 to-blue-400 hover:from-white hover:to-blue-300",
        gray: "from-gray-100 to-gray-400 hover:from-white hover:to-gray-300",
        yellow: "from-amber-100 to-amber-400 hover:from-white hover:to-amber-300",
        purple: "from-purple-100 to-purple-400 hover:from-white hover:to-purple-300",
        white: "from-white to-gray-300 hover:from-gray-100 hover:to-gray-400",
        disabled: "from-gray-100 to-gray-400 text-gray-600",
        default: "from-slate-100 to-slate-400 hover:from-white hover:to-slate-300"
    }
    let classes = \`\${className || ""} bg-gradient-to-br px-2 py-1 rounded-xl border font-bold text-center \${colorClasses[color] || colorClasses.default}\`;
    let Output = as || "button";

    return (
        <Output className={classes} {...props} />
    );
}`} />
                <p>&nbsp;</p>
            </div>

        </>
    );
}