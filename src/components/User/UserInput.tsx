import React from 'react';

const UserInput = ({ value }) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label htmlFor="" className="text-sm font-semibold">
                FirstName
            </label>
            <input
                type="text"
                value={value}
                className="p-1 border border-secondary-border px-3 rounded-md"
            />
        </div>
    );
};

export default UserInput;
