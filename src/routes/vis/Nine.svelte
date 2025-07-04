<script>
    import * as d3 from "d3";
    import RangeSlider from "svelte-range-slider-pips";
    import Select from "svelte-select";
    import filter from "svelte-select/filter";

    export let width;
    export let height;
    export let innerHeight;
    export let innerWidthAdjusted;
    export let margin;
    export let mediations_only;
    export let mediator_counts;
    export let only_M = [];
    export let actorLookup;
    export let abbreviations;

    let minYear = 2018;
    let maxYear = 2024;
    let selectedYears = [2018, 2024];
    let yMedAxisGroup;

    // MEDIATION TIMELINE
    $: years = [...new Set(mediations_only.map((d) => d.Year))]; // Extract unique years
    $: allYearMonthPairs = years.flatMap((year) =>
        Array.from({ length: 12 }, (_, i) => `${year}-${i + 1}`),
    );
    $: uniqueYears = [...new Set(mediations_only.map((d) => d.Year))];

    $: xMed = d3
        .scaleBand()
        .domain(allYearMonthPairs) // Ensure all Year-Month pairs are included
        .range([margin.left/2, innerWidthAdjusted])
        .padding(0.1);

    $: yMed = d3
        .scaleBand()
        .domain(Object.keys(mediator_counts)) // Extracts keys as an array
        .range([innerHeight, 0]);

    $: {
        if (actorLookup instanceof Map && yMedAxisGroup) {
            // Create axis
            const yAxis = d3
                .axisLeft(yMed)
                .tickSize(-innerWidthAdjusted + margin.left/2)
                .tickFormat((d) => {
                    let countryName;
                    // Find matching appreciation object
                    const abbr = abbreviations.find(
                        (item) => item.id_paax === d,
                    );

                    if (abbr) {
                        // Check actor_name length and decide which value to use
                        countryName =
                            abbr.actor_name.length > 14
                                ? abbr.abbreviation
                                : abbr.actor_name;
                    }

                    return countryName || d; // Fallback to ID if no country is found
                });

            // Select axis group and apply axis
            d3.select(yMedAxisGroup).call(yAxis);

            // Style tick lines
            d3.select(yMedAxisGroup)
                .selectAll(".tick line")
                .attr("stroke", "#333333")
                .attr("stroke-dasharray", "5,3");

            // Style tick text
            d3.select(yMedAxisGroup)
                .selectAll(".tick text")
                .attr("font-size", "8")
                .attr("fill", "gray")
                .on("mouseover", function (event, d) {
                    handleTickHover(d, event); // Call function on hover
                })
                .on("mouseout", function () {
                    handleTickLeave(); // Call function on mouseout
                });

            // Hide domain line
            d3.select(yMedAxisGroup).select(".domain").style("display", "none");
        }
    }

    // Function to handle hover on Y-axis ticks
    function handleTickHover(d) {
        // Set opacity 0.2 for all rectangles except those with class d
        d3.selectAll(".rec").style("fill-opacity", function () {
            return this.classList.contains(d) ? 1 : 0.1;
        });
        // Highlight the tick text by changing its color and/or font weight
        d3.selectAll(".tick text")
            .style("fill", function (text) {
                return text === d ? "white" : "gray"; // Highlight the hovered text
            })
            .style("font-weight", function (text) {
                return text === d ? "bold" : "normal"; // Bold the hovered text
            });
    }

    // Function to restore opacity on mouse out
    function handleTickLeave() {
        d3.selectAll(".rec").style("fill-opacity", 0.35); // Reset to default opacity
        // Restore axis tick text to default style
        d3.selectAll(".tick text")
            .style("fill", "gray") // Reset color
            .style("font-weight", "normal"); // Reset font weight
    }

    $: grouping_map = new Map();

    // Create a unique set while preserving original values
    $: grouping_array_first = Array.from(
        new Set(
            mediations_only.flatMap((d) =>
                d.groupings_mechanisms
                    ? d.groupings_mechanisms
                          .split(";")
                          .map((g) => {
                              const trimmed = g.trim();
                              const formatted = trimmed
                                  .toLowerCase()
                                  .replace(/\s+/g, "");

                              // Store the original value for the formatted version
                              grouping_map.set(formatted, trimmed);
                              return formatted;
                          })
                          .filter((g) => g !== "")
                    : [],
            ),
        ),
    );

    $: grouping_array_initial = [...grouping_array_first];

    // Transform to the desired format, keeping the original label
    $: grouping_array = grouping_array_initial.map((group) => ({
        value: group,
        label: grouping_map.get(group) || group, // Get the original value if available
    }));

    function filterByYear(startYear, endYear) {
        mediations_only = only_M;
        let filtered = mediations_only.filter((d) => {
            const year = +d.Year;
            return year >= startYear && year <= endYear;
        });
        mediations_only = [...filtered];
    }

    $: if (selectedYears) {
        mediations_only = only_M;
        filterByYear(selectedYears[0], selectedYears[1]);
    }

    let colorOptions = ["yellow", "red", "blue"];

    // Function to assign colors based on selection order
    function getColor(grouping) {
        if (!grouping) return "steelblue"; // Default color for non-selected items
        let index = selectedGroupings.findIndex(
            (g) => g.value.toLowerCase() === grouping.toLowerCase(),
        );
        return index >= 0
            ? colorOptions[index % colorOptions.length]
            : "steelblue";
    }
    let filterText = ""; // For searching/filtering items
    let selectedGroupings = []; // To store selected items

    // Handle the addition of a new value (when not found in the list)
    function handleFilter(e) {
        if (selectedGroupings?.find((i) => i.label === filterText)) return; // Prevent adding duplicates
        if (e.detail.length === 0 && filterText.length > 0) {
            // Add a new item if the filter text is not in the items list
            grouping_array = [
                ...grouping_array,
                { value: filterText, label: filterText },
            ];
        }
    }

    // Handle change when items are selected/deselected
    function handleChange(e) {
        // group= .map((i) => {
        //     delete i.created;
        //     return i;
        // });
    }
</script>

<!-- actors and mediations over time -->
<div class="actor_types">
    <h4>Mediation Timeline</h4>
    <!-- Slider UI -->
    <div class="slider-container">
        <RangeSlider
            bind:values={selectedYears}
            min={minYear}
            max={maxYear}
            step={1}
            pips
            range
            all="label"
            ariaLabels={[selectedYears[0], selectedYears[1]]}
        />
    </div>
    <!-- Dropdown List -->
    <!-- <div class="select_group">
        <Select
            --border-radius="3px"
            --placeholder-color="white"
            --background="#003645"
            --list-background="#003645"
            --border="none"
            --multi-item-color="black"
            --item-hover-bg="gray"
            on:change={handleChange}
            multiple
            bind:value={selectedGroupings}
            items={grouping_array}
            itemId="value"
            label="label"
            on:filter={handleFilter}
            bind:filterText
        >
            <div style="text-align: left;" slot="item" let:item>
                {item.label}
            </div>
        </Select>
    </div> -->

    <svg {width} {height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
            <g
                bind:this={yMedAxisGroup}
                transform={`translate(${margin.left/2}, 0)`}
            />
            {#each uniqueYears as year}
                <line
                    x1={xMed(`${year}-1`)}
                    x2={xMed(`${year}-1`)}
                    y1={0}
                    y2={innerHeight}
                    stroke="white"
                    stroke-width="1"
                    opacity="0.3"
                />
                <g transform={`rotate(-30, ${xMed(`${year}-1`)}, 0)`}>
                    <text
                        x={xMed(`${year}-1`)}
                        y={0}
                        text-anchor="start"
                        font-size="12px"
                        fill="white"
                    >
                        {year}
                    </text>
                </g>
            {/each}
            {#each mediations_only as d, i}
                {#each d.third_party_id_GLOPAD
                    .split(";")
                    .filter((m) => m.trim() !== "") as mediator}
                    <rect
                        x={xMed(`${d.Year}-${d.Month}`)}
                        y={yMed(mediator) + yMed.bandwidth() / 2}
                        width={xMed.bandwidth()}
                        height={5}
                        fill-opacity="0.35"
                        class={"rec " + mediator}
                        fill={(() => {
                            const groupClasses = d.groupings_mechanisms
                                .toLowerCase()
                                .split(";")
                                .map(
                                    (g) =>
                                        g.trim().replace(/\s+/g, "") ||
                                        "nogrouping",
                                );

                            if (Array.isArray(selectedGroupings)) {
                                let selectedGroup = selectedGroupings.find(
                                    (group) =>
                                        groupClasses.includes(
                                            group.value.toLowerCase(),
                                        ),
                                );
                                return selectedGroup
                                    ? getColor(selectedGroup.value)
                                    : "white";
                            }
                            return "white";
                        })()}
                        stroke="none"
                    />
                {/each}
            {/each}
        </g>
    </svg>

    <div id="legend">
        <div class="legend-title">Mediation Intensity</div>
        <div class="heatmap-legend-bar"></div>
        <div class="legend-labels">
            <span>Low</span>
            <span>High</span>
        </div>
    </div>
</div>

<style>
    h4 {
        font-size: 20px;
    }
    .actor_types {
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

    .slider-container,
    .select_group {
        width: 90%;
        margin: 10px auto;
    }

    #legend {
        font-family: "Montserrat";
        color: white;
        padding: 10px 15px;
        border-radius: 5px;
        font-size: 12px;
        z-index: 1;
    }

    .legend-title {
        margin-bottom: 6px;
        text-align: center;
    }

    .heatmap-legend-bar {
        height: 10px;
        width: 200px;
        background: linear-gradient(
            to right,
            gray 50%,
            white 100%
        );
    }

    .legend-labels {
        display: flex;
        justify-content: space-between;
        margin-top: 4px;
    }
</style>
