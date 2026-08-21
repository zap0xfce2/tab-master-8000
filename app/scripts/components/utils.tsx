const sanitizeRegex = /[^a-z0-9]/gi;

export const whichToShow = function({outerHeight, itemHeight, scrollTop, columns}): VisibleRange {
  let start = Math.floor(scrollTop / itemHeight);
  let heightOffset = scrollTop % itemHeight;
  let length = Math.ceil((outerHeight + heightOffset) / itemHeight) * columns;

  return {
    start,
    length,
  }
}

export const unref = function(object: object, ms = 0) {
  setTimeout(() => {
    let keys = Object.keys(object);

    for (let i = 0; i < keys.length; i++) {
      object[keys[i]] = null;
    }
  }, ms);
};

export const sanitizeTitle = (str: string): string => {
  return str.replace(sanitizeRegex, '').charAt(0).toUpperCase();
};
