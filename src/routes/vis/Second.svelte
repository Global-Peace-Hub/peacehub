<script>
    import * as d3 from "d3";

    export let width;
    export let height;
    export let innerHeight;
    export let margin;
    export let xScale;
    export let historical_events = [];
    export let result = [];

    let xAxisGroup;
    let font;

    $: yScale = d3
        .scaleLinear()
        .domain([0, 10 + Math.max(...result.map((d) => d.count))])
        // .domain([0, 130])
        .range([innerHeight, 0]);

    $: {
        if (xAxisGroup) {
            const domain = xScale.domain();
            let tickValues;

            if (width < 600) {
                // Mobile: ~5 ticks
                const step = Math.ceil(domain.length / 5);
                tickValues = domain.filter((_, i) => i % step === 0);
                font = 8;
            } else if (width < 1200) {
                // Medium screens: ~10 ticks
                const step = Math.ceil(domain.length / 10);
                tickValues = domain.filter((_, i) => i % step === 0);
                font = 10;
            } else {
                // Large screens: every 3rd tick
                tickValues = domain.filter((_, i) => i % 3 === 0);
                font = 12;
            }
            const xAxis = d3
                .axisBottom(xScale)
                .tickValues(tickValues) // Manually set which ticks to show
                .tickFormat((d) => {
                    const [year, month] = d.split("-");
                    return `${month}/${year}`; // Format ticks as "MM/YYYY"
                });
            d3.select(xAxisGroup).call(xAxis);
        }
    }
</script>

<!-- unique actors -->
<div class="unique_actors" bind:clientWidth={width}>
    <h4 style="text-align: center;">Unique Third-Party Actors per Month</h4>
    <svg {width} {height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
            <g
                bind:this={xAxisGroup}
                transform={`translate(0, ${innerHeight})`}
            />
            {#each historical_events as event, i}
                <line
                    x1={xScale(`${event.year}-${event.month}`)}
                    y1={10 + i * 20}
                    x2={xScale(`${event.year}-${event.month}`)}
                    y2={innerHeight}
                    stroke="gray"
                    stroke-width="1"
                    stroke-opacity="0.5"
                    stroke-dasharray="4 2"
                />
                <text
                    x={xScale(`${event.year}-${event.month}`)}
                    y={i * 20}
                    fill="gray"
                    text-anchor="middle"
                >
                    {event.name}
                </text>
            {/each}
            {#each result as d}
                <rect
                    x={xScale(`${d.year}-${d.month}`)}
                    y={yScale(d.count)}
                    width={xScale.bandwidth()}
                    height={innerHeight - yScale(d.count)}
                    fill="steelblue"
                    rx="2"
                />
            {/each}
            {#each result as d}
                <text
                    x={xScale(`${d.year}-${d.month}`) + xScale.bandwidth() / 2}
                    y={yScale(d.count) - 8}
                    dy=".35em"
                    font-size={font}
                    text-anchor="middle"
                    fill="white"
                >
                    {d.count}</text
                >
            {/each}
        </g>
    </svg>
</div>

<style>
    h4 {
        font-size: 20px;
    }
    .unique_actors {
        max-width: 100%;
        margin: 20px auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: var(--bg-color, #001c23);
        padding-bottom: 30px;
        box-sizing: border-box;
        box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 10px;
    }
</style>
