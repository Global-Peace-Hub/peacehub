<script>
    import Heatmap from "../Heatmap.svelte";

    export let width;
    export let height;
    export let margin;
    export let mediations;
    export let topLocations;
    export let horizontal_xScale;
    export let horizontal_yScale;
</script>

<!-- top mediation locations -->
<div class="mediation_location" bind:clientWidth={width}>
    <h4>Mediation Locations</h4>
    <div class="location_map">
        <Heatmap {mediations} />
    </div>
    <svg {width} {height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
            {#each topLocations as { location, country, count }}
                <rect
                    x={0}
                    y={horizontal_yScale(location)}
                    width={horizontal_xScale(count)}
                    height={horizontal_yScale.bandwidth()}
                    fill="steelblue"
                    rx="2"
                />
                <text
                    x={horizontal_xScale(count) + 5}
                    y={horizontal_yScale(location) +
                        horizontal_yScale.bandwidth() / 2}
                    dy=".35em"
                    font-size="12"
                    text-anchor="start"
                    fill="white"
                >
                    {location}
                    {#if country !== location && country !== "Unknown"}
                        {"- " + country + ""}
                    {/if}
                    {"[" + count + "]"}
                </text>
            {/each}
        </g>
    </svg>
</div>

<style>
    h4 {
        font-size: 20px;
    }
    .mediation_location {
        max-width: 100%;
        margin: 20px auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: var(--bg-color, #001c23);
        padding: 20px;
        box-sizing: border-box;
        /* border-radius: 10px; */
    }
    .location_map {
        width: 100%;
        height: 500px;
        background-color: #001c23;
        margin: 20px auto;
    }
</style>
