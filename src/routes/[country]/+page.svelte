<script>
    export let data;

    import Fuse from "fuse.js";
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import { getCSV, getGeo, fillMissingMonths } from "../../utils.js";
    import Navigation from "../Navigation.svelte";
    import A_MediationPerMonth from "../vis/A_MediationPerMonth.svelte";
    import B_UniqueThirdPerMonth from "../vis/B_UniqueThirdPerMonth.svelte";
    import C_MediationLocations from "../vis/C_MediationLocations.svelte";
    import D_TopMediators from "../vis/D_TopMediators.svelte";
    import E_ActorsMMRType from "../vis/E_ActorsMMRType.svelte";
    import F_AgreementsPerMonth from "../vis/F_AgreementsPerMonth.svelte";
    import G_ListAgreements from "../vis/G_ListAgreements.svelte";
    // internal vis
    // import H_KeyProcesses from "../vis/H_KeyProcesses.svelte";
    import I_RectTimeline from "../vis/I_RectTimeline.svelte";

    let manyBodyStrength = 2;
    let only_M = [];
    let nodeStrokeWidth = 1;
    let rKey = "value";
    let finalData = [];
    let country = data.country;
    let mena;
    let mediations;
    let actors;
    let neighbor;
    let ucdp;
    let processes = [];
    let countries = [];
    let mediations_only = [];
    let processedData = [];
    let ucdp_final = [];
    let processedM = [];
    let result = [];
    let agreements = [];
    let agreements_per_year = [];
    let agt_processed = [];
    let mediators = [];
    let mediator_counts = [];
    let top_ten_mediators = [];
    let locationList = [];
    let selectedYears = [2018, 2024];
    let header_years;
    let categories = [
        "international",
        "regional",
        "neighbor",
        "mena",
        "other_state",
    ];
    let actorLookup;
    let margin = { top: 20, right: 80, bottom: 20, left: 80 };
    let innerWidth = 800; // Outer width of the container
    let height = 500; // Outer height of the container
    let historical_events;
    let topLocations = [];
    let abbreviations = [];
    let all_processes = [];
    let fil_processes = [];

    const darfur = ["Darfur", "El Fasher", "North Darfur", "Nyala"];

    // navigation
    let isMenuOpen = false;
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }

    // Reactively update margin based on width
    $: {
        if (width < 600) {
            margin = { top: 20, right: 32, bottom: 20, left: 27 };
        } else {
            margin = { top: 20, right: 100, bottom: 20, left: 100 };
        }
    }

    // Calculate dimensions reactively
    $: width = innerWidth; // Reactively bound to `clientWidth` for responsiveness
    $: innerHeight = height - margin.top - margin.bottom;
    $: innerWidthAdjusted = width - margin.left - margin.right;

    // get the country name from the URL
    onMount(() => {
        // load neighbors
        const json_path = "../data/neighbors.json";
        getGeo(json_path).then((data) => {
            let neighbors = data;
            neighbor = neighbors.filter(
                (c) => c.conflict_country === country,
            )[0].borders;
        });

        // LOAD MEND
        let path = [
            "../data/mend_all_actors.csv",
            "../data/mena.csv",
            "../data/mend_0207.csv",
            "../data/ucdp_last_last.csv",
            "../data/processes.csv",
            "../data/countries.csv",
            "../data/actors_abbr.csv",
            "../data/groups_last_last.csv",
        ];
        getCSV(path).then((glopad) => {
            actors = glopad[0];
            mena = glopad[1];
            let mend = glopad[2];
            ucdp = glopad[3];
            processes = glopad[4];
            countries = glopad[5];
            abbreviations = glopad[6];
            all_processes = glopad[7];

            if (country === "Sudan") {
                header_years = "2018-2024";
                // mediations = mend.filter((d) => d.Year === "2024");
                mediations = mend.filter((d) => d.conflict_country === "Sudan");
                ucdp = ucdp.filter((d) => d.country === "Sudan");
                historical_events = [];
                historical_events = [
                    {
                        name: "al-Bashir Ousted",
                        year: "2019",
                        month: "4",
                    },
                    {
                        name: "Coup",
                        year: "2021",
                        month: "10",
                    },
                    {
                        name: "Civil War",
                        year: "2023",
                        month: "4",
                    },
                ];
                fil_processes = processes;
                // fil_processes = all_processes.filter(
                //     (d) => d.conflict_country === "Sudan" && d.important == "1",
                // );
            } else if (country === "Libya") {
                header_years = "2023-2024";
                mediations = mend.filter((d) => d.conflict_country === "Libya");
                ucdp = ucdp.filter((d) => d.country === "Libya");
                historical_events = [];
                fil_processes = all_processes.filter(
                    (d) => d.conflict_country === "Libya" && d.important == "1",
                );
            } else if (country === "Syria") {
                header_years = "2023-2024";
                mediations = mend.filter((d) => d.conflict_country === "Syria");
                ucdp = ucdp.filter((d) => d.country === "Syria");
                historical_events = [
                    {
                        name: "Reinstated in the Arab League",
                        year: "2023",
                        month: "7",
                    },
                    {
                        name: "Assad's Ouster",
                        year: "2024",
                        month: "12",
                    },
                ];
                fil_processes = all_processes.filter(
                    (d) => d.conflict_country === "Syria" && d.important == "1",
                );
            } else if (country == "Yemen") {
                header_years = "2018-2024";
                mediations = mend.filter((d) => d.conflict_country === "Yemen");
                ucdp = ucdp.filter((d) => d.country === "Yemen");
            } else if (country == "Afghanistan") {
                header_years = "2023-2024";
                mediations = mend.filter(
                    (d) => d.conflict_country === "Afghanistan",
                );
                ucdp = ucdp.filter((d) => d.country === "Afghanistan");
            } else if (country == "Israel") {
                header_years = "2023-2024";
                mediations = mend.filter(
                    (d) => d.conflict_country === "Israel",
                );
                ucdp = ucdp.filter((d) => d.country === "Israel");
            }

            mediations.sort((a, b) => {
                const yearA = parseInt(a.Year, 10);
                const yearB = parseInt(b.Year, 10);

                if (yearA !== yearB) {
                    return yearA - yearB;
                }

                // If years are equal, compare months
                const monthA = parseInt(a.Month, 10);
                const monthB = parseInt(b.Month, 10);
                return monthA - monthB;
            });
        });
    });

    // once data is loaded, create subsets for each section
    $: if (
        country &&
        mediations?.length > 0 &&
        actors?.length > 0 &&
        mena?.length > 0 &&
        ucdp?.length > 0
    ) {
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

        // MEDIATION TYPES
        only_M = mediations.filter((d) => d.med_type === "M");
        const only_MR = mediations.filter((d) => d.med_type === "MR");

        mediations_only = only_M;

        // AGREEMENTS
        agreements = mediations.filter((d) => d.agmt === "1");
        agreements_per_year = d3.groups(
            agreements,
            (d) => d.Year,
            (d) => d.Month,
        );

        agreements_per_year.forEach(([year, months]) => {
            months.forEach(([month, count]) => {
                agt_processed.push({ year, month, count });
            });
            agt_processed = [...agt_processed]; // Ensure reactivity
        });

        // TOP MEDIAITON LOCATIONS
        let unknown_count = 0;

        const locationCounts = Object.values(
            mediations.reduce((acc, item) => {
                let location = item["med_location - MULTISELECT"]; // Get location
                let country = item["med_loc_cty"]; // Get country

                if (location) {
                    if (location.includes("Virtual")) {
                        location = "Virtual";
                    }

                    if (!acc[location]) {
                        acc[location] = {
                            location,
                            country: country || "Unknown",
                            count: 0,
                        };
                    }

                    acc[location].count += 1; // Increment count
                }

                return acc;
            }, {}),
        );
        // assign sudan to darfur
        locationCounts.forEach((entry) => {
            if (entry.location === "Darfur") {
                entry.country = "Sudan";
            }
        });
        // filter out unknown locations
        const filteredLocationCounts = locationCounts.filter(
            (entry) => entry.location !== "unknown",
        );

        // Step 2: Sum up all "Darfur" related locations
        let darfurCount = 0;

        const addDarfur = filteredLocationCounts.filter((entry) => {
            if (darfur.includes(entry.location)) {
                darfurCount += entry.count; // Sum counts for "Darfur" locations
                return false; // Remove these locations from the list
            }
            return entry.location !== "Unknown"; // Remove "Unknown" locations
        });

        // Step 3: Add the merged "Darfur" entry
        if (darfurCount > 0) {
            addDarfur.push({
                location: "Darfur",
                country: "Sudan",
                count: darfurCount,
            });
        }

        // Step 4: Sort by count in descending order and take the top 10
        topLocations = addDarfur
            .sort((a, b) => b.count - a.count) // Sort descending by count
            .slice(0, 10); // Keep only the top 10

        // UCDP PER MONTH
        const ucdp_group_date = d3.groups(
            ucdp,
            (d) => d.year,
            (d) => d.month,
        );

        // formatted ucdp data
        ucdp_group_date.forEach(([year, months]) => {
            months.forEach(([month, count]) => {
                let best_count = 0;

                count.forEach((c) => {
                    best_count += +c.best;
                });
                ucdp_final.push({ year, month, best_count });
            });
            ucdp_final = [...ucdp_final]; // Ensure reactivity
        });

        // MEDIATIONS PER MONTH
        const groupedData = d3.groups(
            mediations,
            (d) => d.Year,
            (d) => d.Month,
        );

        groupedData.forEach(([year, months]) => {
            months.forEach(([month, count]) => {
                processedData.push({ year, month, count });
            });
            processedData = [...processedData]; // Ensure reactivity
        });

        processedData = fillMissingMonths(processedData);

        // only M
        const only_m_grouped = d3.groups(
            only_M,
            (d) => d.Year,
            (d) => d.Month,
        );

        only_m_grouped.forEach(([year, months]) => {
            months.forEach(([month, count]) => {
                processedM.push({ year, month, count });
            });
            processedM = [...processedM]; // Ensure reactivity
        });

        // UNIQUE ACTORS PER MONTH
        result = processedData.map((item) => {
            // Extract all third_party_id_GLOPAD values for the current month
            const allIds = item.count.flatMap((entry) =>
                entry.third_party_id_GLOPAD
                    ? entry.third_party_id_GLOPAD
                          .split(";")
                          .map((id) => id.trim())
                    : [],
            );

            // Remove duplicates
            const uniqueIds = [...new Set(allIds)];

            // Return the transformed object with the count of unique IDs
            return {
                year: item.year,
                month: item.month,
                count: uniqueIds.length, // Replace the count array with the number of unique IDs
            };
        });

        // MEDIATORS
        let test = [];
        only_M.forEach((item) => {
            const mediators = item.third_party_id_GLOPAD.split(";");
            mediators.forEach((mediator) => {
                test.push(mediator);
            });
        });

        mediators = [...test];
        // Count mediators
        mediator_counts = mediators.reduce((acc, value) => {
            acc[value] = (acc[value] || 0) + 1;
            return acc;
        }, {});

        top_ten_mediators = Object.entries(mediator_counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);

        const updatedIdCounts = top_ten_mediators.map(([id, count]) => {
            const match = actors.find((actor) => actor.GLOPAD_ID === id);
            return [match ? match.ActorName : id, count];
        });

        top_ten_mediators = updatedIdCounts;
    }

    // SCALES
    $: x_circle = d3
        .scaleOrdinal()
        .domain(categories)
        .range(d3.range(0, innerWidthAdjusted, innerWidthAdjusted / 5));

    $: r_scale = d3
        .scaleLinear()
        .domain([0, d3.max(finalData, (d) => d.value) + 10])
        .range([3, 60]);

    $: filteredArray = finalData.filter((item) => item.category !== "other");

    // MEDIATOR TYPES
    $: initialNodes = filteredArray.map((d) => ({ ...d }));
    $: simulation = d3.forceSimulation(initialNodes);
    $: nodes = [];
    $: {
        simulation.nodes(initialNodes);
        simulation
            .force("x", d3.forceX((d) => x_circle(d.category)).strength(0.3)) // Increase strength
            .force("y", d3.forceY(height / 2).strength(0.2)) // Add a Y-force to help centering
            .force("charge", d3.forceManyBody().strength(manyBodyStrength))
            .force(
                "collision",
                d3.forceCollide((d) => r_scale(d[rKey]) + nodeStrokeWidth / 2),
            )
            .alpha(1)
            .restart();
    }

    $: simulation.on("tick", () => {
        nodes = simulation.nodes();
    });

    // UCDP XScale
    $: ucdp_xScale = d3
        .scaleBand()
        .domain(processedData.map((d) => `${d.year}-${d.month}`))
        .range([0, innerWidthAdjusted])
        .padding(0.1);

    $: ucdp_yScale = d3
        .scaleLinear()
        .domain([0, Math.max(...ucdp_final.map((d) => d.best_count))])
        .range([innerHeight, 0]);

    // X Scale
    $: xScale = d3
        .scaleBand()
        .domain(processedData.map((d) => `${d.year}-${d.month}`))
        .range([0, innerWidthAdjusted])
        .padding(0.1);

    // Y Scale
    $: yScale = d3
        .scaleLinear()
        .domain([0, 10 + Math.max(...processedData.map((d) => d.count.length))])
        // .domain([0, 100])
        .range([innerHeight, 0]);

    // Scales Horizontal
    $: horizontal_xScale = d3
        .scaleLinear()
        .domain([0, Math.max(...topLocations.map((d) => d.count))])
        .range([0, width / 2 - margin.left - margin.right]);

    $: horizontal_yScale = d3
        .scaleBand()
        .domain(topLocations.map((d) => d.location)) // Access 'location' directly
        .range([0, innerHeight])
        .padding(0.1);

    $: horizontal_mediator_yScale = d3
        .scaleBand()
        .domain(top_ten_mediators.map((d) => d[0]))
        .range([0, innerHeight])
        .padding(0.1);

    // Line Generator
    $: line = d3
        .line()
        .x(
            (d) =>
                ucdp_xScale(`${d.year}-${d.month}`) +
                ucdp_xScale.bandwidth() / 2,
        )
        .y((d) => ucdp_yScale(d.best_count))
        .curve(d3.curveMonotoneX); // Smooth curve

    // Path Data
    $: pathData = line(ucdp_final);

    function scrollToSection(id) {
        document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
        isMenuOpen = false; // close menu after selection on small screens
    }
</script>

<div class="wrapper" bind:clientWidth={width}>
    <Navigation />

    <main id="main">
        <div class="header">
            <h3 style="font-size: 30px;">
                {country + " " + header_years}
            </h3>
        </div>

        <!-- mediations per month -->
        <A_MediationPerMonth
            {innerWidthAdjusted}
            {innerHeight}
            {width}
            {height}
            {margin}
            {xScale}
            {yScale}
            {ucdp_xScale}
            {ucdp_yScale}
            {historical_events}
            {processedData}
            {processedM}
            {pathData}
            {ucdp_final}
        />

        <br />
        <br />

        <!-- unique actors -->
        <B_UniqueThirdPerMonth
            {width}
            {height}
            {innerHeight}
            {margin}
            {xScale}
            {historical_events}
            {result}
        />

        <br />
        <br />

        <!-- mediation locations -->
        <C_MediationLocations
            {mediations}
            {width}
            {height}
            {margin}
            {topLocations}
            {horizontal_xScale}
            {horizontal_yScale}
        />

        <br />
        <br />

        <!-- top mediators -->
        <D_TopMediators
            {width}
            {height}
            {margin}
            {top_ten_mediators}
            {horizontal_yScale}
            {horizontal_mediator_yScale}
        />

        <br />
        <br />

        <!-- types of mediators -->
        <E_ActorsMMRType
            {width}
            {innerWidthAdjusted}
            {height}
            {nodes}
            {margin}
            {r_scale}
            {categories}
            {x_circle}
        />

        <br />
        <br />

        <!-- agreements per month -->
        <F_AgreementsPerMonth
            {width}
            {height}
            {innerHeight}
            {margin}
            {historical_events}
            {xScale}
            {agt_processed}
        />

        <br />
        <br />

        <!-- list of agreements -->
        <G_ListAgreements {width} {agreements} />

        <!-- processes -->
        <!-- <H_KeyProcesses {width} {fil_processes} {country} /> -->

        <!-- timeline -->
        <!-- <I_RectTimeline
            {width}
            {height}
            {innerHeight}
            {innerWidthAdjusted}
            {margin}
            {mediator_counts}
            {mediations_only}
            {only_M}
            {actorLookup}
            {abbreviations}
        /> -->
    </main>
    <footer>
        <p>
            &copy; {new Date().getFullYear()} PeaceHub. All rights reserved.
        </p>
        <p>
            <a href="/" aria-label="Back to main site from Footer"
                >← Back to Main Site</a
            >
        </p>
    </footer>
</div>

<style>
    h3 {
        text-align: center;
    }

    .header {
        position: relative;
        width: 100%;
        color: white;
        padding: 40px 0;
    }

    :global(.rangeSlider) {
        font-size: 14px;
    }

    :global(.pipVal) {
        color: white;
    }

    a {
        color: rgb(215, 215, 215);
        font-weight: 400;
    }

    a:focus {
        outline: none; /* optional: removes default focus ring */
        background-color: rgb(255, 255, 255); /* highlight background */
        color: black; /* change text color */
        border-radius: 2px; /* optional: rounded highlight */
    }

    footer {
        text-align: center;
        margin: auto;
        padding: 5px 0;
    }
</style>
