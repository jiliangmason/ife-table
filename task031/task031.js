/**
 * Created by Administrator on 2017/1/28.
 */
var SelectShow = (function () {

    var city_and_college = [
        ["艾欧尼亚", "北京大学", "清华大学", "上海交通大学", "浙江大学"],
        ["均衡教派", "Harvard University", "Yale University", "University of Cambridge", "Oxford University"],
        ["黑色玫瑰", "STANFORD University", "University of Chicago", "Massachusetts Institute of Technology"],
        ["诺克萨斯", "Duke University", "University of Pennsylvania", "California Institute of Technology"],
        ["德玛西亚", "Columbia University", "princeton University", "University of California, Berkeley"],
        ["班德尔城", "南京大学", "华南理工大学", "中国科学院大学", "国防科技大学"]
    ];

    function show_college(city, school) {
        var first_node = school.firstElementChild;
        while (first_node)
        {
            school.removeChild(first_node);
            first_node = school.firstElementChild;
        }
        var len = city_and_college[city.selectedIndex].length;
        var option_node;
        for (var i = 0; i < len - 1; i++)
        {
            option_node = document.createElement('option');
            option_node.innerHTML = city_and_college[city.selectedIndex][i + 1];
            school.appendChild(option_node);
        }
    }

    return {
        show_college: show_college
    };
})();


    document.getElementById('radio-box').onclick = function () {
        var arr_radio = document.getElementsByClassName('radio');
        for (var i = 0; i < arr_radio.length; i++)
        {
            if (arr_radio[i].checked)
            {
                if (arr_radio[i].value == "student")
                {
                    var city_name = document.getElementById('city');
                    var school_name = document.getElementById('school');
                    SelectShow.show_college(city_name, school_name);
                    document.getElementById('select-box').className = "visible";
                    document.getElementById('input-box').className = "hidden";
                    break;
                }
                else
                {
                    document.getElementById('select-box').className = "hidden";
                    document.getElementById('input-box').className = "visible";
                    break;
                }
            }
        }

    };

    document.getElementById('city').onclick = function () {
        //alert("changed!");
        var arr_radio = document.getElementsByClassName('radio');
        if (arr_radio[0].checked) {
            var school_name = document.getElementById('school');
            SelectShow.show_college(this, school_name);
        }
    };


