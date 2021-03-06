const fs = require('fs')
const dbHandler = require('./mongoDB')


function transform(file) {
	try {
		fs.readFile(file, 'utf8', (err, data) => {
			if (err) {
				console.error(err)
				return
			}
			const arrayOfData = data?.split('\r\n')?.filter(row => row?.replace(/\s/g, ''))
			const transformData = arrayOfData.map(rowOfData => {
				const rowArray = rowOfData?.replaceAll('  ', ';')?.split(';')?.filter(char => char)
				if (rowArray) {
					const row = createRow(rowArray)
					return row
				}
			})
            dbHandler.insertToCollection(transformData)
		})
	} catch (error) {
		console.error(error)
	}
}

function createRow(rowArray) {
	const row = {
		description: rowArray[1]?.trim(),
		classifier: rowArray[0]?.replaceAll('.', '')?.replace(' ', ''),
		openingBalance: parseFloat(rowArray[2]?.replace(/\D/g, '')),
		debit: parseFloat(rowArray[3]?.replace(/\D/g, '')),
		credit: parseFloat(rowArray[4]?.replace(/\D/g, '')),
		finalBalance: parseFloat(rowArray[5]?.replace(/\D/g, '')),
		parent: rowArray[6]?.trim() || null
	}
	return row
}
//edit file name to run other file
transform('level2.txt')

