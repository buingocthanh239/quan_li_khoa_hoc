function Validate(formSelector) {
    /**
     *   function lấy ra thẻ cha
     * element : thẻ mà hàm gọi nó đang đứng
     * selector: là selector của parent muốn tìm đến
     *
     */
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }
    /**
     * lưu các rules của các input dưới dạng object input.name: rules :
     * rules ở đây lưu là 1 function
     */
    var formRules = {};

    /**
     * Quy ước rules:
     * - Nếu có lỗi thì return `error message`
     * - Nếu không có lỗi thì sẽ return `undefined`
     */
    // tạo các function rules
    var validateRules = {
        required: function (value) {
            return value ? undefined : `vui lòng nhập trường này`;
        },

        email: function (value) {
            var regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regx.test(value) ? undefined : 'Trường này phải là email';
        },

        min: function (min) {
            return function (value) {
                return value.length >= min
                    ? undefined
                    : `Vui lòng nhập ít nhất ${min} kí tự `;
            };
        },

        max: function (max) {
            return function (value) {
                return value.length <= max
                    ? undefined
                    : `Vui lòng nhập tối đa ${max} kí tự `;
            };
        },
        // chỉnh sửa rule confirm
        confirm: function (nameConfirmed) {
            return function (value) {
                var valueConfirm = formElement.querySelector(
                    'input[name="' + nameConfirmed + '"]',
                ).value;
                return value === valueConfirm
                    ? undefined
                    : `Giá trị nhập vào không chính xác `;
            };
        },
    };

    // lấy ra form element trong DOM theo `formSelector`
    var formElement = document.querySelector(formSelector);

    // chỉ sử lí khi có element trong DOM
    if (formElement) {
        // lấy các rule ra theo attribute
        var inputs = formElement.querySelectorAll('[name][rules]');
        for (var input of inputs) {
            var rules = input.getAttribute('rules').split('|');
            var ruleInfo;

            for (var rule of rules) {
                // sử lí quy ước truyền vào
                var isRuleHasValue = rule.includes(':');
                if (isRuleHasValue) {
                    ruleInfo = rule.split(':');
                    rule = ruleInfo[0];
                }

                var ruleFunc = validateRules[rule];

                if (isRuleHasValue) {
                    ruleFunc = ruleFunc(ruleInfo[1]);
                }

                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc);
                } else {
                    formRules[input.name] = [ruleFunc];
                }
            }

            // lắng nghe sự kiện để validate (blur, change, ...)
            input.onblur = handleValidate;
            input.oninput = handleClearError;
        }

        /**
         * mặc định mỗi element của form sẽ có 1 class='form-group' làm thẻ cha
         * thẻ hiện thị lỗi sẽ có class='form-message' để hiện thị lỗi
         */
        // hàm thực hiện validate
        function handleValidate(event) {
            var rules = formRules[event.target.name];
            var errorMessage;

            for (var i = 0; i < rules.length; i++) {
                errorMessage = rules[i](event.target.value);
                if (errorMessage) break;
            }

            // nếu có lỗi thì hiện thị lỗi ra UI
            if (errorMessage) {
                var formGroup = getParent(event.target, '.form-group');

                if (formGroup) {
                    formGroup.classList.add('invalid');
                    var formMessage = formGroup.querySelector('.form-message');

                    if (formMessage) {
                        formMessage.innerText = errorMessage;
                    }
                }
            }
            return !errorMessage;
        }

        // clear lỗi khi thõa mãn điều kiện
        function handleClearError(event) {
            var formGroup = getParent(event.target, '.form-group');
            if (formGroup.classList.contains('invalid')) {
                formGroup.classList.remove('invalid');

                var formMessage = formGroup.querySelector('.form-message');

                if (formMessage) {
                    formMessage.innerText = '';
                }
            }
        }

        // xử lí hành vi submit
        formElement.onsubmit = function (event) {
            event.preventDefault();
            var isVali = true;

            for (input of inputs) {
                if (!handleValidate({ target: input })) {
                    isVali = false;
                }
            }
            // khi không có lỗi thì submit form
            if (isVali) {
                formElement.submit();
            }
        };
    }
    // console.log(formRules);
}

// tiếp tục hoàn thành lib
