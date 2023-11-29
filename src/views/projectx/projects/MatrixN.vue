<template>
  <div class="card">
    <div class="tools">
      <div class="circle">
        <span class="red box"></span>
      </div>
      <div class="circle">
        <span class="yellow box"></span>
      </div>
      <div class="circle">
        <span class="green box"></span>
      </div>
    </div>
    <div class="card__content">
      <div class="input-box">
        <div>
          <label for="jie">阶数：</label>
          <el-input-number
            id="jie"
            v-model="jie"
            @change="handleChange"
            controls-position="right"
            :min="1"
            step-strictly
          ></el-input-number>
          <label for="mi">幂次：</label>
          <el-input-number
            id="mi"
            v-model="mi"
            controls-position="right"
            step-strictly
          ></el-input-number>
        </div>

        <div class="origin-matrix" ref="origin-matrix"></div>
        <button>
          <span class="button_top" v-on:click="handlePro"> 计算 </span>
        </button>
      </div>
    </div>
  </div>

  <div class="mid-box"></div>

  <div class="card">
    <div class="tools">
      <div class="circle">
        <span class="red box"></span>
      </div>
      <div class="circle">
        <span class="yellow box"></span>
      </div>
      <div class="circle">
        <span class="green box"></span>
      </div>
    </div>
    <div class="card__content">
      <div class="res-matrix" ref="res-matrix"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jie: 3, //阶数
      mi: 3, //幂次
      matrix_doms: [],
      matrix: [[]],
      res_matrix: [[]],
    };
  },

  methods: {
    // 根据dom生成矩阵
    domsToMatrix: function (doms) {
      const len = doms.length;
      let matrix = this.initMatrix(len);
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
          const value = doms[i][j].value;
          if (value) {
            matrix[i][j] = value;
          } else {
            matrix[i][j] = 0;
          }
        }
      }
      return matrix;
    },
    //处理按钮事件
    handlePro: function () {
      this.matrix = this.domsToMatrix(this.matrix_doms);
      this.printMatrix(this.matrix);
      this.res_matrix = this.matrix_pow(this.matrix, this.mi);
      // this.printMatrix(this.res_matrix)
      this.matrixToDom(this.$refs["res-matrix"], this.res_matrix);
    },
    handleChange: function (c, o) {
      if (c > o) {
        this.expandMatrix(c - o);
      } else {
        this.cutMatrix(o - c);
      }
    },

    // 矩阵扩展
    expandMatrix: function (dif) {
      const len = this.matrix_doms.length;
      // 先扩行
      for (let i = 0; i < dif; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        let rowArr = [];
        for (let j = 0; j < len; j++) {
          let ele = this.createEle();
          row.appendChild(ele);
          rowArr.push(ele);
        }
        this.$refs["origin-matrix"].appendChild(row);
        this.matrix_doms.push(rowArr);
      }
      // 再扩列
      for (let i = 0; i < len + dif; i++) {
        for (let j = 0; j < dif; j++) {
          let ele = this.createEle();
          this.$refs["origin-matrix"].children[i].appendChild(ele);
          this.matrix_doms[i].push(ele);
        }
      }
    },

    // 矩阵剪裁
    cutMatrix: function (dif) {
      const len = this.matrix_doms.length;
      for (let i = 0; i < dif; i++) {
        this.$refs["origin-matrix"].children[len - 1 - i].remove();
        this.matrix_doms.pop();
      }
      for (let i = 0; i < len - dif; i++) {
        for (let j = 0; j < dif; j++) {
          this.$refs["origin-matrix"].children[i].children[
            len - 1 - j
          ].remove();
          this.matrix_doms[i].pop();
        }
      }
    },

    // 创建节点
    createEle: function () {
      let ele = document.createElement("input");
      ele.classList.add("ele");
      ele.setAttribute("type", "number");
      return ele;
    },

    // 渲染结果矩阵
    matrixToDom: function (obj, matrix) {
      const len = matrix.length;
      let inner = "";
      for (let i = 0; i < len; i++) {
        inner += "<div class='row'>";
        for (let j = 0; j < len; j++) {
          inner += `<input class='ele' disabled="true" value=${matrix[i][j]}>`;
        }
        inner += "</div>";
      }
      obj.innerHTML = inner;
    },

    //幂运算
    matrix_pow: function (matrix, n) {
      const len = matrix.length;
      if (n == 0) {
        return this.eMatrix(matrix);
      }
      if (n < 0) {
        matrix = this.rotateMatrix(matrix);
        n = Math.abs(n);
      }

      let t = this.cpMatrix(matrix);
      let res = this.cpMatrix(matrix);
      for (let i = 1; i < n; i++) {
        for (let j = 0; j < len; j++) {
          for (let k = 0; k < len; k++) {
            let sum = 0;
            for (let m = 0; m < len; m++) {
              sum += t[j][m] * matrix[m][k];
            }
            res[j][k] = sum;
          }
        }
        t = this.cpMatrix(res);
      }
      return res;
    },

    // 单位矩阵
    eMatrix: function (matrix) {
      const len = matrix.length;
      let e = this.initMatrix(len);
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
          if (i == j) {
            e[i][j] = 1;
          } else {
            e[i][j] = 0;
          }
        }
      }
      return e;
    },
    // 转秩矩阵
    rotateMatrix: function (matrix) {
      const len = matrix.length;
      let rotatedMatrix = this.initMatrix(len);
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
          rotatedMatrix[i][j] = matrix[len - 1 - j][i];
        }
      }
      return rotatedMatrix;
    },

    // 复制数组
    cpMatrix: function (arr) {
      return arr.map((ary) => {
        return [...ary];
      });
    },

    // 初始化数组
    initMatrix: function (n) {
      return Array.from(Array(n), () => new Array(n));
    },

    // 打印矩阵
    printMatrix: function (arr) {
      console.log("#####################");
      const len = arr.length;
      for (let i = 0; i < len; i++) {
        let s = "";
        for (let j = 0; j < len; j++) {
          s += arr[i][j] + " ";
        }
        console.log(s);
      }
      console.log("#####################");
    },
  },

  mounted() {
    this.expandMatrix(this.jie);
  },
};
</script>

<style lang="less" scoped>
#app {
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: wrap;
  padding: 0 100px;
}

.input-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 30px;
  transition: 1s;
}

.origin-matrix {
  margin: 20px 0;
}

.res-matrix {
  min-width: 300px;
  min-height: 400px;
}

.el-input-number {
  width: 100px;
}

.row {
  margin: 20px;
  white-space: nowrap;
}

.ele {
  width: 40px !important;
  height: 40px !important;
  margin: 0 10px;
}

/* 按钮样式 */
button {
  /* Variables */
  --button_radius: 0.75em;
  --button_color: #e8e8e8;
  --button_outline_color: #000000;
  font-size: 17px;
  font-weight: bold;
  border: none;
  border-radius: var(--button_radius);
  background: var(--button_outline_color);
}

.button_top {
  display: block;
  box-sizing: border-box;
  border: 2px solid var(--button_outline_color);
  border-radius: var(--button_radius);
  padding: 0.75em 1.5em;
  background: var(--button_color);
  color: var(--button_outline_color);
  transform: translateY(-0.2em);
  transition: transform 0.1s ease;
}

button:hover .button_top {
  /* Pull the button upwards when hovered */
  transform: translateY(-0.33em);
}

button:active .button_top {
  /* Push the button downwards when pressed */
  transform: translateY(0);
}

/* 卡片样式 */
.card {
  margin: 50px auto;
  background-color: #f8fbfe;
  border-radius: 8px;
  z-index: 1;
}

.tools {
  display: flex;
  align-items: center;
  padding: 9px;
}

.circle {
  padding: 0 4px;
}

.box {
  display: inline-block;
  align-items: center;
  width: 10px;
  height: 10px;
  padding: 1px;
  border-radius: 50%;
}

.red {
  background-color: #ff605c;
}

.yellow {
  background-color: #ffbd44;
}

.green {
  background-color: #00ca4e;
}
</style>