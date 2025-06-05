<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import {
        getGeoMultiple,
        images,
        sections,
        scrollToSection,
        images_ppl,
    } from "../utils";
    import Map from "./Map.svelte";

    let width;
    let all_polygons;
    let geo_labels;
    let showScrollToTop = false; // Visibility of the scroll-to-top button
    let isMenuOpen = false; // Toggle menu visibility
    let isSmallScreen = false; // Check if screen size is small

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

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        // Disable automatic scroll restoration
        if ("scrollRestoration" in history) {
            history.scrollRestoration = "manual";
        }

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
</script>

<div id="wrapper" bind:clientWidth={width}>
    <div id="home">
        <div id="navigation">
            <i
                style="padding: 5px; cursor: pointer;"
                class="fa fa-bars menu-icon"
                role="button"
                tabindex="0"
                aria-label="Toggle menu"
                on:click={() => (isMenuOpen = !isMenuOpen)}
                on:keydown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                        isMenuOpen = !isMenuOpen;
                    }
                }}
            ></i>
            <!-- Individual Buttons (Desktop) -->
            {#if !isSmallScreen}
                <nav aria-label="Main Navigation">
                    <!-- {#each sections as section}
                        <button
                            class="menu-button"
                            on:click={() => goto("/about")}
                            tabindex="0"
                        >
                            {section.name}
                        </button>
                    {/each} -->
                    <button
                        class="menu-button"
                        on:click={() => scrollToSection("home")}
                        tabindex="0"
                    >
                        Home
                    </button>
                    <button
                        class="menu-button"
                        on:click={() => goto("/about")}
                        tabindex="0"
                    >
                        About
                    </button>
                    <button
                        class="menu-button"
                        on:click={() => goto("/research")}
                        tabindex="0"
                    >
                        Research
                    </button>
                </nav>
            {/if}
            <!-- Dropdown Menu (Mobile) -->
            {#if isSmallScreen && isMenuOpen}
                <ul class="dropdown">
                    <!-- {#each sections as section}
                        <li>
                            <button
                                style="background: none; border: none; cursor: pointer; font-family: 'Montserrat', sans-serif;"
                                on:click={() => scrollToSection(section.id)}
                                class="menu-item"
                                tabindex="0"
                            >
                                {section.name}
                            </button>
                        </li>
                    {/each} -->
                    <button
                        style="background: none; border: none; cursor: pointer; font-family: 'Montserrat', sans-serif;"
                        on:click={() => scrollToSection("home")}
                        class="menu-item"
                        tabindex="0"
                    >
                        Home
                    </button>
                    <button
                        style="background: none; border: none; cursor: pointer; font-family: 'Montserrat', sans-serif;"
                        on:click={() => goto("/about")}
                        class="menu-item"
                        tabindex="0"
                    >
                        About
                    </button>
                    <button
                        style="background: none; border: none; cursor: pointer; font-family: 'Montserrat', sans-serif;"
                        on:click={() => goto("/research")}
                        class="menu-item"
                        tabindex="0"
                    >
                        Research
                    </button>
                </ul>
            {/if}
        </div>

        <header>
            <h1 style="font-size: 45px; margin-bottom: 0px">Global PeaceHub</h1>
            <h2 id="geopolitical-context">
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
                        style="box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);"
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
        <p style="text-align: center;">
            Web and Visualization Development: <strong>
                <a href="https://tomasvancisin.co.uk/" target="_blank">
                    Tomas Vancisin
                </a>
            </strong>
        </p>
        <p style="text-align: center;">
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
        padding-top: 30px;
    }

    img {
        height: 60px;
        margin-left: 30px;
    }

    h1 {
        color: white;
        font-weight: 800;
    }

    h3 {
        color: white;
        font-weight: 500;
        padding: 10px;
        margin: 0px;
    }

    #home {
        position: relative;
        width: 100%;
        padding-top: 70px;
        padding-bottom: 50px;
        align-content: center;
        text-align: center;
        background-color: #001c23;
    }

    main {
        width: 100%;
        display: flex;
        overflow: hidden;
        text-align: center;
    }

    #navigation {
        position: absolute;
        top: -2px;
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
        border: 1px solid rgb(78, 78, 78);
        border-radius: 2px;
        padding: 5px;
        width: 95px;
        font-size: 16px;
        cursor: pointer;
        color: white;
    }

    .menu-button:hover {
        background: rgb(78, 78, 78);
        color: white;
    }

    .dropdown {
        list-style: none;
        position: absolute;
        background: black;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 10px;
        top: 30px;
        left: 5px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .menu-icon {
        display: none;
        cursor: pointer;
        font-size: 24px;
    }

    @media (max-width: 767px) {
        .menu-button {
            display: none;
        }

        .menu-icon {
            display: block;
        }
    }

    #research,
    #people,
    #about {
        position: relative;
    }

    #about_content {
        position: relative;
        margin: auto;
        width: 70%;
        padding-top: 100px;
        padding-bottom: 120px;
    }
    .publication_content {
        position: relative;
        margin: auto;
        width: 80%;
        padding-top: 20px;
        padding-bottom: 20px;
    }

    #funding_content {
        position: relative;
        margin: auto;
        width: 65%;
        padding-top: 40px;
        padding-bottom: 80px;
    }

    #research {
        background-color: #001c23;
    }
    #people {
        background-color: #001c23;
    }
    #about {
        position: relative;
        background-color: #001c23;
        padding-bottom: 20px;
        font-weight: 200;
    }
    #publications {
        position: relative;
        margin: auto;
        width: 80%;
        padding: 20px;
        font-weight: 200;
    }
    #credit {
        position: relative;
        margin: auto;
        width: 100%;
        padding: 10px;
        background-color: #00303e;
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
        padding-top: 100px;
        padding-bottom: 100px;
    }

    .image-container-people img {
        width: 100%;
        height: auto;
        border-radius: 3px;
    }

    .image-container-people p {
        margin: 0px 0 0;
        font-size: 13px;
        color: white;
        line-height: 1;
    }

    /* Optional: Styling for the button */
    #read-more-btn,
    #read-more-btn-pub {
        font-family: "Montserrat", sans-serif;
        margin-top: 10px;
        padding: 8px 16px;
        background-color: #635c7e;
        color: white;
        border: none;
        border-radius: 2px;
        cursor: pointer;
    }

    #read-more-btn:hover,
    #read-more-btn-pub:hover {
        background-color: rgb(78, 78, 78);
        color: white;
    }
    :global(a) {
        color: rgb(215, 215, 215);
        font-weight: 400;
    }

    :global(a:focus) {
        outline: none; /* optional: removes default focus ring */
        background-color: rgb(255, 255, 255); /* highlight background */
        color: black; /* change text color */
        border-radius: 2px; /* optional: rounded highlight */
    }
</style>
