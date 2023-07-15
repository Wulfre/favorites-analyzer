import type { ChangeEvent, FunctionComponent } from "react"

type InputFieldProps = {
    label: string,
    value: string | number,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
}

const InputField: FunctionComponent<InputFieldProps> = ({ label, value, onChange }) => (
    <div className="flex flex-col">
        <span>{label}</span>
        <input
            className={"bg-foreground c-background p-2 b-white b-2 b-rd-2 outline-none text-center focus:outline-blue"}
            value={value}
            onChange={onChange}
        />
    </div>
)

export default InputField
