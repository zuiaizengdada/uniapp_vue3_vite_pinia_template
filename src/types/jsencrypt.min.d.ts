declare module 'jsencrypt/bin/jsencrypt.min.js' {
    export class JSEncrypt {
    constructor(options?: JSEncryptOptions);

    setPrivateKey(privateKey: string): void;
    setPublicKey(publicKey: string): void;
    encrypt(data: string): string | false;
    decrypt(data: string): string | false;
    sign(data: string, hash: (data: string) => string, hashName: string): string | false;
    verify(data: string, signature: string, hash: (data: string) => string): boolean;
  }

  export interface JSEncryptOptions {
    default_key_size?: string;
    default_public_exponent?: string;
    log?: boolean;
  }

  export default JSEncrypt;
}
