// - - - - - - - - - - - - - - - - - - - -
// Setup Broadcast Channel
// - - - - - - - - - - - - - - - - - - - -

const broadcast = new BroadcastChannel("ObsPool");

// - - - - - - - - - - - - - - - - - - - -
// Define Form Inputs
// - - - - - - - - - - - - - - - - - - - -

const scoringPanelForm = document.getElementById("matchControlPanel");
const p1NameInput = document.getElementById("playerOneName");
const p1CountryInput = document.getElementById("playerOneCountry");
const p1HandicapInput = document.getElementById("playerOneHandicap");
const p2NameInput = document.getElementById("playerTwoName");
const p2CountryInput = document.getElementById("playerTwoCountry");
const p2HandicapInput = document.getElementById("playerTwoHandicap");
const matchDisciplineInput = document.getElementById("discipline");
const matchSystemInput = document.getElementById("ratingSystem");
const matchTypeInput = document.getElementById("matchType");
const matchRaceInput = document.getElementById("raceTo");
const matchP1TargetInput = document.getElementById("playerOneRace");
const matchP2TargetInput = document.getElementById("playerTwoRace");
const resetButton = document.getElementById("resetMatch");
const restoreMatchButton = document.getElementById("restoreMatch");
const startMatchButton = document.getElementById("startMatch");
const endMatchButton = document.getElementById("endMatch");
const p1ScorePlusButton = document.getElementById("playerOneScorePlus");
const p1ScoreMinusButton = document.getElementById("playerOneScoreMinus");
const p1MatchPlusButton = document.getElementById("playerOneGamePlus");
const p1MatchMinusButton = document.getElementById("playerOneGameMinus");
const p2ScorePlusButton = document.getElementById("playerTwoScorePlus");
const p2ScoreMinusButton = document.getElementById("playerTwoScoreMinus");
const p2MatchPlusButton = document.getElementById("playerTwoGamePlus");
const p2MatchMinusButton = document.getElementById("playerTwoGameMinus");
const scoreboardTypeInput = document.getElementById("scoreboardType");

// - - - - - - - - - - - - - - - - - - - -
// Register Onchange Events on Form Elements
// - - - - - - - - - - - - - - - - - - - -

matchDisciplineInput.addEventListener("change", setDiscipline);
matchTypeInput.addEventListener("change", setMatchType);
scoreboardTypeInput.addEventListener("change", setScoreboardType);

// - - - - - - - - - - - - - - - - - - - -
// Register Buttons Event Listeners
// - - - - - - - - - - - - - - - - - - - -

// Attach to Reset Match Button
resetButton.addEventListener("click", function () {
   scoringPanelForm.reset();
   populateWebStorage();
});
// Attach to Restore Match Button
restoreMatchButton.addEventListener("click", function () {
   restoreMatchDataFromWebStorage();
});
// Attach to Start Match Button
startMatchButton.addEventListener("click", function (e) {
   e.preventDefault();
   if (localStorage.getItem("matchStatus") == "active") {
      updateMatchData();
   } else {
      startMatchButton.innerText = "Update Match";
      SetInitialMatchData();
      resetButton.setAttribute("disabled", "true");
      endMatchButton.removeAttribute("disabled");
   }
});
// Attach to End Match Button
endMatchButton.addEventListener("click", function (e) {
   e.preventDefault();
   endMatchButton.setAttribute("disabled", "");
   resetButton.removeAttribute("disabled");
   localStorage.setItem("matchStatus", "inactive");
   startMatchButton.innerText = "Start Match";
});
// Attach to Player 1 Game Score Increase Button
p1ScorePlusButton.addEventListener("click", function (e) {
   e.preventDefault();
   IncreasePlayerOneGameScore();
   broadcast.postMessage({
      playerOneGameScore: localStorage.getItem("playerOneGameScore"),
   });
});
// Attach to Player 1 Game Score Decrease Button
p1ScoreMinusButton.addEventListener("click", function (e) {
   e.preventDefault();
   DecreasePlayerOneGameScore();
   broadcast.postMessage({
      playerOneGameScore: localStorage.getItem("playerOneGameScore"),
   });
});
// Attach to Player 1 Match Score Increase Button
p1MatchPlusButton.addEventListener("click", function (e) {
   e.preventDefault();
   IncreasePlayerOneMatchScore();
   broadcast.postMessage({
      playerOneMatchScore: localStorage.getItem("playerOneMatchScore"),
   });
});
// Attach to Player 1 Match Score Decrease Button
p1MatchMinusButton.addEventListener("click", function (e) {
   e.preventDefault();
   DecreasePlayerOneMatchScore();
   broadcast.postMessage({
      playerOneMatchScore: localStorage.getItem("playerOneMatchScore"),
   });
});
// Attach to Player 1 Game Score Increase Button
p2ScorePlusButton.addEventListener("click", function (e) {
   e.preventDefault();
   IncreasePlayerTwoGameScore();
   broadcast.postMessage({
      playerTwoGameScore: localStorage.getItem("playerTwoGameScore"),
   });
});
// Attach to Player 1 Game Score Decrease Button
p2ScoreMinusButton.addEventListener("click", function (e) {
   e.preventDefault();
   DecreasePlayerTwoGameScore();
   broadcast.postMessage({
      playerTwoGameScore: localStorage.getItem("playerTwoGameScore"),
   });
});
// Attach to Player 1 Match Score Increase Button
p2MatchPlusButton.addEventListener("click", function (e) {
   e.preventDefault();
   IncreasePlayerTwoMatchScore();
   broadcast.postMessage({
      playerTwoMatchScore: localStorage.getItem("playerTwoMatchScore"),
   });
});
// Attach to Player 1 Match Score Decrease Button
p2MatchMinusButton.addEventListener("click", function (e) {
   e.preventDefault();
   DecreasePlayerTwoMatchScore();
   broadcast.postMessage({
      playerTwoMatchScore: localStorage.getItem("playerTwoMatchScore"),
   });
});

// - - - - - - - - - - - - - - - - - - - -
// Update Storage and Overlay with Initial Match Data
// - - - - - - - - - - - - - - - - - - - -

function SetInitialMatchData() {
   // Initialize
   let p1NameInputValue = p1NameInput.value;
   let p1CountryInputValue = p1CountryInput.value;
   let p1CountryImageValue = getCountryFlag(p1CountryInputValue);
   let p1HandicapInputValue = p1HandicapInput.value;
   let p2NameInputValue = p2NameInput.value;
   let p2CountryInputValue = p2CountryInput.value;
   let p2CountryImageValue = getCountryFlag(p2CountryInputValue);
   let p2HandicapInputValue = p2HandicapInput.value;
   let matchDisciplineInputValue = matchDisciplineInput.value; //? Do we need this here
   let matchSystemInputValue = matchSystemInput.value; //? Do we need this here
   let matchTypeInputValue = matchTypeInput.value;
   let matchRaceInputValue = matchRaceInput.value;
   let matchP1TargetValue = matchP1TargetInput.value;
   let p1GameScoreInputValue = 0;
   let p1MatchScoreInputValue = 0;
   let matchP2TargetValue = matchP2TargetInput.value;
   let p2GameScoreInputValue = 0;
   let p2MatchScoreInputValue = 0;
   let scoreboardTypeInputValue = scoreboardTypeInput.value;

   // Update LocalStorage
   localStorage.setItem("playerOneName", p1NameInputValue);
   localStorage.setItem("playerOneCountryInput", p1CountryInputValue);
   localStorage.setItem("playerOneCountryImage", p1CountryImageValue);
   localStorage.setItem("playerOneHandicap", p1HandicapInputValue);
   localStorage.setItem("playerOneGameScore", p1GameScoreInputValue);
   localStorage.setItem("playerOneMatchScore", p1MatchScoreInputValue);
   localStorage.setItem("playerTwoName", p2NameInputValue);
   localStorage.setItem("playerTwoCountryInput", p2CountryInputValue);
   localStorage.setItem("playerTwoCountryImage", p2CountryImageValue);
   localStorage.setItem("playerTwoHandicap", p2HandicapInputValue);
   localStorage.setItem("playerTwoGameScore", p2GameScoreInputValue);
   localStorage.setItem("playerTwoMatchScore", p2MatchScoreInputValue);
   localStorage.setItem("matchDiscipline", matchDisciplineInputValue);
   localStorage.setItem("matchRatingSystem", matchSystemInputValue);
   localStorage.setItem("matchType", matchTypeInputValue);
   localStorage.setItem("matchRace", matchRaceInputValue);
   localStorage.setItem("matchPlayerOneTarget", matchP1TargetValue);
   localStorage.setItem("matchPlayer2Target", matchP2TargetValue);
   localStorage.setItem("matchStatus", "active");
   localStorage.setItem("scoreboardType", scoreboardTypeInputValue);

   // Broadcast to Overlay
   broadcast.postMessage({
      playerOneNameValue: p1NameInputValue,
      playerOneCountryValue: p1CountryImageValue,
      playerOneHandicapValue: p1HandicapInputValue,
      playerTwoNameValue: p2NameInputValue,
      playerTwoCountryValue: p2CountryImageValue,
      playerTwoHandicapValue: p2HandicapInputValue,
      matchDisciplineValue: matchDisciplineInputValue,
      matchTypeValue: matchTypeInputValue,
      matchRaceValue: matchRaceInputValue,
      matchPlayerOneTargetValue: matchP1TargetValue,
      playerOneGameScore: p1GameScoreInputValue,
      playerOneMatchScore: p1MatchScoreInputValue,
      matchPlayerTwoTargetValue: matchP2TargetValue,
      playerTwoGameScore: p2GameScoreInputValue,
      playerTwoMatchScore: p2MatchScoreInputValue,
      scoreboardType: scoreboardTypeInputValue,
   });
}

function updateMatchData() {
   let p1NameInputValue = p1NameInput.value;
   let p1CountryInputValue = p1CountryInput.value;
   let p1CountryImageValue = getCountryFlag(p1CountryInputValue);
   let p1HandicapInputValue = p1HandicapInput.value;
   let p2NameInputValue = p2NameInput.value;
   let p2CountryInputValue = p2CountryInput.value;
   let p2CountryImageValue = getCountryFlag(p2CountryInputValue);
   let p2HandicapInputValue = p2HandicapInput.value;
   let matchDisciplineInputValue = matchDisciplineInput.value; //? Do we need this here
   let matchSystemInputValue = matchSystemInput.value; //? Do we need this here
   let matchTypeInputValue = matchTypeInput.value;
   let matchRaceInputValue = matchRaceInput.value;
   let matchP1TargetValue = matchP1TargetInput.value;
   let matchP2TargetValue = matchP2TargetInput.value;

   localStorage.setItem("playerOneName", p1NameInputValue);
   localStorage.setItem("playerOneCountryInput", p1CountryInputValue);
   localStorage.setItem("playerOneCountryImage", p1CountryImageValue);
   localStorage.setItem("playerOneHandicap", p1HandicapInputValue);
   localStorage.setItem("playerTwoName", p2NameInputValue);
   localStorage.setItem("playerTwoCountryInput", p2CountryInputValue);
   localStorage.setItem("playerTwoCountryImage", p2CountryImageValue);
   localStorage.setItem("playerTwoHandicap", p2HandicapInputValue);
   localStorage.setItem("matchDiscipline", matchDisciplineInputValue);
   localStorage.setItem("matchRatingSystem", matchSystemInputValue);
   localStorage.setItem("matchType", matchTypeInputValue);
   localStorage.setItem("matchRace", matchRaceInputValue);
   localStorage.setItem("matchPlayerOneTarget", matchP1TargetValue);
   localStorage.setItem("matchPlayer2Target", matchP2TargetValue);

   broadcast.postMessage({
      playerOneNameValue: localStorage.getItem("playerOneName"),
      playerOneCountryValue: localStorage.getItem("playerOneCountryImage"),
      playerOneHandicapValue: localStorage.getItem("playerOneHandicap"),
      playerTwoNameValue: localStorage.getItem("playerTwoName"),
      playerTwoCountryValue: localStorage.getItem("playerTwoCountryImage"),
      playerTwoHandicapValue: localStorage.getItem("playerTwoHandicap"),
      matchDisciplineValue: localStorage.getItem("matchDiscipline"),
      matchTypeValue: localStorage.getItem("matchType"),
      matchRaceValue: localStorage.getItem("matchRace"),
      matchPlayerOneTargetValue: localStorage.getItem("matchPlayerOneTarget"),
      matchPlayerTwoTargetValue: localStorage.getItem("matchPlayer2Target"),
   });
}

function restoreMatchDataFromWebStorage() {
   let p1NameInputValue = localStorage.getItem("playerOneName");
   let p1CountryInputValue = localStorage.getItem("playerOneCountryInput");
   let p1CountryImageValue = localStorage.getItem("playerOneCountryImage");
   let p1HandicapInputValue = localStorage.getItem("playerOneHandicap");
   let p2NameInputValue = localStorage.getItem("playerTwoName");
   let p2CountryInputValue = localStorage.getItem("playerTwoCountryInput");
   let p2CountryImageValue = localStorage.getItem("playerTwoCountryImage");
   let p2HandicapInputValue = localStorage.getItem("playerTwoHandicap");
   let matchDisciplineInputValue = localStorage.getItem("matchDiscipline"); //? Do we need this here
   let matchSystemInputValue = matchSystemInput.value;
   let matchTypeInputValue = localStorage.getItem("matchType");
   let matchRaceInputValue = localStorage.getItem("matchRace");
   let matchP1TargetValue = localStorage.getItem("matchPlayerOneTarget");
   let p1GameScoreInputValue = localStorage.getItem("playerOneGameScore");
   let p1MatchScoreInputValue = localStorage.getItem("playerOneMatchScore");
   let matchP2TargetValue = localStorage.getItem("matchPlayer2Target");
   let p2GameScoreInputValue = localStorage.getItem("playerTwoGameScore");
   let p2MatchScoreInputValue = localStorage.getItem("playerTwoMatchScore");

   //set form values
   p1NameInput.value = p1NameInputValue;
   p1CountryInput.value = p1CountryInputValue;
   p1HandicapInput.value = p1HandicapInputValue;
   p2NameInput.value = p2NameInputValue;
   p2CountryInput.value = p2CountryInputValue;
   p2HandicapInput.value = p2HandicapInputValue;
   matchDisciplineInput.value = matchDisciplineInputValue;
   matchSystemInput.value = matchSystemInputValue;
   matchTypeInput.value = matchTypeInputValue;
   matchRaceInput.value = matchRaceInputValue;
   matchP1TargetInput.value = matchP1TargetValue;
   matchP2TargetInput.value = matchP2TargetValue;

   //send values to scoreboard
   broadcast.postMessage({
      playerOneNameValue: p1NameInputValue,
      playerOneCountryValue: p1CountryImageValue,
      playerOneHandicapValue: p1HandicapInputValue,
      playerTwoNameValue: p2NameInputValue,
      playerTwoCountryValue: p2CountryImageValue,
      playerTwoHandicapValue: p2HandicapInputValue,
      matchDisciplineValue: matchDisciplineInputValue,
      matchTypeValue: matchTypeInputValue,
      matchRaceValue: matchRaceInputValue,
      matchPlayerOneTargetValue: matchP1TargetValue,
      playerOneGameScore: p1GameScoreInputValue,
      playerOneMatchScore: p1MatchScoreInputValue,
      matchPlayerTwoTargetValue: matchP2TargetValue,
      playerTwoGameScore: p2GameScoreInputValue,
      playerTwoMatchScore: p2MatchScoreInputValue,
   });
}

// - - - - - - - - - - - - - - - - - - - -
// Utility Functions
// - - - - - - - - - - - - - - - - - - - -

function setScoreboardType() {
   broadcast.postMessage({
      scoreboardType: scoreboardTypeInput.value,
   });
   if (scoreboardTypeInput.value == "standard") {
      p1CountryInput.removeAttribute("disabled");
      p2CountryInput.removeAttribute("disabled");
      p1HandicapInput.removeAttribute("disabled");
      p2HandicapInput.removeAttribute("disabled");
   } else if (scoreboardTypeInput.value == "simple") {
      p1CountryInput.setAttribute("disabled", "");
      p2CountryInput.setAttribute("disabled", "");
      p1HandicapInput.setAttribute("disabled", "");
      p2HandicapInput.setAttribute("disabled", "");
   }
}

function setDiscipline() {
   if (
      (matchDisciplineInput.value == "8") |
      (matchDisciplineInput.value == "9") |
      (matchDisciplineInput.value == "10")
   ) {
      p1ScorePlusButton.setAttribute("disabled", "");
      p1ScoreMinusButton.setAttribute("disabled", "");
      p2ScorePlusButton.setAttribute("disabled", "");
      p2ScoreMinusButton.setAttribute("disabled", "");
   } else if (
      (matchDisciplineInput.value == "14") |
      (matchDisciplineInput.value == "1")
   ) {
      p1ScorePlusButton.removeAttribute("disabled");
      p1ScoreMinusButton.removeAttribute("disabled");
      p2ScorePlusButton.removeAttribute("disabled");
      p2ScoreMinusButton.removeAttribute("disabled");
   } else {
      console.log("Ther is a problem with the Match Type Input");
   }
}
function setMatchType() {
   if (matchTypeInput.value == "straight") {
      matchP1TargetInput.setAttribute("disabled", "");
      matchP2TargetInput.setAttribute("disabled", "");
      matchRaceInput.removeAttribute("disabled");
   } else if (matchTypeInput.value == "handicapped") {
      matchP1TargetInput.removeAttribute("disabled");
      matchP2TargetInput.removeAttribute("disabled");
      matchRaceInput.setAttribute("disabled", "");
   } else {
      console.log("There is a problem with the Match Type Input");
   }
}

// Scoring
function IncreasePlayerOneGameScore() {
   let p1GameScore = localStorage.getItem("playerOneGameScore");
   p1GameScore == p1GameScore++;
   localStorage.setItem("playerOneGameScore", p1GameScore);
}
function DecreasePlayerOneGameScore() {
   let p1GameScore = localStorage.getItem("playerOneGameScore");
   p1GameScore == p1GameScore--;
   localStorage.setItem("playerOneGameScore", p1GameScore);
}
function IncreasePlayerOneMatchScore() {
   let p1MatchScore = localStorage.getItem("playerOneMatchScore");
   p1MatchScore == p1MatchScore++;
   localStorage.setItem("playerOneMatchScore", p1MatchScore);
}
function DecreasePlayerOneMatchScore() {
   let p1MatchScore = localStorage.getItem("playerOneMatchScore");
   p1MatchScore == p1MatchScore--;
   localStorage.setItem("playerOneMatchScore", p1MatchScore);
}
function IncreasePlayerTwoGameScore() {
   let p2GameScore = localStorage.getItem("playerTwoGameScore");
   p2GameScore == p2GameScore++;
   localStorage.setItem("playerTwoGameScore", p2GameScore);
}
function DecreasePlayerTwoGameScore() {
   let p2GameScore = localStorage.getItem("playerTwoGameScore");
   p2GameScore == p2GameScore--;
   localStorage.setItem("playerTwoGameScore", p2GameScore);
}
function IncreasePlayerTwoMatchScore() {
   let p2MatchScore = localStorage.getItem("playerTwoMatchScore");
   p2MatchScore == p2MatchScore++;
   localStorage.setItem("playerTwoMatchScore", p2MatchScore);
}
function DecreasePlayerTwoMatchScore() {
   let p2MatchScore = localStorage.getItem("playerTwoMatchScore");
   p2MatchScore == p2MatchScore--;
   localStorage.setItem("playerTwoMatchScore", p2MatchScore);
}

setDiscipline();
setMatchType();
