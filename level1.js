const fs = require('fs')

function transform(file) {
	try {
		fs.readFile(file, 'utf8', (err, data) => {
			if (err) {
				console.error(err)
				return
			}
			const arrayOfData = data.split('\n')
			const transformData = arrayOfData?.map(rowOfData => {
				const rowArray = rowOfData?.replaceAll('  ', ',')?.split(',')?.filter(row => row)
				const row = createRow(rowArray)
				return row
			})
			return transformData
		})
	} catch (error) {
		console.error(error)
	}
}

function createRow(rowArray) {
	const row = {
		description: rowArray[1],
		classifier: rowArray[0],
		openingBalance: parseInt(rowArray[2]),
		debit: parseInt(rowArray[3]),
		credit: parseInt(rowArray[4]),
		finalBalance: parseInt(rowArray[5]),
		parent: rowArray[6] || null
	}
	return row
}

transform('level1.txt')

