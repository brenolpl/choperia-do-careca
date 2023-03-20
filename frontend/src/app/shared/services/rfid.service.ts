import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RfidService {
    private navigator: any;
    private port: any;
    //@ts-ignore
    private reader: ReadableStreamDefaultReader;
    private rfidSource = new BehaviorSubject('');
    public rfid = this.rfidSource.asObservable();
    public rfidString: any = null;
    public isInitialized = false;

    constructor() {
    }

    async initReader(): Promise<any> {

        this.navigator = window.navigator;

        if (this.navigator && this.navigator.serial) {
            if (this.port === undefined || this.port === null) {
                this.port = await this.navigator.serial.requestPort();
                await this.port.open({baudRate: 115200});
            } else {
                await this.port.open({baudRate: 115200});
            }
            while (this.port.readable) {

                this.reader = this.port.readable.getReader();
                this.isInitialized = true;
                try {
                    while (true) {
                        let {value, done} = await this.reader.read();
                        let byteArray = new Uint8Array(value);
                        if(byteArray.length > 1) {
                            if(byteArray.length == 31 || byteArray.length == 32) {
                                const hexa = this.toString(byteArray);
                                this.updateRfid(hexa.slice(-24, -4));
                            }
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

    updateRfid = (rfid: string) => {
        this.rfidString = rfid;
        this.rfidSource.next(rfid);
    }
    toString = (buffer: any) => {
        return [...new Uint8Array(buffer)].map(x => x.toString(16).padStart(2, '0')).join('');
    }
}
