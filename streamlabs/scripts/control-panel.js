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
const matchDisciplineInput = [
   ...document.querySelectorAll("input[name='discipline']"),
];
const matchSystemInput = [...document.querySelectorAll("input[name='rating']")];
const matchTypeInput = [...document.querySelectorAll("input[name='match']")];
const matchRaceInput = document.getElementById("raceTo");
const matchP1TargetInput = document.getElementById("playerOneRace");
const matchP2TargetInput = document.getElementById("playerTwoRace");
const resetButton = document.getElementById("resetMatch");
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

let matchDisciplineValue = document.querySelector(
   "input[name='discipline']:checked"
).value;
let matchRatingSystemValue = document.querySelector(
   "input[name='rating']:checked"
).value;
let matchTypeValue = document.querySelector(
   "input[name='match']:checked"
).value;

// - - - - - - - - - - - - - - - - - - - -
// Register Onchange Events on Form Elements
// - - - - - - - - - - - - - - - - - - - -

// Watch for changes to Discipline
for (let i = 0; i < matchDisciplineInput.length; i++) {
   matchDisciplineInput[i].addEventListener("change", function (e) {
      if (e.target.checked) {
         matchDisciplineValue = e.target.value;
      }
      setDiscipline();
   });
}

// Watch for changes to Rating System
for (let i = 0; i < matchSystemInput.length; i++) {
   matchSystemInput[i].addEventListener("change", function (e) {
      if (e.target.checked) {
         matchRatingSystemValue = e.target.value;
      }
   });
}

// Watch for changes to Match Type
for (let i = 0; i < matchTypeInput.length; i++) {
   matchTypeInput[i].addEventListener("change", function (e) {
      if (e.target.checked) {
         matchTypeValue = e.target.value;
         console.log(matchTypeValue);
      }
      setMatchType();
   });
}

// - - - - - - - - - - - - - - - - - - - -
// Register Buttons Event Listeners
// - - - - - - - - - - - - - - - - - - - -

// Attach to Reset Match Button
resetButton.addEventListener("click", function () {
   scoringPanelForm.reset();
   populateWebStorage();
});
// Attach to Start Match Button
startMatchButton.addEventListener("click", function (e) {
   e.preventDefault();
   SetInitialMatchData();
   ToggleStartMatchButtonText();
   resetButton.setAttribute("disabled", "true");
   endMatchButton.removeAttribute("disabled");
});
// Attach to End Match Button
endMatchButton.addEventListener("click", function (e) {
   e.preventDefault();
   endMatchButton.setAttribute("disabled", "");
   resetButton.removeAttribute("disabled");
   localStorage.setItem("matchStatus", "inactive");
   ToggleStartMatchButtonText();
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
   // Update LocalStorage
   let p1NameInputValue = p1NameInput.value;
   let p1CountryInputValue = getCountryFlag(p1CountryInput.value);
   let p1HandicapInputValue = p1HandicapInput.value;
   let p2NameInputValue = p2NameInput.value;
   let p2CountryInputValue = getCountryFlag(p2CountryInput.value);
   let p2HandicapInputValue = p2HandicapInput.value;
   let matchDisciplineInputValue = document.querySelector(
      "input[name='discipline']:checked"
   ).value; //? Do we need this here
   let matchSystemInputValue = document.querySelector(
      "input[name='rating']:checked"
   ).value; //? Do we need this here
   let matchTypeInputValue = document.querySelector(
      "input[name='match']:checked"
   ).value;
   let matchRaceInputValue = matchRaceInput.value;
   let matchP1TargetValue = matchP1TargetInput.value;
   let p1GameScoreInputValue = 0;
   let p1MatchScoreInputValue = 0;
   let matchP2TargetValue = matchP2TargetInput.value;
   let p2GameScoreInputValue = 0;
   let p2MatchScoreInputValue = 0;

   localStorage.setItem("playerOneName", p1NameInputValue);
   localStorage.setItem("playerOneCountryImage", p1CountryInputValue);
   localStorage.setItem("playerOneHandicap", p1HandicapInputValue);
   localStorage.setItem("playerOneGameScore", p1GameScoreInputValue);
   localStorage.setItem("playerOneMatchScore", p1MatchScoreInputValue);
   localStorage.setItem("playerTwoName", p2NameInputValue);
   localStorage.setItem("playerTwoCountryImage", p2CountryInputValue);
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

   // Broadcast to Overlay
   broadcast.postMessage({
      playerOneNameValue: p1NameInputValue,
      playerOneCountryValue: p1CountryInputValue,
      playerOneHandicapValue: p1HandicapInputValue,
      playerTwoNameValue: p2NameInputValue,
      playerTwoCountryValue: p2CountryInputValue,
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

// Initialize
function setDiscipline() {
   if (
      (matchDisciplineValue == "8") |
      (matchDisciplineValue == "9") |
      (matchDisciplineValue == "10")
   ) {
      p1ScorePlusButton.setAttribute("disabled", "");
      p1ScoreMinusButton.setAttribute("disabled", "");
      p2ScorePlusButton.setAttribute("disabled", "");
      p2ScoreMinusButton.setAttribute("disabled", "");
   } else if ((matchDisciplineValue == "14") | (matchDisciplineValue == "1")) {
      p1ScorePlusButton.removeAttribute("disabled");
      p1ScoreMinusButton.removeAttribute("disabled");
      p2ScorePlusButton.removeAttribute("disabled");
      p2ScoreMinusButton.removeAttribute("disabled");
   } else {
      console.log("There is a problem with the Match Type Input");
   }
}
function setMatchType() {
   if (matchTypeValue == "straight") {
      matchP1TargetInput.setAttribute("disabled", "");
      matchP2TargetInput.setAttribute("disabled", "");
      matchRaceInput.removeAttribute("disabled");
   } else if (matchTypeValue == "handicapped") {
      matchP1TargetInput.removeAttribute("disabled");
      matchP2TargetInput.removeAttribute("disabled");
      matchRaceInput.setAttribute("disabled", "");
   } else {
      console.log("There is a problem with the Match Type Input");
   }
}

// Scoring
function ToggleStartMatchButtonText() {
   if (localStorage.getItem("matchStatus") != "active") {
      startMatchButton.innerText = "Start Match";
   } else if (localStorage.getItem("matchStatus") == "active") {
      startMatchButton.innerText = "Update Match";
   } else {
      alert("There is an issue determining match status");
   }
}
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
