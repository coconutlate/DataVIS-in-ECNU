from http import HTTPStatus
from urllib.parse import urlparse, unquote
from pathlib import PurePosixPath
import requests
from dashscope import ImageSynthesis
import os


def ask(s:str):
    rsp = ImageSynthesis.call(api_key="sk-2dc6bf5af7b94e23ae4a674055798fa5",
                            model="wanx2.1-t2i-turbo",
                            prompt=s,
                            n=1,
                            size='1024*1024')
    res = []
    if rsp.status_code == HTTPStatus.OK:
        # 在当前目录下保存图片
        for result in rsp.output.results:
            res.append(result.url)
    else:
        print('sync_call Failed, status_code: %s, code: %s, message: %s' %
            (rsp.status_code, rsp.code, rsp.message))
    return res

if __name__ == "__main__":
    prompt = input()
    arr = ask(prompt)
    for x in arr:
        file_name = PurePosixPath(unquote(urlparse(x).path)).parts[-1]
        with open('./{}'.format(file_name), 'wb+') as f:
            f.write(requests.get(x).content)