export default function getfile(e, isIosDown = false) {
  // #ifdef APP-PLUS
  const isIOS = plus.os.name === 'iOS'
  const url = plus.io.convertLocalFileSystemURL(e)
  return new Promise((resolve, reject) => {
    if (/(http|https):\/\/([\w.]+\/?)\S*/.test(url)) {
      if (!isIosDown || !isIOS) {
        resolve(e)
        return
      }
      if (isIOS) {
        const dtask = plus.downloader.createDownload(url, {}, function (d, status) {
          // 下载完成
          if (status == 200) {
            const newurl = plus.io.convertLocalFileSystemURL(d.filename)
            // console.log("Download success: " + newurl);
            plus.io.resolveLocalFileSystemURL(
              newurl,
              (entry) => {
                let reader = null
                entry.file(
                  (file) => {
                    reader = new plus.io.FileReader()
                    reader.onloadend = (read) => {
                      resolve(read.target.result)
                    }
                    reader.readAsDataURL(file)
                  },
                  function (error) {
                    console.log(error.message)
                  }
                )
              },
              (err) => {
                resolve(e)
              }
            )
          } else {
            console.log('Download failed: ' + status)
            reject(status)
          }
        })
        dtask.start()
      }
    } else {
      plus.io.resolveLocalFileSystemURL(
        url,
        (entry) => {
          let reader = null
          entry.file(
            (file) => {
              reader = new plus.io.FileReader()
              reader.onloadend = (read) => {
                resolve(read.target.result)
              }
              reader.readAsDataURL(file)
            },
            function (error) {
              console.log(error.message)
            }
          )
        },
        (err) => {
          resolve(e)
        }
      )
    }
  })
  // #endif
  // #ifdef H5

  return new Promise((resolve, reject) => {
    resolve(e)
  })

  // #endif
}
