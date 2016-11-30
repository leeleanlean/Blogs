#Angular select下拉菜单#

##方式一

```
<select>
    <option ng-repeat="name in name" value="{{name}}">{{name}}</option>
</select>
```

##方式二

```
<select ng-model="" ng-options="x for x in name">
    <option value="">全部</option>
</select>
```

##区别

ng-repeat 指令是通过数组来循环 HTML 代码来创建下拉列表，但 ng-options 指令更适合创建下拉列表，它有以下优势：
使用 ng-options 的选项的一个对象， ng-repeat 是一个字符串。