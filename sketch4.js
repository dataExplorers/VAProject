// JavaScript source code
function initViz() {
    var containerDiv = document.getElementById("tableauviz"),
    url = "https://public.tableau.com/shared/YZFGZS598?:display_count=y&:origin=viz_share_link";

    var viz = new tableau.Viz(containerDiv, url);
}
