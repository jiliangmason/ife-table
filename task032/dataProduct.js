/**
 * Created by Administrator on 2017/1/30.
 */
function DataProduct(data_box) {
    this.box = data_box;
    this.id = 0;
}

DataProduct.prototype.validator = {

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

};

DataProduct.prototype.addEvent = function () {
    //onEvent($('#data-create'), "change", this.show_table.bind(this));
    var self = this;
    $('#data-create').onchange = function (ev) {
        self.show_table(ev);
    };
    //onEvent(this.box.style_box.box, "change", this.set_style.bind(this));
    (self.box.style_box.box).onchange = function () {
        self.set_style();
    }
};

DataProduct.prototype.init = function () {
    this.addEvent();
};

DataProduct.prototype.show_table = function (e) { //这里的e并不是this，而是一个事件
    if (e.target.getAttribute('type') == 'radio')
    {
        e.target.parentNode.className = e.target.id;
        if (!/necessary/.test(e.target.id))  //如果被点击的radio的id不是necessary
        {
            this.box.label_box.box.value = e.target.nextElementSibling.textContent;
            //把类型框中选的radio的名字放在配置框的名称输入中
        }
    }
}; //该函数是当点击事件为radio时，将点击的radio事件的id名字赋给其父元素的className

DataProduct.prototype.get_text = function (data_box) {
    return data_box.box[data_box.value]; //$('#input-name')["value"] = "下拉框" ....
};

DataProduct.prototype.get_base_data = function (data) {
    data.label = this.get_text(this.box.label_box);
    data.type = this.get_text(this.box.type_box); //类型fieldset的className, 点击选择的时候会进行修改e.parentNode.className = e.target.id;
    data.necessary = this.get_text(this.box.necessary_box) == 'necessary';
    data.input_type = this.get_text(this.box.input_type_box); //rule_box --> className = text phone number...
    data.id = 'form' + this.id++; //表单的id--->表单展示区

    return data;
};

DataProduct.prototype.get_data = function () {
    var data = {
        label: "",  //标签名字
        type: "",   //表单类型
        necessary: true,  //是否必须选
        input_type: "",   //输入框类型
        min_length: 0,
        max_length: 1,
        default_text: "",  //获取焦点的默认提示
        sucess_text: "",   //输入正确的提示
        item: [],
        fail_text: [],
        id: 0,
        validator: function () {

        } //表单验证规则函数
    };

    data = this.get_base_data(data);
    switch (data.type)  //data为类型fieldset
    {
        case 'textarea':
            data = this.get_length_input_data(data);
            break;
        case 'input':
            switch (data.input_type)
            {
                case 'text':
                case 'code':
                    data = this.get_length_input_data(data);
                    break;
                case 'phone':
                case 'mail':
                case 'number':
                    data = this.get_relative_input_data(data);
                    break;
            }
            break;
        case 'radio':
            break;
        case 'select':
            break;
        case 'checkbox':
            data = this.get_special_input_data(data);
            break;
    }

    return data;
};

DataProduct.prototype.set_style = function () {
    var text = this.get_text(this.box.style_box);
    console.log(text);
    this.box.result_box.className = text == '样式一' ? 'style1' : 'style2';
}; //展示区的样式

DataProduct.prototype.add_form = function (data) {
    switch (data.type)
    {
        case 'input':
            this.add_inputform(data);
            break;
        case 'textarea':
            this.add_textarea(data);
            break;
        case 'radio':
            this.add_radioform(data);
            break;
        case 'checkbox':
            this.add_checkboxform(data);
            break;
        case 'select':
            this.add_selectform(data);
            break;
    }
};

/**************************************封装data*************************************************/
/*封装checkbox radio select的data*/
DataProduct.prototype.get_special_input_data = function (data) {
    var items = this.box.item_box[2];
    // item_box[2] = document.getElementsByClassName('item')
    // 这里的className = item在showTag.js中的show函数中设置
    // 表示用户输入添加的内容
    data.item = []; //将之前的item清空

    for (var i = 0; i < items.length; i++)
    {
        data.item.push(items[i].childNodes[1].data);
        //childNodes[1]: this.arr[i], arr[i]是由用户输入的内容数组
        // <span>点击删除</span>' + this.arr[i] + '</div>';
    }

    if (data.item.length == 0)
    {
        alert('还没有添加' + data.label + '选项'); //配置下面的input中的内容，如多选框等
        data = null;
    }

    else if (data.item.length == 1)
    {
        alert('你只添加了一个选项' + data.label + '无法创建多选框');
        data = null;
    }

    else
    {
        data.default_text = (data.necessary ? '必填' : '选填');
        data.fail_text = [data.label + '未选择'];
        data.sucess_text = data.label + "已选择";
        data.validator = this.validator[data.type]; //????validator[checkbox]
    }

    return data;
};

/*封装number phone email的data*/
DataProduct.prototype.get_relative_input_data = function (data) {
    data.input_type = this.get_text(this.box.input_type_box);  //rule-box[className] className = number phone mail...
    data.fail_text = [
        data.label + '不能为空',
        data.label + '格式不正确'
    ];     //data.label 是配置input的内容，这里是number email phone等

    data.success_text = data.label + '格式正确';
    data.default_text = (data.necessary ? '必填' : '选填');
    data.validator = this.validator[data.input_type]; //validator[number email phone...]

    return data;
};

/*封装text code textarea的data*/
DataProduct.prototype.get_length_input_data = function (data) {
    data.min_length = this.get_text(this.box.min_length_box);
    data.max_length = this.get_text(this.box.max_length_box);
    data.fail_text = [
        data.label + '不能为空',
        data.label + '长度不小于' + data.min_length + '个字符',
        data.label + '长度不超过' + data.max_length + '个字符'
    ];

    data.sucess_text = data.label + '格式正确';
    data.default_text = (data.necessary ? '必填' : '选填') + ',长度为' + data.min_length + '--' + data.max_length + '个字符';
    data.validator = this.validator.length_control; //对应了app.js里面的validator

    return data;
};
/**************************************封装data*************************************************/


/****************************向展示区中添加各种表单***********************************************/
/*添加input表单, number phone code mail text*/
DataProduct.prototype.add_inputform = function (data) {
    var box = document.createElement('div');
    box.innerHTML = '<label>' + data.label + '</label>' + '<input type = "'+ data.input_type +'" id = "'+ data.id +'"><span></span>';
    this.box.result_box.insertBefore(box, this.box.submit_form);
};

/*添加textarea表单*/
DataProduct.prototype.add_textarea = function (data) {
    var box = document.createElement('div');
    box.innerHTML = '<label>' + data.label + '</label><textarea id = "'+ data.id +'"></textarea><span></span>';
    this.box.result_box.insertBefore(box, this.box.submit_form);
};

/*添加radio单选框*/
DataProduct.prototype.add_radioform = function (data) {
    var box = document.createElement('div');
    var text = "";

    box.className = "radio_box";
    text += '<div id = "'+ data.id +'"><label class = "form-name">' + data.label +'</label>'; //<div id = "form4"><label class = "form-name">单选框</label>
    for (var i = 0; i < data.item.length; i++)
    {
        var item_id = data.id + '-' + i;
        text += '<input type = "radio" id = "'+ item_id +'" name = "'+ data.id +'"><label for = "'+ item_id +'">' + data.item[i] + '</label>';
        //<input type = "radio" id = "form4-0" name = "form4"><label for = "form4-0">星期天（这里是单选的输入内容）</label>
        //item[i]是每个item里面的内容
    }

    text += '</div><span></span>';
    box.innerHTML = text;
    this.box.result_box.insertBefore(box, this.box.submit_form);
};

/*添加checkbox多选框*/
DataProduct.prototype.add_checkboxform = function (data) {
    var box = document.createElement('div');
    var text = "";

    box.className = "radio_box";
    text += '<div id = "'+ data.id +'"><label class = "form-name">' + data.label +'</label>';

    for (var i = 0; i < data.item.length; i++)
    {
        var item_id = data.id + '-' + i;
        text += '<input type = "checkbox" id = "'+ item_id +'" name = "'+ data.id +'"><label for = "'+ item_id +'">' + data.item[i] + '</label>';
        //<input type = "radio" id = "form4-0" name = "form4"><label for = "form4-0">星期天（这里是单选的输入内容）</label>
    }

    text += '</div><span></span>';
    box.innerHTML = text;
    this.box.result_box.insertBefore(box, this.box.submit_form);

};

/*添加下拉框*/
DataProduct.prototype.add_selectform = function (data) {
    var box = document.createElement('div');
    var text = "";

    text += '<label>' + data.label + '</label><select id = "'+ data.id +'">';
    for (var i = 0; i < data.item.length; i++)
    {
        text += '<option>' + data.item[i] + '</option>';
    }

    text += '</select><span></span>';
    box.innerHTML = text;
    this.box.result_box.insertBefore(box, this.box.submit_form);
};
/****************************向展示区中添加各种表单***********************************************/