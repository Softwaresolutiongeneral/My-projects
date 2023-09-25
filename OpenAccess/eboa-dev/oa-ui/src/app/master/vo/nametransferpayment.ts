
export class NameTransferPayment{
id: string;
iserr:string;
message:string;
totalamount:string;
serviceno:string;
cusAddress:string;
cusname:string;
net:Array<net>;
debit:Array<debit>;
credit:Array<credit>;
}
export class net{
    image:string;
    description:string;
    status:string;
    code: string;
}
export class debit{
    image:string;
    description:string;
    status:string;
    code: string;
}
export class credit{
    image:string;
    description:string;
    status:string;
    code: string;
}