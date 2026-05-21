## fs (文件系统)

`fs`模块提供了用于与文件系统进行交互（以类似于标准POSICX 函数的方式）的API。

要是用此模块：

```js
const fs = require('fs');
```

所有的文件系统操作都具有同步和异步的形式。

异步的形式总是把完成回调作为其最后一个参数。传给完成回调的参数取决于具体方法，但第一个参数总是预留给异常。如果操作被成功地完成，则第一个参数会为`null`或 `undefined`。

```js
const fs = require('fs');

fs.unlink('文件', (err) => {
    if (err) throw err;
    console.log('已成功的删除文件');
})
```

当使用同步的操作时，发生的异常会被立即地抛出，可以使用`try...catch`处理，也可以冒泡。

```js
const fs = require('fs');

try {
    fs.unlinkSync('文件');
    console.log('已成功地删除文件');
} catch (err) {
    // 处理错误
}
```

当使用异步地方法时，无法保证顺序。因此，以下地操作容易出错，因为`fs.stat()`操作可能在`fs.rename()`操作之前完成：

```js
fs.rename('旧文件', '新文件', (err) => {
    if (err) throw err;
    console.log('重命名完成');
});
fs.stat('新文件', (err, stats) => {
    if (err) throw err;
    console.log(`文件属性：${JSON.stringify(stats)}`);
})
```

若要正确地排序这些操作，则移动`fs.stat()`调用到`fs.rename()`操作地回调中：

```js
fs.rename('旧文件', '新文件', (err) => {
    if(err) throw err;
    fs.stat('新文件', (err, stats) => {
        if (err) throw err;
        console.log(`文件属性：${JSON.stringify(stats)}`);
    })
})
```

在繁忙的进程中，应使用这些调用的异步版本。同步的版本会阻塞整个进程（停止所有的链接）,直到它们完成。

大多数异步的`fs`函数都可以省略回调参数。但是，不建议这么使用。当省略回调时，会使用默认的回调来抛出错误。若要获取对原始调用点的跟踪，则设置`NODE_DEBUG`环境变量：

```js
$ cat script.js
function bad() {
  require('fs').readFile('/');
}
bad();

$ env NODE_DEBUG=fs node script.js
fs.js:88
        throw backtrace;
        ^
Error: EISDIR: illegal operation on a directory, read
    <stack trace.>
```

### 文件路径

大多数`fs` 操作接收的文件路径可以指定为字符串、buffer、或URL 对象（使用`file：`协议）。

字符串形式的路径被解释为 UTF-8 字符串序列（表示绝对或相对的文件名）。相对路径会相对于当前工作目录（由`process.cwd()`指定）进行处理。

在POSIX上使用绝对路径的示例：

```js
const fs = require('fs');

fs.open('/文件.txt', 'r', (err, fd) => {
    if (err) throw err;
    fs.close(fd, (err) => {
        if(err) throw err;
    })
})
```

在 POSIX 上使用相对路径（相对于`process.cwd()`）的示例：

```js
fs.open('文件.txt','r',(err, fd) => {
    if (err) throw err;
    fs.close(fd, (err) => {
        if (err) throw err;
    })
})
```

使用 Buffer 指定的路径主要用于将文件路径视为不透明字节学列的某些 POSIX 操作系统。在这些系统上，单个文件路径可以包含使用多种字符编码的子序列。与字符串路径一样， `Buffer` 路径也可以是相对或绝对的：

在 POSIX 上使用绝对路径的示例：

```js
fs.open(Buffer.from('/文件.text'),'r',(err, fd) => {
    if(err) throw err;
    fs.close(fd, (err) => {
        if (err) throw err;
    })
})
```

在 Windows 上，Node.js 遵循独立驱动器工作目录的概念。当使用没有反斜杠的驱动器路径时，可以观察到此行为。例如，`fs.readdirSync('C:\\')` 可能会返回与`fs.readdirSync('C:')`不同的结果。详见

### URL 对象的支持

对于大多数`fs` 模块的函数，`path` 或 `filename` 参数可以传入 WHATWG url 对象。仅支持使用 `file:` 协议的 URL 对象。

```js
const fs = require('fs');
const fileUrl = new URL('file:///文件');


fs.readFileSync(fileUrl);
```

` file: ` URL 始终时绝对路径。

使用 WHATWG url 对象可能会采用特定平台的行为。

在 Windows 上，带有主机名的`file：` URL 会转换为 UNC 路径， 而带有驱动器号的`file:` URL 会转换为本地的绝对路径。没有主机名和驱动器号的`file:` URL 会导致抛出错误：

```js
// 在 Windows 上：

// - 带有主机名的 WHATWG 文件的 URL会转换为 UNC 路径。

// file://主机名/文件 => \\主机名\文件

fs.readFileSync(new URL('file://主机名/文件'));

// - 带有驱动器号的 WHATWG 文件的 URL 会转换为绝对路径。

// file:///C:/文件 => C:\文件
fs.readFileSync(new URL('file:///C:/文件'));

// - 没有主机名的 WHATWG 文件的 URL 必须包含驱动器号。
fs.readFileSync(new URL('file:///无驱动器号/文件'));
fs.readFileSync(new URL('file:///文件'));
// TypeError [ERR_INVALID_FILE_URL_PATH]: File URL path must be absolute
```

带有驱动器号的`file:` URL 必须使用 `：`作为驱动器号后面的分隔符。使用其他分隔符会导致抛出错误。

在所有其他平台上，不支持带有主机名的`file:` URL, 使用时会导致抛出错误：

```js
// 在其他平台上：

// - 不支持带有主机名的 WHATWG 文件的 URL。
// file://主机名/文件 => 抛出错误！
fs.readFileSync(new URL('file://主机名/文件'));
// TypeError [ERR_INVALID_FILE_URL_PATH]: must be absolute

// - WHATWG 文件的 URL 会转换为绝对路径。
// file:///文件 => /文件

fs.readFileSync(new URL('file:///文件'));
```

包含编码后的斜杆字符的`file:` URL 在所有平台上都会导致抛出错误:

```js
// 在 Windows 上：
fs.readFileSync(new URL('file:///C:/%2F'));
fs.readFileSync(new URL('file:///C:/%2f'));
/* TypeError [ERR_INVALID_FILE_URL_PATH]: File URL path must not include encoded
\ or / characters */


// 在 POSIX 上:
fs.readFileSync(new URL('file:///%2F'));
fs.readFileSync(new URL('file:///%2f'));
/* TypeError [ERR_INVALID_FILE_URL_PATH]: File URL path must not include encoded
/ characters */
```

在 Windows 上，包含编码后的反斜杠字符的`file:`URL会导致抛出错误:
