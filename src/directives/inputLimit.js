import Vue from 'vue';
const isLastPoint = str => str.indexOf('.') === str.length - 1;

const checkEmpty = (str, e) => {
    let isEmpty = Number(str) === 0;
    let cls = ['empty-msg-input-border'];
    if (isEmpty) {
        e.target.setAttribute('data-_null', true);
        e.target.parentNode.classList.add(...cls);
    } else {
        e.target.removeAttribute('data-_null');
        e.target.parentNode.classList.remove(...cls);
    }
    return isEmpty;
};

const matchValue = (str, len = 2) => {
    let reg = new RegExp(`^\\d+(?:\\.\\d{1,${len}})?`);
    if (isLastPoint(str)) {
        return str;
    } else {
        let result = str.match(reg);
        return result ? result[0] : '';
    }
};

const matchCurrency = str => {
    let result = str.match(/^[A-Z]+/);
    return result ? result[0] : '';
};

function handler(e, binding) {
    let targeValue = e.target.value;
    let result = '';
    let { value, arg } = binding;
    if (arg === 'currency') {
        result = matchCurrency(targeValue);
    } else {
        result = value && typeof value === 'function' ? value(targeValue) : matchValue(targeValue, arg);
    }
    if (value && value.allowZero === true) {
        return result;
    }
    checkEmpty(result, e);
    return result;
}

Vue.directive('input-limit', {
    bind(el, binding, vnode) {
        const element = el.getElementsByTagName('input')[0];
        element.addEventListener('input', function(e) {
            let value = handler(e, binding);
            e.target.value = value;
            vnode.data.model.callback(value);
        });
        element.addEventListener('blur', function(e) {
            let { arg } = binding;
            if (arg === 'currency') return;
            if (!binding.value || !binding.value.allowZero) {
                if (checkEmpty(e.target.value, e)) return;
            }
            let value = parseFloat(e.target.value || 0).toFixed(binding.arg || 2);
            e.target.value = value;
            vnode.data.model.callback(value);
        });
    }
});
