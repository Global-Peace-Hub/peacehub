<script>
    import Navigation from "../Navigation.svelte";
    import { goto } from "$app/navigation";
</script>

<div class="wrapper">
    <Navigation />

    <section id="visualization" aria-labelledby="visualization-heading">
        <h2 id="vis-heading">Thematic</h2>
        <div id="vis">
            <div class="vis_content">
                <div class="grid-container">
                    <div class="grid-item">
                        <!-- <div class="image-wrapper">
                            <img
                                src="../example.png"
                                alt="Image 1 description"
                            />
                            <p class="image-caption">Geography of Mediation</p>
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="image-wrapper">
                            <img
                                src="../example.png"
                                alt="Image 2 description"
                            />
                            <p class="image-caption">Russia in Mediation</p>
                        </div>
                    </div> -->
                        <div class="grid-item">
                            <div class="image-wrapper">
                                <a
                                    href="https://tvancisin.github.io/peace_scroll/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src="../rus_chi.png"
                                        alt="Image 3 description"
                                    />
                                </a>
                                <p
                                    class="image-caption"
                                    style="font-weight: 600; font-size: 16px"
                                >
                                    Russia and China as Peace Agreements
                                    Signatories
                                </p>
                            </div>
                        </div>
                        <!-- <div class="grid-item">
                        <div class="image-wrapper">
                            <img
                                src="../example.png"
                                alt="Image 4 description"
                            />
                            <p class="image-caption">Mediation in 2024</p>
                        </div>
                    </div> -->
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="mediation" aria-labelledby="mediation-heading">
        <h2 id="mediation-cases-heading">Mediation Country Cases</h2>
        <div id="mediation">
            <div class="mediation_content">
                <div class="mediation-grid">
                    <div class="grid-item">
                        <div class="image-wrapper">
                            <a href="/Afghanistan" rel="noopener noreferrer">
                                <img
                                    src="/afghanistan.png"
                                    alt="Image of Afghan borders"
                                />
                            </a>
                            <p class="image-caption" style="font-weight: 600;">
                                Afghanistan
                            </p>
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="image-wrapper">
                            <a href="/Israel" rel="noopener noreferrer">
                                <img
                                    src="/israel.png"
                                    alt="Image of Israeli borders"
                                />
                            </a>
                            <p class="image-caption" style="font-weight: 600;">
                                Israel and Palestine
                            </p>
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="image-wrapper">
                            <a href="/Lybia" rel="noopener noreferrer">
                                <img
                                    src="/libya.png"
                                    alt="Image of Lybian borders"
                                />
                            </a>
                            <p class="image-caption" style="font-weight: 600;">
                                Libya
                            </p>
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="image-wrapper">
                            <a href="/Sudan" rel="noopener noreferrer">
                                <img
                                    src="/sudan.png"
                                    alt="Image of Sudanese borders"
                                />
                            </a>
                            <p class="image-caption" style="font-weight: 600;">
                                Sudan
                            </p>
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="image-wrapper">
                            <a href="/Syria" rel="noopener noreferrer">
                                <img
                                    src="/syria.png"
                                    alt="Image of Syrian borders"
                                />
                            </a>
                            <p class="image-caption" style="font-weight: 600;">
                                Syria
                            </p>
                        </div>
                    </div>
                    <div class="grid-item">
                        <div class="image-wrapper">
                            <a href="/Yemen" rel="noopener noreferrer">
                                <img
                                    src="/yemen.png"
                                    alt="Image of Yemeni borders"
                                />
                            </a>
                            <p class="image-caption" style="font-weight: 600;">
                                Yemen
                            </p>
                        </div>
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
    #vis-heading,
    #mediation-cases-heading {
        text-align: center;
    }
    #visualization {
        position: relative;
        background-color: #003645;
        width: 100%;
        padding: 10px 0; /* add vertical padding */
        color: white;
    }

    #mediation {
        position: relative;
        background-color: #001c23;
        width: 100%;
        padding: 10px 0; /* add vertical padding */
        color: white;
    }

    .mediation_content,
    .vis_content {
        position: relative;
        margin: auto;
        width: 70%;
        padding: 20px;
    }

    .grid-container {
        /* display: grid;
        grid-template-columns: repeat(2, 1fr); */
        gap: 25px;
    }

    .grid-item {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #002a35; /* optional background */
        padding: 10px;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .grid-item img {
        max-width: 100%;
        height: auto;
        display: block;
        object-fit: contain;
        border-radius: 4px;
    }

    /* Responsive: stack in one column on small screens */
    @media (max-width: 767px) {
        .grid-container {
            grid-template-columns: 1fr;
        }
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

    .grid-item {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .image-wrapper {
        text-align: center;
    }

    .grid-item img {
        max-width: 100%;
        height: auto;
        object-fit: contain;
        border-radius: 4px;
        display: block;
    }

    .image-caption {
        margin-top: 10px;
        font-size: 14px;
        color: white;
        font-family: "Montserrat", sans-serif;
    }

    /* Responsive: 1 column on small screens */
    @media (max-width: 767px) {
        .mediation-grid {
            grid-template-columns: 1fr;
        }
    }

    footer {
        text-align: center;
        background-color: #003645;
        padding: 10px 0; /* add vertical padding */
        margin: auto;
    }

    a {
        color: rgb(215, 215, 215);
        font-weight: 400;
    }
</style>
