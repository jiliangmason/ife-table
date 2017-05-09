/**
 * Created by Administrator on 2017/1/26 0026.
 */
(function () {
    var hint_text = [{hint: "必填，长度为4-16位字符", right: "名称格式正确", wrong: "名称格式有错误", passed: false},
        {hint: "必填，长度为4-16位字符，包含字母和数字", right: "密码可用", wrong: "密码不可用", passed: false},
        {hint: "必填，必须于密码相同", right: "密码输入一致", wrong: "密码输入不一致", passed: false},
        {hint: "填写正确的邮箱格式", right: "邮箱格式正确", wrong: "邮箱格式错误", passed: false},
        {hint: "必填，长度为4-16位字符", right: "手机格式正确", wrong: "手机格式不正确", passed: false}
    ];

    var $ = function (obj) {
      return document.getElementById(obj);
    };

    var inputs = document.getElementsByTagName('input');
    
})();