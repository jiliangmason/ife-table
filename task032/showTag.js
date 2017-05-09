/**
 * Created by Administrator on 2017/1/31.
 */
function ShowTag(ipt, box) {
    this.arr = [];
    this.box = box;
    this.ipt = ipt; //用户输入框，随便输
    this.length = 100; //显示tag的最大数目
}

/*为数组去掉重复选项*/
ShowTag.prototype.trim = function () {
    var i,j;
    for (i = 0; i < this.arr.length; i++)
    {
        for (j = i + 1; j < this.arr.length; j++)
        {
            if (this.arr[j] == this.arr[i])
            {
                this.arr.splice(j, 1);
                j--; //整体少了一个
            }
        }
    }

    while (this.arr.length > this.length)
    {
        this.arr.shift();
    }

    this.show();
    return this;
}; //为对象去掉重复的元素


/*显示标签*/
ShowTag.prototype.show = function () {
    var text = "";
    for (var i = 0; i < this.arr.length; i++)
    {
        text += '<div data-num = "'+ i +'" class = "item"><span>点击删除</span>' + this.arr[i] + '</div>';
    }

    this.box.innerHTML = text; //this.box = <span></span>
    return this;
};


/*将用户输入添加到arr数组中*/
ShowTag.prototype.add = function () {
    var str = this.ipt.value.split(/[ ,、，\n\t]/);
    for (var i = 0; i < str.length; i++)
    {
        var item = str[i];
        if (item != '')
        {
            this.arr.push(item);
        }
    }

    this.trim();
    return this;
};

/*删除元素*/
ShowTag.prototype.deleteEvent = function (e) {
    var item = e.target.className == 'item' ? e.target : e.target.parentNode.className == 'item' ? e.target.parentNode : null;
    //有可能直接点在div上也有可能点在span标签上
    if (item == null)
    {
        return 0;
    }

    this.arr.splice(item.getAttribute('data-num'), 1);
    this.show();
};


/*获取用户输入数组*/
ShowTag.prototype.getData = function () {
    return this.arr;
};

/************类式继承***********/
function Tagipt(tag_ipt, tag_box) {
    ShowTag.call(this, tag_ipt, tag_box);
}

var inherit = function () {

};

inherit.prototype = ShowTag.prototype;
Tagipt.prototype = new inherit();
Tagipt.prototype.constructor = Tagipt;
/**********类式继承************/

Tagipt.prototype.init = function () {
    var self = this;
    this.box.onclick = function (ev) {
        self.deleteEvent(ev);
    };

    this.ipt.onkeyup = function (ev) {
        if (ev.keyCode == 188 || ev.keyCode == 32 || ev.keyCode == '13')
        {
            self.add();
        }
    };

   this.ipt.onkeydown = function (ev) {
        if (ev.keyCode == '13')
       {
            ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
       }
    }
};