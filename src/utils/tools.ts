

function promiseAll (promises : Promise<any>[]) {
    return new Promise((resolve, reject) => {
        const results : any[] = [];
        let completed = 0;
        let remaining = promises.length;

        if (remaining === 0) {
            resolve(results);
            return;
        }

        function handleFulfilled(index: number, value: any) {
            results[index] = value;
            completed++;
            remaining--;
            if (remaining === 0) {
                resolve(results);
            }
        }
        
        promises.forEach((promise, index) => {  
            Promise.resolve(promise)
            .then(value => {handleFulfilled (index, value);})
            .catch((error) => reject(error));
            


        })
    
    })
}  


function uploadFile(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/upload");

    xhr.onload = () => {
      if (xhr.status === 200) {
        // 上传成功，resolve 把服务器返回的数据传出去
        resolve(JSON.parse(xhr.responseText));
      } else {
        // 上传失败
        reject(new Error(`Upload failed: ${xhr.status}`));
      }
    };

    xhr.onerror = () => reject(new Error("Network error"));
    xhr.send(file);
  });
}