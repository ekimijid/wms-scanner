import {makeAutoObservable, observable, runInAction} from "mobx";
import Company from "Frontend/generated/com/essers/wmsscanner/entity/Company";
import Pickinglist from "Frontend/generated/com/essers/wmsscanner/entity/Pickinglist";
import Movement from "Frontend/generated/com/essers/wmsscanner/entity/Movement";
import {WmsEndpoint} from "Frontend/generated/endpoints";
import WmsdataModel from "Frontend/generated/com/essers/wmsscanner/eindpoint/WmsEndpoint/WmsdataModel";
import {cacheable} from 'Frontend/cache/cacheable';

// instead of always relying on the backend to retrieve the data. e.g.
// const stats = await getStats();
// you can now wrap getStats into the cacheable helper.
export class WmsStore {
    companies: Company [] = [];
    pickinglists: Pickinglist [] = [];
    movements: Movement [] = [];

    username: string | undefined = "";

    constructor() {
        makeAutoObservable(
            this,
            {
                initFromServer: false,
                companies: observable.shallow,
                pickinglists: observable.shallow,
                movements: observable.shallow,
                username: observable.ref,
            },
            {autoBind: true}
        );

        this.initFromServer();
    }

    async initFromServer() {
        const data = await cacheable(WmsEndpoint.wmsData,
            'wms',
            WmsdataModel.createEmptyValue());
        runInAction(
            async () => {
                this.companies = data.companies;
                this.pickinglists = data.pickinglists;
                this.movements = data.movements;

            }
        );
    }

    savepickinglist(pickinglists: Pickinglist[]) {
        this.pickinglists = pickinglists;
    }

    savemovements(movements: Movement[]) {
        this.movements = movements;
    }
    saveimage(){

    }

}