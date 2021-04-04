function errors(errors) {
    return errors.reduce((acc, cv) => {
      if (cv.path in acc) {
        acc[cv.path].push(cv.message);
      } else {
        acc[cv.path] = [cv.message];
      }
    
      return acc;
    }, {});
}

export default errors;
