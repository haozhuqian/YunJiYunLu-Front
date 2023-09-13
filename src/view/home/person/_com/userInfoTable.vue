<style scoped lang="scss">
@import '@/style/tool';

.userInfoTable {
  position: relative;
  overflow: hidden;
  margin: 20px 0;
  width: 90%;
  min-width: 920px;
  height: 90%;
  border: var(--color-showy) 1px solid;
  border-radius: 4px;

  .userInfoNames {
    position: absolute;
    right: 0;
    left: 0;

    @include flex(row);

    border-bottom: var(--color-showy) 1px solid;
    background-color: var(--color-showy);

    .infoName,
    .controllerName {
      flex: 1 1 10%;
      line-height: 28px;
      text-align: center;
      color: var(--color-primary);
    }

    .infoName {
      border-right: var(--color-primary) 1px solid;
    }
  }

  .userInfoList {
    position: absolute;
    overflow-x: hidden;
    overflow-y: overlay;
    inset: 28px 0 0;

    .userInfos {
      @include flex(column, space-between);

      .baseInfo {
        height: 28px;

        @include flex(row, space-between);

        .userInfo,
        .controller {
          flex: 1 1 10%;
          line-height: 28px;
          text-align: center;
        }

        .userInfo {
          border-right: var(--color-showy) 1px solid;
          border-bottom: var(--color-showy) 1px solid;
        }

        .controller {
          @include flex(row, center, center);

          border-bottom: var(--color-showy) 1px solid;
        }
      }

      .detailsInfo {
        @include flex(row, start);

        display: none;
        background-color: var(--color-main);
        flex-wrap: wrap;

        .details {
          margin: 5px 0;
          width: 25%;
          height: 24px;
          text-align: center;
          transition: height 0.3s ease-in-out;

          @include flex(row, start);

          .name {
            padding: 0 5px;
            line-height: 24px;
            border-right: var(--color-least) 1px solid;
          }

          .info {
            padding: 0 5px;
            line-height: 24px;
          }
        }
      }

      .showDetailsInfo {
        display: flex;
        height: auto;
        border-bottom: var(--color-showy) 1px solid;
      }
    }

    .userInfoFooter {
      position: absolute;
      right: 0;
      left: 0;

      @include flex(row);

      border-bottom: var(--color-showy) 1px solid;
      // background-color: var(--color-showy);
      .pageNumber {
        position: relative;
        left: 50%;
        transform: translateX(-50%);

        @include flex(row);

        div {
          margin: 5px;
          width: 30px;
          height: 30px;
          text-align: center;
          border: var(--color-showy) 1px solid;
          border-radius: 5px;
          line-height: 30px;
        }

        .disabled {
          background-color: #c0c4cc;
          pointer-events: none;
        }

        .changedPageBtn {
          color: white;
          background-color: var(--color-medium);
        }
      }

      .perPageDataNumber {
        position: relative;
        right: 10px;
        padding: 0;
        margin: auto 0;

        input {
          width: 4em;
          height: 2em;
        }

        .perPageNumberBtn {
          position: absolute;
          top: 0;
          right: 0;
          display: flex;
          padding: 0;
          margin: 0;
          flex-direction: column;

          .btnAdd {
            padding: 0;
            margin: 0;
            width: 2em;
            height: 1em;
            text-align: center;
            line-height: 1em;
          }

          .btnReduce {
            padding: 0;
            margin: 0;
            width: 2em;
            height: 1em;
            text-align: center;
            line-height: 1em;
          }
        }

        input[type='number']::-webkit-inner-spin-button,
        input[type='number']::-webkit-outer-spin-button {
          -webkit-appearance: none;
        }
      }
    }
  }

  .userInfoList::-webkit-scrollbar {
    width: 0;
  }
}
</style>

<template>
  <div class="userInfoTable">
    <!-- 表头 -->
    <div class="userInfoNames">
      <div class="infoName" v-for="name in baseInfo" :key="name">
        {{ infoName[name] }}
      </div>
      <div class="controllerName">操作</div>
    </div>
    <!-- 内容 -->
    <div class="userInfoList">
      <div class="userInfos" v-for="(userInfo, index) in infoList" :key="index">
        <!-- 基础信息 -->
        <div class="baseInfo">
          <div class="userInfo" v-for="name in baseInfo" :key="name">
            {{ userInfo[name] }}
          </div>
          <div class="controller">
            <button @click="showDetails(index)" v-if="userInfo.name">
              {{ index === detailInfoIndex && isDetailShow ? '关闭' : '详情' }}
            </button>
            <button @click="deleteUser(index)" v-if="userInfo.name">
              删除
            </button>
          </div>
        </div>
        <!-- 详细信息 -->
        <div
          class="detailsInfo"
          :class="{
            showDetailsInfo: index === detailInfoIndex && isDetailShow,
          }"
        >
          <div class="details" v-for="(name, key) in infoName" :key="name">
            <div class="name">{{ name }}:</div>
            <div class="info">{{ userInfo[key] }}</div>
          </div>
        </div>
      </div>
      <!-- 页码切换以及每页数据条数设置 -->
      <div class="userInfoFooter">
        <!-- 页码跳转 -->
        <div class="pageNumber">
          <div @click="curPage = 0" :class="{ disabled: curPage <= 0 }">
            &lt;&lt;
          </div>
          <!-- 向前跳转及设置页码上限 -->
          <div
            @click="curPage > 0 ? curPage-- : curPage"
            :class="{ disabled: curPage <= 0 }"
          >
            &lt;
          </div>
          <!-- 循环生成页码 -->
          <div
            v-for="item in pageArray"
            :key="item"
            :class="{ changedPageBtn: isPageNumber(item) }"
            @click="changeCurPageNumber(item)"
          >
            {{ item }}
          </div>
          <!-- 向后跳转及页码下限 -->
          <div
            @click="
              curPage < Math.floor(searchReasult.length / pageNumber)
                ? curPage++
                : curPage
            "
            :class="{
              disabled:
                curPage >= Math.floor(searchReasult.length / pageNumber),
            }"
          >
            >
          </div>
          <div
            @click="curPage = Math.floor(searchReasult.length / pageNumber)"
            :class="{
              disabled:
                curPage >= Math.floor(searchReasult.length / pageNumber),
            }"
          >
            >>
          </div>
        </div>
        <!-- 每页数据量设置 -->
        <div class="perPageDataNumber">
          <input type="number" v-model="pageNumber" />
          <div class="perPageNumberBtn">
            <button class="btnAdd" @click="pageNumber++">+</button>
            <button class="btnReduce" @click="pageNumber--">-</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import searchReasult from '../_store/searchReasult';
import { infoName, baseInfo } from '../_store/infoName';
//每一页面数据量，设置每一个页面展示多少条数据
const pageNumber = ref(10);
//当前页码
const curPage = ref(0);
//生成当前页面要展示的数据列表
const infoList = computed(() => {
  const data = ref(
    searchReasult.slice(
      0 + curPage.value * pageNumber.value,
      pageNumber.value + curPage.value * pageNumber.value,
    ),
  );
  //如果数据不够就补全
  if (data.value.length < pageNumber.value) {
    for (let i = data.value.length; i < pageNumber.value; i++) {
      data.value.push({
        name: '',
        gender: '',
        age: '',
        birthday: '',
        number: '',
        phone: '',
        grade: '',
        direction: '',
        major: '',
        class: '',
        email: '',
      });
    }
  }
  return data.value;
});
//侦听每一页面的数据量，如果目前页面在更改后无数据，则跳转到最后一页有数据的页面
watch(pageNumber, (pageNumber) => {
  if (curPage.value > Math.floor(searchReasult.length / pageNumber)) {
    curPage.value = Math.floor(searchReasult.length / pageNumber);
  }
});
//页码生成
const pageArray = ref(Math.ceil(searchReasult.length / pageNumber.value));
//点击页码进行跳转
const changeCurPageNumber = (item: number) => {
  curPage.value = item - 1;
};
//为当前页码对应的div块设置样式
const isPageNumber = (item: number) => {
  return item - 1 == curPage.value;
};

const showDetails = (index: number) => {
  detailInfoIndex.value = index;
  isDetailShow.value = !isDetailShow.value;
};

let deleteInfo = [];

//是否展示详情页
const isDetailShow: Ref<boolean> = ref(false);

//删除某人信息时将对应数据删除，并临时储存被删除的信息
const deleteUser = (index: number) => {
  const deletedItem = searchReasult.splice(index, 1);
  deleteInfo.push(deletedItem[0]);
};
//详细信息页展示的信息对象
const detailInfoIndex = ref(0);
</script>
