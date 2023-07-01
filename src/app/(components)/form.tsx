"use client"

import {ChangeEvent} from "react"
import { useFavoritesResource, useUserResource } from "~/stores/favorites"
import { useFormStore } from "~/stores/form"

type InputFieldProps = {
    label: string;
    value: string | number;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ label, value, onChange }: InputFieldProps) => (
    <div className="flex flex-col">
        <span>{label}</span>
        <input
            className={"bg-foreground c-background p-2 b-white b-2 b-rd-2 outline-none text-center focus:outline-blue"}
            value={value}
            onChange={onChange}
        />
    </div>
)

const Form = () => {
    const { username, setUsername, limit, setLimit } = useFormStore()
    const posts = useFavoritesResource()
    const user = useUserResource()

    const handleSubmit = async () => {
        await user.fetch()
        posts.fetch()
    }

    return (
        <>
            <div data-id={"form"} className={"grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6"}>
                <InputField
                    label="Username"
                    value={username ?? ""}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <InputField
                    label="Limit"
                    value={limit ?? 50}
                    onChange={(event) => setLimit(Number(event.target.value))}
                />
            </div>
            <button className={"p-2 m-t-6 b-foreground b-2 b-rd-2"} onClick={handleSubmit}>
                Go
            </button>
        </>
    )
}

export default Form
