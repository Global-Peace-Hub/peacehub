<script>
    import * as d3 from "d3";
    export let width;
    export let height;
    export let margin;
    export let top_ten_mediators;
    export let horizontal_yScale;
    export let horizontal_mediator_yScale;

    $: horizontal_xScale = d3
        .scaleLinear()
        .domain([0, Math.max(...top_ten_mediators.map((d) => d[1]))])
        .range([0, width / 2 - margin.left - margin.right]);
</script>

<!-- top mediators -->
<div class="mediators" bind:clientWidth={width}>
    <h4>Top Mediators</h4>
    <svg {width} {height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
            {#each top_ten_mediators as mediator}
                <rect
                    x={0}
                    y={horizontal_mediator_yScale(mediator[0])}
                    rx="2"
                    width={horizontal_xScale(mediator[1])}
                    height={horizontal_yScale.bandwidth()}
                    fill="steelblue"
                />
                <text
                    x={horizontal_xScale(mediator[1]) + 10}
                    y={horizontal_mediator_yScale(mediator[0]) +
                        horizontal_yScale.bandwidth() / 2}
                    dy=".35em"
                    font-size="12"
                    text-anchor="start"
                    fill="white"
                >
                    {mediator[0] + " [" + mediator[1] + "]"}
                </text>
            {/each}
        </g>
    </svg>
</div>

<style>
    h4 {
        font-size: 20px;
    }

    .mediators {
        max-width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #001c23;
        box-sizing: border-box;
        box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 10px;
        padding-bottom: 20px;
    }
</style>
