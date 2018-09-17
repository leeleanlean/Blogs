# leelean - npm package

### Github



## 组件

### row
横向容器组件，宽度默认 100%
```
<l-row></l-row>
```

### col
纵向容器组件
#### 参数
* span: Number
一行拆分为12列，一列宽度为 col-1

```
<l-row>
	<l-col :span="6"></l-col>
	<l-col :span="6"></l-col>
	<l-col :span="6"></l-col>
</l-row>

```

### flex
#### 参数
* direction: String
<br>
横向、纵向排列
<br>
value: row | row-reverse | column | column-reverse;

* wrap: String
<br>
超出是否换行
<br>
value: nowrap | wrap | wrap-reverse;

* justify-content: String
<br>
横轴的对齐方式
<br>
value: flex-start | flex-end | center | space-between | space-around;

* align-items: String
<br>
纵轴的对齐方式
<br>
value: flex-start | flex-end | center | baseline | stretch;

* align-content: String
<br>
多横轴情况下，对齐方式
<br>
value: flex-start | flex-end | center | space-between | space-around | stretch;

```
<l-flex
  :option="{
    'justify-content': 'space-between'
  }">
  <l-flex>
    <l-col><img src="img.jpg"></l-col>
    <l-col>
      <p class="title">蓝蓝的天空</p>
      <p class="sub-title">这是我滴家，我爱你我滴家</p>
    </l-col>
  </l-flex>
  <l-col>></l-col>
</l-flex>

```
