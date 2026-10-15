<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Platform architecture
- Keep seven top-level content routes in TanStack Router with their own head metadata and a shared PlatformShell in the root, so navigation remains consistent and each screen is directly addressable.
- Keep factory views in the platform component module and browser-load ECharts inside the chart effect; SSR must not initialize charts or touch browser globals.
- Resolve chart colors from global semantic CSS tokens and apply option overrides last with notMerge enabled, so chart-type changes cannot retain stale axes or series.
- Keep displayed operations as clearly labeled demo data until a real plant data source is connected; do not imply live industrial telemetry.
