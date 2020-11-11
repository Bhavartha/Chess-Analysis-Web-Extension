var existCondition = setInterval(function () {

    // Get Analysis Button
    const btn_original = document.querySelector(".quick-analysis-buttons > .ui_v5-button-basic")

    // If the button doesnt exist then exit the function
    if (typeof (btn_original) != 'undefined' && btn_original != null && btn_original.id == "") {

        console.log("Executing");
        
        // Clone the Analysis Button 
        // Note: It doesnt clone onclick events
        const btn_custom = btn_original.cloneNode(true);

        // Get the parent node of the Analysis button
        const parent = btn_original.parentNode
        btn_original.replaceWith(btn_custom)

        btn_custom.id = "LichessAnalysis"

        // Modify the click event on btn so that when we click it opens the game in lichess
        btn_custom.onclick = function () {
            console.log("RUNNIN");
        };
    }

}, 1000);  // Check every second
