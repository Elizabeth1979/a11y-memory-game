import { pickRandomItems, shuffleArray } from "../../utils/array-utils";

export const prepareData = function(data) {
    const QandA = [];
    const randomQandA = pickRandomItems(data, 2);

    for (let i=0; i<randomQandA.length; i++) {
        let question = {
            id: Math.random(),
            type: "question",
            description: randomQandA[i].question,
            corresponding: randomQandA[i].id,
            match: false,
        }
        let answer = {
            id: Math.random(),
            type: "answer",
            description: randomQandA[i].answer,
            corresponding: randomQandA[i].id,
            match: false,
        }
        QandA.push(question);
        QandA.push(answer);
    }   
    const shuffledArr = shuffleArray(QandA);
    return shuffledArr.map((item, index) => {
        return item = {...item, cardNumber: index+1}
    });
}