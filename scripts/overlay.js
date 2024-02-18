let playerOneNameElement = document.getElementById("p1Name"),
   playerOneFlagElement = document.getElementById("player1Flag"),
   playerOneHandicapElement = document.getElementById("p1Handicap"),
   playerOneGameScoreContainer = document.getElementById(
      "player1ScoreContainer"
   ),
   playerOneGameScoreElement = document.getElementById("p1Score"),
   playerOneMatchScoreElement = document.getElementById("p1MatchScore"),
   playerOneRaceNeededElement = document.getElementById("player1RaceNeeded"),
   straightRaceElement = document.getElementById("straightRace"),
   straightRaceNeededElement = document.getElementById("straightRaceNeeded"),
   handicappedRaceElement = document.getElementById("handicapRace"),
   playerTwoNameElement = document.getElementById("p2Name"),
   playerTwoFlagElement = document.getElementById("player2Flag"),
   playerTwoHandicapElement = document.getElementById("p2Handicap"),
   playerTwoGameScoreContainer = document.getElementById(
      "player2ScoreContainer"
   ),
   playerTwoGameScoreElement = document.getElementById("p2Score"),
   playerTwoMatchScoreElement = document.getElementById("p2MatchScore"),
   playerTwoRaceNeededElement = document.getElementById("player2RaceNeeded");

// - - - - - - - - - - - - - - - - - - - -
// Setup Broadcast Channel
// - - - - - - - - - - - - - - - - - - - -

const broadcast = new BroadcastChannel("ObsPool");

// - - - - - - - - - - - - - - - - - - - -
// Handle received broadcasts
// - - - - - - - - - - - - - - - - - - - -
//TODO :: Handle cases where HTML validation is not working and we receive bad data
broadcast.onmessage = (event) => {
   console.log(JSON.stringify(event.data));
   if (event.data.playerOneNameValue != undefined) {
      playerOneNameElement.innerText = event.data.playerOneNameValue;
   }
   if (event.data.playerOneCountryValue != undefined) {
      playerOneFlagElement.setAttribute(
         "style",
         "background: url(" +
            flagImageLocation +
            event.data.playerOneCountryValue +
            ".SVG) no-repeat;background-size:cover"
      );
   }
   if (event.data.playerOneHandicapValue != undefined) {
      playerOneHandicapElement.innerText =
         "(" + event.data.playerOneHandicapValue + ")";
   }
   if (event.data.playerTwoNameValue != undefined) {
      playerTwoNameElement.innerText = event.data.playerTwoNameValue;
   }
   if (event.data.playerTwoCountryValue != undefined) {
      playerTwoFlagElement.setAttribute(
         "style",
         "background: url(" +
            flagImageLocation +
            event.data.playerTwoCountryValue +
            ".SVG) no-repeat;background-size:cover"
      );
   }
   if (event.data.playerTwoHandicapValue != undefined) {
      playerTwoHandicapElement.innerText =
         "(" + event.data.playerTwoHandicapValue + ")";
   }
   if (event.data.matchTypeValue != undefined) {
      if (event.data.matchTypeValue === "straight") {
         straightRaceElement.setAttribute("style", "display: flex");
         handicappedRaceElement.setAttribute("style", "display: none");
         if (event.data.matchRaceValue != undefined) {
            straightRaceNeededElement.innerText = event.data.matchRaceValue;
         }
      } else if (event.data.matchTypeValue === "handicapped") {
         handicappedRaceElement.setAttribute("style", "display: flex");
         straightRaceElement.setAttribute("style", "display: none");
         if (event.data.matchPlayerOneTargetValue != undefined) {
            playerOneRaceNeededElement.innerText =
               event.data.matchPlayerOneTargetValue;
         }
         if (event.data.matchPlayerTwoTargetValue != undefined) {
            playerTwoRaceNeededElement.innerText =
               event.data.matchPlayerTwoTargetValue;
         }
      }
   }
   if (event.data.matchDisciplineValue != undefined) {
      if (
         (event.data.matchDisciplineValue == 8) |
         (event.data.matchDisciplineValue == 9) |
         (event.data.matchDisciplineValue == 10)
      ) {
         playerOneGameScoreElement.setAttribute("style", "display:none");
         playerTwoGameScoreElement.setAttribute("style", "display:none");
         playerOneGameScoreContainer.classList.add("bg-oil");
         playerTwoGameScoreContainer.classList.add("bg-oil");
      } else if (
         (event.data.matchDisciplineValue == 14) |
         (event.data.matchDisciplineValue == 1)
      ) {
         playerOneGameScoreElement.setAttribute("style", "display:block");
         playerTwoGameScoreElement.setAttribute("style", "display:block");
         playerOneGameScoreContainer.classList.remove("bg-oil");
         playerTwoGameScoreContainer.classList.remove("bg-oil");
      }
   }
   if (event.data.playerOneGameScore !== undefined) {
      playerOneGameScoreElement.innerText = event.data.playerOneGameScore;
   }
   if (event.data.playerOneMatchScore !== undefined) {
      playerOneMatchScoreElement.innerText = event.data.playerOneMatchScore;
   }
   if (event.data.playerTwoGameScore !== undefined) {
      playerTwoGameScoreElement.innerText = event.data.playerTwoGameScore;
   }
   if (event.data.playerTwoMatchScore !== undefined) {
      playerTwoMatchScoreElement.innerText = event.data.playerTwoMatchScore;
   }
};
