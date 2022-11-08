(function setup() {
    let mutationRate = 0.1;
    let populationSize = 10;
    let generations = 2;
    let crossoverRate = 0.7;
    const RULE_SIZE = 5;
    const NUMBER_OF_RULES = 2;
    const INDIVIDUAL_SIZE = (RULE_SIZE * NUMBER_OF_RULES) + NUMBER_OF_RULES;

    run();

    function run() {
        fetch('./data1.json')
            .then((response) => response.json())
            .then((result) => {
                geneticAlgorithm(result, populationSize, generations, crossoverRate,
                    mutationRate, RULE_SIZE, NUMBER_OF_RULES, INDIVIDUAL_SIZE);
            })
    }

})()

function geneticAlgorithm(data, populationSize, generations, crossoverRate,
    mutationRate, RULE_SIZE, NUMBER_OF_RULES, INDIVIDUAL_SIZE) {

    let population, tempPopulation, bestIndividual, dataArray;
    dataArray = formatData(data);
     console.log(dataArray);

    // tempPopulation = [[1,2,3],[2,3,4]]
    population = generatePopulation(populationSize, RULE_SIZE, NUMBER_OF_RULES, INDIVIDUAL_SIZE);
    console.log("start population", JSON.stringify(population));

    population = evaluatePopulation(population, tempPopulation, RULE_SIZE, dataArray, INDIVIDUAL_SIZE);
    console.log("Evaluated population", JSON.stringify(population));
}

function evaluatePopulation(population, tempPopulation, RULE_SIZE, data, INDIVIDUAL_SIZE) {
    let individual;
    if (tempPopulation) {
        population = copyArray(tempPopulation);
    }
    // Calculate fitness for population array
    for (let i = 0; i < population.length; i++) {
        population[i][INDIVIDUAL_SIZE] = calculateFitness(population[i], RULE_SIZE, data);
    }

    // if BestIndividual > best in pop copy best individual
    // else update best individual
    return population;
}

function calculateFitness(individual, RULE_SIZE, data) {
    // finish this!!!!!!!!!!!!!!
    let fitness = 0, rulesArray;
    rulesArray = getIndividualRules(individual, RULE_SIZE);


    for (let i = 0; i < data.length; i++) {

        ruleIsMatch(data[i], rulesArray)
      
    }
    return fitness;
}
function ruleIsMatch(data, rules) {
    let match = true;
    let index, rule, ruleLength;
    // convert string to numbers
 
    // get inputs for data and rule

    // get outputs for data and rule

    for (let i = 0; i < rules.length; i++) {
        rule = rules[i];
     //   console.log("data ", data)
      //  console.log("rule", rule)
        ruleLength = rule.length;
        // Check inputs match
        for (let j = 0; j < rule.length - 1; j++) {
            if ((rule[j] != 2) && (data[j] != rule[j])) {
          //      console.log("Inputs do not match");
                return false;
            }
        }

        // Check if outputs match
        if (rule[ruleLength] != data[ruleLength]) {
        //    console.log("Outputs do no match");
            return false;
        }
      //  console.log("Outputs Match")
        return true;

    }
}

function getIndividualRules(individual, RULE_SIZE) {
    let rules = [], rule = [], count = 0;

    for (let i = 0; i < individual.length; i++) {
        rule[count] = individual[i];
        if (count > 0 && count % RULE_SIZE == 0) {
            rules.push(rule);
            rule = []
            count = 0;
        } else {
            count++
        }
    }
    //   console.log(rules)
    return rules;
}

function copyArray(array) {
    return [...array];
}

function generatePopulation(populationSize, RULE_SIZE, NUMBER_OF_RULES, INDIVIDUAL_SIZE) {
    let pop = [];
    let individual, count, rand;
    for (let i = 0; i < populationSize; i++) {
        individual = [];
        count = 0;
        for (let j = 0; j < INDIVIDUAL_SIZE; j++) {
            if (count > 0 && count % RULE_SIZE == 0) {
                rand = getRandomInt(0, 1);
                count = 0;
            } else {
                rand = getRandomInt(0, 2);
                count++;
            }
            individual[j] = rand;
        }
        pop[i] = individual;
    }
    return pop;
}

function formatData(data) {
    let dataArray = [];
    for (let i = 0; i < data.length; i++) {
        data[i] = data[i].replace(/\s/g, '');
        dataArray[i] = Array.from(data[i]);
    }

    for (let i = 0; i < dataArray.length; i++) {
        dataArray[i] = dataArray[i].map(str => parseInt(str, 10))
    }
    return dataArray;
}

function getRandom() {
    return Math.random();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max + min + 1) + min);
}