// find letter in array
const findAll = (array, letter) => {
    let arr = [];
    array.forEach((el, ind) => {
        if (el === letter) {
            arr.push(ind);
        }
    })
    return arr;
}
export default findAll;