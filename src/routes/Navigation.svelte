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

    <header>
        <h1 style="font-size: 45px; margin-bottom: 0px">Global PeaceHub</h1>
        <h2>
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
        font-weight: 800;
        font-size: 24px;
    }

    #navigation {
        position: absolute;
        top: 0px;
        left: 0px;
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
