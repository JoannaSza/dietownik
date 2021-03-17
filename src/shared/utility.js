export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const omit = (obj, omitKey) => {
  return Object.keys(obj).reduce((result, key) => {
    if (key !== omitKey) {
      result[key] = obj[key];
    }
    return result;
  }, {});
};

export const sortByDate = (arr) => {
  const sorter = (a, b) => {
    return new Date(a) - new Date(b);
  };
  return arr.sort(sorter);
};

export const checkValidity = (value, rules) => {
  let valid = true;
  let ruleValid = true;
  let errorMsg = '';
  if (!rules) {
    return { valid: true, errorMsg };
  }

  if (rules.required) {
    ruleValid = value.trim() !== '';
    valid = ruleValid && valid;
    errorMsg = !ruleValid ? errorMsg + 'To pole jest wymagane. ' : errorMsg;
  }

  if (rules.minLength) {
    ruleValid = value.length >= rules.minLength;
    valid = ruleValid && valid;
    errorMsg = !ruleValid
      ? errorMsg + `Minimalna ilość znaków: ${rules.minLength}. `
      : errorMsg;
  }

  if (rules.maxLength) {
    ruleValid = value.length <= rules.maxLength;
    valid = ruleValid && valid;
    errorMsg = !ruleValid
      ? errorMsg + `Maksymalna ilość znaków: ${rules.maxLength}. `
      : errorMsg;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    ruleValid = pattern.test(value);
    valid = ruleValid && valid;
    errorMsg = !ruleValid
      ? errorMsg + `Podaj prawidłowy adres email. `
      : errorMsg;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    ruleValid = pattern.test(value);
    valid = ruleValid && valid;
    errorMsg = !ruleValid ? errorMsg + `Podaj wartość numeryczną. ` : errorMsg;
  }
  return { valid, errorMsg };
};

export const correctEndOfLineWords = (sentence) => {
  const sentenceWords = sentence.split(' ');
  let newSentence = '';
  sentenceWords.forEach((el, index) => {
    if (el.length <= 2 && index !== sentenceWords.length - 1)
      newSentence += el + '\xa0';
    else if (index === sentenceWords.length - 1) newSentence += el;
    else newSentence += el + ' ';
  });
  return newSentence;
};
