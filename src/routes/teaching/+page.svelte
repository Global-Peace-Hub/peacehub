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

                <p>
                    In September 2025, we are launching a new module <a
                        href="https://www.st-andrews.ac.uk/education/vip/projects/peacehub/"
                        target="_blank">PeaceHub: Global Mediation Database</a
                    >
                    at the University of St Andrews. The module is designed as a
                    <a
                        href="https://www.st-andrews.ac.uk/education/vip/"
                        target="_blank">Vertically Integrated Project</a
                    >
                    (VIP) and will involve students in the work on the new Mediation
                    Event and Negotiators Database (MEND). VIPs are long-term, team-based
                    initiatives where undergraduate, master's, and PhD students collaborate
                    with faculty on real-world research and innovation challenges.
                </p>

                <p>
                    In January 2026, Dr Sanja Badanjak will be teaching a new
                    six-week online short course
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

    <footer>
        <p style="padding-top: 20px;">
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
    }

    #teaching-heading {
        text-align: center;
    }
    #teaching {
        position: relative;
        background-color: #003645;
        width: 100%;
        color: white;
    }

    .overview_content {
        position: relative;
        margin: auto;
        width: 90%;
        padding-bottom: 40px;
    }

    @media (min-width: 600px) {
        .overview_content {
            width: 70%;
        }
    }

    footer {
        text-align: center;
        background-color: #001c23;
        margin: auto;
        padding-bottom: 10px;
        box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 10px;
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
</style>
