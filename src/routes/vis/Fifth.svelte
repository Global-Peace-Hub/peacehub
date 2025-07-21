<script>
    import RangeSlider from "svelte-range-slider-pips";

    export let width;
    export let agreements;

    let selectedYearsAgt = [2018, 2024];
    let minYear = 2018;
    let maxYear = 2024;
    let img_height;

    $: filteredAgreements = agreements.filter((d) => {
        const year = +d.Year;
        return year >= selectedYearsAgt[0] && year <= selectedYearsAgt[1];
    });

    // const seen = new Set();

    // $: uniqueAgreements = filteredAgreements.filter((row) => {
    //     const key = `${row.Day}-${row.Month}-${row.Year}-${row.agmt_name}-${row.third_party}-${row.groupings_mechanisms}`;
    //     if (seen.has(key)) return false;
    //     seen.add(key);
    //     return true;
    // });

    $: if (width < 600) {
        img_height = "20px";
    } else if (width < 1200) {
        img_height = "25px";
    } else {
        img_height = "30px";
    }
</script>

<!-- peace agreements -->
<div class="agreement_list" bind:clientWidth={width}>
    <h4>List of Agreements</h4>
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
    <div class="table">
        <!-- Header -->
        <div class="table_header">Date</div>
        <div class="table_header">Name</div>
        <div class="table_header">3rd-Party Actors</div>
        <div class="table_header">Grouping</div>

        <!-- Rows -->
        {#each filteredAgreements as row}
            <div class="date-wrap">
                <span>{row.Day}/{row.Month}/</span><span class="year-break"
                    >{row.Year}</span
                >
            </div>
            <div style="display: flex; justify-content: space-between;">
                <span style="text-align: left;">{row.agmt_name}</span>
                {#if row.agmt_id_PAX !== ""}
                    <a
                        style="margin-left: auto;"
                        href={`https://pax.peaceagreements.org/agreements/${row.agmt_id_PAX}`}
                        target="_blank"
                        alt={"agreement number" + row.agmt_id_PAX}
                    >
                        <img
                            alt="Agreement in PAX"
                            src="../pax.jpg"
                            style={`height: ${img_height}; margin-left: 2px;`}
                        />
                    </a>
                {:else}
                    <img
                        alt="New agreement"
                        src="../new.png"
                        style={`height: ${img_height}; margin-left: 2px;`}
                    />
                {/if}
            </div>
            <div>{row.third_party}</div>
            <div>{row.groupings_mechanisms}</div>
        {/each}
    </div>
</div>

<style>
    h4 {
        font-size: 20px;
    }

    .slider-container {
        width: 90%;
        margin: 10px auto;
    }

    .agreement_list {
        max-width: 100%;
        margin: 20px auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: var(--bg-color, #001c23);
        padding-bottom: 30px;
        box-sizing: border-box;
        box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 10px;
    }

    .table {
        width: 90%;
        display: grid;
        grid-template-columns: 0.5fr 2fr 1fr 1fr;
        border: 1px solid #595959;
        font-size: 14px; /* Default for large screens */
        align-items: left;
    }

    @media (max-width: 1199px) {
        .table {
            font-size: 12px; /* Medium screens */
        }
    }

    @media (max-width: 600px) {
        .table {
            font-size: 10px; /* Mobile screens */
        }
    }

    .table div {
        padding: 8px; /* Default for large screens */
        border: 1px solid #605f5f;
        text-align: left;
        word-break: break-word;
        overflow-wrap: anywhere;
        white-space: normal;
    }

    @media (max-width: 1199px) {
        .table div {
            padding: 4px; /* Medium screens */
        }
    }

    @media (max-width: 600px) {
        .table div {
            padding: 2px; /* Mobile screens */
        }
    }

    .table div {
        word-break: break-word;
    }

    .year-break {
        display: inline;
    }

    @media (max-width: 700px) {
        .year-break {
            display: block;
        }
    }

    .table_header {
        font-weight: bold;
        background-color: #424242;
    }
</style>
