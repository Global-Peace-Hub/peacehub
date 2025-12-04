<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import {
        getGeoMultiple,
        images,
        sections,
        scrollToSection,
        images_ppl,
        menuStructure,
    } from "../utils";
    import Map from "./Map.svelte";

    let width;
    let all_polygons;
    let geo_labels;
    let showScrollToTop = false; // Visibility of the scroll-to-top button
    let isMenuOpen = false; // Toggle menu visibility
    let isSmallScreen = true; // Check if screen size is small

    // RESEARCH GALLERY
    let imageRowResearch;
    const scrollGalleryResearch = (direction) => {
        if (!imageRowResearch) return;

        const imageWidth = imageRowResearch.scrollWidth / images_ppl.length; // Ensure exact image width scroll
        let targetScroll = imageRowResearch.scrollLeft + direction * imageWidth;

        animateScroll(imageRowResearch, targetScroll, 500); // 500ms smooth scroll
    };

    // PEOPLE GALLERY
    let imageRowPeople;
    function scrollGalleryPeople(direction) {
        if (!imageRowPeople) return;

        const imageWidth = imageRowPeople.scrollWidth / images_ppl.length; // Ensure exact image width scroll
        let targetScroll = imageRowPeople.scrollLeft + direction * imageWidth;

        animateScroll(imageRowPeople, targetScroll, 500); // 500ms smooth scroll
    }

    function animateScroll(element, to, duration) {
        const start = element.scrollLeft;
        const change = to - start;
        const startTime = performance.now();

        function step(currentTime) {
            let progress = (currentTime - startTime) / duration;
            if (progress > 1) progress = 1;

            element.scrollLeft = start + change * easeInOutQuad(progress);

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Check scroll position and update reactivity
    const handleScroll = () => {
        showScrollToTop = window.scrollY > 300; // Trigger button visibility
    };

    function checkScreenSize() {
        isSmallScreen = window.innerWidth < 768; // Adjust breakpoint as needed
    }

    // INIT
    onMount(() => {
        // Load GEOJSON
        const json_path = ["data/geojson.json", "data/central_points.json"];
        getGeoMultiple(json_path).then((geo) => {
            all_polygons = geo[0];
            geo_labels = geo[1];
        });

        // Disable automatic scroll restoration
        if ("scrollRestoration" in history) {
            history.scrollRestoration = "manual";
        }

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        // Scroll to top on page load
        window.scrollTo({ top: 0, behavior: "auto" });

        // Add event listener for scrolling to top
        window.addEventListener("scroll", handleScroll);
        imageRowResearch = document.querySelector(".image-row-research");
        imageRowPeople = document.querySelector(".image-row-people");

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", checkScreenSize);
        };
    });

    let contentVisible = false; // State to toggle content visibility
    let pubToggle = false; // State to toggle content visibility

    function toggleContent() {
        contentVisible = !contentVisible; // Toggle the content visibility
    }

    function togglePublication() {
        pubToggle = !pubToggle; // Toggle the content visibility
    }

    function handleNav(path, scrollId) {
        goto(path).then(() => {
            if (scrollId) {
                // Delay scroll to allow page to render
                setTimeout(() => scrollToSection(scrollId), 100);
            }
        });
    }

    let show = false;
    const toggle = () => (show = !show);
    function openBibtex() {
        const bibtex = `@dataset{peter2025mend,
  author       = {Peter, Mateja and Badanjak, Sanja and D'Amico, Elisa and Houghton, Kasia},
  title        = {Mediation Event and Negotiators Database (MEND)},
  year         = {2025},
  publisher    = {Harvard Dataverse},
  version      = {V1},
  doi          = {10.7910/DVN/PYRHS6},
  url          = {https://doi.org/10.7910/DVN/PYRHS6}
}`;
        const newWin = window.open("", "_blank");
        newWin.document.write("<pre>" + bibtex + "</pre>");
        newWin.document.close();
    }
</script>

<div id="wrapper" bind:clientWidth={width}>
    <div id="home">
        <div id="navigation">
            <!-- Burger icon -->
            <i
                style="padding: 5px; cursor: pointer;"
                class="fa fa-bars menu-icon"
                role="button"
                tabindex="0"
                aria-label="Toggle menu"
                on:click={() => (isMenuOpen = !isMenuOpen)}
                on:keydown={(event) => {
                    if (event.key === "Enter" || event.key === " ")
                        isMenuOpen = !isMenuOpen;
                }}
            ></i>

            <!-- Desktop Navigation -->
            {#if !isSmallScreen}
                <nav
                    aria-label="Main Navigation"
                    style="display: flex; gap: 3px;"
                >
                    {#each menuStructure as item}
                        {#if item.type === "scroll"}
                            <button
                                class="menu-button"
                                on:click={() => goto("/")}
                                tabindex="0"
                            >
                                {item.name}
                            </button>
                        {:else}
                            <div class="nav-item">
                                <button class="menu-button" tabindex="0"
                                    >{item.name}</button
                                >
                                <div class="dropdown">
                                    {#each item.submenu as sub}
                                        <button
                                            class="menu-item"
                                            on:click={() =>
                                                handleNav(
                                                    sub.target,
                                                    sub.scrollId,
                                                )}>{sub.name}</button
                                        >
                                    {/each}
                                </div>
                            </div>
                        {/if}
                    {/each}
                </nav>
            {/if}

            <!-- Mobile Dropdown Menu -->
            {#if isSmallScreen && isMenuOpen}
                <ul
                    class="dropdown"
                    style="position: absolute; top: 20px; left: 0; z-index: 999; list-style: none;"
                >
                    {#each menuStructure as item}
                        <li>
                            {#if item.type === "scroll"}
                                <button
                                    class="menu-item"
                                    on:click={() => goto("/")}
                                    tabindex="0"
                                >
                                    {item.name}
                                </button>
                            {:else}
                                <div style="margin-bottom: 10px;">
                                    <div
                                        style="color: white; font-weight: bold; padding: 5px 0;"
                                    >
                                        {item.name}
                                    </div>
                                    {#each item.submenu as sub}
                                        <button
                                            class="menu-item"
                                            on:click={() =>
                                                handleNav(
                                                    sub.target,
                                                    sub.scrollId,
                                                )}>{sub.name}</button
                                        >
                                    {/each}
                                </div>
                            {/if}
                        </li>
                    {/each}
                </ul>
            {/if}
        </div>

        <header>
            <h1 style="font-size: 45px; margin-bottom: 0px">Global PeaceHub</h1>
            <h2 style="padding-left: 10px; padding-right: 10px">
                Understanding shifts in the geopolitical context of peace and
                transition processes
            </h2>
            <div class="logos">
                <img alt="University of St Andrews Logo" src="uosa.png" />
                <img alt="University of Edinburgh Logo" src="uoe_white.png" />
                <img
                    alt="PeaceRep logo (Peace and Conflict Resolution Evidence Platform)"
                    src="peacerep_logo.jpg"
                />
            </div>
            <button class="cite" on:click={toggle} title="Cite"
                ><i class="fa fa-quote-right" aria-hidden="true"></i>
            </button>
            <div class="cite_div {show ? 'visible' : ''}">
                <p>
                    <strong>MLA</strong><br />
                    Peter, Mateja, et al.
                    <em>Mediation Event and Negotiators Database (MEND)</em>.
                    Harvard Dataverse, V1, 2025,
                    https://doi.org/10.7910/DVN/PYRHS6.
                </p>

                <p>
                    <strong>APA</strong><br />
                    Peter, M., Badanjak, S., D'Amico, E., &amp; Houghton, K. (2025).
                    <em>Mediation Event and Negotiators Database (MEND)</em> (V1).
                    Harvard Dataverse. https://doi.org/10.7910/DVN/PYRHS6
                </p>

                <p>
                    <strong>Chicago</strong><br />
                    Peter, Mateja, Sanja Badanjak, Elisa D'Amico, and Kasia Houghton.
                    2025.
                    <em>Mediation Event and Negotiators Database (MEND)</em>.
                    V1. Harvard Dataverse. https://doi.org/10.7910/DVN/PYRHS6.
                </p>

                <p>
                    <strong>Harvard</strong><br />
                    Peter, M., Badanjak, S., D'Amico, E. and Houghton, K., 2025.
                    <em>Mediation Event and Negotiators Database (MEND)</em>.
                    V1. Harvard Dataverse. Available at:
                    &lt;https://doi.org/10.7910/DVN/PYRHS6&gt;.
                </p>

                <p>
                    <strong>Vancouver</strong><br />
                    1. Peter M, Badanjak S, D'Amico E, Houghton K. Mediation Event
                    and Negotiators Database (MEND) [dataset]. Harvard Dataverse;
                    2025. Version 1. Available from: https://doi.org/10.7910/DVN/PYRHS6
                </p>
                <strong>BibTeX</strong><br />
                <button class="bib-button" on:click={openBibtex}>
                    View BibTeX
                </button>
            </div>
        </header>
    </div>

    <main
        id="map"
        bind:clientWidth={width}
        style="height: calc(var(--vh, 1vh) * 100);"
    >
        <h3
            style="
            z-index: 400; 
            position: absolute; 
            padding: 10px;"
        >
            Explore
        </h3>

        {#if !isSmallScreen}
            <p
                style="position: absolute; right: 10px; 
                font-size:14px; font-weight:600; padding:5px; border-radius: 3px; 
                background-color: black"
            >
                ZOOM MAP: <i>Ctrl + scroll</i>
            </p>
        {/if}
        <Map
            {all_polygons}
            {geo_labels}
            subpage={(data) => {
                goto("/" + data);
            }}
        />
    </main>

    <section id="people" aria-labelledby="team-heading">
        <h3 id="team-heading" style="text-align: left; padding: 10px">
            Core Team
        </h3>
        <div class="image-grid">
            {#each images_ppl as { src, name, position } (src)}
                <div class="image-container-people">
                    <img
                        style="box-shadow: 0 0 5px rgba(0, 0, 0, 0.5); "
                        loading="lazy"
                        {src}
                        alt="PeaceHub team member"
                    />
                    <h4 style="margin: 10px;">{name}</h4>
                    <!-- Changed to h3 for the name -->
                    <p>{position}</p>
                </div>
            {/each}
        </div>
    </section>

    <footer id="credit">
        <p>
            <strong> Web and Visualization Development: </strong>
            <a href="https://tomasvancisin.co.uk/" target="_blank">
                Tomas Vancisin
            </a>
        </p>
        <p>
            &copy; {new Date().getFullYear()} PeaceHub. All rights reserved.
        </p>
    </footer>
</div>

<style>
    #wrapper {
        width: 100%;
    }

    .logos {
        gap: 30px;
        padding-top: 10px;
    }

    .logos img {
        height: 50px;
        margin-left: 30px;
    }

    @media (min-width: 600px) {
        .logos img {
            height: 60px;
        }
    }

    h1 {
        color: white;
        font-weight: 800;
    }

    h2 {
        color: white;
        font-weight: 500;
        font-size: 22px;
    }

    h3 {
        color: white;
        font-weight: 500;
        padding: 10px;
        margin: 0px;
    }

    .cite {
        position: absolute;
        top: 5px;
        right: 5px;
        background-color: #ffffff; /* Green */
        border: none;
        border-radius: 3px;
        color: black;
        padding: 8px 15px;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        cursor: pointer;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }

    .cite:focus {
        outline: 0px solid #005fcc;
        outline-offset: 1px;
        position: absolute;
        z-index: 1;
    }

    .cite_div {
        position: absolute;
        padding: 20px;
        text-align: left;
        font-size: 12px;
        top: 45px;
        right: 5px;
        width: 300px;
        border-radius: 3px;
        background-color: #000000;
        transform: translateY(-120%);
        z-index: 999;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }

    .cite_div.visible {
        transform: translateY(0);
    }

    .bib-button {
        background: none;
        border: none;
        color: white;
        text-decoration: underline;
        cursor: pointer;
        padding: 0;
        font: inherit;
    }

    .bib-button:hover,
    .bib-button:focus {
        outline: none;
        background-color: rgb(255, 255, 255);
        color: black;
        border-radius: 2px;
    }

    #home {
        position: relative;
        width: 100%;
        padding-top: 70px;
        padding-bottom: 50px;
        align-content: center;
        text-align: center;
        background-color: #001c23;
        box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 10px;
    }

    main {
        width: 100%;
        display: flex;
        overflow: hidden;
        text-align: center;
    }

    #navigation {
        position: absolute;
        top: 5px;
        left: 5px;
        display: flex;
        align-items: center;
        gap: 3px;
    }

    button:focus {
        outline: 3px solid #005fcc;
        outline-offset: 2px;
        position: relative;
        z-index: 1;
    }

    .menu-button {
        font-family: "Montserrat", sans-serif;
        background: #00303e;
        border: none;
        border-radius: 2px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        color: white;
        position: relative;
    }

    .menu-button:hover {
        background: steelblue;
    }

    .nav-item {
        position: relative;
    }

    .dropdown {
        display: none;
        position: absolute;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 5px;
        left: 0px;
        flex-direction: column;
        gap: 4px;
        border-radius: 4px;
        z-index: 10;
    }

    /* Show dropdown on hover for desktop */
    .nav-item:hover .dropdown {
        display: flex;
    }

    .menu-item {
        font-family: "Montserrat";
        background-color: #003645;
        border: none;
        color: white;
        padding: 10px 20px;
        text-align: left;
        font-size: 14px;
        border-radius: 3px;
        cursor: pointer;
        white-space: nowrap;
        width: 125px;
    }

    .menu-item:hover {
        background-color: steelblue;
    }

    .menu-icon {
        display: none;
        cursor: pointer;
        font-size: 22px;
    }

    @media (max-width: 767px) {
        #navigation {
            left: 20px;
            top: 10px;
            flex-direction: column;
            align-items: flex-start;
        }

        .menu-button {
            display: none;
        }

        .menu-icon {
            display: block;
        }

        .dropdown {
            display: flex; /* visible via conditionals in Svelte */
            position: static;
            background: black;
            top: 20px;
        }
    }

    #people {
        position: relative;
        background-color: #001c23;
        box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 10px;
    }

    #credit {
        position: relative;
        margin: auto;
        width: 100%;
        font-weight: 200;
    }

    #people {
        text-align: center;
    }

    .image-grid {
        display: grid;
        gap: 20px;
        width: 90%;
        max-width: 1200px;
        margin: auto;

        /* Default: 1 column (mobile first) */
        grid-template-columns: 1fr;
    }

    /* Medium screens: 2 rows of 3 */
    @media (min-width: 600px) {
        .image-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    /* Large screens: 1 row of 6 */
    @media (min-width: 1024px) {
        .image-grid {
            grid-template-columns: repeat(6, 1fr);
        }
    }

    .image-container-people {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding-top: 20px;
        padding-bottom: 20px;
    }

    @media (min-width: 600px) {
        .image-container-people {
            padding-top: 50px;
            padding-bottom: 50px;
        }
    }

    @media (min-width: 1024px) {
        .image-container-people {
            padding-top: 100px;
            padding-bottom: 100px;
        }
    }

    .image-container-people img {
        width: 100%;
        height: auto;
        border-radius: 3px;
    }

    @media (max-width: 1023px) {
        .image-container-people img {
            max-width: 230px;
        }
    }

    .image-container-people p {
        margin: 0px 0 0;
        font-size: 13px;
        color: white;
        line-height: 1;
    }

    :global(a) {
        color: rgb(215, 215, 215);
        font-weight: 400;
    }

    :global(a:focus) {
        outline: none;
        background-color: rgb(255, 255, 255);
        color: black;
        border-radius: 2px;
    }

    footer {
        text-align: center;
        margin: auto;
        padding: 5px 0;
    }
</style>
