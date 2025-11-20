<script>
    import Navigation from "../Navigation.svelte";
</script>

<div class="wrapper">
    <Navigation />

    <section id="about" aria-labelledby="about-heading">
        <h3 id="about-heading">About</h3>
        <div id="about_content">
            <p id="first-paragraph" style="margin-top: 0px; font-size: 18px;">
                We are an interdisciplinary research group exploring how
                fragmentation in the global order affects peace and transition
                processes. Our work focuses on understanding why and how
                third-party actors—state, intergovernmental, and
                non-governmental actors—intervene in peace efforts, and how they
                perceive their role in reducing conflict and preventing relapse.
                We also examine how local actors navigate this complex landscape
                of mediators and peacebuilders, and how these interactions shape
                conflict outcomes and post-conflict governance.
                <br />
                <br />
                The project produces dedicated case and trends studies as part of
                the
                <a
                    href="https://peacerep.org/research/geopolitical-transitions/"
                    target="_blank">PeaceRep Global Transitions</a
                >
                series and is developing two complementary datasets:
            </p>
            <img alt="University of St Andrews Logo" src="../paax.png" />

            <p style="margin-left: 30px; margin-right: 30px;">
                • <strong>Third Parties in Peace Agreements Dataset</strong>.
                Most formal agreements in peace processes are supported by
                parties external to the armed conflict, in the form of
                third-party signature to the agreement. In the PA-X collection
                of peace agreements that address inter- and intra- state, or
                mixed conflicts, around sixty percent of agreements feature a
                signatory which is not one of the main conflict parties, and
                around one-third of all agreements feature an international
                third-party signatory. The Third Parties in Peace Agreements
                dataset draws on the Peace Agreement Actors Dataset (PAA-X) and
                is the only existing data resource on third-party signatories in
                peace agreements. It allows for an in-depth examination of the
                patterns of engagement in peace agreements and provides valuable
                insights into what actors are necessary for conflict parties to
                commit to a formal, written agreement. This data is instrumental
                in discerning the regional and topical priorities of individual
                interveners since 1990, giving us insight into the types of
                agreements supported by individual third parties.
            </p>
            <p style="margin-left: 30px; margin-right: 30px;">
                <strong>Cite Data as:</strong> Badanjak, Sanja; Henry, Niamh.
                (2025). Peace Agreement Actors Dataset (PAA-X), 1990-2023
                [dataset]. University of Edinburgh. School of Law.
                <a href="https://doi.org/10.7488/ds/7932" target="_blank"
                    >https://doi.org/10.7488/ds/7932</a
                >.
            </p>

            <img alt="University of St Andrews Logo" src="../mend.png" />
            <p style="margin-left: 30px; margin-right: 30px;">
                • <strong
                    >Mediation Event and Negotiators Database (MEND)</strong
                > is a new and growing resource for researchers and practitioners
                with a focus on peace and conflict resolution. The dataset comprehensively
                covers broader peacemaking efforts within major armed conflicts,
                tracking all mediation and mediation-related events involving external
                third-party actors, regardless of whether these events result in
                a formal peace agreement. It captures mediation as part of formal
                peace initiatives and mediation efforts running in support or in
                parallel to these. Each record corresponds to a unique event, providing
                detailed metadata about location, third parties, local actors, and
                individuals involved. The MEND dataset facilitates a nuanced understanding
                of the roles various actors play in contributing to the peace processes
                and in brokering agreements. It also enables the identification of
                unsuccessful or spoiler mediation efforts that may still have influenced
                the ongoing conflict management. In an era marked by global fragmentation,
                this data plays a crucial role in providing insights into where,
                when, how, and why actors engage in mediation activities, allowing
                for the mapping of network dynamics between international and local
                actors, and identification of the mediation conditions conducive
                to the eventual signing of agreements.
            </p>
            <p style="margin-left: 30px; margin-right: 30px;">
                <strong>Cite Data as:</strong> Peter, Mateja; Badanjak, Sanja;
                D'Amico, Elisa; Houghton, Kasia, 2025, "Mediation Event and
                Negotiators Database (MEND)", Harvard Dataverse, V1,
                <a href="https://doi.org/10.7910/DVN/PYRHS6" target="_blank"
                    >https://doi.org/10.7910/DVN/PYRHS6</a
                >
            </p>
        </div>
    </section>

    <section id="team" aria-labelledby="team-heading">
        <h3 id="team-heading">Team</h3>
        <div id="team_content" style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse;">
                <colgroup>
                    <col style="width: 30%;" />
                    <col style="width: 40%;" />
                    <col style="width: 30%;" />
                </colgroup>
                <thead>
                    <tr>
                        <th
                            style="text-align: left; padding: 8px; border-bottom: 1px solid #ccc;"
                            >Name</th
                        >
                        <th
                            style="text-align: left; padding: 8px; border-bottom: 1px solid #ccc;"
                            >Role</th
                        >
                        <th
                            style="text-align: left; padding: 8px; border-bottom: 1px solid #ccc;"
                            >Affiliation</th
                        >
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 8px;">Dr Mateja Peter</td>
                        <td style="padding: 8px;">Research Lead</td>
                        <td style="padding: 8px;">University of St Andrews</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;">Dr Sanja Badanjak</td>
                        <td style="padding: 8px;">Research Co-Lead</td>
                        <td style="padding: 8px;">University of Edinburgh</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;">Dr Elisa D’Amico</td>
                        <td style="padding: 8px;">MEND Data Manager</td>
                        <td style="padding: 8px;"
                            >University College Dublin / University of St
                            Andrews</td
                        >
                    </tr>
                    <tr>
                        <td style="padding: 8px;">Dr Kasia Houghton</td>
                        <td style="padding: 8px;"
                            >Research Fellow and MEND Analyst Coordinator</td
                        >
                        <td style="padding: 8px;">University of St Andrews</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;">Niamh Henry</td>
                        <td style="padding: 8px;"
                            >Research Fellow and Data Engineer</td
                        >
                        <td style="padding: 8px;">University of Edinburgh</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;">Dr Tomas Vancisin</td>
                        <td style="padding: 8px;"
                            >Research Associate in Data Visualisation</td
                        >
                        <td style="padding: 8px;">University of Edinburgh</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;">Katelyn Nutley</td>
                        <td style="padding: 8px;">MEND Data Officer</td>
                        <td style="padding: 8px;">University of St Andrews</td>
                    </tr>

                    <!-- Analysts -->
                    <tr>
                        <td style="padding: 8px;">Dr Sarah Gharib Seif</td>
                        <td style="padding: 8px;">MEND Analyst</td>
                        <td style="padding: 8px;">University of St Andrews</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;">Louise Courbin</td>
                        <td style="padding: 8px;">MEND Analyst</td>
                        <td style="padding: 8px;">University of St Andrews</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;">Dr Siheon Choi</td>
                        <td style="padding: 8px;">MEND Analyst</td>
                        <td style="padding: 8px;">University of St Andrews</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;">Dr Benjamin Houghton</td>
                        <td style="padding: 8px;">MEND Analyst</td>
                        <td style="padding: 8px;">University of St Andrews</td>
                    </tr>
                </tbody>
            </table>

            <br /><br /><br />

            <table style="width: 100%; border-collapse: collapse;">
                <colgroup>
                    <col style="width: 30%;" />
                    <col style="width: 40%;" />
                    <col style="width: 30%;" />
                </colgroup>
                <tbody>
                    <tr>
                        <td style="padding: 8px;"
                            ><strong>MEND Junior Analysts</strong></td
                        >
                        <td style="padding: 8px;">
                            Liora Berg, Ava Byrne, Nicholas De Carvalho, Zoe
                            Guidino, Samvit Nagpal, Alix Ramillon, Leah Rose
                        </td>
                        <td style="padding: 8px;">University of St Andrews</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;"
                            ><strong>Past Analysts</strong></td
                        >
                        <td style="padding: 8px;">
                            Delia Burns, Aarushu Sharma, Haley Rice, Marcel
                            Plichta
                        </td>
                        <td style="padding: 8px;">University of St Andrews</td>
                    </tr>
                </tbody>
            </table>

            <br />
            <br />
        </div>
    </section>

    <section id="funding" aria-labelledby="funding-heading">
        <h3 id="funding-heading">Funding</h3>
        <div id="funding_content">
            <p style="margin-top: 0px">
                Our research is supported by the Peace and Conflict Resolution
                Evidence Platform (PeaceRep), funded by UK International
                Development from the UK government. However, the views expressed
                are those of the authors and do not necessarily reflect the UK
                government’s official policies. We receive additional support
                from the Universities of St Andrews and Edinburgh.
            </p>
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

    #about-heading,
    #funding-heading,
    #team-heading {
        text-align: center;
    }

    #about {
        position: relative;
        background-color: #003645;
        width: 100%;
        color: white;
    }

    #about_content,
    #team_content,
    #funding_content {
        position: relative;
        margin: auto;
        width: 90%; /* Mobile default */
        padding: 20px;
    }

    @media (min-width: 600px) {
        #about_content,
        #team_content,
        #funding_content {
            width: 55%; /* Medium and up */
        }
    }

    #team {
        position: relative;
        background-color: #001c23;
        width: 100%;
        padding-top: 20px;
        color: white;
        box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 10px;
    }

    #team_content table {
        width: 100%;
        border-collapse: collapse;
    }

    #team_content th,
    #team_content td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #575757;
    }

    #funding {
        position: relative;
        background-color: #003645;
        width: 100%;
        color: white;
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

    img {
        display: block;
        max-width: 200px;
        height: auto;
        margin: 10px auto;
        margin-top: 50px;
    }
</style>
