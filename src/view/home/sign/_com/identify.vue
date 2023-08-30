<style scoped lang="scss"></style>

<template>
  <div class="identify">
    <canvas id="canvas" ref="canvasRef"></canvas>
    <div id="output">
      <div>{{ outputData }}</div>
    </div>
    <button @click="identify">{{ IsOpenCamera ? '关闭相机' : '扫码' }}</button>
  </div>
</template>

<script lang="ts" setup>
//识别静态二维码的库
import jsQR from 'jsqr';
import { QRCode } from 'jsqr';

type Point = { x: number; y: number };
type Area = {
  topLeftCorner: Point;
  topRightCorner: Point;
  bottomRightCorner: Point;
  bottomLeftCorner: Point;
};

const outputData = ref('这里');
const IsOpenCamera = ref(false);
const canvasRef = ref<HTMLCanvasElement>();
let canvasContext: CanvasRenderingContext2D;
let video: HTMLVideoElement;
let mStream: MediaStream;

onMounted(() => {
  canvasRef.value = canvasRef.value as HTMLCanvasElement;
  canvasRef.value.height = props.size;
  canvasRef.value.width = props.size;
});

const identify = () => {
  if (IsOpenCamera.value) {
    closeCamera(canvasContext);
  } else {
    canvasContext = canvasRef.value?.getContext('2d', {
      willReadFrequently: true,
    }) as CanvasRenderingContext2D;
    openCamera(canvasContext);
  }
};

const openCamera = (canvas: CanvasRenderingContext2D) => {
  props.beforeOpen(canvas);
  video = document.createElement('video');
  //getUserMedia的参数表示尽量使用后置摄像头（如果没有只能用前置）
  navigator.mediaDevices
    .getUserMedia({
      video: {
        facingMode: 'environment',
        width: { ideal: props.size },
        height: { ideal: props.size },
      },
    })
    .then(
      (stream) => {
        IsOpenCamera.value = true;
        mStream = stream;
        video.srcObject = stream;
        video.setAttribute('playsinline', ''); // 拒绝全屏，值的内容不重要，只要存在这个属性，浏览器就认为它是true
        video.setAttribute('muted', ''); // 静音
        video.play(); // 手动触发播放
        requestAnimationFrame(() => {
          tick(video, canvas);
        }); // 在下一帧渲染之前执行tick回调
      },
      (err: DOMException) => {
        alert(err);
      },
    );
};
const closeCamera = (canvas: CanvasRenderingContext2D) => {
  IsOpenCamera.value = false;
  mStream.getTracks().forEach((track) => {
    track.stop();
  });
  video.remove();
  requestAnimationFrame(() => {
    canvas.clearRect(0, 0, props.size, props.size);
  });
};

// 一帧中的操作
const tick = (video: HTMLVideoElement, canvas: CanvasRenderingContext2D) => {
  // 自定义的绘制函数
  props.paint(canvas);
  // 如果当前及至少下一帧的数据是可用的
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    // 获取实例
    canvasRef.value = canvasRef.value as HTMLCanvasElement;
    // 把摄像头影像绘制到canvas上
    canvas.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    //绘制半透明区域
    canvas.fillStyle = 'rgba(0, 0, 0, 0.5)';
    canvas.fillRect(0, 0, props.size, props.size / 6);
    canvas.fillRect(0, (props.size * 5) / 6, props.size, props.size);
    canvas.fillRect(0, props.size / 6, props.size / 6, (props.size * 2) / 3);
    canvas.fillRect(
      (props.size * 5) / 6,
      props.size / 6,
      props.size,
      (props.size * 2) / 3,
    );
    //绘制四角的小框
    canvas.strokeStyle = 'rgb(16, 249, 12)';
    canvas.beginPath();
    canvas.moveTo(props.size / 4, props.size / 3);
    canvas.lineTo(props.size / 4, props.size / 4);
    canvas.lineTo(props.size / 3, props.size / 4);
    canvas.moveTo((props.size * 3) / 4, props.size / 3);
    canvas.lineTo((props.size * 3) / 4, props.size / 4);
    canvas.lineTo((props.size * 2) / 3, props.size / 4);
    canvas.moveTo(props.size / 4, (props.size * 2) / 3);
    canvas.lineTo(props.size / 4, (props.size * 3) / 4);
    canvas.lineTo(props.size / 3, (props.size * 3) / 4);
    canvas.moveTo((props.size * 3) / 4, (props.size * 2) / 3);
    canvas.lineTo((props.size * 3) / 4, (props.size * 3) / 4);
    canvas.lineTo((props.size * 2) / 3, (props.size * 3) / 4);
    canvas.stroke();
    // 截取这一帧的影像
    const imageData = canvas.getImageData(
      0,
      0,
      canvasRef.value.width,
      canvasRef.value.height,
    );
    // 尝试识别
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      //不进行反色识别（黑底白码），降低性能损耗
      inversionAttempts: 'dontInvert',
    });
    // 如果识别到二维码
    if (code) {
      // 触发识别事件，将识别到的内容传递
      emits('identify', code.data);
      // 如果自定义了后续操作就执行
      if (props.afteridentify) {
        props.afteridentify(canvas, code);
      } else {
        //否则关闭相机
        drawBoder(canvas, code.location, 'yellow');
        outputData.value = code.data;
        // closeCamera(canvas);
      }
    }
  }
  if (IsOpenCamera.value) {
    requestAnimationFrame(() => {
      tick(video, canvas);
    });
  }
};
// 根据识别到二维码的坐标，画一个框
const drawBoder = (
  canvas: CanvasRenderingContext2D,
  location: Area,
  color: string,
) => {
  const {
    topLeftCorner: tl,
    topRightCorner: tr,
    bottomRightCorner: br,
    bottomLeftCorner: bl,
  } = { ...location };
  canvas.beginPath();
  canvas.moveTo(tl.x, tl.y);
  canvas.lineTo(tr.x, tr.y);
  canvas.lineTo(br.x, br.y);
  canvas.lineTo(bl.x, bl.y);
  canvas.closePath();
  canvas.lineWidth = 4;
  canvas.strokeStyle = color;
  canvas.stroke();
};

const emits = defineEmits<{
  identify: [data: string];
}>();

const props = withDefaults(
  defineProps<{
    paint?: (canvas: CanvasRenderingContext2D) => void;
    beforeOpen?: (canvas: CanvasRenderingContext2D) => void;
    afteridentify?: (canvas: CanvasRenderingContext2D, code: QRCode) => void;
    size?: number;
  }>(),
  {
    paint: () => {},
    beforeOpen: () => {},
    size: 300,
  },
);

defineExpose({
  openCamera,
  closeCamera,
});
</script>
