const debounce = (func: Function, wait: number) => {
  let timeout: number;
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
};

export default debounce;
