export class AccountEntity {
    public accountName: string;
    public created: string;
    public coreLiquidBalance: string;
    public ramQuota: string;
    public ramUsage: string;
    public cpuWeight: string;
    public cpuLimitUsed: number;
    public cpuLimitMax: number;
    public netWeight: string;
    public netLimitUsed: number;
    public netLimitMax: number;
    public jsonInfo: string;
    constructor() {
        this.accountName = 'smartoneiobp';
        this.created = '2018-11-25T01:52:12.000',
        this.coreLiquidBalance = '0.0001 EOS',
        this.ramQuota = '5475',
        this.ramUsage = '3446',
        this.cpuWeight = '0.1500 EOS',
        this.cpuLimitUsed = 0,
        this.cpuLimitMax = 1,
        this.netWeight = '0.0500 EOS',
        this.netLimitUsed = 0,
        this.netLimitMax = 1,
        this.jsonInfo = '';
    }
}
