const debounce = <F extends (...args: any[]) => void>(func: F, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
        const context = this;

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
};

export default debounce;
