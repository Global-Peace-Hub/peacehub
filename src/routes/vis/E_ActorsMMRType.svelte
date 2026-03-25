<script>
    import * as d3 from "d3";
    import RangeSlider from "svelte-range-slider-pips";

    export let def_data;
    export let mediations;
    export let actors;
    export let width;
    export let innerWidthAdjusted;
    export let height;
    export let margin;
    export let r_scale;
    export let categories;
    export let x_circle;
    export let neighbor;
    export let mena;
    export let mediationOptions;

    let finalData = [];
    let manyBodyStrength = 2;
    let rKey = "value";
    let nodeStrokeWidth = 1;
    let abbreviations = [];
    let actorLookup;
    let medType = "All";
    let selectedYearsAgt = [2018, 2024];
    let minYear = 2018;
    let maxYear = 2024;
    let year_data = mediations;

    // $: categoryPositions = categories.map((category) => {
    //     let categoryNodes = nodes.filter((node) => node.category === category);
    //     let avgX =
    //         categoryNodes.length > 0
    //             ? d3.mean(categoryNodes, (d) => d.x) // Compute average X position
    //             : x_circle(category); // Fallback to scale if no nodes exist

    //     return { category, x: avgX };
    // });

    $: if (mediations && actors) {
        //// ACTOR TYPES
        const thirdPartyCounts = {};

        // Iterate through the array
        mediations.forEach((entry) => {
            // Split IDs if multiple exist
            const ids = entry.third_party_id_GLOPAD.split(";");
            ids.forEach((id) => {
                thirdPartyCounts[id] = (thirdPartyCounts[id] || 0) + 1;
            });
        });

        // Convert the result into the required format
        let resultz = Object.entries(thirdPartyCounts).map(([id, value]) => ({
            id,
            value,
        }));

        const updatedIdValues = resultz.map((item) => {
            const match = actors.find((actor) => actor.GLOPAD_ID === item.id);
            return { ...item, name: match ? match.ActorName : item.id };
        });

        // Create a lookup map for faster access
        actorLookup = new Map(
            abbreviations.map((actor) => [actor.id_paax, actor.actor_name]),
        );

        // Replace mediatorIDs with corresponding ActorNames, keeping the ID if not found
        resultz = updatedIdValues;

        // Create a lookup table from actors
        const categoryLookup = actors.reduce((acc, actor) => {
            acc[actor.GLOPAD_ID] =
                actor.actor_classification_glopad || "Unknown";
            return acc;
        }, {});

        // Map over the data array and add the category field
        const resultWithCategory = resultz.map((entry) => ({
            ...entry,
            category: categoryLookup[entry.id] || "Unknown",
        }));

        // Convert data2 into a Set for quick lookup
        const neighborIds = new Set(neighbor.map((item) => item.id));

        // Update data1 based on conditions
        const updatedData1 = resultWithCategory.map((item) => {
            if (item.category === "Country/State" && neighborIds.has(item.id)) {
                return { ...item, category: "neighbor" };
            }
            return item;
        });

        // Create a Set of MENA region IDs for quick lookup
        const menaIds = new Set(mena.map((item) => item.id_paax));

        // Update data1 based on conditions
        const updatedData2 = updatedData1.map((item) => {
            if (item.category === "Country/State") {
                return {
                    ...item,
                    category: menaIds.has(item.id) ? "mena" : "other_state",
                };
            }
            return item;
        });

        finalData = updatedData2.map((item) => {
            if (item.category === "International IGO") {
                return { ...item, category: "international" };
            } else if (item.category === "Regional IGO") {
                return { ...item, category: "regional" };
            } else if (
                item.category === "Unknown" ||
                item.category === "Civil Society" ||
                item.category === "Other"
            ) {
                return { ...item, category: "other" };
            }

            return item;
        });
    }

    // SCALES
    $: x_circle = d3
        .scaleOrdinal()
        .domain(categories)
        .range(d3.range(0, innerWidthAdjusted, innerWidthAdjusted / 5));

    $: r_scale = d3
        .scaleLinear()
        .domain([0, d3.max(finalData, (d) => d.value) + 10])
        .range([5, 70]);

    $: filteredArray = finalData.filter((item) => item.category !== "other");

    // MEDIATOR TYPES
    $: initialNodes = filteredArray.map((d, i) => ({
        ...d,
        x: nodes[i]?.x,
        y: nodes[i]?.y,
    }));

    let simulation = d3.forceSimulation(initialNodes);
    $: nodes = [];
    $: {
        simulation.nodes(initialNodes);
        simulation
            // .force("x", d3.forceX((d) => x_circle(d.category)).strength(0.3)) // position by category
            .force("x", d3.forceX(innerWidthAdjusted / 2).strength(0.2)) // Add a X-force to help centering
            .force("y", d3.forceY(height / 2).strength(0.2)) // Add a Y-force to help centering
            .force("charge", d3.forceManyBody().strength(-50))
            .force(
                "collision",
                d3.forceCollide((d) => r_scale(d[rKey]) + nodeStrokeWidth),
            )
            .alpha(0.2)
            .restart();
    }

    $: simulation.on("tick", () => {
        nodes = simulation.nodes();
    });

    function splitText(text, maxChars) {
        const words = text.split(" ");
        const lines = [];
        let currentLine = "";

        words.forEach((word) => {
            if ((currentLine + word).length > maxChars) {
                lines.push(currentLine.trim());
                currentLine = word + " ";
            } else {
                currentLine += word + " ";
            }
        });

        if (currentLine.trim()) {
            lines.push(currentLine.trim());
        }

        return lines;
    }

    function change_mediation_type(type) {
        if (type === "All") {
            mediations = year_data;
        } else if (type === "M") {
            mediations = year_data.filter((d) => d.med_type === "M");
        } else if (type === "MR") {
            mediations = year_data.filter((d) => d.med_type === "MR");
        }
    }

    $: if (selectedYearsAgt) {
        year_data = def_data.filter((d) => {
            const year = +d.Year;
            return year >= selectedYearsAgt[0] && year <= selectedYearsAgt[1];
        });
        mediations = def_data.filter((d) => {
            const year = +d.Year;
            return year >= selectedYearsAgt[0] && year <= selectedYearsAgt[1];
        });
        resetAll();
    }

    function resetAll() {
        medType = "All";
    }

    // Map option text for display
    function getOptionText(value) {
        if (value === "M") return "Mediation";
        if (value === "MR") return "Mediation-Related";
        return value; // for "All" or anything else
    }
</script>

<div class="actor_types" bind:clientWidth={width}>
    <h4 style="text-align: center;">
        Actors Involved in Mediation & Mediation-Related Activities
    </h4>
    <div class="slider-container">
        <RangeSlider
            bind:values={selectedYearsAgt}
            min={minYear}
            max={maxYear}
            step={1}
            pips
            range
            all="label"
            ariaLabels={[selectedYearsAgt[0], selectedYearsAgt[1]]}
        />
    </div>

    <!-- MEDIATION TYPE DROPDOWN -->
    <div id="dropdown_container_2">
        Select Activity
        <select
            bind:value={medType}
            on:change={() => change_mediation_type(medType)}
        >
            {#each mediationOptions as m}
                <option value={m[0]}>{getOptionText(m[0])}</option>
            {/each}
        </select>
    </div>
    <svg {width} {height}>
        <g transform="translate({margin.left}, 0)">
            {#each nodes as point}
                <circle
                    class="node"
                    r={r_scale(point["value"])}
                    fill="steelblue"
                    stroke="black"
                    cx={point.x}
                    cy={point.y}
                    ><title>{point.name}</title>
                </circle>
            {/each}
            {#each nodes as point}
                {#if r_scale(point.value) > 15}
                    {#await Promise.resolve(splitText(point.name, 10)) then lines}
                        <text
                            x={point.x}
                            y={point.y - (lines.length - 1) * 6}
                            font-size="12"
                            text-anchor="middle"
                            font-weight="500"
                            fill="white"
                        >
                            {#each lines as line, i}
                                <tspan x={point.x} dy={i === 0 ? "0" : "1.2em"}>
                                    {line}
                                </tspan>
                            {/each}
                        </text>
                    {/await}
                {/if}
            {/each}

            <!-- {#if width >= 800}
                {#each categoryPositions as { category, x }}
                    <text
                        {x}
                        y={height - 20}
                        text-anchor="middle"
                        font-size="14"
                        font-weight="600"
                        fill="white"
                    >
                        {#if category === "international"}
                            <tspan {x} dy="-0.6em">International</tspan>
                            <tspan {x} dy="1.2em">Organizations</tspan>
                        {:else if category === "regional"}
                            <tspan {x} dy="-0.6em">Regional</tspan>
                            <tspan {x} dy="1.2em">Organizations</tspan>
                        {:else if category === "neighbor"}
                            <tspan {x} dy="-0.6em">Neighbour</tspan>
                            <tspan {x} dy="1.2em">States</tspan>
                        {:else if category === "mena"}
                            <tspan {x} dy="-0.6em">MENA</tspan>
                            <tspan {x} dy="1.2em">States</tspan>
                        {:else if category === "other_state"}
                            <tspan {x} dy="-0.6em">Other</tspan>
                            <tspan {x} dy="1.2em">States</tspan>
                        {:else}
                            {category}
                        {/if}
                    </text>
                {/each}
            {/if} -->
        </g>
    </svg>
    <p style="margin: 0; font-size: 14px; text-align: center">
        [The bigger the circle, the more involved the actor]
    </p>
</div>

<style>
    h4 {
        font-size: 20px;
    }

    .actor_types {
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

    #dropdown_container_2 {
        color: rgb(195, 195, 195);
        font-family: "Montserrat";
        font-size: 12px;
        position: absolute;
        width: 180px;
        top: 160px;
        left: 20px;
    }

    select {
        width: 100%;
        padding: 6px 10px;
        font-size: 14px;
        font-family: "Montserrat";
        font-weight: 500;
        background-color: #001c23;
        color: white;
        border: 1px solid rgb(58, 58, 58);
        border-radius: 4px;
        cursor: pointer;
    }

    select:hover {
        background-color: #001c23;
        color: white;
    }

    .slider-container {
        width: 90%;
        margin: 10px auto;
    }
</style>
