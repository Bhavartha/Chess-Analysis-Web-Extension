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

        // Replace the original button with our custom button
        btn_original.replaceWith(btn_custom)

        // Adding custom id so that we can check if element has our custom id
        // If it has then we dont have to redo the procedure
        btn_custom.id = "LichessAnalysis"

        // Modify the click event on btn so that when we click it opens the game in lichess
        btn_custom.onclick = async function () {

            // Find the share button and click it
            const share_btn = document.querySelector(".icon-font-chess.share")
            share_btn.click()

            const pgnSelector = ".form-textarea-component.share-menu-tab-pgn-textarea"

            // Wait till the popup is loaded and PGN is added to DOM
            while (!document.querySelector(pgnSelector)) {
                await new Promise(r => setTimeout(r, 500));
            }

            // Store the PGN value in variable
            const PGN = document.querySelector(pgnSelector).value

            // Close popup
            document.querySelector(".icon-font-chess.x.icon-font-secondary").click()


            window.open("https://lichess.org")
        };
    }

}, 1000);  // Check every second
