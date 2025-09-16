<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { scrollToSection, menuStructure } from "../utils";

    let isMenuOpen = false;
    let isSmallScreen = false; // Check if screen size is small
    // Check scroll position and update reactivity
    const handleScroll = () => {
        showScrollToTop = window.scrollY > 300; // Trigger button visibility
    };

    function checkScreenSize() {
        isSmallScreen = window.innerWidth < 768; // Adjust breakpoint as needed
    }

    onMount(() => {
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", checkScreenSize);
        };
    });

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
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
            <nav aria-label="Main Navigation" style="display: flex; gap: 3px;">
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
                                            handleNav(sub.target, sub.scrollId)}
                                        >{sub.name}</button
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
                                            handleNav(sub.target, sub.scrollId)}
                                        >{sub.name}</button
                                    >
                                {/each}
                            </div>
                        {/if}
                    </li>
                {/each}
            </ul>
        {/if}
    </div>

    <button class="cite" on:click={toggle} title="Cite"
        ><i class="fa fa-quote-right" aria-hidden="true"></i>
    </button>
    <div class="cite_div {show ? 'visible' : ''}">
        <p>
            <strong>MLA</strong><br />
            Peter, Mateja, et al.
            <em>Mediation Event and Negotiators Database (MEND)</em>. Harvard
            Dataverse, V1, 2025, https://doi.org/10.7910/DVN/PYRHS6.
        </p>

        <p>
            <strong>APA</strong><br />
            Peter, M., Badanjak, S., D'Amico, E., &amp; Houghton, K. (2025).
            <em>Mediation Event and Negotiators Database (MEND)</em> (V1). Harvard
            Dataverse. https://doi.org/10.7910/DVN/PYRHS6
        </p>

        <p>
            <strong>Chicago</strong><br />
            Peter, Mateja, Sanja Badanjak, Elisa D'Amico, and Kasia Houghton. 2025.
            <em>Mediation Event and Negotiators Database (MEND)</em>. V1.
            Harvard Dataverse. https://doi.org/10.7910/DVN/PYRHS6.
        </p>

        <p>
            <strong>Harvard</strong><br />
            Peter, M., Badanjak, S., D'Amico, E. and Houghton, K., 2025.
            <em>Mediation Event and Negotiators Database (MEND)</em>. V1.
            Harvard Dataverse. Available at:
            &lt;https://doi.org/10.7910/DVN/PYRHS6&gt;.
        </p>

        <p>
            <strong>Vancouver</strong><br />
            1. Peter M, Badanjak S, D'Amico E, Houghton K. Mediation Event and Negotiators
            Database (MEND) [dataset]. Harvard Dataverse; 2025. Version 1. Available
            from: https://doi.org/10.7910/DVN/PYRHS6
        </p>
        <strong>BibTeX</strong><br />
        <button class="bib-button" on:click={openBibtex}> View BibTeX </button>
    </div>

    <header>
        <h1 style="font-size: 45px; margin-bottom: 0px">Global PeaceHub</h1>
        <h2 style="padding-left: 10px; padding-right: 10px">
            Understanding shifts in the geopolitical context of peace and
            transition processes
        </h2>
    </header>
</div>

<style>
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

    header {
        position: relative;
        text-align: center;
        font-size: 14px;
        z-index: 9;
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
        transition: transform 0.4s ease;
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
</style>
