import {BehaviorSubject, of} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class BalancaService {
    private navigator: any;
    private port: any;
    //@ts-ignore
    private reader: ReadableStreamDefaultReader;
    private balancaSource = new BehaviorSubject('');
    public pesoObservable = this.balancaSource.asObservable();
    public pesoString: any = null;
    public isInitialized = false;

    constructor() {
    }

    async initReader(): Promise<any> {

        this.navigator = window.navigator;

        if (this.navigator && this.navigator.serial) {
            if (this.port === undefined || this.port === null) {
                this.port = await this.navigator.serial.requestPort();
                await this.port.open({baudRate: 9600});
            } else {
                await this.port.open({baudRate: 9600});
            }
            while (this.port.readable) {

                this.reader = this.port.readable.getReader();
                this.isInitialized = true;
                try {
                    while (true) {
                        let {value, done} = await this.reader.read();
                        if(value.length == 7) {
                            let hexString = this.toString(value);
                            let asciiValue = this.hexaToAscii(hexString);
                            this.updatePeso(this.formatarPeso(asciiValue));
                        }
                        break;
                    }
                } finally {
                    this.reader.releaseLock();
                    this.isInitialized = false;
                }
            }
        }
    }

    updatePeso = (peso: string) => {
        this.pesoString = peso;
        this.balancaSource.next(peso);
    }
    toString = (buffer: any) => {
        return [...new Uint8Array(buffer)].map(x => x.toString(16).padStart(2, '0')).join('');
    }

    formatarPeso(ascii: any) {
        var valor = Number(ascii);
        if (!valor) {
            valor = Number(ascii.substring(1));
        }

        return valor.toString();
    }

    hexaToAscii(hexx: any) {
        let hex = hexx.toString();
        let str = '';
        for (let i = 0; i < hex.length; i += 2) {
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
        return str;
    }
}
