export function entries() {
    return [{ country: "Sudan" },
    { country: "Libya" },
    { country: "Syria" },
    { country: "Yemen" },
    { country: "Afghanistan" },
    ];
}


export function load({ params }) {
    return {
        country: params.country
    }
}

export const prerender = true;