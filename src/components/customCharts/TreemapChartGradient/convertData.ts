import * as echarts from "echarts";

// const visualMin = 0;
// const visualMax = 100;
// const visualMinBound = 20;
// const visualMaxBound = 80;
const visualMin = -100;
const visualMax = 100;
const visualMinBound = -40;
const visualMaxBound = 40;

interface TreeNode {
  name: string;
  id: string;
  value: number[];
  children?: TreeNode[];
}

export function convertData(_originList: TreeNode[], refIndex: number, refValue: number = 0) {
  const originList = [..._originList];
  let min = Infinity;
  let max = -Infinity;

  // value[2] : gradient color 기준 값
  // node 별 최대/최소 구하기
  for (let i = 0; i < originList.length; i++) {
    let node = originList[i];

    if (node) {
      let value = node.value;
      value[refIndex] != null && value[refIndex] < min && (min = value[refIndex]);
      value[refIndex] != null && value[refIndex] > max && (max = value[refIndex]);
    }
  }

  for (let i = 0; i < originList.length; i++) {
    let node = originList[i];
    if (node) {
      let value = node.value;
      // Scale value for visual effect
      if (value[refIndex] != null && value[refIndex] > refValue) {
        value[refIndex + 1] = echarts.number.linearMap(
          value[refIndex],
          [refValue, max],
          [visualMaxBound, visualMax],
          true
        );
      } else if (value[refIndex] != null && value[refIndex] < refValue) {
        value[refIndex + 1] = echarts.number.linearMap(
          value[refIndex],
          [min, refValue],
          [visualMin, visualMinBound],
          true
        );
      } else {
        value[refIndex + 1] = 0;
      }
      if (!isFinite(value[refIndex + 1])) {
        value[refIndex + 1] = 0;
      }
      if (node.children) {
        convertData(node.children, refIndex, refValue);
      }
    }
  }

  return originList;
}
