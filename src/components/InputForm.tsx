import React, { useState } from 'react';

interface InputFormProps {
    label: string;
    type: string;
    name: string;
    value: string;
    setValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputForm = ({ value, setValue, label, type, name }: InputFormProps) => {
    return (
        <div className="relative">
            <label
                htmlFor=""
                className={`absolute  text-sm text-secondary-text/80 left-4 transition-all duration-300 ${
                    value ? 'text-xs top-[5px] text-primary' : 'top-[13px]'
                }`}
            >
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={setValue}
                className={`border-[1px] text-sm px-4 border-gray-300 h-[44px] rounded-md w-full placeholder:text-sm ${
                    value ? 'pt-3' : 'pt-0'
                }`}
            />
        </div>
    );
};

export default InputForm;
