<script>
    import Navigation from "../Navigation.svelte";
    import { goto } from "$app/navigation";
</script>

<div class="wrapper">
    <Navigation />

    <section id="visualization" aria-labelledby="visualization-heading">
        <h3 id="vis-heading">Thematic</h3>
        <div class="mediation_content">
            <div class="mediation-grid-first">
                <div class="grid-item">
                    <div class="image-wrapper">
                        <a
                            href="https://peace-scroll.onrender.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Interactive peace scroll visualization showing Russia and China as peace agreement signatories"
                        >
                            <img
                                src="../rus_chi.png"
                                alt="Image of Russian borders"
                            />
                            <p class="image-caption" style="font-weight: 600;">
                                Russia and China as Peace Agreements Signatories
                            </p>
                        </a>
                    </div>
                </div>
                <!-- <div class="grid-item">
                    <div class="image-wrapper">
                        <a
                            href="https://mediation-geography.onrender.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Blog with visualizations focused on new insights in Geography and Conflict Mediation"
                        >
                            <img
                                src="/elisa.png"
                                alt="Map of the world with links between mediation locations and conflict location in Yemen."
                            />
                            <p class="image-caption" style="font-weight: 600;">
                                New Insights on Geography in Conflict Mediation
                            </p>
                        </a>
                    </div>
                </div> -->
            </div>
        </div>
    </section>

    <section id="mediation" aria-labelledby="mediation-heading">
        <h3 id="mediation-cases-heading">Mediation Country Cases</h3>
        <div class="mediation_content">
            <div class="mediation-grid">
                <div class="grid-item">
                    <div class="image-wrapper">
                        <a
                            href="/Afghanistan"
                            rel="noopener noreferrer"
                            aria-label="Go to Afghanistan mediation page"
                        >
                            <img
                                src="/afghanistan.png"
                                alt="Image of Afghan borders"
                            />
                            <p class="image-caption" style="font-weight: 600;">
                                Afghanistan
                            </p>
                        </a>
                    </div>
                </div>
                <div class="grid-item">
                    <div class="image-wrapper">
                        <a
                            href="/Israel"
                            rel="noopener noreferrer"
                            aria-label="Go to Israel mediation page"
                        >
                            <img
                                src="/israel.png"
                                alt="Image of Israeli borders"
                            />
                            <p class="image-caption" style="font-weight: 600;">
                                Israel and Palestine
                            </p>
                        </a>
                    </div>
                </div>
                <div class="grid-item">
                    <div class="image-wrapper">
                        <a
                            href="/Libya"
                            rel="noopener noreferrer"
                            aria-label="Go to Libya mediation page"
                        >
                            <img
                                src="/libya.png"
                                alt="Image of Lybian borders"
                            />
                            <p class="image-caption" style="font-weight: 600;">
                                Libya
                            </p>
                        </a>
                    </div>
                </div>
                <div class="grid-item">
                    <div class="image-wrapper">
                        <a
                            href="/Sudan"
                            rel="noopener noreferrer"
                            aria-label="Go to Sudan mediation page"
                        >
                            <img
                                src="/sudan.png"
                                alt="Image of Sudanese borders"
                            />
                            <p class="image-caption" style="font-weight: 600;">
                                Sudan
                            </p>
                        </a>
                    </div>
                </div>
                <div class="grid-item">
                    <div class="image-wrapper">
                        <a
                            href="/Syria"
                            rel="noopener noreferrer"
                            aria-label="Go to Syria mediation page"
                        >
                            <img
                                src="/syria.png"
                                alt="Image of Syrian borders"
                            />
                            <p class="image-caption" style="font-weight: 600;">
                                Syria
                            </p>
                        </a>
                    </div>
                </div>
                <div class="grid-item">
                    <div class="image-wrapper">
                        <a
                            href="/Yemen"
                            rel="noopener noreferrer"
                            aria-label="Go to Yemen mediation page"
                        >
                            <img
                                src="/yemen.png"
                                alt="Image of Yemeni borders"
                            />
                            <p class="image-caption" style="font-weight: 600;">
                                Yemen
                            </p>
                        </a>
                    </div>
                </div>
            </div>
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
    h3 {
        color: white;
        font-weight: 800;
        font-size: 24px;
        margin: 0 0 20px 0;
    }

    #vis-heading,
    #mediation-cases-heading {
        text-align: center;
    }

    section {
        position: relative;
        width: 100%;
        color: white;
        padding: 40px 0;
    }

    #mediation {
        position: relative;
        background-color: #001c23;
        width: 100%;
        padding: 40px 0;
        color: white;
        box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 10px;
    }

    .mediation_content {
        position: relative;
        margin: auto;
        width: 70%;
        padding-bottom: 40px;
    }

    .grid-item {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
    }

    .grid-item img {
        max-width: 100%;
        height: auto;
        object-fit: contain;
        border-radius: 4px;
        display: block;
        box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 10px;
        transition: transform 0.25s ease;
    }

    .grid-item img:hover {
        transform: scale(1.02);
    }

    .image-wrapper {
        text-align: center;
    }

    .image-caption {
        margin-top: 10px;
        font-size: 14px;
        color: white;
        font-family: "Montserrat", sans-serif;
    }

    .mediation-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 25px;
    }

    .mediation-grid-first {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 25px;
    }

    /* Responsive: 1 column on small screens */
    @media (max-width: 767px) {
        .grid-container {
            grid-template-columns: 1fr;
        }

        .mediation-grid {
            grid-template-columns: 1fr;
        }
    }

    a {
        color: rgb(215, 215, 215);
        font-weight: 400;
    }

    a:focus {
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
