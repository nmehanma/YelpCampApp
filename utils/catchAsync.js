// func is what is passed in and this returns a new function that has func executed and catches any errors that passes it to next referenced in the index.js file to replace the try catch method

module.exports = func => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  }
}
