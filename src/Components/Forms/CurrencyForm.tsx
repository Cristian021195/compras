import { useRef, useState, useEffect, FormEvent, Dispatch, SetStateAction } from "react";
import { Currency, Exchange } from "../../Types";
import { ZConfig } from "../../Store";
const currencies : Currency[] = [
    {title:"United States Dollar", code:"USD", ucode:"$"},
    {title:"Argentina Peso", code:"ARS", ucode:"$"},
    {title:"Uruguay Peso", code:"UYU", ucode:"$U"},    
    {title:"Costa Rica Colon", code:"CRC", ucode:"₡"},
    {title:"Albania Lek", code:"ALL", ucode:"Lek"},
    {title:"Afghanistan Afghani", code:"AFN", ucode:"؋"},    
    {title:"Aruba Guilder", code:"AWG", ucode:"ƒ"},
    {title:"Australia Dollar", code:"AUD", ucode:"$"},
    {title:"Azerbaijan Manat", code:"AZN", ucode:"₼"},
    {title:"Bahamas Dollar", code:"BSD", ucode:"$"},
    {title:"Barbados Dollar", code:"BBD", ucode:"$"},
    {title:"Belarus Ruble", code:"BYN", ucode:"Br"},
    {title:"Belize Dollar", code:"BZD", ucode:"BZ$"},
    {title:"Bermuda Dollar", code:"BMD", ucode:"$"},
    {title:"Bolivia Bolíviano", code:"BOB", ucode:"$b"},
    {title:"Bosnia and Herzegovina Convertible Mark", code:"BAM", ucode:"KM"},
    {title:"Botswana Pula", code:"BWP", ucode:"P"},
    {title:"Bulgaria Lev", code:"BGN", ucode:"лв"},
    {title:"Brazil Real", code:"BRL", ucode:"R$"},
    {title:"Brunei Darussalam Dollar", code:"BND", ucode:"$"},
    {title:"Cambodia Riel", code:"KHR", ucode:"៛"},
    {title:"Canada Dollar", code:"CAD", ucode:"$"},
    {title:"Cayman Islands Dollar", code:"KYD", ucode:"$"},
    {title:"Chile Peso", code:"CLP", ucode:"$"},
    {title:"China Yuan Renminbi", code:"CNY", ucode:"¥"},
    {title:"Colombia Peso", code:"COP", ucode:"$"},
    {title:"Cuba Peso", code:"CUP", ucode:"₱"},
    {title:"Czech Republic Koruna", code:"CZK", ucode:"Kč"},
    {title:"Denmark Krone", code:"DKK", ucode:"kr"},
    {title:"Dominican Republic Peso", code:"DOP", ucode:"RD$"},
    {title:"East Caribbean Dollar", code:"XCD", ucode:"$"},
    {title:"Egypt Pound", code:"EGP", ucode:"£"},
    {title:"El Salvador Colon", code:"SVC", ucode:"$"},
    {title:"Euro Member Countries", code:"EUR", ucode:"€"},
    {title:"Falkland Islands (Malvinas) Pound", code:"FKP", ucode:"£"},
    {title:"Fiji Dollar", code:"FJD", ucode:"$"},
    {title:"Ghana Cedi", code:"GHS", ucode:"¢"},
    {title:"Gibraltar Pound", code:"GIP", ucode:"£"},
    {title:"Guatemala Quetzal", code:"GTQ", ucode:"Q"},
    {title:"Guernsey Pound", code:"GGP", ucode:"£"},
    {title:"Guyana Dollar", code:"GYD", ucode:"$"},
    {title:"Honduras Lempira", code:"HNL", ucode:"L"},
    {title:"Hong Kong Dollar", code:"HKD", ucode:"$"},
    {title:"Hungary Forint", code:"HUF", ucode:"Ft"},
    {title:"Iceland Krona", code:"ISK", ucode:"kr"},
    {title:"India Rupee", code:"INR", ucode:"₹"},
    {title:"Indonesia Rupiah",code:"IDR", ucode:"Rp"},
    {title:"Iran Rial", code:"IRR", ucode:"﷼"},
    {title:"Isle of Man Pound", code:"IMP", ucode:"£"},
    {title:"Israel Shekel", code:"ILS", ucode:"₪"},
    {title:"Jamaica Dollar", code:"JMD", ucode:"J$"},
    {title:"Japan Yen", code:"JPY", ucode:"¥"},
    {title:"Jersey Pound", code:"JEP", ucode:"£"},
    {title:"Kazakhstan Tenge", code:"KZT", ucode:"лв"},
    {title:"Korea (North) Won", code:"KPW", ucode:"₩"},
    {title:"Korea (South) Won", code:"KRW", ucode:"₩"},
    {title:"Kyrgyzstan Som", code:"KGS", ucode:"лв"},
    {title:"Laos Kip", code:"LAK", ucode:"₭"},
    {title:"Lebanon Pound", code:"LBP", ucode:"£"},
    {title:"Liberia Dollar", code:"LRD", ucode:"$"},
    {title:"Macedonia Denar", code:"MKD", ucode:"ден"},
    {title:"Malaysia Ringgit", code:"MYR", ucode:"RM"},
    {title:"Mauritius Rupee", code:"MUR", ucode:"₨"},
    {title:"Mexico Peso", code:"MXN", ucode:"$"},
    {title:"Mongolia Tughrik", code:"MNT", ucode:"₮"},
    {title:"Moroccan-dirham", code:"MNT", ucode:" د.إ"},
    {title:"Mozambique Metical", code:"MZN", ucode:"MT"},
    {title:"Namibia Dollar", code:"NAD", ucode:"$"},
    {title:"Nepal Rupee", code:"NPR", ucode:"₨"},
    {title:"Netherlands Antilles Guilder", code:"ANG", ucode:"ƒ"},
    {title:"New Zealand Dollar", code:"NZD", ucode:"$"},
    {title:"Nicaragua Cordoba", code:"NIO", ucode:"C$"},
    {title:"Nigeria Naira", code:"NGN", ucode:"₦"},
    {title:"Norway Krone", code:"NOK", ucode:"kr"},
    {title:"Oman Rial", code:"OMR", ucode:"﷼"},
    {title:"Pakistan Rupee", code:"PKR", ucode:"₨"},
    {title:"Panama Balboa", code:"PAB", ucode:"B/."},
    {title:"Paraguay Guarani", code:"PYG", ucode:"Gs"},
    {title:"Peru Sol", code:"PEN", ucode:"S/."},
    {title:"Philippines Peso", code:"PHP", ucode:"₱"},
    {title:"Poland Zloty", code:"PLN", ucode:"zł"},
    {title:"Qatar Riyal", code:"QAR", ucode:"﷼"},
    {title:"Romania Leu", code:"RON", ucode:"lei"},
    {title:"Russia Ruble", code:"RUB", ucode:"₽"},
    {title:"Saint Helena Pound", code:"SHP", ucode:"£"},
    {title:"Saudi Arabia Riyal", code:"SAR", ucode:"﷼"},
    {title:"Serbia Dinar", code:"RSD", ucode:"Дин."},
    {title:"Seychelles Rupee", code:"SCR", ucode:"₨"},
    {title:"Singapore Dollar", code:"SGD", ucode:"$"},
    {title:"Solomon Islands Dollar", code:"SBD", ucode:"$"},
    {title:"Somalia Shilling", code:"SOS", ucode:"S"},
    {title:"South Korean Won", code:"KRW", ucode:"₩"},
    {title:"South Africa Rand", code:"ZAR", ucode:"R"},
    {title:"Sri Lanka Rupee", code:"LKR", ucode:"₨"},
    {title:"Sweden Krona", code:"SEK", ucode:"kr"},
    {title:"Switzerland Franc", code:"CHF", ucode:"CHF"},
    {title:"Suriname Dollar", code:"SRD", ucode:"$"},
    {title:"Syria Pound", code:"SYP", ucode:"£"},
    {title:"Taiwan New Dollar", code:"TWD", ucode:"NT$"},
    {title:"Thailand Baht", code:"THB", ucode:"฿"},
    {title:"Trinidad and Tobago Dollar", code:"TTD", ucode:"TT$"},
    {title:"Turkey Lira", code:"TRY", ucode:"₺"},
    {title:"Tuvalu Dollar", code:"TVD", ucode:"$"},
    {title:"Ukraine Hryvnia", code:"UAH", ucode:"₴"},
    {title:"UAE-Dirham", code:"AED", ucode:" د.إ"},
    {title:"United Kingdom Pound", code:"GBP", ucode:"£"},
    {title:"Uzbekistan Som", code:"UZS", ucode:"лв"},
    {title:"Venezuela Bolívar", code:"VEF", ucode:"Bs"},
    {title:"Viet Nam Dong", code:"VND", ucode:"₫"},
    {title:"Yemen Rial", code:"YER", ucode:"﷼"},
    {title:"Zimbabwe Dollar", code:"ZWD", ucode:"Z$"}
];

interface IProps {
    //exchanges: Exchange[],
    //setExchanges: Dispatch<SetStateAction<Exchange[]>>,
    setSaved: Dispatch<SetStateAction<boolean>>
}

export const CurrencyForm = ({setSaved}:IProps) => {
const formC = useRef<FormEvent<HTMLFormElement>>();
const [error, setError] = useState(false);
    const {exchanges, addOrReplaceExchange} = ZConfig((state)=>state)
    const [destino, setDestino] = useState(currencies[0].code+"");
    const [origen, setOrigen] = useState(currencies[0].code+"|"+currencies[0].ucode);
    const [ucode, setUcode] = useState(currencies[0].ucode);
    const handleDestino = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        setDestino(e.target.value);
    }
    const handleOrigen = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        let ccode = e.target.value.split("|")[0];
        let ucode = e.target.value.split("|")[1];
        setUcode(ucode);
        setOrigen(ccode);
    }
    useEffect(()=>{
        let origenCode = origen.split("|")[0];
        if(origenCode === destino){
            setError(true);
        }else{
            setError(false);
        }
    },[origen, destino]);
    const cargarConversionDO = (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        let fData = new FormData(e.currentTarget);
        let objData = Object.fromEntries(fData);
        let exchangeData: Exchange = {
            exchange: objData.cdestino+"-"+origen,
            value: parseFloat(objData.vorigen+"") / parseFloat(objData.vdestino+""),
            ucode
        };

        addOrReplaceExchange(exchangeData);

        setSaved(true);
        setTimeout(() => {
            setSaved(false);
        }, 1500);
    }
    return (
        <form className='d-flex justify-content-center mt-1 flex-wrap gap-1' ref={formC as any} onSubmit={cargarConversionDO}>
            <div className="">
                <div className="d-flex justify-content-between mt-1">
                    <b>Valor: </b>
                    <b>Moneda: </b>
                </div>
                <div className="d-flex gap-1">
                    <input type="number" title="moneda destino" name="vdestino" id="vdestino" min={0.01} max={1000000.99} step="any" required className="w-currval" placeholder="1 destino"/>
                    <select tabIndex={-1} name="cdestino" title="monedas" id="cdestino" onChange={handleDestino}>
                        {currencies.map((c,ci)=><option key={ci} value={c.code}>{c.title+", "+c.ucode}</option>)}
                    </select>
                </div>
                <div className="d-flex gap-1 mt-1">
                    <input type="number" title="moneda origen" name="vorigen" id="vorigen" min={0.01} max={1000000.99} step="any" required className="w-currval" placeholder="1020 origen"/>
                    <select tabIndex={-1} name="corigen" title="monedas" id="corigen" onChange={handleOrigen}>
                        {currencies.map((c,ci)=><option key={ci} value={c.code+"|"+c.ucode}>{c.title+", "+c.ucode}</option>)}
                    </select>
                </div>
                {error ? <span className="text-r">¡No pueden ser lo mismo origen y destino!</span> : <></>} 
            </div>
            <button className={error ? 'btn p-1 c-lgreen' : 'btn p-1 c-green'} disabled={error}>Cargar / Editar</button>
        </form>
    )
}
