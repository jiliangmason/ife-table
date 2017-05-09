/**
 * Created by Administrator on 2017/1/31.
 */
function Form (data) {
    this.data = data;
    this.ipt = document.getElementById(data.id);  //展示区中的input textarea div select部分
    this.tip = this.ipt.nextElementSibling;  //就是</textarea><span></span>这里的<span></span>
    this.validator = data.validator; //这是为什么app.js中validator所有属性的this都代表Form对象！！！！
    this.init();
}

Form.prototype.init = function () {
    var self = this;
    this.ipt.onfocus = function () {
        self.default_tip();
    };

    this.ipt.onblur = function () {
        self.validator();
    };

    this.ipt.onchange = function () {
        self.validator();
    };
};

Form.prototype.default_tip = function () {
    this.tip.innerHTML = this.data.default_text;
    this.tip.className = 'default';
    this.ipt.className = 'default';
};

Form.prototype.true_tip = function () {
    this.tip.innerHTML = this.data.sucess_text;
    this.tip.className = 'true';
    this.ipt.className = 'true';
};

Form.prototype.error_tip = function (i) {
    this.tip.innerHTML = this.data.fail_text[i];
    this.tip.className = 'error';
    this.ipt.className = 'error';
};