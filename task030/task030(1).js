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

    var flag = false;





    /*用户名*/
    $('name').onblur = check_name;
    function check_name () {
        var input_name = $('name').value;
        var re = /^[a-zA-Z0-9_]{4,16}$/; //^表示匹配字符开始的位子，$表示匹配字符串结束的位置，{4,16}表示4-16位
        flag = re.test(input_name.replace(/[\u0391-\uFFE5]/g, "yy")); //将汉字替换成两个字符
        if (flag)
        {
            this.style.borderColor = "green";
            $('h1').className = "visible right";
            $('hint-name').innerHTML = hint_text[0].right;
            hint_text[0].passed = true;
        }
        else
        {
            this.style.borderColor = "red";
            $('h1').className = "visible wrong";
            $('hint-name').innerHTML = hint_text[0].wrong;
            hint_text[0].passed = false;
        }
    }

    $('name').addEventListener("focus", function () {
        $('hint-name').innerHTML = hint_text[0].hint;
        $('hint-name').className = "hint-color";
        this.style.display = "table-row";
    });

    /*密码*/
    $('code').onblur = check_code;
    function check_code ()
    {
        var input_code = $('code').value;
        var re = /^\S{4,16}$/; //\S表示非空格，{4,16}表示4-16位
        flag = re.test(input_code);
        if (flag)
        {
            this.style.borderColor = "green";
            $('h2').className = "visible right";
            $('hint-code').innerHTML = hint_text[1].right;
            hint_text[1].passed = true;
        }
        else
        {
            this.style.borderColor = "red";
            $('h2').className = "visible wrong";
            $('hint-code').innerHTML = hint_text[1].wrong;
            hint_text[1].passed = false;
        }
    }

    $('code').addEventListener("focus", function () {
        this.value = "";
        $('hint-code').innerHTML = hint_text[1].hint;
        $('hint-code').className = "hint-color";
        this.style.display = "table-row";
    });

    /*确认密码*/
    $('re-code').onblur = check_code_repeat;
    function check_code_repeat()
    {
        if (this.value.length === 0)
        {
            this.style.borderColor = "red";
            $('h3').className = "visible wrong";
            $('re-hint-code').innerHTML = "密码为空";
            hint_text[2].passed = false;
            return;
        }
        flag = (this.value === $('code').value);
        if (flag)
        {
            this.style.borderColor = "green";
            $('h3').className = "visible right";
            $('re-hint-code').innerHTML = hint_text[2].right;
            hint_text[2].passed = true;
        }
        else
        {
            this.style.borderColor = "red";
            $('h3').className = "visible wrong";
            $('re-hint-code').innerHTML = hint_text[2].wrong;
            hint_text[2].passed = false;
        }
    }

    $('re-code').addEventListener("focus", function () {
        this.value = "";
        $('re-hint-code').innerHTML = hint_text[2].hint;
        $('re-hint-code').className = "hint-color";
        this.style.display = "table-row";
    });

    /*邮箱*/
    $('mail').onblur = check_mail;
    function check_mail()
    {
        var input_mail = $('mail').value;
        var re = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)]*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}/; //jiliangmason@163.com
        /*+代表至少1次，*代表0次或者多次，?代表0或者1次 ()是匹配子项的意思*/
        flag = re.test(input_mail);

        if (flag)
        {
            this.style.borderColor = "green";
            $('h4').className = "visible right";
            $('hint-mail').innerHTML = hint_text[3].right;
            hint_text[3].passed = true;
        }
        else
        {
            this.style.borderColor = "red";
            $('h4').className = "visible wrong";
            $('hint-mail').innerHTML = hint_text[3].wrong;
            hint_text[3].passed = false;
        }
    }

    $('mail').addEventListener("focus", function () {
        $('hint-mail').innerHTML = hint_text[3].hint;
        $('hint-mail').className = "hint-color";
        this.style.display = "table-row";
    });

    /*电话号码*/

    $('phone').onblur = check_phone;
    function check_phone()
    {
        var input_phone = $('phone').value;
        var re = /^([1])([358])([0-9]{9})$/;
        flag = re.test(input_phone);
        console.log(input_phone.match(re));

        if (flag)
        {
            this.style.borderColor = "green";
            $('h5').className = "visible right";
            $('hint-phone').innerHTML = hint_text[4].right;
            hint_text[4].passed = true;
        }
        else
        {
            this.style.borderColor = "red";
            $('h5').className = "visible wrong";
            $('hint-phone').innerHTML = hint_text[4].wrong;
            hint_text[4].passed = false;
        }
    }

    $('phone').addEventListener("focus", function () {
        this.value = "";
        $('hint-phone').innerHTML = hint_text[4].hint;
        $('hint-phone').className = "hint-color";
        this.style.display = "table-row";
    });

    $('submit').addEventListener("click", function (e) {
        e.preventDefault();

        check_name.call($('name'));
        check_code.call($('code'));
        check_code_repeat.call($('re-code'));
        check_mail.call($('mail'));
        check_phone.call($('phone'));

        var result = hint_text.every(function (item) {
            return item.passed;
        });

        if (result)
        {
            alert("提交成功");
        }
        else
        {
            alert("提交失败");
        }

    });

})();