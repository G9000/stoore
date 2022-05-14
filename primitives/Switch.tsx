import * as SwitchPrimitive from "@radix-ui/react-switch";

const Switch = (label: string) => (
    <form>
        <div className="flex">
            <label htmlFor="switch">{label}</label>
            <SwitchPrimitive.Root defaultChecked id="switch">
                <SwitchPrimitive.Thumb />
            </SwitchPrimitive.Root>
        </div>
    </form>
);

export default Switch;
