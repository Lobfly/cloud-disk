export async function mkMini(file) {
    //制作视频迷你图
    function video() {
      return new Promise((resolve) => {
        // 生成video标签
        const video = document.createElement("video");
        video.src = url;
        //监听视频资源首帧加载完毕，可以截屏
        video.onloadeddata = () => {
          //获取视频真实宽高
          const width = video.videoWidth;
          const height = video.videoHeight;
          const canvas = document.createElement("canvas");
          canvas.width = 200;
          canvas.height = 200 * (height / width);
          canvas
            .getContext("2d")
            .drawImage(video, 0, 0, canvas.width, canvas.height);
          let base64 = canvas.toDataURL("image/png");
          resolve(base64);
        };
      });
    }
  //制作图片迷你图
    function img() {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          //获取图片真实宽高
          const width = img.width;
          const height = img.height;
          // 生成画布
          const canvas = document.createElement("canvas");
          canvas.width = 200;
          canvas.height = 200 * (height / width);
          // 等比缩放
          canvas
            .getContext("2d")
            .drawImage(img, 0, 0, canvas.width, canvas.height);
          //生成base64格式图片
          let base64 = canvas.toDataURL("image/png");
          resolve(base64);
        }
      })
    }
  // 生成文件连接
  const url = URL.createObjectURL(file);
  if (/image/.test(file.type)) {
    let result = await img(file);
    return result;
  } else {
    let result = await video(file);
    return result;
  }
}