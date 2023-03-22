import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractFormComponent} from "../../../shared/components/abstract-form/abstract-form.component";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../shared/services/api.service";
import {RfidService} from "../../../shared/services/rfid.service";
import {Subscription} from "rxjs";

@Component({
    templateUrl: './form-chope.component.html',
    styleUrls: ['../../../shared/components/abstract-form/abstract-form.component.scss']
})
export class FormChopeComponent extends AbstractFormComponent implements OnInit, OnDestroy{
    rfidSubscription!: Subscription;

    constructor(location: Location,
                router: Router,
                route: ActivatedRoute,
                apiService: ApiService,
                private rfidService: RfidService) {
        super(location, router, route, apiService);

    }

    override ngOnInit() {
        super.ngOnInit();
        this.rfidSubscription = this.rfidService.rfid.subscribe(rfid => {
            this.entidade.cartaoRFID = rfid.trim();
        })
    }

    protected getRota(): string {
        return 'chopes';
    }

    ngOnDestroy() {
        this.rfidSubscription.unsubscribe();
    }
}
