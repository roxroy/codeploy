const formattedDate = (theDate) => {
	const date = new Date(theDate);
	return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
}

module.exports = {
	formattedDate
}
