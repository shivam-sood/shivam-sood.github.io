import time
import requests
import random
import base64
import hashlib

# import Crypto
from Crypto import Random
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
from Crypto.Random import get_random_bytes
import string


class AESCipher(object):
    def __init__(self, key):
        self.bs = AES.block_size
        print(self.bs)
        # self.key = hashlib.sha256(key.encode()).digest()
        self.key = key.encode("utf-8")

    def encrypt(self, raw):
        raw = pad(raw.encode(), 16)

        # iv = Random.new().read(AES.block_size)
        iv = "".join(random.sample(string.ascii_letters, 16)).encode()
        # iv = 'BBBBBBBBBBBBBBBB'.encode('utf-8')
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        tmp = base64.b64encode(cipher.encrypt(raw))
        # print("saa",iv,tmp)
        iv = base64.b64encode(iv)
        # print("saa",iv.decode('utf-8'),iv)
        return iv + tmp
        # return base64.b64encode(cipher.encrypt(raw))

    def decrypt(self, enc):
        enc = base64.b64decode(enc)
        iv = enc[: AES.block_size]
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return self._unpad(cipher.decrypt(enc[AES.block_size :])).decode("utf-8")

    def _pad(self, s):
        return s + (self.bs - len(s) % self.bs) * chr(self.bs - len(s) % self.bs)

    @staticmethod
    def _unpad(s):
        return s[: -ord(s[len(s) - 1 :])]


aes = AESCipher("MySecretKeyesw39")
print(aes.key)
while 1:
    a = aes.encrypt(str(random.randrange(960, 1020) / 10))
    b = aes.encrypt(str(random.randrange(60, 101)))
    c = aes.encrypt(str(random.randrange(950, 991) / 10))
    d = aes.encrypt(str(random.randrange(950, 991) / 10))
    e = aes.encrypt(str(random.randrange(950, 991) / 10))
    coord = aes.encrypt(
        "{},{}".format(random.random() * 180 - 90, random.random() * 360 - 180)
    )
    stat = aes.encrypt(str(random.randrange(0, 3)))

    # a = (str(random.randrange(960,1020)/10))
    # b = (str(random.randrange(60,101)))
    # c = (str(random.randrange(950,991)/10))
    # d = (str(random.randrange(950,991)/10))
    # e = (str(random.randrange(950,991)/10))
    # coord = ("{},{}".format(random.random() * 180 - 90, random.random()*360 - 180))
    # stat = (str(random.randrange(0,3)))
    print(
        "https://api.thingspeak.com/update?api_key=B2MH2CATLY7JVLHF&field1={}&field2={}&field3={}&field4={}&field5={}&field6={}&field7={}".format(
            a, b, c, d, e, coord, stat
        )
    )
    x = requests.get(
        "https://api.thingspeak.com/update?api_key=B2MH2CATLY7JVLHF&field1={}&field2={}&field3={}&field4={}&field5={}&field6={}&field7={}".format(
            a, b, c, d, e, coord, stat
        )
    )

    time.sleep(15)
