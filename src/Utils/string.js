const decamelize = (separator) => {
	separator = typeof separator === 'undefined' ? '_' : separator;

	return (str) => str.replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
        .toLowerCase();
}

const decamelizeWithSpace = decamelize(' ');

// console.log(decamelizeWithSpace('someLabelThatNeedsToBeCamelized'));

const toTitleCase = (phrase) => phrase.toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
let result = toTitleCase('maRy hAd a lIttLe LaMb');
// console.log(result);

// console.log(toTitleCase(decamelizeWithSpace('someLabelThatNeedsToBeCamelized')));

export {decamelizeWithSpace, toTitleCase};