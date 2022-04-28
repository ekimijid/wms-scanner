import {makeAutoObservable, observable, runInAction} from "mobx";
import Company from "Frontend/generated/com/essers/wmsscanner/entity/Company";
import Pickinglist from "Frontend/generated/com/essers/wmsscanner/entity/Pickinglist";
import Movement from "Frontend/generated/com/essers/wmsscanner/entity/Movement";
import {cacheable} from "Frontend/cache/cacheable";
import {WmsEndpoint} from "Frontend/generated/endpoints";
import WmsdataModel from "Frontend/generated/com/essers/wmsscanner/eindpoint/WmsEndpoint/WmsdataModel";

export class WmsStore{
    companies: Company []=[];
    pickinglists: Pickinglist []=[];
    movements: Movement []=[];

    constructor() {
        makeAutoObservable(
            this,
            {
                initFromServer: false,
                companies: observable.shallow,
                pickinglists:observable.shallow,
                movements:observable.shallow,
            },
            { autoBind: true }
        );

        this.initFromServer();
    }

    async initFromServer() {
        const data = await cacheable(WmsEndpoint.wmsData, 'wms', WmsdataModel.createEmptyValue());
        runInAction(
            ()=>{
                this.companies=data.companies;
                this.pickinglists=data.pickinglists;
                this.movements=data.movements;
            }
        );
    }



}