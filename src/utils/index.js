import axios from '@/api/index.js'
export default {
  async initMusic (id, url, width, height) {
    const HIGHT = height || 100
    const WIDTH = width || 100
    /* eslint-disable */
    const canvas = document.getElementById(id)
    canvas.width = WIDTH
    canvas.height = HIGHT
    const canvasCtx = canvas.getContext('2d')
    let audioBufferSourceNode
    // 首先实例化AudioContext对象 很遗憾浏览器不兼容，只能用兼容性写法；audioContext用于音频处理的接口，并且工作原理是将AudioContext创建出来的各种节点(AudioNode)相互连接，音频数据流经这些节点并作出相应处理。
    // 总结就一句话 AudioContext 是音频对象，就像 new Date()是一个时间对象一样
    const AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext
    if (!AudioContext) {
      alert('您的浏览器不支持audio API，请更换浏览器（chrome、firefox）再尝试，另外本人强烈建议使用谷歌浏览器！')
    }
    const audioContext = new AudioContext() // 实例化
    // 总结一下接下来的步骤
    // 1 先获取音频文件（目前只支持单个上传）
    // 2 读取音频文件，读取后，获得二进制类型的音频文件
    // 3 对读取后的二进制文件进行解码
    const file = await axios({
      method: 'get',
      url: url,
      responseType: 'blob'
    })
    console.log(`WIDTH`, WIDTH)
    const fileReader = new FileReader() // 使用FileReader异步读取文件
    fileReader.readAsArrayBuffer(file) // 开始读取音频文件
    fileReader.onload = function (e) { // 读取文件完成的回调
      // e.target.result 即为读取的音频文件（此文件为二进制文件）
      // 下面开始解码操作 解码需要一定时间，这个时间应该让用户感知到
      // 开始解码，解码成功后执行回调函数
      audioContext.decodeAudioData(e.target.result, function (buffer) {
        // 创建AudioBufferSourceNode 用于播放解码出来的buffer的节点
        audioBufferSourceNode = audioContext.createBufferSource()
        // 创建AnalyserNode 用于分析音频频谱的节点
        const analyser = audioContext.createAnalyser()
        // fftSize (Fast Fourier Transform) 是快速傅里叶变换，一般情况下是固定值2048。具体作用是什么我也不太清除，但是经过研究，这个值可以决定音频频谱的密集程度。值大了，频谱就松散，值小就密集。
        analyser.fftSize = 128
        // 连接节点,audioContext.destination是音频要最终输出的目标，
        // 我们可以把它理解为声卡。所以所有节点中的最后一个节点应该再
        // 连接到audioContext.destination才能听到声音。
        audioBufferSourceNode.connect(analyser)
        analyser.connect(audioContext.destination)
        console.log(audioContext.destination)
        // 播放音频
        audioBufferSourceNode.buffer = buffer // 回调函数传入的参数
        audioBufferSourceNode.start() // 部分浏览器是noteOn()函数，用法相同
        // 可视化 创建数据
        // let dataArray = new Uint8Array(analyser.fftSize)
        // analyser.getByteFrequencyData(dataArray)//将数据放入数组，用来进行频谱的可视化绘制
        // console.log(analyser.getByteFrequencyData)
        const bufferLength = analyser.frequencyBinCount
        console.log(bufferLength)
        let dataArray = new Uint8Array(bufferLength)
        console.log(dataArray)
        canvasCtx.clearRect(0, 0, WIDTH, HIGHT)
        function draw () {
          requestAnimationFrame(draw)
          analyser.getByteFrequencyData(dataArray)
          canvasCtx.clearRect(0, 0, WIDTH, HIGHT)

          canvasCtx.fillStyle = 'rgba(0, 0, 0, 0)'
          // canvasCtx.fillStyle = 
          canvasCtx.fillRect(0, 0, WIDTH, HIGHT)
          let barWidth = (500 / bufferLength) * 2.5
          let barHeight
          let x = 0
          for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i]
            // 随机数0-255   Math.floor(Math.random()*255)  
            // 随机数  10*Math.random()
            canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',' + Math.floor(Math.random() * (20 - 120) + 120) + ',' + Math.floor(Math.random() * (10 - 50) + 50) + ')'
            canvasCtx.fillRect(x, HIGHT - barHeight / 2, barWidth, barHeight)
            canvasCtx.fillRect(x, HIGHT - barHeight / 2 - 40, barWidth, 4)
            x += barWidth + 1
          }
        }
        draw()
      })
    }
  }
}