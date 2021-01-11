// JavaScript source code
function initViz() {
    var containerDiv = document.getElementById("tableauviz"),
    url = "https://public.tableau.com/views/VA_viz_cause/Dashboard1?:language=en&:display_count=y&publish=yes&:origin=viz_share_link";

    var viz = new tableau.Viz(containerDiv, url);
}