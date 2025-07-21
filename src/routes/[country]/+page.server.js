export function entries() {
    return [{ country: "Sudan" },
    { country: "Libya" },
    { country: "Syria" },
    { country: "Yemen" },
    { country: "Israel" },
    { country: "Afghanistan" },
    ];
}


export function load({ params }) {
    return {
        country: params.country
    }
}

export const prerender = true;