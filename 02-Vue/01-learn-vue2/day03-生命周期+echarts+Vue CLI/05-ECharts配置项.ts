/*
  官网地址：<https://echarts.apache.org/handbook/zh/get-started>
 */

/**
  title：标题
  legend: {   // 图例：是图表中对内容区元素的注释，在一旁显示的单独图例，一般放在图表的右上角。
    orient: "horizontal",   // 水平排列
    right: 5,
    top: 10,
    data: ["", "", ...]  // 与series 中的name对应
  },
  xAxis: {   // x轴
    type: "category", // 轴类型：常用 category、value，当为 category 时，轴上显示data；当为 value时，不需要data，自动会从 series 中匹配数据
    data: ["A", "B", "C", "D", "E"]   // x轴上的title
    position: 'bottom'  // x轴的位置
    boundaryGap: false  // 将类目轴的boundaryGap设置为false，可以将 series 符号在轴线起点放置，即顶到头开始绘制
  },
  yAxis: {
    type: "value",
    axisLine: {   // 轴线是否显示
      show: false
    },
    splitArea: {  // 值类型轴默认不显示分隔区块，设置显示增强视觉效果
      show: false
    },
    axisTick: { // 设置轴刻度是否显示
      show: false
    },
    splitLine: {  // 值类型轴线的分隔线样式
      lineStyle: {
        type: "dashed"
      }
    },
    scale: true   // true：可以脱离0值比例，默认不脱离0值比例，即不从0开始显示刻度
  },
  grid: {   // 表格的区域位置，用于避免X、Y轴刻度被遮挡，不显示完整
    left: 80
  },
  series: [   // 系列数组，一个对象元素就是一个系列，一个系列就是一个完整的图表
    {
      name: '折线1',  // 系列名称用于匹配 legend
      type: "line",   // 系列图表的类型，即折线图
      data: [10, 22, 28, 23, 19],   // 系列数据，data 中的数据与 X/YAxis 的 data 一一对应
      color: red,   // 图表的颜色
      barWidth: 70,   // 设置图标柱子的宽度
      areaStyle: {}   // 配置图标样式
      markArea: {   // 在 category类目区间标记一段区域
        data: [[{ xAxis: "B" }, { xAxis: "D" }]]
      },
      markPoint: {  // 标记最大值最小值
        data: [{ type: "min" }, { type: "max" }]
      },
      markLine: {
        symbol: "none",
        data: [
          {
            type: "average" // 比较平均值
          }
        ]
      }
      smooth: true, // 设置折线图平滑
      lineStyle: {  // 线条样式
        color: "red",
        width: 3,
        type: "dashed"
      },
      label: {  // 设置在系列符号中显示值
        emphasis: { // emphasis 包裹属性可以使得鼠标 hover 时显示标签，不包裹属性则永久显示
          show: true,
          formatter: (params) => {  // 格式化显示的内容
            return `${params.name}:${params.data}`
          },
          rotate: -45,
          color: "black",
          fontSize: 14,
          position: "inside"
        }
      }
    }
  ],
  tooltip: {  // 鼠标移动上面时显示的内容，用于替代 series.label
    trigger: "axis",  // 为 axis 时，formatter的 params 为数组类型；为 item 时，formatter的 params 为对象类型
    formatter: (params) => {
      return params[0].name + "的值: <br>" + params[0].data + "个"
    }
  }

  堆积柱状图、堆积折线图，通过配置 series 中的系列对象元素 同名 stack 属性来实现。
  混合类型图，即 series 中多个系列元素的 type 不一致。

 */