const passwordRegex = /^(?=.*\d)(?=.*[\W])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

module.exports = passwordRegex;
