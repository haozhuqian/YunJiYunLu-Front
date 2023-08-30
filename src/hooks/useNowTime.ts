import { ref } from 'vue';
export default () => {
  const formattedDateTime = ref('');
  const updateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    formattedDateTime.value = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  const timeId = setInterval(updateTime, 1000);
  onUnmounted(() => clearInterval(timeId));
  return formattedDateTime;
};
