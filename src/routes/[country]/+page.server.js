export function entries() {
    return [{ country: "Sudan" },
    { country: "Libya" },
    { country: "Syria" },
    { country: "Yemen" },
    { country: "Israel" },
    { country: "Afghanistan" },
    { country: "Myanmar" },
    { country: "Mali" },
    { country: "South Sudan" },
    ];
}


export function load({ params }) {
    return {
        country: params.country
    }
}

export const prerender = true;