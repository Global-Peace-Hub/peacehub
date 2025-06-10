<script>
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }

    function scrollToSection(id) {
        document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
        isMenuOpen = false; // close menu after selection on small screens
    }
</script>

<div class="wrapper">
    <header>
        <p>
            <a href="/" aria-label="Back to main site from Header"
                >← Back to Main Site</a
            >
        </p>
    </header>

    <nav class="page-nav" aria-label="Page section navigation">
        <button
            class="burger"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            on:click={toggleMenu}
        >
            ☰
        </button>

        <div
            class="button-nav"
            class:open={isMenuOpen}
            role="group"
            aria-label="Jump to section"
        >
            <button type="button" on:click={() => scrollToSection("#research")}
                >Research</button
            >
            <button
                type="button"
                on:click={() => scrollToSection("#transition")}
                >Global Transition</button
            >
        </div>
    </nav>

    <section id="research" aria-labelledby="research-heading">
        <h2 id="research-heading">Research</h2>
        <div id="publications">
            <div class="publication_content">
                <h3>2025</h3>
                <p>
                    <strong>Elisa D’Amico</strong> (2025)
                    <a
                        href="https://peacerep.org/publication/conflict-in-a-warming-world/"
                        >Conflict in a Warming World: How Climate Shocks Impact
                        Rebel Demands and Peace Agreement Outcomes. [Climate &
                        Natural Resources Series]. PeaceRep: The Peace and
                        Conflict Resolution Evidence Platform, University of
                        Edinburgh.</a
                    >
                </p>
                <h3>2024</h3>
                <p>
                    <strong>Mateja Peter</strong> (2024)
                    <a
                        href="https://www.cogitatiopress.com/politicsandgovernance/article/view/7357"
                        >‘Global fragmentation and collective security
                        instruments: Weakening the liberal international order
                        from within.’ Politics and Governance, 12 (7357), 1-15.</a
                    >
                </p>
                <p>
                    <strong>Sanja Badanjak and Mateja Peter</strong> (2024)
                    <a href="https://www.c-r.org/accord/still-time-to-talk"
                        >‘Diversification and Congestion in Peacemaking: What
                        the Data Says’. in Theresa Whitfield (ed.), Still time
                        to talk: Adaptation and innovation in peace mediation,
                        Accord 30. London: Conciliation Resources.</a
                    >
                </p>
                <p>
                    <strong>Mateja Peter and Kasia Houghton</strong> (2024)
                    <a
                        href="https://peacerep.org/publication/russia-and-china-in-liberal-peacebuilding/"
                        >Russia and China in Liberal Peacebuilding: Perceptions
                        and Engagement with the Dayton Peace Process in Bosnia
                        and Herzegovina. [Global Transitions Series]. PeaceRep:
                        The Peace and Conflict Resolution Evidence Platform,
                        University of Edinburgh.</a
                    >
                </p>
                <p>
                    <strong>Niamh Henry</strong> (2024)
                    <a
                        href="https://peacerep.org/publication/extracting-named-actors-from-text/"
                        >Extracting Named Actors from Text: Using Named Entity
                        Recognition (NER) in Peace and Conflict Studies [Peace
                        Analytics Series]. PeaceRep: The Peace and Conflict
                        Resolution Evidence Platform, University of Edinburgh.</a
                    >
                </p>
                <p>
                    <strong>Elisa D’Amico</strong> (2024)
                    <a
                        href="https://peacerep.org/publication/semi-automated-coding-for-conflict-mediation-research-database-development/"
                        >Semi-Automated Coding for Conflict Mediation Research:
                        Database Development. Peace Analytics Series, University
                        of Edinburgh: Peace and Conflict Resolution Evidence
                        Platform: November 2024.
                    </a>
                </p>
                <p>
                    <strong>Kasia Houghton</strong> (2024).
                    <a
                        href="https://www.taylorfrancis.com/chapters/oa-edit/10.4324/9781003372011-6/competition-norms-kasia-houghton"
                        >‘The Competition over Norms: The Case of the Syrian
                        Conflict.’ In Benjamin Houghton and Kasia Houghton
                        (eds.) China, Russia and the USA in the Middle East: The
                        Contest for Supremacy. London: Routledge, 46-64.
                    </a>
                </p>
                <p>
                    <strong>Mateja Peter and Ruoxi Wang</strong> (2024)
                    <a
                        href="https://brill.com/view/journals/joup/27/1/article-p85_005.xml"
                        >‘China’s Approach to Human Security within and outside
                        UN Peacekeeping: Drawing Lessons from South Sudan.’
                        Journal of International Peacekeeping, 27(1), 85-114.</a
                    >
                </p>
                <h3>2023</h3>
                <p>
                    <strong>Mateja Peter and Kasia Houghton</strong> (2023)
                    <a
                        href="https://peacerep.org/publication/third-party-mediation-in-sudan-and-south-sudan-longer-term-trends/"
                        >Congestion and Diversification of Third-Party Mediation
                        in Sudan and South Sudan: First Look at some Longer-Term
                        Trends. [Global Transitions Series]. PeaceRep: The Peace
                        and Conflict Resolution Evidence Platform, University of
                        Edinburgh.</a
                    >
                </p>
                <p>
                    <strong>Mateja Peter and Marcel Plichta</strong> (2023)
                    <a
                        href="https://peacerep.org/publication/china-russia-sudan-economic-military-engagement/"
                        >China and Russia in Sudan: Surveying data on economic
                        and military engagement. [Global Transitions Series].
                        PeaceRep: The Peace and Conflict Resolution Evidence
                        Platform, University of Edinburgh.th Sudan.’ Journal of
                        International Peacekeeping, 27(1), 85-114.</a
                    >
                </p>
                <p>
                    <strong>Sanja Badanjak</strong> (2023)
                    <a
                        href="https://peacerep.org/publication/third-parties-peace-agreements-data-trends/"
                        >Third Parties in Peace Agreements: First Look at New
                        Data and Key Trends. [Global Transitions Series].
                        PeaceRep: The Peace and Conflict Resolution Evidence
                        Platform, University of Edinburgh.</a
                    >
                </p>
                <p>
                    <strong>Sanja Badanjak</strong> (2023)
                    <a
                        href="https://peacerep.org/publication/eu-external-action-development-spending-covid/"
                        >EU External Action and Development Spending in a Time
                        of Covid-19. [Covid-19 Series]. PeaceRep: The Peace and
                        Conflict Resolution Evidence Platform, University of
                        Edinburgh.</a
                    >
                </p>
                <h3>2022</h3>
                <p>
                    <strong>Mateja Peter and Haley Rice</strong> (2022)
                    <a
                        href="https://peacerep.org/publication/non-western-approaches-to-peacemaking-and-peacebuilding-state-of-the-art-and-an-agenda-for-research/"
                        >Non-Western approaches to peacemaking and
                        peacebuilding: State-of-the-art and an agenda for
                        research. [Global Transitions Series]. PeaceRep: The
                        Peace and Conflict Resolution Evidence Platform,
                        University of Edinburgh.</a
                    >
                </p>
            </div>
        </div>
    </section>

    <section id="transition" aria-labelledby="transition-heading">
        <h2 id="transition-heading">Global Transition Series</h2>
        <div id="transition_content">
            <p>
                As part of the PeaceRep consortium, the project also produces
                the <a
                    target="_blank"
                    href="https://peacerep.org/research/geopolitical-transitions/"
                    >Global Transitions</a
                > series, edited by Mateja Peter. This includes publications by the
                core team and further studies produced in the wider consortium.
            </p>
        </div>
    </section>
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
    header {
        position: absolute;
        top: 40px;
        left: 50px;
        text-align: left;
        font-size: 14px;
        z-index: 9;
    }

    .page-nav {
        display: flex;
        flex-direction: column;
        align-items: flex-start; /* default for larger screens */
        padding-top: 0;
        padding-left: 50px;
        background-color: #001c23;
        position: relative;
    }

    .burger {
        display: none;
        font-size: 26px;
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        margin: 10px 0;
        padding: 5px 10px;
    }

    .button-nav {
        display: flex;
        gap: 4px;
        padding: 0;
        flex-wrap: wrap;
        justify-content: center;
    }

    .button-nav button {
        font-family: "Montserrat";
        background-color: #003645;
        border: none;
        color: white;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        border-radius: 3px;
        cursor: pointer;
    }

    .button-nav button:hover {
        background-color: steelblue;
    }

    /* 🔽 Responsive burger behavior */
    @media (max-width: 767px) {
        .page-nav {
            padding-left: 35px;
        }

        .burger {
            display: block;
        }

        .button-nav {
            position: absolute;
            top: 50px;
            left: 50px;
            display: none;
            flex-direction: column;
            gap: 5px;
            width: 50%;
            padding-bottom: 10px;
            z-index: 10;
        }

        .button-nav.open {
            display: flex;
        }
    }

    #research-heading,
    #transition-heading {
        text-align: center;
    }

    #research {
        position: relative;
        background-color: #001c23;
        width: 100%;
        padding: 10px 0; /* add vertical padding */
        color: white; /* if text is dark, you may want to set this */
    }

    .publication_content {
        position: relative;
        margin: auto;
        width: 70%;
        padding: 20px;
    }

    #transition {
        position: relative;
        background-color: #003645;
        width: 100%;
        padding: 40px 0; /* add vertical padding */
        color: white;
    }

    #transition_content {
        position: relative;
        margin: auto;
        width: 70%;
        padding: 20px;
    }

    footer {
        text-align: center;
        background-color: #001c23;
        padding: 10px 0; /* add vertical padding */
        margin: auto;
    }
</style>
