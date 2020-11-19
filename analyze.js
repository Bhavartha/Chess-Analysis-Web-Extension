function openLichess(PGN) {

    // URLEncodes our game PGN and assigns it to parameter pgn should will be sent to lichess
    var data = new URLSearchParams();
    data.append("pgn", PGN)

    // Create and open new Request
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://lichess.org/api/import");

    // Specifying that the response that we get should be treated as JSON response
    xhr.responseType = 'json';

    // Settings contect-type as specified in Lichess API Docs
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Event Listener that is fired whenever the readyState of xhr object is changed
    xhr.addEventListener("readystatechange", function () {

        // State 4 = DONE.The operation is complete.
        if (this.readyState === 4) {

            // Open the url received in new tab
            window.open(this.response.url, '_blank')
        }
    });

    // Send the created request
    xhr.send(data);
}

async function findPGN() {

    // Find the share button and click it
    const share_btn = document.querySelector(".share")
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

    // Open lichess containing our game
    openLichess(PGN)
}

var existCondition = setInterval(function () {

    // If analysis url then call different function

    // Get Analysis Button
    let btn_original = document.querySelector(".quick-analysis-buttons")
    
    // If the button doesnt exist then exit the function
    if (typeof (btn_original) != 'undefined' && btn_original != null && btn_original.id == "") {

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

        // Also change text to Lichess Analysis
        btn_custom.innerHtml = "Lichess Analysis"

        // Modify the click event on btn so that when we click it opens the game in lichess
        btn_custom.onclick = async function (e) {
            e.preventDefault()
            findPGN()
        };
    }

}, 1000);  // Check every second
