<script>
    import Navigation from "../Navigation.svelte";
</script>

<div class="wrapper">
    <Navigation />

    <section id="teaching" aria-labelledby="teaching-heading">
        <h3 id="teaching-heading">Teaching</h3>
        <div id="overview">
            <div class="overview_content">
                <p>
                    This project is both a centre for cutting-edge research and
                    a vibrant learning environment. Our team is composed of
                    dedicated academics who bring their expertise directly into
                    the classroom. By integrating research with teaching, we
                    ensure that our work informs and inspires the next
                    generation of scholars and practitioners. Students benefit
                    from real-world insights, and in turn, their fresh
                    perspectives enrich our research.
                </p>

                <p>
                    Our team teaches across all levels—from undergraduate
                    courses to PhD supervision—and is actively engaged in
                    innovative approaches to teaching.
                </p>
                <p style="margin-left: 30px; margin-right: 30px;">
                    <strong>•</strong> Since September 2025, Dr Mateja Peter is
                    running a module
                    <a
                        href="https://www.st-andrews.ac.uk/education/vip/projects/peacehub/"
                        target="_blank">PeaceHub: Global Mediation Database</a
                    >
                    at the University of St Andrews. The module is designed as a
                    <a
                        href="https://www.st-andrews.ac.uk/education/vip/"
                        target="_blank">Vertically Integrated Project</a
                    >
                    (VIP) and involves students in the work on the new Mediation
                    Event and Negotiators Database (MEND). VIPs are long-term, team-based
                    initiatives where undergraduate, master's, and PhD students collaborate
                    with faculty on real-world research and innovation challenges.
                </p>

                <p style="margin-left: 30px; margin-right: 30px;">
                    <strong>•</strong> In January 2026, Dr Sanja Badanjak will
                    be teaching a new six-week online short course
                    <a
                        href="https://peacerep.org/courses/peacetech-cpd-course/"
                        target="_blank">PeaceTech</a
                    > through the University of Edinburgh. The course, aimed at peacebuilding
                    professionals, will introduce the cutting-edge field of PeaceTech,
                    the use of data and technology to support peacebuilding initiatives.
                </p>
            </div>
        </div>
    </section>

    <section id="vip" aria-labelledby="vip-heading">
        <h3 id="vip-heading">
            Vertically Integrated Project: PeaceHub: Global Mediation Database
        </h3>
        <div id="vip-overview">
            <div class="vip-overview_content">
                <p>
                    At the University of St Andrews, we run an innovative
                    module, PeaceHub: Global Mediation Database, designed as a
                    Vertically Integrated Project (VIP). Students work in small
                    teams to research contemporary peace and mediation
                    initiatives, gaining hands-on experience with the Mediation
                    Event and Negotiators Database (MEND) and engaging in
                    policy-focused research. Their contributions expand and
                    strengthen this vital resource, supporting the research
                    team’s ongoing work.
                </p>
                <br />
                <h4>Academic year 2025/2026</h4>
                <p>
                    In the academic year 2025/26 students are working on
                    conflict and mediation in South Sudan and Mali. Below
                    posters represent a snapshot of group research undertaken on
                    various dimensions of these conflicts. In addition to
                    undertaking independent research, students also support the
                    research team’s ongoing work on the Mediation Event and
                    Negotiators Database (MEND).
                </p>
            </div>
        </div>

        <div class="mediation_content">
            <div class="mediation-grid">
                <div class="grid-item">
                    <div class="image-wrapper">
                        <a
                            href="../VIP_South_Sudan.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src="/poster_1.jpg" alt="Mali Poster" />
                        </a>
                    </div>
                </div>
                <div class="grid-item">
                    <div class="image-wrapper">
                        <a
                            href="../VIP_Mali.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src="/poster_2.jpg" alt="South Sudan Poster" />
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

    #teaching-heading,
    #vip-heading {
        text-align: center;
    }

    section {
        position: relative;
        width: 100%;
        color: white;
        padding: 40px 0; 
    }

    #vip {
        position: relative;
        background-color: #001c23;
        width: 100%;
        padding: 40px 0; 
        color: white;
        box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 10px;
    }

    .overview_content,
    .vip-overview_content,
    #vip-heading {
        position: relative;
        margin: auto;
        width: 90%;
        padding: 0 10px 10px 10px; 
    }

    @media (min-width: 600px) {
        .overview_content,
        .vip-overview_content,
        #vip-heading {
            width: 55%;
        }
    }

    footer {
        text-align: center;
        padding: 5px 0;
        margin: auto;
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

    .mediation_content {
        position: relative;
        margin: auto;
        width: 55%;
        padding-bottom: 40px;
    }

    .grid-item img {
        max-width: 100%;
        height: auto;
        object-fit: contain;
        border-radius: 3px;
        display: block;
        transition: transform 0.25s ease;
    }

    .grid-item img:hover {
        transform: scale(1.02);
    }
    .grid-item img {
        max-width: 100%;
        height: auto;
        object-fit: contain;
        border-radius: 4px;
        display: block;
    }

    .image-wrapper {
        text-align: center;
    }

    .mediation-grid {
        display: grid;
        grid-template-columns: 2fr 1fr; /* left image bigger */
        gap: 25px;
    }

    @media (max-width: 767px) {
        .mediation-grid {
            grid-template-columns: 1fr; /* full width on mobile */
        }
    }
</style>
