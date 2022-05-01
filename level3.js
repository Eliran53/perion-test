const fs = require('fs')

function transform(file) {
	try {
		fs.readFile(file, 'utf8', (err, data) => {
			if (err) {
				console.error(err)
				return
			}
			const arrayOfData = data?.split('\r\n')?.filter(row => row?.replace(/\s/g, ''))
			const transformData = arrayOfData.map(rowOfData => {
				const rowArray = rowOfData?.replaceAll(' ', ';')?.split(';')
					?.filter(char => char.length > 1 || !isNaN(char))?.filter(char => char)
				if (!isNaN(rowArray[0])) {
					const {description, lastString} = createDescription(rowArray)
					const row = createRow(rowArray, description, lastString)
					return row
				}
			}).filter(finalData => finalData)
			return transformData
		})
	} catch (error) {
		console.error(error)
	}
}

function createRow(rowArray, description, lastString) {
	const row = {
		description: description.trim(),
		classifier: rowArray[0]?.replaceAll('.', '')?.replace(' ', ''),
		openingBalance: parseFloat(rowArray[lastString + 1]?.replace(/\D/g, '')),
		debit: parseFloat(rowArray[lastString + 2]?.replace(/\D/g, '')),
		credit: parseFloat(rowArray[lastString + 3]?.replace(/\D/g, '')),
		finalBalance: parseFloat(rowArray[lastString + 4]?.replace(/\D/g, '')),
		parent: rowArray[lastString + 5]?.replace(' ', '') || null
	}
	return row
}
function createDescription(rowArray) {
	let lastString = 0
	const description = rowArray.reduce((finalDescription, char, i) => {
		if (i > 0 && !parseFloat(char) && char != 0) {
			finalDescription = finalDescription?.concat(' ', char)
			lastString = i
		}
		return finalDescription
	}, '')
	return {description, lastString}
}
//edit file name to run other file

transform('level3.txt')
