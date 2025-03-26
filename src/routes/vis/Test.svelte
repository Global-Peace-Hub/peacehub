<script>
    let { ucdp, historical_events, mediations } = $props();

    $inspect(ucdp, historical_events, mediations);
</script>
<h2>Filtered Mediations</h2>
<ul>
    {#each mediations as p}
        <li>{p.med_event_ID}</li>
    {/each}
</ul>
