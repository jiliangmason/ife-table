/**
 * Created by Administrator on 2017/1/29.
 */

function $(id) {
    return document.querySelector(id);
}

function onEvent(ele, ev, listener) {
    if (ele.addEventListener)
    {
        ele.addEventListener(ev, listener, false);
    }
    else if (ele.attachEvent)
    {
        ele.attachEvent("on" + ev, listener);
    }
    else
    {
        ele["on" + ev] = listener;
    }
}

var data_box = {

    style_box:
    {
        box: $('#config-style'),   //样式一，样式二
        value: 'value'
    },

    type_box:
    {
        box: $('#type-box'),      //类型fieldset ：输入框、单选框、多选框、下拉框、文本域
        value: 'className'
    },

    label_box:
    {
        box: $('#input-name'),    //配置下的label ：名称
        value: 'value'
    },

    necessary_box:
    {
        box: $('#config-box'),   //配置的fieldset
        value: 'className'
    },

    input_type_box:
    {
        box: $('#rule-box'),  //规则fieldset: 文字 数字 邮箱 电话 密码
        value: 'className'
    },

    item_box:
        [
            $('#option-input'),  //选项fieldset下的输入框
            $('#box-item-show'),
            document.getElementsByClassName('item')
        ],

    min_length_box:
    {
        box: $('#min-length'),  //数据输入最小长度
        value: 'value'
    },

    max_length_box:
    {
        box: $('#max-length'),  //数据输入最大长度
        value: 'value'
    },

    add_btn: $('#btn-add'),    //在展示区添加按钮
    result_box: $('#result'),  //展示区的form
    submit_form: $('#submit')  //展示区提交表单按钮
};
/*
    var validator =
    {
        'length_control' : function () {
            min_length = this.data.min_length;
            max_length = this.data.max_length;
            var text = this.ipt.value;
            if (text == '')
            {
                if (this.data.necessary)
                {
                    this.error_tip(0);
                }
                else
                {
                    this.default_tip();
                    return true;
                }
            }
            else
            {
                var pattern = /[\x00-\xff]/;
                var pattern1 = /[^\x00-\xff]/;
                var pattern_g1 = /[^\x00-\xff]/g;
                var pattern_g = /[\x00-\xff]/g;
                var total;
                if (pattern.test(text)) //如果有非汉字或者全角字符
                {
                    total = text.match(pattern_g).length; //该匹配返回所有非汉字的数组
                }
                else
                {
                    total = 0;
                }

                if (pattern1.test(text))
                {
                    total += text.match(pattern_g1).length*2;
                }
                else
                {
                    total += 0;
                }

                if (total < min_length)
                {
                    this.error_tip(1);
                }
                else if (total > max_length)
                {
                    this.error_tip(2);
                }
                else
                {
                    this.true_tip();
                    return true;
                }

            }

            return false;

        },

        'number': function () {
            var text = this.ipt.value; //text是输入框 这里的this？ ipt 也是Form的对象的属性
            if (text == '')
            {
                if (this.data.necessary) //同ipt
                    this.error_tip(0); //Form的对象才可以用error_tip,this ?= new Form()
                else
                {
                    this.default_tip();
                    return true;
                }
            }
            else
            {
                if (/^\d+$/.test(text))
                {
                    this.true_tip();
                    return true;
                }
                else
                {
                    this.error_tip(1);
                }
            }

            return false;
        }, /*error_tip: 0 不能为空 1 格式不正确*/
/*
        'email': function () {
            var text = this.ipt.value;
            if (text == '')
            {
                if (this.necessary)
                    this.error_tip(0);
                else
                {
                    this.default_tip();
                    return true;
                }
            }
            else
            {
                if (/^[0-9a-z]+([._\\-]*[a-z0-9])*@([a-z0-9]+[a-z0-9]+.){1,63}[a-z0-9]+$/.test(text))
                {
                    this.true_tip();
                    return true;
                }
                else
                {
                    this.error_tip(1);
                }
            }
            return false;
        },

        'phone': function () {
            var text = this.ipt.value;
            if (text == '')
            {
                if (this.necessary)
                {
                    this.error_tip(0);
                }
                else
                {
                    this.default_tip();
                    return true;
                }
            }
            else
            {
                if (/^[1][358][0-9]{9}$]/.test(text))
                {
                    this.true_tip();
                    return true;
                }
                else
                {
                    this.error_tip(1);
                }
            }

            return false;
        },

        'radio': function () {
            var item = $('#' + this.data.id).getElementsByTagName('input');
            for (var i = 0; i < item.length; i++)
            {
                if (item[i].checked)
                {
                    this.true_tip();
                    return true;
                }
            }
            if (this.data.necessary)
            {
                this.error_tip(0);
            }
            else {
                this.default_tip();
                return true;
            }

            return false;
        },

        'select': function () {
            this.true_tip();
            return true;
        },

        'checkbox': function () {
            var children = this.ipt.children;
            for (var i in children)
            {
                if (children[i].checked)
                {
                    this.true_tip();
                    return true;
                }
            }
            if (this.data.necessary)
            {
                this.error_tip(0);
            }
            else
            {
                this.default_tip();
                return true;
            }

            return false;
        }

    }*/


var form_arr = [];
var data_product = null;
var tagIpt;

data_product = new DataProduct(data_box);
tagIpt = new Tagipt(data_box.item_box[0], data_box.item_box[1]);
data_product.init();
tagIpt.init();
    onEvent(data_product.box.add_btn, 'click', function () {

        var data = data_product.get_data();
        if (data != null) {
            data_product.add_form(data);
            form_arr.push(new Form(data));
            if (data.type == 'radio' || data.type == 'checkbox') {
                form_arr[form_arr.length - 1].default_tip();
            }
        }
    })





/*    onEvent(data_box.submit_form, 'click', function () {
        var text = '';
        for (var i = 0; i < form_arr.length; i++) {
            text += (form_arr[i].validator() == true) ? '' : form_arr[i].tip.textContent + '\n';
        } //所有的data_box都会验证一遍

        text == '' ? alert('提交成功') : alert(text);
    });
*/

