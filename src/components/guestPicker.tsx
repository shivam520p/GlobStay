import ArrowUp from "@/assets/images/Icons/ArrowUp";
import React, { useState, useRef } from "react";

const GuestPicker: React.FC = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [guests, setGuests] = useState({
        adults: 1,
        children: 0,
        infants: 0,
        pets: 0,
    });

    const dropdownRef = useRef<HTMLDivElement>(null); // Reference for the dropdown

    const maxGuests = 4;
    const maxPets = 2;

    const handleIncrement = (type: keyof typeof guests) => {
        if (type === "pets" && guests[type] >= maxPets) return;
        if (type !== "infants" && totalGuests() >= maxGuests) return;

        setGuests((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    };

    const handleDecrement = (type: keyof typeof guests) => {
        if (guests[type] > 0) {
            setGuests((prev) => ({ ...prev, [type]: prev[type] - 1 }));
        }
    };

    const totalGuests = () => guests.adults + guests.children;

    return (
        <div className="relative">
            <a
                className="bg-white border-b border-x border-black/20 px-4 py-2 rounded-b-lg w-full flex justify-between items-center mb-7"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <span className="text-base font-medium">Who<br /><span className="font-bold">{totalGuests()} {totalGuests() === 1 ? "guest" : "guests"}</span></span>
                <i className={`${showDropdown ? "rotate-180" : ""}`}><ArrowUp width="24" height="24" /></i>
            </a>
            {/* Dropdown */}
            {showDropdown && (
                <div
                    ref={dropdownRef} // Attach the ref to the dropdown
                    className="absolute mt-[-20px] w-full bg-white shadow-lg rounded-md border p-4 z-10"
                >
                    <div className="space-y-4">
                        {/* Adults */}
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">Adults</p>
                                <p className="text-sm text-gray-500">Age 13+</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    className="px-2 py-1 border rounded disabled:opacity-50"
                                    onClick={() => handleDecrement("adults")}
                                    disabled={guests.adults === 1}
                                >
                                    −
                                </button>
                                <span>{guests.adults}</span>
                                <button
                                    className="px-2 py-1 border rounded"
                                    onClick={() => handleIncrement("adults")}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Children */}
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">Children</p>
                                <p className="text-sm text-gray-500">Ages 2–12</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    className="px-2 py-1 border rounded disabled:opacity-50"
                                    onClick={() => handleDecrement("children")}
                                    disabled={guests.children === 0}
                                >
                                    −
                                </button>
                                <span>{guests.children}</span>
                                <button
                                    className="px-2 py-1 border rounded"
                                    onClick={() => handleIncrement("children")}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Infants */}
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">Infants</p>
                                <p className="text-sm text-gray-500">Under 2</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    className="px-2 py-1 border rounded disabled:opacity-50"
                                    onClick={() => handleDecrement("infants")}
                                    disabled={guests.infants === 0}
                                >
                                    −
                                </button>
                                <span>{guests.infants}</span>
                                <button
                                    className="px-2 py-1 border rounded"
                                    onClick={() => handleIncrement("infants")}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Pets */}
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">Pets</p>
                                <p className="text-sm text-gray-500">Bringing a service animal?</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    className="px-2 py-1 border rounded disabled:opacity-50"
                                    onClick={() => handleDecrement("pets")}
                                    disabled={guests.pets === 0}
                                >
                                    −
                                </button>
                                <span>{guests.pets}</span>
                                <button
                                    className="px-2 py-1 border rounded"
                                    onClick={() => handleIncrement("pets")}
                                    disabled={guests.pets >= maxPets}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <p className="text-sm text-gray-500 mt-4">
                            This place has a maximum of {maxGuests} guests, not including
                            infants. If you’re bringing more than {maxPets} pets, please let
                            your Host know.
                        </p>
                    </div>

                    <button
                        className="w-full mt-4 py-2 text-center text-blue-600 font-medium"
                        onClick={() => setShowDropdown(false)}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

export default GuestPicker;
