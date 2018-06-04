* func MyPrint(t int, format string, args ...interface{}) 打印日志
    0：info级 1：emphasis 重点级 2：warn警告级 3：error错误级
* func CheckErr(e error) 
    e非null,抛出异常
* func MakeDirIfNot(dir string) 创建文件夹
* func FetchPublicKey(kpath string) 取公钥
x509.ParsePKIXPublicKey(x509EncodedPub) RSA加密，取公钥
* func FetchPrivateKey(Kpath String) 取私钥
    x509.ParseECPrivateKey(x509Encoded) RSA加密，取私钥
* func EncodeECDSAKeys(privateKey *ecdsa.PrivateKey, publicKey *ecdsa.PublicKey) ([]byte, []byte) 编码椭圆曲线数字签名算法的KEYs

* func GetIPConfigs(s string) ([]string, []int)  获得IP配置信息