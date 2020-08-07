// The _prompt object below manages standard input and output.
const _prompt = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// The object diseases below accepts Object keys with arrays as values. Add more diseases with their symptoms here to provide more questions to the user...
const diseases = {
  Syphilis: [
    "A rash on your reproductive organs",
    "Fatigue",
    "Fever",
    "Weight Loss",
    "Hair loss",
    "Joint pain",
  ],

  Chlymydia: [
    "pain or discomfort during sex or urination",
    "green or yellow discharge from the penis or vagina",
    "pain in the lower abdomen",
  ],

  Gonorrhea: [
    "a white, yellow, beige, or green-colored discharge from the penis or vagina",
    "pain or discomfort during sex or urination",
    "more frequent urination than usual",
    "itching around the genitals",
    "sore throat",
  ],
};

// The function analytics below accepts user's symptoms then determines what disease they might be suffering from based on the max and min symptom occurence.
function analytics(data) {
  const _diseases = Object.keys(diseases); // Holds the names of all diseases registered on the const diseases above.
  let metrics = {}; // Holds the final score for each disease based on the user's symptoms {Gonorrhea: 3, Syphillis: 2}
  
  // The loop below analyzes the user's symptoms and determines the total occurrence for each specific disease above.
  for (let x = 0; x < _diseases.length; x += 1) {
    let occurences = 0;
    for (let i = 0; i < data.length; i += 1) {
      if (diseases[_diseases[x]].indexOf(data[i]) > -1) {
        occurences += 1;
      }
    }

    metrics[_diseases[x]] = occurences;
  }

  // The final result and the probable illness is determined based on the max value from the metrics object.
  const _metricValues = Object.values(metrics);
  const max = Math.max(..._metricValues);
  const min = Math.min(..._metricValues);
  const maxIndex = _metricValues.findIndex((element) => element === max);
  const minIndex = _metricValues.findIndex((element) => element === min);
  console.log(
    "-----------------------------------------------------------------------------------"
  );
  console.log("You final analysis:\n");
  console.log(metrics);

  if (metrics[_diseases[maxIndex]] > 0 && max !== min) {
    console.log(
      `\nYou most likely have ${_diseases[maxIndex]} and ${
        Object.keys(diseases).length > 2 ? "least" : "less"
      } likely have ${_diseases[minIndex]}`
    );
  } else if (max > 0 && max === min) {
    console.log(
      `\nSorry we cannot determine you current ailment. You probably suffer from ${_diseases[maxIndex]}`
    );
  } else {
    console.log(`\nNo Symptom set. You are probably just paranoid...`);
  }
}

// The function shuffler below takes an Object whose keys hold arrays as values.
function shuffler(diseases) {
  const namespaces = Object.keys(diseases); // This here extracts the names of all registered diseases.
  let symptoms = []; // This here stores the final and comprehensive list of symptoms (randomized and duplicates filtered)

  // The loop below fetch symptoms from all diseases and stores them on a single list symptoms
  for (let i = 0; i < namespaces.length; i += 1) {
    symptoms.push(...diseases[namespaces[i]]);
  }
  
  // The loop below randomizes the stored symptoms
  for (let i = 0; i < symptoms.length; i += 1) {
    let wildCard = Math.floor(Math.random() * (i + 1));

    let temp = symptoms[i];
    symptoms[i] = symptoms[wildCard];
    symptoms[wildCard] = temp;
  }

  // The invocation below filters the randomized symptom list and removes duplicates
  symptoms = symptoms.filter(
    (value, index) => symptoms.indexOf(value) === index
  );

  return symptoms;
}

// These are depencies for the next function prompt
let count = 0; // Utilized to manage the invocation of the function prompt as a recursive loop
const symptoms = shuffler(diseases); // Shuffles (Randomizes and Removes Duplicates) all the symptoms from all the diseases.
const activeSymptoms = []; // Stores the final symptoms selected by the user

// The function prompt is responsible for questioning the user based on the current symptoms (Manages STDOUT & STDIN)
function prompt() {
  _prompt.question(`Have you noticed ${symptoms[count]}? `, (answer) => {
    if (
      String(answer).toUpperCase() === "exit".toUpperCase() ||
      count === symptoms.length - 1
    ) {
      _prompt.close(); // Exits the prompt 
      return analytics(activeSymptoms);
    } else {
      if (String(answer).toUpperCase() === "Y") {
        activeSymptoms.push(symptoms[count]);
      }

      count += 1;
      prompt(); // Recursive invocation of this function incase the user didn't answer with exit or incase there are some pending questions for the user
    }
  });
}

// The main function also the entry for this program.
function main() {
  console.log("This is your personal doctor");
  console.log(
    "-----------------------------------------------------------------------------------"
  );
  console.log(
    `Below are some common Symptoms for the diseases ${Object.keys(
      diseases
    ).join(
      ", "
    )}.\nKindly answer the questions with a Y for YES, and Enter for NO to get a complete analysis.\nType exit when you're ready to quit.`
  );
  console.log(
    "-----------------------------------------------------------------------------------"
  );
  prompt();
}

main(); // The main invocation to run this program
