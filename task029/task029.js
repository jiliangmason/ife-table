/**
 * Created by Administrator on 2017/1/25 0025.
 */
(function () {
    var input_name = document.getElementsByClassName('input')[0];
    var info = document.getElementsByClassName('text-under')[0];

    document.getElementsByClassName('verify')[0].onmousedown = validate;

    function validate() {
        var input_value = input_name.value.trim();
        if (verify_length(input_value) == 0)
        {
            info.innerHTML = "姓名不能为空";
            info.className = "text-under info-red";
            input_name.className = "input input-red";
        }
        else if (verify_length(input_value) >= 4 && verify_length(input_value) <= 16)
        {
            info.innerHTML = "格式正确";
            info.className = "text-under info-green";
            input_name.className = "input input-green";
        }
        else
        {
            info.innerHTML = "请输入长度为4-16位字符";
            info.className = "text-under info-red";
            input_name.className = "input input-red";
        }
    }

    function verify_length(input_value) {
        var input_length = 0;
        for (var i = 0; i < input_value.length; i++)
        {
            var count_code = input_value.charCodeAt(i); //charCodeAt返回unicode编码 0~128为数字字母
            if (count_code >= 0 && count_code <=128)
            {
                input_length += 1;
            }
            else
            {
                input_length += 2;
            }
        }

        return input_length;
    }

})();